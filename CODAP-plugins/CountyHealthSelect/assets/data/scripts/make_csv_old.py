import pandas as pd
import os

def detect_header_row(df_raw, search_terms):
    """
    Scans the raw DataFrame (with no header) for any row that contains one of the search_terms.
    Returns the index of the first matching row or None if not found.
    """
    for idx, row in df_raw.iterrows():
        # Check each term; if any appear in the row, assume it's the header row.
        for term in search_terms:
            if row.astype(str).str.contains(term, case=False, na=False).any():
                return idx
    return None

# --- User-defined variables ---
# Path to the Excel file (update as needed)
excel_file = "2025_county_health_rankings_alabama_data_-_v1.xlsx"
# Base prefix for output CSV files
output_prefix = "CountyHealth-AL"
# List of sheets to extract
target_sheets = ["Select Measure Data", "Additional Measure Data"]
# Terms to search for when auto-detecting the header row
header_search_terms = ["County Name", "County"]

# Ensure the Excel file exists
if not os.path.exists(excel_file):
    raise FileNotFoundError(f"Excel file '{excel_file}' not found.")

# Load the Excel file to see which sheets are available
xls = pd.ExcelFile(excel_file)
print("Available sheets in the Excel file:", xls.sheet_names)

# Process each target sheet
for sheet in target_sheets:
    if sheet in xls.sheet_names:
        print(f"\nProcessing sheet: {sheet}")
        # Read the sheet without a header so we can inspect all rows
        df_raw = pd.read_excel(excel_file, sheet_name=sheet, header=None)
        
        # Automatically detect the header row using the specified search terms
        header_row = detect_header_row(df_raw, header_search_terms)
        if header_row is None:
            print(f"Warning: Could not detect header row for sheet '{sheet}'. Using default header row 0.")
            header_row = 0
        else:
            print(f"Detected header row at index: {header_row} for sheet '{sheet}'")
        
        # Reload the sheet with the detected header row
        df = pd.read_excel(excel_file, sheet_name=sheet, header=header_row)
        
        # Clean up column names: strip extra spaces
        df.columns = [col.strip() if isinstance(col, str) else col for col in df.columns]
        
        # Build an output CSV filename by replacing spaces with underscores
        csv_filename = f"{output_prefix}_{sheet.replace(' ', '_')}.csv"
        df.to_csv(csv_filename, index=False)
        print(f"Saved sheet '{sheet}' to {csv_filename}")
    else:
        print(f"Sheet '{sheet}' not found in the Excel file.")
