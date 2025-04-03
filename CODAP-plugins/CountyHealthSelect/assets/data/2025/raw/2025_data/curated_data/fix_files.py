import os
import glob
import re
import pandas as pd

# Dictionary mapping state names (from the filename, in lowercase with underscores) to abbreviations.
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

# Pattern to match the curated CSV files.
pattern = "2025_county_health_rankings_*_curated.csv"
files = glob.glob(pattern)

print(f"Found {len(files)} files to process.")

for file in files:
    print(f"\nProcessing file: {file}")
    df = pd.read_csv(file)
    
    # Remove unwanted columns if they exist.
    columns_to_drop = ["Juvenile Arrest Rate (arrests/ 1,000 juveniles)", "Youth Not in School or Employment (%)"]
    df.drop(columns=[col for col in columns_to_drop if col in df.columns], inplace=True)
    
    # Extract the state name from the filename.
    # Expected filename format: 2025_county_health_rankings_<state>_curated.csv
    basename = os.path.basename(file)
    m = re.search(r"2025_county_health_rankings_([^_]+)_curated\.csv", basename)
    if m:
        state_name = m.group(1).lower()  # e.g., "wyoming"
        abbrev = state_abbrev.get(state_name, "XX")
    else:
        abbrev = "XX"
    
    # New filename: 2025_CountyHealthXX.csv
    new_filename = f"2025_CountyHealth{abbrev}.csv"
    new_filepath = os.path.join(os.path.dirname(file), new_filename)
    
    # Save the modified DataFrame with the new name.
    df.to_csv(new_filepath, index=False)
    print(f"Saved renamed file: {new_filepath}")
