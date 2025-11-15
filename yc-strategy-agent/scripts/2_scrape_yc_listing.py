#!/usr/bin/env python
"""
Scrape YC company listing page
"""
import sys
import json
from pathlib import Path

# Add parent directory to path to import lib
sys.path.insert(0, str(Path(__file__).parent.parent))

from lib.scraper import scrape_yc_listing

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/2_scrape_yc_listing.py <yc_url>")
        print("Example: python scripts/2_scrape_yc_listing.py https://www.ycombinator.com/companies/doordash")
        sys.exit(1)
    
    yc_url = sys.argv[1]
    
    if "ycombinator.com/companies/" not in yc_url:
        print("Error: URL must be a YC company listing page")
        print("Example: https://www.ycombinator.com/companies/doordash")
        sys.exit(1)
    
    print(f"Scraping YC listing: {yc_url}...")
    
    try:
        data = scrape_yc_listing(yc_url)
        
        if 'error' in data:
            print(f"Error: {data['error']}")
            sys.exit(1)
        
        print("\nScraped data:")
        print(json.dumps(data, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

