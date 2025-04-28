import os
import requests
import argparse

def main():
    # Parse command-line arguments for the year.
    parser = argparse.ArgumentParser(
        description="Download County Health Rankings Excel files for a given year."
    )
    parser.add_argument("year", type=str, help="Four-digit year (e.g., 2025)")
    args = parser.parse_args()
    
    year = args.year
    if not (len(year) == 4 and year.isdigit()):
        raise ValueError("Year must be a four-digit number, e.g., 2025")
    
    # Create output directory ../NNNN/raw/
    output_dir = os.path.join("..", year, "raw")
    os.makedirs(output_dir, exist_ok=True)
    
    # List of states (for URL construction). For multiword names, use underscores.
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
    
    # Base URL pattern for the Excel files.
    base_url = "https://www.countyhealthrankings.org/sites/default/files/media/document/{}_county_health_rankings_{}_data_-_v1.xlsx".format(year, "{}")
    
    for state in states:
        file_url = base_url.format(state)
        print(f"Downloading {state.capitalize()} data from {file_url}")
        try:
            response = requests.get(file_url)
            if response.status_code == 200:
                file_name = f"{year}_county_health_rankings_{state}_data_-_v1.xlsx"
                file_path = os.path.join(output_dir, file_name)
                with open(file_path, "wb") as f:
                    f.write(response.content)
                print(f"Saved {file_name} to {output_dir}")
            else:
                print(f"Failed to download {state.capitalize()}: HTTP {response.status_code}")
        except Exception as e:
            print(f"Error downloading {state.capitalize()}: {e}")

if __name__ == "__main__":
    main()
