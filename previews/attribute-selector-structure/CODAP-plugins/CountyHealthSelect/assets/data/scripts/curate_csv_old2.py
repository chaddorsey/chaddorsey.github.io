#!/usr/bin/env python3
import os
import re
import glob
import argparse
import pandas as pd

# Mapping of full lower-case state names (with underscores for multiword names) to their abbreviations.
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

def main():
    parser = argparse.ArgumentParser(
        description="Process merged County Health Rankings CSV files and output final files."
    )
    parser.add_argument("year", type=str, help="Four-digit year (e.g., 2021)")
    args = parser.parse_args()
    year = args.year
    if len(year) != 4 or not year.isdigit():
        parser.error("Year must be a four-digit number (e.g., 2021)")

    # Input folder (merged CSV files) and output folder.
    input_folder = os.path.join("..", year, "csv")
    output_folder = os.path.join("..", year, "final")
    os.makedirs(output_folder, exist_ok=True)
    
    # Look for CSV files in the input folder.
    files = glob.glob(os.path.join(input_folder, "*.csv"))
    if not files:
        print(f"No CSV files found in {input_folder}")
        return
    
    # Process each CSV file.
    for file_path in files:
        base = os.path.basename(file_path)
        # Expected input filename format: "YYYY_county_health_rankings_STATE_curated.csv"
        # Normalize the filename: replace underscores and hyphens with spaces.
        normalized = base.lower().replace("_", " ").replace("-", " ")
        matched_state = None
        # Loop through state_abbrev keys (which are already in lower-case with underscores)
        for s in state_abbrev:
            s_norm = s.replace("_", " ")
            # Use word-boundary matching to avoid partial matches.
            if re.search(rf'\b{s_norm}\b', normalized):
                matched_state = s
                break
        
        if not matched_state:
            print(f"Could not determine state for file: {file_path}")
            continue
        
        # Read the input CSV.
        try:
            df = pd.read_csv(file_path)
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            continue

        # Create the new filename: "YYYY_CountyHealthXX.csv"
        abbrev = state_abbrev.get(matched_state, "XX")
        new_filename = f"{year}_CountyHealth{abbrev}.csv"
        output_path = os.path.join(output_folder, new_filename)
        
        # (Optional: any further processing on df can be done here.)
        
        # Save the processed file.
        df.to_csv(output_path, index=False)
        print(f"Processed {matched_state.title()} from {file_path} and saved final CSV to {output_path}")

if __name__ == "__main__":
    main()
