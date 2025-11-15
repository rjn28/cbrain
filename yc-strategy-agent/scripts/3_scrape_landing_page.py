#!/usr/bin/env python
"""
Scrape company landing page
"""
import sys
import json
from pathlib import Path

# Add parent directory to path to import lib
sys.path.insert(0, str(Path(__file__).parent.parent))

from lib.scraper import scrape_landing_page

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/3_scrape_landing_page.py <website_url>")
        print("Example: python scripts/3_scrape_landing_page.py https://www.doordash.com")
        sys.exit(1)
    
    website_url = sys.argv[1]
    
    # Ensure URL has protocol
    if not website_url.startswith(('http://', 'https://')):
        website_url = 'https://' + website_url
    
    print(f"Scraping landing page: {website_url}...")
    
    try:
        data = scrape_landing_page(website_url)
        
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

