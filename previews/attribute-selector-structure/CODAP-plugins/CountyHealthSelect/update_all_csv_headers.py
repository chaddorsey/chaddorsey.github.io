#!/usr/bin/env python3
"""
Script to update all CSV file headers to change "Proficient in English (%)" to "Not Proficient in English (%)"
"""

import os
import sys

def update_csv_headers(csv_directory):
    """Update all CSV files in the directory to change the column header"""
    
    if not os.path.exists(csv_directory):
        print(f"Directory {csv_directory} does not exist")
        return
    
    # Find all CSV files matching the pattern
    csv_files = []
    for filename in os.listdir(csv_directory):
        if filename.startswith("2025-CountyHealth-") and filename.endswith(".csv"):
            csv_files.append(os.path.join(csv_directory, filename))
    
    if not csv_files:
        print(f"No matching CSV files found in {csv_directory}")
        return
    
    print(f"Found {len(csv_files)} CSV files to update")
    
    updated_count = 0
    for csv_file in csv_files:
        print(f"Processing: {os.path.basename(csv_file)}")
        
        try:
            # Read the file
            with open(csv_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if the old header exists
            if "Proficient in English (%)" in content:
                # Replace the header
                updated_content = content.replace("Proficient in English (%)", "Not Proficient in English (%)")
                
                # Write the updated file
                with open(csv_file, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                
                print(f"  ✓ Updated header")
                updated_count += 1
            else:
                print(f"  - No 'Proficient in English (%)' column found (already updated or different format)")
                
        except Exception as e:
            print(f"  ✗ Error processing {os.path.basename(csv_file)}: {e}")
    
    print(f"\nSummary: Updated {updated_count} out of {len(csv_files)} files")

if __name__ == "__main__":
    csv_dir = "/Users/chaddorsey/Dropbox/dev/github-pages/chaddorsey.github.io/CODAP-plugins/CountyHealthSelect/assets/data/2025/csv"
    update_csv_headers(csv_dir)
