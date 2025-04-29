#!/usr/bin/env python3
import os
import re
import glob
import argparse
import pandas as pd
import numpy as np

# Mapping from full state names (lower-case with underscores) to abbreviations.
state_abbrev = {
    "alabama": "AL",
    "alaska": "AK",
    "arizona": "AZ",
    "arkansas": "AR",
    "california": "CA",
    "colorado": "CO",
    "connecticut": "CT",
    "delaware": "DE",
    "florida": "FL",
    "georgia": "GA",
    "hawaii": "HI",
    "idaho": "ID",
    "illinois": "IL",
    "indiana": "IN",
    "iowa": "IA",
    "kansas": "KS",
    "kentucky": "KY",
    "louisiana": "LA",
    "maine": "ME",
    "maryland": "MD",
    "massachusetts": "MA",
    "michigan": "MI",
    "minnesota": "MN",
    "mississippi": "MS",
    "missouri": "MO",
    "montana": "MT",
    "nebraska": "NE",
    "nevada": "NV",
    "new_hampshire": "NH",
    "new_jersey": "NJ",
    "new_mexico": "NM",
    "new_york": "NY",
    "north_carolina": "NC",
    "north_dakota": "ND",
    "ohio": "OH",
    "oklahoma": "OK",
    "oregon": "OR",
    "pennsylvania": "PA",
    "rhode_island": "RI",
    "south_carolina": "SC",
    "south_dakota": "SD",
    "tennessee": "TN",
    "texas": "TX",
    "utah": "UT",
    "vermont": "VT",
    "virginia": "VA",
    "washington": "WA",
    "west_virginia": "WV",
    "wisconsin": "WI",
    "wyoming": "WY"
}

# Sort states in descending order by length.
states = sorted(list(state_abbrev.keys()), key=len, reverse=True)

# Target final columns.
target_order = [
    "FIPS",
    "State",
    "County",
    "Average Life Expectancy (years)",
    "Days of Poor Physical Health (days/month)",
    "Days of Poor Mental Health (days/month)",
    "Students Graduating from High School (%)",
    "Some College (%)",
    "Children in Poverty (%)",
    "Limited Access to Healthy Foods (%)",
    "Physically Inactive (%)",
    "Insufficient Sleep (%)",
    "Primary Care Doctor Rate (doctors/100,000)",
    "Mental Health Providers (providers/ 100,000)",
    "Median Household Income ($)",
    "Homeowners (%)",
    "Rural Living (%)",
    "Non-Hispanic Black (%)",
    "Asian (%)",
    "Hispanic (%)",
    "Non-Hispanic White (%)",
    "Population",
    "Motor Vehicle Death Rate (deaths/100,000 people)",
    "Drug Overdose Death Rate (deaths/100,000 people)",
    "Broadband Access (%)",
    "Teen Birth Rate (births/per teens)",
    "Firearm Death Rate (deaths/ 100,000 people)",
    "Juvenile Arrest Rate (arrests/ 1,000 juveniles)",
    "Severe Housing Problems (%)",
    "Proficient in English (%)",
    "Air Pollution (fine particulate matter in micrograms/cubic meter of air)",
    "Smokers (%)",
    "Youth Not in School or Employment (%)"
]

def get_candidate_dict(isNew):
    if isNew:
        cd = {
            "FIPS": ["FIPS", "FIPS Code"],
            "State": [],
            "County": ["County", "County Name", "Borough", "Parish"],
            "Average Life Expectancy (years)": ["Average Life Expectancy (years)", "Life Expectancy"],
            "Days of Poor Physical Health (days/month)": ["Average Number of Physically Unhealthy Days"],
            "Days of Poor Mental Health (days/month)": ["Average Number of Mentally Unhealthy Days"],
            "Students Graduating from High School (%)": [
                "Students Graduating from High School (%)", 
                "High School Graduation Rate", 
                "AFGR"
            ],
            "Some College (%)": ["Some College (%)", "% Some College", "# Some College", "Some College", "PSED"],
            "Children in Poverty (%)": ["Children in Poverty (%)", "% Children in Poverty"],
            "Limited Access to Healthy Foods (%)": [
                "% Limited Access", 
                "Limited Access to Healthy Foods (%)", 
                "Limited Access to Healthy Foods", 
                "% Healthy Food",
                "% Limited Access to Healthy Foods"
            ],
            "Physically Inactive (%)": [
                "Physically Inactive (%)", "% Physically Inactive", "Physically Inactive", "Physical Inactivity"
            ],
            "Insufficient Sleep (%)": [
                "Insufficient Sleep (%)", "% Insufficient Sleep", "Insufficient Sleep"
            ],
            "Primary Care Doctor Rate (doctors/100,000)": [
                "Primary Care Doctor Rate (doctors/100,000)", "# Primary Care Physicians"
            ],
            "Mental Health Providers (providers/ 100,000)": [
                "Mental Health Providers (providers/ 100,000)",
                "Mental Health Provider Rate",
                "MHP Rate (Mental Health Provider)",
                "MHP Rate",
                "MHP Rate.1",
                "MPH Rate"
            ],
            "Median Household Income ($)": [
                "Median Household Income ($)", "Median Household Income", "Household Income"
            ],
            "Homeowners (%)": ["Homeowners (%)", "% Homeowners"],
            "Rural Living (%)": ["Rural Living (%)", "% Rural", "Rural"],
            "Non-Hispanic Black (%)": [
                "% Non-Hispanic Black", "Non-Hispanic Black (%)", "Non-Hispanic Black",
                "% Black", "Black (%)", "Black", "African American (%)", "African American", "Percent Non-Hispanic Black"
            ],
            "Asian (%)": ["Asian (%)", "% Asian", "Asian"],
            "Hispanic (%)": ["Hispanic (%)", "% Hispanic", "Hispanic"],
            "Non-Hispanic White (%)": [
                "Non-Hispanic White (%)", "% Non-Hispanic White", "% Non-Hispanic white", "Non-Hispanic White"
            ],
            "Population": ["Population", "Population_x", "Population_y"],
            "Motor Vehicle Death Rate (deaths/100,000 people)": [
                "MV Mortality Rate",
                "Motor Vehicle Death Rate (deaths/100,000)",
                "Motor Vehicle Death Rate (deaths/100,000 people)",
                "MV Death Rate",
                "Motor Vehicle Mortality Rate"
            ],
            "Drug Overdose Death Rate (deaths/100,000 people)": [
                "Drug Overdose Death Rate (deaths/100,000 people)",
                "Drug Overdose Mortality Rate",
                "Drug Poisoning Mortality Rate"
            ],
            "Broadband Access (%)": [
                "% Households with Broadband Access",
                "Households with Broadband Access (%)",
                "Broadband Access",
                "% Broadband Access",
                "# Households with Broadband Access"
            ],
            "Teen Birth Rate (births/per teens)": [
                "Teen Birth Rate", "Teen Birth Rate (births/per teens)"
            ],
            "Firearm Death Rate (deaths/ 100,000 people)": [
                "Firearm Fatalities Rate", "Firearm Fatalities"
            ],
            "Juvenile Arrest Rate (arrests/ 1,000 juveniles)": ["Juvenile Arrest Rate"],
            "Severe Housing Problems (%)": [
                "Severe Housing Problems (%)", "Severe Housing Problems", "% Severe Housing Problems", "% high housing costs"
            ],
            "Proficient in English (%)": [
                "Proficient in English (%)", "Proficient in English", "English Proficiency", "% Not Proficient in English"
            ],
            "Air Pollution (fine particulate matter in micrograms/cubic meter of air)": [
                "Air Pollution (fine particulate matter in micrograms/cubic meter of air)",
                "Average Daily PM2.5",
                "Average daily PM25",
                "PM Days"
            ],
            "Smokers (%)": [
                "% Smokers", "Current Smokers (%)", "Smokers (%)", "% Adults Reporting Currently Smoking"
            ],
            "Youth Not in School or Employment (%)": [
                "% Disconnected Youth", "Youth Not in School or Employment",
                "Youth Not in School or Employment (%)", "Not in School or Employment (%)"
            ]
        }
    else:
        cd = {
            "FIPS": ["FIPS", "FIPS Code"],
            "State": [],
            "County": ["County", "County Name", "Borough", "Parish"],
            "Average Life Expectancy (years)": ["Average Life Expectancy (years)", "Life Expectancy"],
            "Days of Poor Physical Health (days/month)": ["Physically Unhealthy Days"],
            "Days of Poor Mental Health (days/month)": ["Mentally Unhealthy Days"],
            "Students Graduating from High School (%)": [
                "Graduation Rate", "AFGR"
            ],
            "Some College (%)": [
                "Some College (%)", "% Some College", "# Some College", "Some College", "PSED"
            ],
            "Children in Poverty (%)": ["Children in Poverty (%)", "% Children in Poverty"],
            "Limited Access to Healthy Foods (%)": [
                "% Limited Access", "Limited Access to Healthy Foods (%)", "Limited Access to Healthy Foods", "% Healthy Food", "% Limited Access to Healthy Foods"
            ],
            "Physically Inactive (%)": [
                "Physically Inactive (%)", "% Physically Inactive", "Physically Inactive", "Physical Inactivity"
            ],
            "Insufficient Sleep (%)": ["Insufficient Sleep (%)", "% Insufficient Sleep", "Insufficient Sleep"],
            "Primary Care Doctor Rate (doctors/100,000)": [
                "Primary Care Doctor Rate (doctors/100,000)",
                "# Primary Care Physicians",
                "PCP Rate (Primary Care Physician)",
                "PCP Rate"
            ],
            "Mental Health Providers (providers/ 100,000)": [
                "Mental Health Providers (providers/ 100,000)",
                "Mental Health Provider Rate",
                "MHP Rate (Mental Health Provider)",
                "MHP Rate",
                "MHP Rate.1",
                "MPH Rate"
            ],
            "Median Household Income ($)": [
                "Household Income", "Median Household Income", "Median Household Income ($)"
            ],
            "Homeowners (%)": ["Homeowners (%)", "% Homeowners"],
            "Rural Living (%)": ["Rural Living (%)", "% Rural", "Rural"],
            "Non-Hispanic Black (%)": [
                "% Non-Hispanic Black", "Non-Hispanic Black (%)", "Non-Hispanic Black",
                "% Black", "Black (%)", "Black", "African American (%)", "African American", "Percent Non-Hispanic Black"
            ],
            "Asian (%)": ["Asian (%)", "% Asian", "Asian"],
            "Hispanic (%)": ["Hispanic (%)", "% Hispanic", "Hispanic"],
            "Non-Hispanic White (%)": [
                "Non-Hispanic White (%)", "% Non-Hispanic White", "% Non-Hispanic white", "Non-Hispanic White"
            ],
            "Population": ["Population", "Population_x", "Population_y"],
            "Motor Vehicle Death Rate (deaths/100,000 people)": [
                "MV Mortality Rate",
                "Motor Vehicle Death Rate (deaths/100,000)",
                "Motor Vehicle Death Rate (deaths/100,000 people)",
                "MV Death Rate",
                "Motor Vehicle Mortality Rate"
            ],
            "Drug Overdose Death Rate (deaths/100,000 people)": [
                "Drug Overdose Death Rate (deaths/100,000 people)",
                "Drug Overdose Mortality Rate",
                "Drug Poisoning Mortality Rate"
            ],
            "Broadband Access (%)": [
                "% Households with Broadband Access",
                "Households with Broadband Access (%)",
                "Broadband Access",
                "% Broadband Access",
                "# Households with Broadband Access"
            ],
            "Teen Birth Rate (births/per teens)": ["Teen Birth Rate", "Teen Birth Rate (births/per teens)"],
            "Firearm Death Rate (deaths/ 100,000 people)": [
                "Firearm Fatalities Rate", "Firearm Fatalities"
            ],
            "Juvenile Arrest Rate (arrests/ 1,000 juveniles)": [],
            "Severe Housing Problems (%)": [
                "Severe Housing Problems (%)", "Severe Housing Problems", "% Severe Housing Problems", "% high housing costs"
            ],
            "Proficient in English (%)": [
                "Proficient in English (%)", "Proficient in English", "English Proficiency", "% Not Proficient in English"
            ],
            "Air Pollution (fine particulate matter in micrograms/cubic meter of air)": [
                "Air Pollution (fine particulate matter in micrograms/cubic meter of air)",
                "Average Daily PM2.5",
                "Average daily PM25",
                "PM Days"
            ],
            "Smokers (%)": ["% Smokers", "Current Smokers (%)", "Smokers (%)", "% Adults Reporting Currently Smoking"],
            "Youth Not in School or Employment (%)": [
                "% Disconnected Youth", "Youth Not in School or Employment",
                "Youth Not in School or Employment (%)", "Not in School or Employment (%)"
            ]
        }
    return cd

target_order = [
    "FIPS",
    "State",
    "County",
    "Average Life Expectancy (years)",
    "Days of Poor Physical Health (days/month)",
    "Days of Poor Mental Health (days/month)",
    "Students Graduating from High School (%)",
    "Some College (%)",
    "Children in Poverty (%)",
    "Limited Access to Healthy Foods (%)",
    "Physically Inactive (%)",
    "Insufficient Sleep (%)",
    "Primary Care Doctor Rate (doctors/100,000)",
    "Mental Health Providers (providers/ 100,000)",
    "Median Household Income ($)",
    "Homeowners (%)",
    "Rural Living (%)",
    "Non-Hispanic Black (%)",
    "Asian (%)",
    "Hispanic (%)",
    "Non-Hispanic White (%)",
    "Population",
    "Motor Vehicle Death Rate (deaths/100,000 people)",
    "Drug Overdose Death Rate (deaths/100,000 people)",
    "Broadband Access (%)",
    "Teen Birth Rate (births/per teens)",
    "Firearm Death Rate (deaths/ 100,000 people)",
    "Juvenile Arrest Rate (arrests/ 1,000 juveniles)",
    "Severe Housing Problems (%)",
    "Proficient in English (%)",
    "Air Pollution (fine particulate matter in micrograms/cubic meter of air)",
    "Smokers (%)",
    "Youth Not in School or Employment (%)"
]

def read_sheet_with_header(excel_file, sheet_name):
    df = pd.read_excel(excel_file, sheet_name=sheet_name, header=1)
    df.columns = [str(col).strip() for col in df.columns]
    return df

def process_excel_file(file_path, state, year, output_csv_dir, isNew, candidate_dict):
    try:
        xls = pd.ExcelFile(file_path)
    except Exception as e:
        print(f"Error opening {file_path}: {e}")
        return

    # For year 2022, use "Ranked Measure Data" instead of "Select Measure Data".
    if year == "2022":
        if "Ranked Measure Data" in xls.sheet_names:
            primary_sheet = "Ranked Measure Data"
        else:
            print(f"'Ranked Measure Data' not found in {file_path} for 2022")
            return
    else:
        if isNew:
            if "Select Measure Data" in xls.sheet_names:
                primary_sheet = "Select Measure Data"
            else:
                print(f"'Select Measure Data' not found in {file_path}")
                return
        else:
            if "Ranked Measure Data" in xls.sheet_names:
                primary_sheet = "Ranked Measure Data"
            else:
                print(f"'Ranked Measure Data' not found in {file_path}")
                return

    if "Additional Measure Data" in xls.sheet_names:
        add_sheet = "Additional Measure Data"
    else:
        print(f"'Additional Measure Data' not found in {file_path}")
        return

    try:
        df_primary = read_sheet_with_header(file_path, primary_sheet)
        df_add = read_sheet_with_header(file_path, add_sheet)
    except Exception as e:
        print(f"Error reading sheets from {file_path}: {e}")
        return

    for df in [df_primary, df_add]:
        if state == "alaska" and "Borough" in df.columns:
            df.rename(columns={"Borough": "County"}, inplace=True)
        if state == "louisiana" and "Parish" in df.columns:
            df.rename(columns={"Parish": "County"}, inplace=True)
        if "FIPS" not in df.columns and "FIPS Code" in df.columns:
            df.rename(columns={"FIPS Code": "FIPS"}, inplace=True)

    try:
        merged_df = pd.merge(df_primary, df_add, on=["FIPS", "County"], how="left")
    except Exception as e:
        print(f"Error merging sheets in {file_path}: {e}")
        return

    if not isNew:
        merged_df["Broadband Access (%)"] = np.nan

    def find_candidate_column(df, candidates):
        lower_cols = {col.lower(): col for col in df.columns}
        for candidate in candidates:
            cand_lower = candidate.lower()
            if cand_lower in lower_cols and df[lower_cols[cand_lower]].notna().any():
                return lower_cols[cand_lower]
        return None

    final_data = {}
    for target_col, candidates in candidate_dict.items():
        if target_col == "State":
            final_data[target_col] = np.repeat(state.title(), merged_df.shape[0])
        elif target_col in ["Broadband Access (%)"]:
            final_data[target_col] = np.nan
        elif target_col == "Juvenile Arrest Rate (arrests/ 1,000 juveniles)":
            if isNew and candidates:
                col = find_candidate_column(merged_df, candidates)
                final_data[target_col] = merged_df[col] if col else np.nan
            else:
                final_data[target_col] = np.nan
        elif target_col == "Motor Vehicle Death Rate (deaths/100,000 people)":
            col = find_candidate_column(merged_df, candidates)
            final_data[target_col] = merged_df[col] if col else np.nan
        elif target_col == "Limited Access to Healthy Foods (%)":
            col = find_candidate_column(merged_df, candidates)
            if col and col.lower() == "% healthy food":
                final_data[target_col] = 100 - merged_df[col]
            else:
                final_data[target_col] = merged_df[col] if col else np.nan
        else:
            col = find_candidate_column(merged_df, candidates)
            final_data[target_col] = merged_df[col] if col else np.nan

    final_df = pd.DataFrame(final_data)
    final_df = final_df[[col for col in target_order if col in final_df.columns]]
    
    if "County" in final_df.columns:
        final_df = final_df[final_df["County"].notna() & (final_df["County"].astype(str).str.strip() != "")]
    
    abbrev = state_abbrev.get(state, "XX")
    output_filename = f"{year}-CountyHealth-{abbrev}.csv"
    output_path = os.path.join(output_csv_dir, output_filename)
    final_df.to_csv(output_path, index=False)
    print(f"Processed {state.title()} from {file_path} and saved curated CSV to {output_path}")

def main():
    parser = argparse.ArgumentParser(
        description="Process County Health Rankings Excel files for a given year and output curated CSV files."
    )
    parser.add_argument("year", type=str, help="Four-digit year (e.g., 2014, 2019, or 2022)")
    args = parser.parse_args()
    year = args.year
    if len(year) != 4 or not year.isdigit():
        parser.error("Year must be a four-digit number (e.g., 2014)")
    
    isNew = int(year) >= 2020
    candidate_dict = get_candidate_dict(isNew)
    
    raw_folder = os.path.join("..", year, "raw")
    output_csv_dir = os.path.join("..", year, "csv")
    os.makedirs(output_csv_dir, exist_ok=True)
    
    files = glob.glob(os.path.join(raw_folder, "*.xls*"))
    if not files:
        print(f"No Excel files found in {raw_folder}")
        return
    
    for file_path in files:
        file_lower = os.path.basename(file_path).lower()
        normalized_filename = file_lower.replace("_", " ").replace("-", " ")
        matched_state = None
        for s in states:
            s_norm = s.replace("_", " ")
            if re.search(rf'\b{s_norm}\b', normalized_filename):
                matched_state = s
                break
        if not matched_state:
            print(f"Could not determine state for file: {file_path}")
            continue
        process_excel_file(file_path, matched_state, year, output_csv_dir, isNew, candidate_dict)

if __name__ == "__main__":
    main()
