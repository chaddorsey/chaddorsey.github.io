import os
import requests

# List of states (for file URLs, multi-word names use underscores)
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

# Base URL pattern for the 2025 Excel files
base_url = "https://www.countyhealthrankings.org/sites/default/files/media/document/2025_county_health_rankings_{}_data_-_v1.xlsx"

# Create a directory to save the files
download_dir = "2025_data"
os.makedirs(download_dir, exist_ok=True)

# Loop through the list of states and download each file
for state in states:
    file_url = base_url.format(state)
    print(f"Downloading {state.capitalize()} data from {file_url}")
    
    try:
        response = requests.get(file_url)
        if response.status_code == 200:
            file_path = os.path.join(download_dir, f"2025_county_health_rankings_{state}_data_-_v1.xlsx")
            with open(file_path, "wb") as f:
                f.write(response.content)
            print(f"Successfully downloaded {state.capitalize()} data to {file_path}")
        else:
            print(f"Failed to download {state.capitalize()} data: HTTP {response.status_code}")
    except Exception as e:
        print(f"Error downloading {state.capitalize()} data: {e}")
