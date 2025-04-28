#!/usr/bin/env python3
import os
import re
import argparse
import requests
from bs4 import BeautifulSoup

def fetch_page(url):
    try:
        resp = requests.get(url)
        resp.raise_for_status()
        return BeautifulSoup(resp.text, "html.parser")
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def find_download_link(soup, year, state_title):
    """
    Search the BeautifulSoup page for an <a> whose text contains the given year and 'Data'
    and (preferably) the state title.
    Returns the first matching <a> element or None.
    """
    if soup is None:
        return None

    # Get all candidate links where text contains the year and "data" (case-insensitive)
    candidates = []
    for a in soup.find_all("a", string=True):
        link_text = a.get_text(strip=True)
        if year in link_text and "data" in link_text.lower():
            candidates.append(a)
    
    if not candidates:
        return None

    # Look for a candidate whose href (lowercased) contains the state title with spaces replaced by "%20"
    norm_state = state_title.lower().replace(" ", "%20")
    for a in candidates:
        href = a.get("href", "").lower()
        if norm_state in href:
            return a

    # Fallback: return the first candidate
    return candidates[0] if candidates else None

def scrape_state_data(year, state, output_dir):
    # Convert state to proper title: underscores -> spaces, title-case.
    state_title = state.replace("_", " ").title()
    
    # Build the primary URL.
    primary_url = f"https://www.countyhealthrankings.org/health-data/{state}/data-and-resources"
    print(f"\nFetching page for {state_title} from primary URL: {primary_url}")
    soup = fetch_page(primary_url)
    link_tag = find_download_link(soup, year, state_title)
    
    # If no link found, try alternate URL pattern.
    if not link_tag:
        alt_url = f"https://www.countyhealthrankings.org/app/{state.replace('_','-')}/{year}/downloads"
        print(f"No download link found at primary URL. Trying alternate URL: {alt_url}")
        soup = fetch_page(alt_url)
        link_tag = find_download_link(soup, year, state_title)
        if not link_tag:
            print(f"Still no link found for {state_title} (year {year}). Skipping {state_title}.")
            return

    link_text = link_tag.get_text(strip=True)
    file_url = link_tag.get("href")
    if not file_url.startswith("http"):
        file_url = "https://www.countyhealthrankings.org" + file_url
    print(f"Found file link for {state_title}: {file_url} (link text: {link_text})")
    
    # Download the file.
    try:
        file_resp = requests.get(file_url)
        file_resp.raise_for_status()
    except Exception as e:
        print(f"Error downloading file for {state_title}: {e}")
        return

    ext = os.path.splitext(file_url)[1]
    if not ext:
        ext = ".xlsx"
    filename = f"{year}_{state}_data{ext}"
    file_path = os.path.join(output_dir, filename)
    with open(file_path, "wb") as f:
        f.write(file_resp.content)
    print(f"Saved {state_title} file to: {file_path}")

def main():
    parser = argparse.ArgumentParser(
        description="Scrape County Health Rankings files for a given year using Beautiful Soup."
    )
    parser.add_argument("year", type=str, help="Four-digit year (e.g., 2021)")
    args = parser.parse_args()
    year = args.year
    if len(year) != 4 or not year.isdigit():
        parser.error("Year must be a four-digit number (e.g., 2021)")
    
    # Create output directory ../NNNN/raw/ where NNNN is the year.
    output_dir = os.path.join("..", year, "raw")
    os.makedirs(output_dir, exist_ok=True)
    
    # List of state names (use lowercase with underscores for multiword names).
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
    
    for state in states:
        scrape_state_data(year, state, output_dir)

if __name__ == "__main__":
    main()
