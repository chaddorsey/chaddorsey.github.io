#!/usr/bin/env python3
import os
import argparse
import pandas as pd
import sys

def read_sheet_with_header(excel_file, sheet_name):
    """Read an Excel sheet using row 1 as header and strip whitespace from column names."""
    df = pd.read_excel(excel_file, sheet_name=sheet_name, header=1)
    df.columns = [str(col).strip() for col in df.columns]
    return df

def main():
    parser = argparse.ArgumentParser(
        description="Merge 'Ranked Measure Data' (or 'Select Measure Data') with 'Additional Measure Data' from an Excel file and output as CSV."
    )
    parser.add_argument("input", help="Input Excel file")
    parser.add_argument("output", help="Output CSV file")
    args = parser.parse_args()

    # Open the Excel file.
    try:
        xls = pd.ExcelFile(args.input)
    except Exception as e:
        sys.exit(f"Error opening Excel file {args.input}: {e}")

    # Determine the primary sheet.
    if "Ranked Measure Data" in xls.sheet_names:
        primary_sheet = "Ranked Measure Data"
    elif "Select Measure Data" in xls.sheet_names:
        primary_sheet = "Select Measure Data"
    else:
        sys.exit("Error: Neither 'Ranked Measure Data' nor 'Select Measure Data' found in the Excel file.")

    # Check for the additional sheet.
    if "Additional Measure Data" not in xls.sheet_names:
        sys.exit("Error: 'Additional Measure Data' not found in the Excel file.")

    # Read the two sheets.
    try:
        df_primary = read_sheet_with_header(args.input, primary_sheet)
        df_add = read_sheet_with_header(args.input, "Additional Measure Data")
    except Exception as e:
        sys.exit(f"Error reading sheets from {args.input}: {e}")

    # Merge on the key columns "FIPS" and "County".
    try:
        merged_df = pd.merge(df_primary, df_add, on=["FIPS", "County"], how="left")
    except Exception as e:
        sys.exit(f"Error merging sheets: {e}")

    # Output the merged DataFrame to CSV.
    try:
        merged_df.to_csv(args.output, index=False)
        print(f"Successfully merged sheets and saved output to {args.output}")
    except Exception as e:
        sys.exit(f"Error writing CSV file {args.output}: {e}")

if __name__ == "__main__":
    main()
