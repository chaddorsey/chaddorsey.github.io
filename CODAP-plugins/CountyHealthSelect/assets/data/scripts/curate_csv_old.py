import pandas as pd
import numpy as np

# --- User-defined file paths ---
select_csv = "CountyHealth-AL_Select_Measure_Data.csv"
additional_csv = "CountyHealth-AL_Additional_Measure_Data.csv"
final_csv = "CountyHealth-AL.csv"

# --- Step 1: Load the raw CSV files (auto-detect delimiter) ---
df_select = pd.read_csv(select_csv, sep=None, engine='python')
df_additional = pd.read_csv(additional_csv, sep=None, engine='python')

# Debug: show shapes and first few columns
print("Select DataFrame shape:", df_select.shape)
print("Select DataFrame first 10 columns:", df_select.columns[:10].tolist())
print("Additional DataFrame shape:", df_additional.shape)
print("Additional DataFrame first 10 columns:", df_additional.columns[:10].tolist())

# --- Step 2: Clean column names (strip extra spaces) ---
df_select.columns = [col.strip() for col in df_select.columns]
df_additional.columns = [col.strip() for col in df_additional.columns]

# --- Step 3: Apply known renaming on the raw files ---
# For the Select file:
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
df_select = df_select.rename(columns=lambda c: select_rename_map.get(c, c))

# For the Additional file:
additional_rename_map = {
    "Life Expectancy": "Average Life Expectancy (years)",
    "Firearm Fatalities Rate": "Firearm Death Rate (deaths/ 100,000 people)",
    "Average Daily PM2.5": "Air Pollution (fine particulate matter in micrograms/cubic meter of air)"
}
df_additional = df_additional.rename(columns=lambda c: additional_rename_map.get(c, c))

# --- Step 4: Merge the two DataFrames on common keys ---
required_keys = ["FIPS", "County"]
for key in required_keys:
    if key not in df_select.columns or key not in df_additional.columns:
        raise ValueError(f"Missing required key column '{key}' in one of the input files.")
merged_df = pd.merge(df_select, df_additional, on=["FIPS", "County"], how="left")

# --- Step 5: Define candidate source columns for each target ---
target_candidates = {
    "FIPS": ["FIPS"],
    "State": [],  # Will be filled with constant "Alabama"
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
    "Motor Vehicle Death Rate (deaths/100,000 people)": ["Motor Vehicle Death Rate (deaths/100,000 people)", "Motor Vehicle Mortality Rate", "Motor Vehicle Death Rate (deaths/100,000 people)_x", "Motor Vehicle Death Rate (deaths/100,000 people)_y"],
    "Drug Overdose Death Rate (deaths/100,000 people)": ["Drug Overdose Death Rate (deaths/100,000 people)", "Drug Overdose Mortality Rate", "Drug Overdose Death Rate (deaths/100,000 people)_x", "Drug Overdose Death Rate (deaths/100,000 people)_y"],
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

# --- Step 6: Build the final DataFrame column by column ---
final_data = {}
for target_col, candidates in target_candidates.items():
    if target_col == "State":
        final_data[target_col] = np.repeat("Alabama", merged_df.shape[0])
    else:
        found = False
        for candidate in candidates:
            if candidate in merged_df.columns and merged_df[candidate].notna().any():
                # Special handling: if candidate is "% Not Proficient in English", compute 100 - value.
                if candidate == "% Not Proficient in English":
                    final_data[target_col] = 100 - merged_df[candidate]
                else:
                    final_data[target_col] = merged_df[candidate]
                found = True
                break
        if not found:
            final_data[target_col] = np.nan

final_df = pd.DataFrame(final_data)

# --- Step 7: Ensure the final DataFrame is in the correct target order ---
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
final_df = final_df[target_order]

# --- Step 8: Save the final curated CSV file ---
final_df.to_csv(final_csv, index=False)
print(f"Final curated data saved to {final_csv}")
