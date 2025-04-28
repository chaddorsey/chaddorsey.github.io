#!/usr/bin/env python3
import os
import re
import glob
import argparse
import pandas as pd
import numpy as np

# List of full lower-case state names (using underscores for multiword names)
states = [
    "alabama", "alaska", "arizona", "arkansas", "california", "colorado",
    "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho",
    "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine",
    "maryland", "massachusetts", "michigan", "minnesota", "mississippi",
    "missouri", "montana", "nebraska", "nevada", "new_hampshire", "new_jersey",
    "new_mexico", "new_york", "north_carolina", "north_dakota", "ohio",
    "oklahoma", "oregon", "pennsylvania", "rhode_island", "south_carolina",
    "south_dakota", "tennessee", "texas", "utah", "vermont", "virginia",
    "washington", "west_virginia", "wisconsin", "wyoming"
]

# Target final columns (order as desired)
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

# Candidate source columns for each target column.
target_candidates = {
    "FIPS": ["FIPS"],
    "State": [],  # Will be filled with constant value.
    "County": ["County"],
    "Average Life Expectancy (years)": ["Average Life Expectancy (years)", "Life Expectancy"],
    "Days of Poor Physical Health (days/month)": ["Days of Poor Physical Health (days/month)", "Average Number of Physically Unhealthy Days"],
    "Days of Poor Mental Health (days/month)": ["Days of Poor Mental Health (days/month)", "Average Number of Mentally Unhealthy Days"],
    "Students Graduating from High School (%)": ["Students Graduating from High School (%)", "High School Graduation Rate"],
    "Some College (%)": ["Some College (%)", "% Some College", "# Some College", "Some College"],
    "Children in Poverty (%)": ["Children in Poverty (%)", "% Children in Poverty"],
    "Limited Access to Healthy Foods (%)": ["Limited Access to Healthy Foods (%)", "% Limited Access to Healthy Foods", "# Limited Access to Healthy Foods", "Limited Access to Healthy Foods"],
    "Physically Inactive (%)": ["Physically Inactive (%)", "% Physically Inactive", "Physically Inactive"],
    "Insufficient Sleep (%)": ["Insufficient Sleep (%)", "% Insufficient Sleep", "Insufficient Sleep"],
    "Primary Care Doctor Rate (doctors/100,000)": ["Primary Care Doctor Rate (doctors/100,000)", "# Primary Care Physicians"],
    "Mental Health Providers (providers/ 100,000)": ["Mental Health Providers (providers/ 100,000)", "Mental Health Provider Rate", "# Mental Health Providers"],
    "Median Household Income ($)": ["Median Household Income ($)", "Median Household Income"],
    "Homeowners (%)": ["Homeowners (%)", "% Homeowners"],
    "Rural Living (%)": ["Rural Living (%)", "% Rural"],
    "Non-Hispanic Black (%)": ["Non-Hispanic Black (%)", "% Non-Hispanic Black"],
    "Asian (%)": ["Asian (%)", "% Asian"],
    "Hispanic (%)": ["Hispanic (%)", "% Hispanic"],
    "Non-Hispanic White (%)": ["Non-Hispanic White (%)", "% Non-Hispanic White"],
    "Population": ["Population", "Population_x", "Population_y"],
    "Motor Vehicle Death Rate (deaths/100,000 people)": [
        "Motor Vehicle Death Rate (deaths/100,000 people)",
        "Motor Vehicle Mortality Rate",
        "Motor Vehicle Death Rate (deaths/100,000 people)_x",
        "Motor Vehicle Death Rate (deaths/100,000 people)_y"
    ],
    "Drug Overdose Death Rate (deaths/100,000 people)": [
        "Drug Overdose Death Rate (deaths/100,000 people)",
        "Drug Overdose Mortality Rate",
        "Drug Overdose Death Rate (deaths/100,000 people)_x",
        "Drug Overdose Death Rate (deaths/100,000 people)_y"
    ],
    "Broadband Access (%)": ["% Households with Broadband Access", "# Households with Broadband Access", "Broadband Access", "Households with Broadband Access (%)"],
    "Teen Birth Rate (births/per teens)": ["Teen Birth Rate", "Teen Birth Rate (births/per teens)"],
    "Firearm Death Rate (deaths/ 100,000 people)": ["Firearm Death Rate (deaths/100,000 people)"],
    "Juvenile Arrest Rate (arrests/ 1,000 juveniles)": ["Juvenile Arrest Rate", "Juvenile Arrest Rate (arrests/ 1,000 juveniles)", "Juvenile Arrest Rate_y"],
    "Severe Housing Problems (%)": ["% Severe Housing Problems", "Severe Housing Problems (%)", "Severe Housing Problems", "Severe Housing Cost Burden (%)"],
    "Proficient in English (%)": ["Proficient in English (%)", "Proficient in English", "English Proficiency", "% Not Proficient in English"],
    "Air Pollution (fine particulate matter in micrograms/cubic meter of air)": ["Air Pollution (fine particulate matter in micrograms/cubic meter of air)", "Average Daily PM2.5"],
    "Smokers (%)": ["% Adults Reporting Currently Smoking", "Smokers (%)"],
    "Youth Not in School or Employment (%)": ["Youth Not in School or Employment", "Youth Not in School or Employment (%)", "Youth Not in School or Employment_y"]
}

def read_sheet_with_header(excel_file, sheet_name, search_term="County"):
    df_raw = pd.read_excel(excel_file, sheet_name=sheet_name, header=None)
    header_row = 0
    for idx, row in df_raw.iterrows():
        if row.astype(str).str.contains(search_term, case=False, na=False).any():
            header_row = idx
            break
    df = pd.read_excel(excel_file, sheet_name=sheet_name, header=header_row)
    df.columns = [str(col).strip() for col in df.columns]
    return df

def process_excel_file(file_path, state, year, output_csv_dir):
    # Determine which sheet to use for select data.
    try:
        xls = pd.ExcelFile(file_path)
    except Exception as e:
        print(f"Error opening {file_path}: {e}")
        return
    
    # For "select" data, try "Select Measure Data" first, then "Ranked Measure Data".
    select_sheet = None
    if "Select Measure Data" in xls.sheet_names:
        select_sheet = "Select Measure Data"
    elif "Ranked Measure Data" in xls.sheet_names:
        select_sheet = "Ranked Measure Data"
    else:
        print(f"Neither 'Select Measure Data' nor 'Ranked Measure Data' found in {file_path}")
        return

    # For additional data, we expect "Additional Measure Data".
    additional_sheet = "Additional Measure Data"
    if additional_sheet not in xls.sheet_names:
        print(f"'{additional_sheet}' not found in {file_path}")
        return

    try:
        df_select = read_sheet_with_header(file_path, select_sheet, search_term="County")
        df_additional = read_sheet_with_header(file_path, additional_sheet, search_term="County")
    except Exception as e:
        print(f"Error reading sheets from {file_path}: {e}")
        return

    select_rename_map = {
        "Average Number of Physically Unhealthy Days": "Days of Poor Physical Health (days/month)",
        "Average Number of Mentally Unhealthy Days": "Days of Poor Mental Health (days/month)",
        "High School Graduation Rate": "Students Graduating from High School (%)",
        "% Some College": "Some College (%)",
        "% Children in Poverty": "Children in Poverty (%)",
        "% Limited Access to Healthy Foods": "Limited Access to Healthy Foods (%)",
        "% Physically Inactive": "Physically Inactive (%)",
        "% Insufficient Sleep": "Insufficient Sleep (%)",
        "Primary Care Doctor Rate (doctors/100,000)": "Primary Care Doctor Rate (doctors/100,000)",
        "Mental Health Provider Rate": "Mental Health Providers (providers/ 100,000)",
        "Median Household Income": "Median Household Income ($)",
        "% Homeowners": "Homeowners (%)",
        "% Rural": "Rural Living (%)",
        "% Non-Hispanic Black": "Non-Hispanic Black (%)",
        "% Asian": "Asian (%)",
        "% Hispanic": "Hispanic (%)",
        "% Non-Hispanic White": "Non-Hispanic White (%)"
    }
    additional_rename_map = {
        "Life Expectancy": "Average Life Expectancy (years)",
        "Firearm Fatalities Rate": "Firearm Death Rate (deaths/ 100,000 people)",
        "Average Daily PM2.5": "Air Pollution (fine particulate matter in micrograms/cubic meter of air)"
    }
    df_select = df_select.rename(columns=lambda c: select_rename_map.get(c, c))
    df_additional = df_additional.rename(columns=lambda c: additional_rename_map.get(c, c))
    
    required_keys = ["FIPS", "County"]
    for key in required_keys:
        if key not in df_select.columns or key not in df_additional.columns:
            print(f"Skipping {file_path} due to missing key column: {key}")
            return
    merged_df = pd.merge(df_select, df_additional, on=["FIPS", "County"], how="left")
    
    final_data = {}
    for target_col, candidates in target_candidates.items():
        if target_col == "State":
            final_data[target_col] = np.repeat(state.title(), merged_df.shape[0])
        else:
            found = False
            for candidate in candidates:
                if candidate in merged_df.columns and merged_df[candidate].notna().any():
                    if candidate == "% Not Proficient in English":
                        final_data[target_col] = 100 - merged_df[candidate]
                    else:
                        final_data[target_col] = merged_df[candidate]
                    found = True
                    break
            if not found:
                final_data[target_col] = np.nan

    final_df = pd.DataFrame(final_data)
    final_df = final_df[[col for col in target_order if col in final_df.columns]]
    
    output_filename = f"{year}_county_health_rankings_{state}_curated.csv"
    output_path = os.path.join(output_csv_dir, output_filename)
    final_df.to_csv(output_path, index=False)
    print(f"Processed {state.title()} from {file_path} and saved curated CSV to {output_path}")

def main():
    parser = argparse.ArgumentParser(
        description="Process raw County Health Rankings Excel files for a given year and output curated CSV files."
    )
    parser.add_argument("year", type=str, help="Four-digit year (e.g., 2021)")
    args = parser.parse_args()
    year = args.year
    if len(year) != 4 or not year.isdigit():
        parser.error("Year must be a four-digit number (e.g., 2021)")
    
    raw_folder = os.path.join("..", year, "raw")
    output_csv_dir = os.path.join("..", year, "csv")
    os.makedirs(output_csv_dir, exist_ok=True)
    
    files = glob.glob(os.path.join(raw_folder, "*.xls*"))
    if not files:
        print(f"No Excel files found in {raw_folder}")
        return
    
    for file_path in files:
        # Normalize the filename: replace underscores and hyphens with spaces.
        file_lower = os.path.basename(file_path).lower()
        normalized_filename = file_lower.replace("_", " ").replace("-", " ")
        matched_state = None
        for s in states:
            s_norm = s.replace("_", " ")
            if s_norm in normalized_filename:
                matched_state = s
                break
        if not matched_state:
            print(f"Could not determine state for file: {file_path}")
            continue
        process_excel_file(file_path, matched_state, year, output_csv_dir)

if __name__ == "__main__":
    main()
