#!/usr/bin/env python
"""
Web scraping utilities for YC listings and landing pages
"""
import time
import re
import requests
from bs4 import BeautifulSoup
from typing import Dict, Any, Optional
from playwright.sync_api import sync_playwright


def scrape_yc_listing(yc_url: str, csv_data: Optional[Dict[str, str]] = None) -> Dict[str, Any]:
    """
    Scrape YC company listing page
    Example: https://www.ycombinator.com/companies/doordash
    """
    try:
        # Use playwright for JS-rendered content
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(yc_url, wait_until="networkidle", timeout=30000)
            
            # Wait for dynamic content to load
            time.sleep(3)
            
            # Try to extract data from page's JavaScript/JSON
            # YC pages often have data in script tags or window.__NEXT_DATA__
            page_data = None
            try:
                page_data = page.evaluate("""
                    () => {
                        // Try to get data from Next.js data
                        if (window.__NEXT_DATA__) {
                            return window.__NEXT_DATA__.props.pageProps;
                        }
                        return null;
                    }
                """)
            except:
                pass
            
            html = page.content()
            browser.close()
        
        soup = BeautifulSoup(html, 'html.parser')
        
        data = {
            'yc_url': yc_url,
            'name': '',
            'description': '',
            'founders': [],
            'batch': '',
            'tags': [],
            'website': '',
            'full_description': ''
        }
        
        # Use CSV data as fallback if provided
        if csv_data:
            if not data['batch'] and csv_data.get('batch'):
                data['batch'] = csv_data['batch']
            if not data['tags'] and csv_data.get('main_industry'):
                tags = [csv_data['main_industry']]
                if csv_data.get('sub_industry') and csv_data['sub_industry'] != 'N/A':
                    tags.append(csv_data['sub_industry'])
                data['tags'] = tags
        
        # Try to extract from page data first (most reliable)
        if page_data and isinstance(page_data, dict):
            company_data = page_data.get('company') or page_data.get('companyData') or {}
            if company_data:
                if not data['name']:
                    data['name'] = company_data.get('name', '')
                if not data['description']:
                    data['description'] = company_data.get('one_liner', '') or company_data.get('description', '')
                if not data['full_description']:
                    data['full_description'] = company_data.get('long_description', '') or company_data.get('description', '')
                if not data['batch']:
                    data['batch'] = company_data.get('batch', '')
                if not data['website']:
                    data['website'] = company_data.get('website', '') or company_data.get('url', '')
                if not data['founders'] and company_data.get('founders'):
                    data['founders'] = [f.get('name', '') for f in company_data['founders'] if isinstance(f, dict)]
                if not data['tags'] and company_data.get('tags'):
                    data['tags'] = company_data['tags']
        
        # Fallback to HTML scraping if page_data didn't work
        if not data['name']:
            # Find company name - look for h1 with company name
            h1 = soup.find('h1')
            if h1:
                name_text = h1.get_text(strip=True)
                # Remove "| Y Combinator" suffix if present
                data['name'] = name_text.split('|')[0].strip()
            else:
                # Try title tag
                title = soup.find('title')
                if title:
                    title_text = title.get_text(strip=True)
                    data['name'] = title_text.split('|')[0].strip()
        
        if not data['description']:
            # Try meta description
            meta_desc = soup.find('meta', property='og:description')
            if meta_desc:
                data['description'] = meta_desc.get('content', '')
            else:
                # Try to find description in common locations
                desc_elem = soup.find('p', class_=lambda x: x and ('description' in x.lower() or 'tagline' in x.lower()))
                if desc_elem:
                    data['description'] = desc_elem.get_text(strip=True)
        
        if not data['full_description']:
            # Look for longer description text
            desc_selectors = [
                'div[class*="long-description"]',
                'div[class*="description"] p',
                'section[class*="about"]',
                'div[class*="about"]'
            ]
            for selector in desc_selectors:
                desc_elem = soup.select_one(selector)
                if desc_elem:
                    text = desc_elem.get_text(strip=True)
                    if len(text) > 50:  # Only use if substantial
                        data['full_description'] = text
                        break
        
        if not data['website']:
            # Find website link - look for external links
            # YC pages usually have a "Visit Website" or similar link
            links = soup.find_all('a', href=True)
            
            # Domains to exclude
            exclude_domains = [
                'ycombinator.com', 'startupschool.org', 'bookface.com',
                'twitter.com', 'linkedin.com', 'github.com', 'facebook.com',
                'instagram.com', 'youtube.com', 'medium.com', 'blog'
            ]
            
            # First, try to find links with "website" or "visit" text
            for link in links:
                href = link.get('href', '')
                text = link.get_text(strip=True).lower()
                if href.startswith('http') and ('website' in text or 'visit' in text):
                    if not any(domain in href.lower() for domain in exclude_domains):
                        data['website'] = href
                        break
            
            # If not found, look for the first external link that's not excluded
            if not data['website']:
                for link in links:
                    href = link.get('href', '')
                    if href.startswith('http'):
                        # Skip if it's an excluded domain
                        if any(domain in href.lower() for domain in exclude_domains):
                            continue
                        # Skip if it looks like a social media or blog link
                        if any(x in href.lower() for x in ['/twitter', '/linkedin', '/github', '/facebook', '/blog', '/post']):
                            continue
                        data['website'] = href
                        break
        
        if not data['batch']:
            # Extract batch info - look for batch badges or text
            # Try multiple strategies
            batch_patterns = [
                r'(Summer|Winter|Fall|Spring)\s+(\d{4})',  # "Summer 2024"
                r'(S|W|F)(\d{2})',  # "S24", "W24"
                r'(Summer|Winter|Fall|Spring)\s+(\d{2})',  # "Summer 24"
            ]
            
            # Search in all text content
            page_text = soup.get_text()
            for pattern in batch_patterns:
                match = re.search(pattern, page_text, re.IGNORECASE)
                if match:
                    data['batch'] = match.group(0).strip()
                    break
            
            # Also try looking in specific elements
            if not data['batch']:
                batch_elements = soup.find_all(['span', 'div', 'p'], string=re.compile(r'(Summer|Winter|Fall|Spring|S\d{2}|W\d{2}|F\d{2})', re.IGNORECASE))
                for elem in batch_elements[:5]:
                    text = elem.get_text(strip=True)
                    match = re.search(r'(Summer|Winter|Fall|Spring)\s+(\d{4})|(S|W|F)(\d{2})', text, re.IGNORECASE)
                    if match:
                        data['batch'] = match.group(0).strip()
                        break
        
        if not data['tags']:
            # Extract tags - look for tag/badge elements
            # Filter out common non-tag elements
            exclude_tag_texts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '']
            
            tag_selectors = [
                'span[class*="tag"]',
                'div[class*="tag"]',
                'span[class*="badge"]',
                'div[class*="badge"]',
                'a[class*="tag"]',
                '[class*="category"]',
                '[class*="industry"]'
            ]
            for selector in tag_selectors:
                tag_elems = soup.select(selector)
                if tag_elems:
                    tags = []
                    for tag in tag_elems:
                        text = tag.get_text(strip=True)
                        # Only include if it's meaningful text
                        if text and text not in exclude_tag_texts and len(text) > 1:
                            # Skip if it's just a number or single character
                            if not (text.isdigit() or len(text) == 1):
                                tags.append(text)
                    if tags:
                        data['tags'] = list(set(tags))[:10]  # Remove duplicates
                        break
        
        # Clean up data
        if data['name'] and '|' in data['name']:
            data['name'] = data['name'].split('|')[0].strip()
        
        return data
        
    except Exception as e:
        print(f"Error scraping YC listing {yc_url}: {e}")
        import traceback
        traceback.print_exc()
        return {
            'yc_url': yc_url,
            'error': str(e)
        }


def scrape_landing_page(website_url: str) -> Dict[str, Any]:
    """
    Scrape company landing page for key content
    """
    try:
        # Use playwright for dynamic content
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            
            # Set reasonable timeout
            page.goto(website_url, wait_until="networkidle", timeout=30000)
            time.sleep(2)  # Wait for dynamic content
            
            html = page.content()
            browser.close()
        
        soup = BeautifulSoup(html, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style", "nav", "footer"]):
            script.decompose()
        
        data = {
            'website_url': website_url,
            'hero_section': '',
            'value_proposition': '',
            'headlines': [],
            'features': [],
            'pricing': '',
            'main_content': ''
        }
        
        # Extract hero section (usually h1 + first paragraph)
        h1 = soup.find('h1')
        if h1:
            data['hero_section'] = h1.get_text(strip=True)
            # Get first paragraph after h1
            next_p = h1.find_next('p')
            if next_p:
                data['value_proposition'] = next_p.get_text(strip=True)
        
        # Extract all headlines
        headlines = soup.find_all(['h1', 'h2', 'h3'])
        data['headlines'] = [h.get_text(strip=True) for h in headlines[:10]]
        
        # Try to find features (usually in lists or specific sections)
        feature_selectors = [
            'ul[class*="feature"]',
            'div[class*="feature"]',
            'section[class*="feature"]',
            'li[class*="feature"]'
        ]
        for selector in feature_selectors:
            feature_elems = soup.select(selector)
            if feature_elems:
                for elem in feature_elems[:5]:
                    text = elem.get_text(strip=True)
                    if text and len(text) > 10:
                        data['features'].append(text)
                break
        
        # Extract pricing info (if available)
        price_elem = soup.find(string=lambda x: x and ('$' in x or '€' in x or 'price' in x.lower()))
        if price_elem:
            parent = price_elem.find_parent()
            if parent:
                data['pricing'] = parent.get_text(strip=True)
        
        # Get main content (all text, cleaned)
        main_content = soup.get_text(separator=' ', strip=True)
        # Limit to first 5000 chars
        data['main_content'] = main_content[:5000]
        
        return data
        
    except Exception as e:
        print(f"Error scraping landing page {website_url}: {e}")
        return {
            'website_url': website_url,
            'error': str(e)
        }

