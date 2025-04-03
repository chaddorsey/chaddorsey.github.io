import os
import glob
import re
import pandas as pd
import numpy as np

# --- Configuration ---

# Pattern to match the Excel files
file_pattern = "2025_county_health_rankings_*_data_-_v1.xlsx"

# Output subfolder for curated CSV files
output_folder = "curated_data"
os.makedirs(output_folder, exist_ok=True)

# Target final column order
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

# --- Candidate source columns for each target ---
target_candidates = {
    "FIPS": ["FIPS"],
    "State": [],  # Will be filled with constant below.
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
    "Firearm Death Rate (deaths/ 100,000 people)": ["Firearm Death Rate (deaths/ 100,000 people)"],
    "Juvenile Arrest Rate (arrests/ 1,000 juveniles)": ["Juvenile Arrest Rate", "Juvenile Arrest Rate (arrests/ 1,000 juveniles)", "Juvenile Arrest Rate_y"],
    "Severe Housing Problems (%)": ["% Severe Housing Problems", "Severe Housing Problems (%)", "Severe Housing Problems", "Severe Housing Cost Burden (%)"],
    "Proficient in English (%)": ["Proficient in English (%)", "Proficient in English", "English Proficiency", "% Not Proficient in English"],
    "Air Pollution (fine particulate matter in micrograms/cubic meter of air)": ["Air Pollution (fine particulate matter in micrograms/cubic meter of air)", "Average Daily PM2.5"],
    "Smokers (%)": ["% Adults Reporting Currently Smoking", "Smokers (%)"],
    "Youth Not in School or Employment (%)": ["Youth Not in School or Employment", "Youth Not in School or Employment (%)", "Youth Not in School or Employment_y"]
}

# --- Helper function: read an Excel sheet with header detection ---
def read_sheet_with_header(excel_file, sheet_name, search_term="County"):
    # Read sheet without header
    df_raw = pd.read_excel(excel_file, sheet_name=sheet_name, header=None)
    header_row = 0
    # Look for a row that contains the search_term (case-insensitive)
    for idx, row in df_raw.iterrows():
        if row.astype(str).str.contains(search_term, case=False, na=False).any():
            header_row = idx
            break
    df = pd.read_excel(excel_file, sheet_name=sheet_name, header=header_row)
    df.columns = [str(col).strip() for col in df.columns]
    return df

# --- Known renaming maps for each sheet ---
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

# --- Process each Excel file ---
excel_files = glob.glob(file_pattern)
print(f"Found {len(excel_files)} Excel files.")

for file_path in excel_files:
    print(f"\nProcessing {file_path} ...")
    
    # Extract state from filename using regex
    m = re.search(r"2025_county_health_rankings_([^_]+)_data_-_v1\.xlsx", os.path.basename(file_path))
    state_raw = m.group(1) if m else "Unknown"
    state = state_raw.title()  # e.g. 'Alabama'
    
    # Read the two sheets with header detection
    try:
        df_select = read_sheet_with_header(file_path, "Select Measure Data", search_term="County")
        df_additional = read_sheet_with_header(file_path, "Additional Measure Data", search_term="County")
    except Exception as e:
        print(f"Error reading sheets in {file_path}: {e}")
        continue

    # Clean and rename columns in the Select sheet
    df_select.columns = [col.strip() for col in df_select.columns]
    df_select = df_select.rename(columns=lambda c: select_rename_map.get(c, c))
    
    # Clean and rename columns in the Additional sheet
    df_additional.columns = [col.strip() for col in df_additional.columns]
    df_additional = df_additional.rename(columns=lambda c: additional_rename_map.get(c, c))
    
    # Ensure required keys exist in both dataframes
    required_keys = ["FIPS", "County"]
    skip_file = False
    for key in required_keys:
        if key not in df_select.columns or key not in df_additional.columns:
            print(f"Skipping {file_path} due to missing key column: {key}")
            skip_file = True
    if skip_file:
        continue

    # Merge the two sheets (left join on Select)
    merged_df = pd.merge(df_select, df_additional, on=["FIPS", "County"], how="left")
    
    # --- Build the final curated DataFrame using candidate mapping ---
    final_data = {}
    for target_col, candidates in target_candidates.items():
        if target_col == "State":
            final_data[target_col] = np.repeat(state, merged_df.shape[0])
        else:
            found = False
            for candidate in candidates:
                if candidate in merged_df.columns and merged_df[candidate].notna().any():
                    # Special handling for "% Not Proficient in English"
                    if candidate == "% Not Proficient in English":
                        final_data[target_col] = 100 - merged_df[candidate]
                    else:
                        final_data[target_col] = merged_df[candidate]
                    found = True
                    break
            if not found:
                final_data[target_col] = np.nan

    final_df = pd.DataFrame(final_data)
    
    # Reorder columns according to target_order (only keep those that exist)
    final_df = final_df[[col for col in target_order if col in final_df.columns]]
    
    # Determine output filename (e.g., "2025_county_health_rankings_alabama_curated.csv")
    output_filename = f"2025_county_health_rankings_{state_raw}_curated.csv"
    output_path = os.path.join(output_folder, output_filename)
    
    # Save the final curated CSV
    final_df.to_csv(output_path, index=False)
    print(f"Saved curated data for {state} to {output_path}")
