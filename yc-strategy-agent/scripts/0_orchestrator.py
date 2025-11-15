#!/usr/bin/env python
"""
Main orchestrator script that runs the complete pipeline
"""
import sys
import json
import time
from pathlib import Path
from datetime import datetime

# Add parent directory to path to import lib
sys.path.insert(0, str(Path(__file__).parent.parent))

from lib.qdrant_client import search_similar_companies
from lib.scraper import scrape_yc_listing, scrape_landing_page
from lib.google_search import search_strategic_insights
from lib.mistral_client import generate_report_analysis
from lib.report_generator import format_report_json, save_report

def main(idea_pitch: str):
    """
    Run the complete pipeline:
    1. Semantic search → get 3 companies
    2. For each company: scrape YC listing + landing page
    3. For each company: Google search for insights
    4. Generate final report
    """
    print("=" * 60)
    print("YC Strategy Agent - Full Pipeline")
    print("=" * 60)
    print(f"Idea: {idea_pitch}\n")
    
    collected_data = {
        'user_idea': idea_pitch,
        'companies': []
    }
    
    # Step 1: Semantic search
    print("Step 1: Finding similar YC companies...")
    try:
        similar_companies = search_similar_companies(idea_pitch, limit=3)
        print(f"Found {len(similar_companies)} similar companies\n")
    except Exception as e:
        print(f"Error in semantic search: {e}")
        sys.exit(1)
    
    # Step 2-4: For each company, collect data
    for i, company in enumerate(similar_companies, 1):
        print(f"\n{'='*60}")
        print(f"Processing Company {i}/{len(similar_companies)}: {company['name']}")
        print(f"{'='*60}")
        
        company_data = {
            'name': company['name'],
            'description': company['description'],
            'url': company['url'],
            'industry': company['main_industry'],
            'similarity_score': company['similarity_score']
        }
        
        # Step 2: Scrape YC listing
        print(f"\n[2.1] Scraping YC listing...")
        try:
            yc_data = scrape_yc_listing(company['url'])
            company_data['yc_listing'] = yc_data
            
            # Extract website URL if available
            website_url = yc_data.get('website', '')
            # If no website found, we'll skip landing page scraping
        except Exception as e:
            print(f"  ⚠️  Error scraping YC listing: {e}")
            company_data['yc_listing'] = {'error': str(e)}
            website_url = ''
        
        # Step 3: Scrape landing page (if website available)
        if website_url:
            print(f"[2.2] Scraping landing page: {website_url}")
            try:
                landing_data = scrape_landing_page(website_url)
                company_data['landing_page'] = landing_data
            except Exception as e:
                print(f"  ⚠️  Error scraping landing page: {e}")
                company_data['landing_page'] = {'error': str(e)}
        else:
            print(f"[2.2] Skipping landing page (no website URL found)")
            company_data['landing_page'] = {}
        
        # Step 4: Google search for strategic insights
        print(f"[2.3] Searching for strategic insights...")
        try:
            insights = search_strategic_insights(company['name'], num_results=5)
            company_data['google_insights'] = insights
            print(f"  Found {len(insights)} insights")
        except Exception as e:
            print(f"  ⚠️  Error in Google search: {e}")
            company_data['google_insights'] = []
        
        # Rate limiting between companies
        if i < len(similar_companies):
            print("  Waiting 2 seconds before next company...")
            time.sleep(2)
        
        collected_data['companies'].append(company_data)
    
    # Save intermediate data for debugging
    intermediate_file = Path(__file__).parent.parent / "data" / "outputs" / f"collected_data_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    intermediate_file.parent.mkdir(parents=True, exist_ok=True)
    with open(intermediate_file, 'w', encoding='utf-8') as f:
        json.dump(collected_data, f, indent=2, ensure_ascii=False)
    print(f"\n💾 Intermediate data saved to: {intermediate_file}")
    
    # Step 5: Generate report
    print(f"\n{'='*60}")
    print("Step 5: Generating strategic report...")
    print(f"{'='*60}")
    try:
        analysis = generate_report_analysis(collected_data, idea_pitch)
        report = format_report_json(analysis)
        
        # Save report
        output_path = save_report(report)
        
        print(f"\n✅ Pipeline complete!")
        print(f"📄 Report saved to: {output_path}")
        print(f"📊 Analyzed {len(collected_data['companies'])} similar companies")
        
        return output_path
        
    except Exception as e:
        print(f"❌ Error generating report: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/0_orchestrator.py '<idea_pitch>'")
        print('Example: python scripts/0_orchestrator.py "AI-powered CRM for startups"')
        sys.exit(1)
    
    idea_pitch = sys.argv[1]
    main(idea_pitch)

