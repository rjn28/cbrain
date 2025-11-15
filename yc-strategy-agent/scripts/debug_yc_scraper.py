#!/usr/bin/env python
"""
Debug script to inspect YC page structure
"""
import sys
from pathlib import Path
import json

sys.path.insert(0, str(Path(__file__).parent.parent))

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

yc_url = "https://www.ycombinator.com/companies/octolane-ai"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)  # Show browser for debugging
    page = browser.new_page()
    page.goto(yc_url, wait_until="networkidle", timeout=30000)
    
    import time
    time.sleep(5)  # Wait longer
    
    # Try to get Next.js data
    try:
        page_data = page.evaluate("""
            () => {
                if (window.__NEXT_DATA__) {
                    return window.__NEXT_DATA__;
                }
                return null;
            }
        """)
        print("=" * 60)
        print("Next.js Data Structure:")
        print("=" * 60)
        if page_data:
            print(json.dumps(page_data, indent=2)[:2000])  # First 2000 chars
        else:
            print("No __NEXT_DATA__ found")
    except Exception as e:
        print(f"Error getting page data: {e}")
    
    # Get HTML
    html = page.content()
    soup = BeautifulSoup(html, 'html.parser')
    
    print("\n" + "=" * 60)
    print("HTML Structure Analysis:")
    print("=" * 60)
    
    # Find all links
    print("\nAll external links:")
    links = soup.find_all('a', href=True)
    for link in links[:20]:
        href = link.get('href', '')
        text = link.get_text(strip=True)
        if href.startswith('http') and 'ycombinator.com' not in href:
            print(f"  {text[:50]:50} -> {href}")
    
    # Find batch info
    print("\nText containing batch keywords:")
    batch_keywords = ['Summer', 'Winter', 'Fall', 'Spring', 'S24', 'W24', 'F24']
    for keyword in batch_keywords:
        elements = soup.find_all(string=lambda x: x and keyword in x)
        for elem in elements[:3]:
            parent = elem.find_parent()
            if parent:
                print(f"  {keyword}: {parent.get_text(strip=True)[:100]}")
    
    # Find tags
    print("\nPotential tag elements:")
    tag_elements = soup.find_all(['span', 'div', 'a'], class_=lambda x: x and x and ('tag' in str(x).lower() or 'badge' in str(x).lower() or 'category' in str(x).lower()))
    for tag in tag_elements[:10]:
        print(f"  {tag.name}.{tag.get('class', [])}: {tag.get_text(strip=True)}")
    
    browser.close()

