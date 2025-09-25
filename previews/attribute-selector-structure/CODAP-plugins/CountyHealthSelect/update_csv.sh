#!/bin/bash

# Script to update all CSV files to change "Proficient in English (%)" to "Not Proficient in English (%)"

CSV_DIR="/Users/chaddorsey/Dropbox/dev/github-pages/chaddorsey.github.io/CODAP-plugins/CountyHealthSelect/assets/data/2025/csv"

echo "Updating CSV files in: $CSV_DIR"

# Count total files
total_files=$(ls "$CSV_DIR"/2025-CountyHealth-*.csv | wc -l)
echo "Found $total_files CSV files to check"

updated_count=0

# Process each CSV file
for csv_file in "$CSV_DIR"/2025-CountyHealth-*.csv; do
    filename=$(basename "$csv_file")
    echo "Processing: $filename"
    
    # Check if the file contains the old header
    if grep -q "Proficient in English (%)" "$csv_file"; then
        # Create a temporary file for the update
        sed 's/Proficient in English (%)/Not Proficient in English (%)/g' "$csv_file" > "$csv_file.tmp"
        
        # Replace the original file with the updated one
        mv "$csv_file.tmp" "$csv_file"
        
        echo "  ✓ Updated header"
        ((updated_count++))
    else
        echo "  - No 'Proficient in English (%)' column found"
    fi
done

echo ""
echo "Summary: Updated $updated_count out of $total_files files"
