import pandas as pd

# Path to the Excel file (update the path if necessary)
excel_file = "2025_county_health_rankings_alabama_data_-_v1.xlsx"

# --- Step 1: Read the Excel file without a header to inspect all rows ---
df_raw = pd.read_excel(excel_file, header=None)
print("Preview of raw Excel data (first 10 rows):")
print(df_raw.head(10))

# --- Step 2: Automatically detect the header row ---
# Loop through the rows to find a row that contains "County Name"
header_row = None
for idx, row in df_raw.iterrows():
    # Convert all cell values to string and check if any cell contains "County Name"
    if row.astype(str).str.contains("County Name", case=False, na=False).any():
        header_row = idx
        print(f"Found header row at index: {idx}")
        break

if header_row is None:
    raise ValueError("Could not find a header row containing 'County Name'.")

# --- Step 3: Reload the Excel file using the detected header row ---
df = pd.read_excel(excel_file, header=header_row)
print("Detected columns:", df.columns.tolist())

# --- Step 4: Clean and Transform the Data ---
# Strip any extra spaces from the column names
df.columns = [col.strip() if isinstance(col, str) else col for col in df.columns]

# Define a mapping to rename columns to match the desired CSV format.
# Adjust the keys/values as needed based on the actual column names.
rename_map = {
    "County Name": "County",
    "FIPS Code": "FIPS",
    "Overall Health Ranking": "Health_Rank",
    "Overall Health Score": "Health_Score",
    # Add additional column mappings if necessary...
}

# Rename columns (only those present in the DataFrame)
df = df.rename(columns={k: v for k, v in rename_map.items() if k in df.columns})
print("Columns after renaming:", df.columns.tolist())

# Optionally, drop rows without a valid 'County' value (if that column exists)
if "County" in df.columns:
    df = df.dropna(subset=["County"])

# --- Step 5: Write the Transformed Data to CSV ---
csv_file = "CountyHealth-AL.csv"
df.to_csv(csv_file, index=False)
print(f"Transformed data saved to {csv_file}")
