#!/usr/bin/env python
"""
Generate strategic report from collected data
"""
import sys
import json
import argparse
from pathlib import Path

# Add parent directory to path to import lib
sys.path.insert(0, str(Path(__file__).parent.parent))

from lib.mistral_client import generate_report_analysis
from lib.report_generator import format_report_json, save_report

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate strategic report from collected data")
    parser.add_argument("--data", required=True, help="Path to JSON file with collected data")
    parser.add_argument("--idea", required=True, help="User's startup idea pitch")
    parser.add_argument("--output", help="Output filename (optional)")
    
    args = parser.parse_args()
    
    # Load collected data
    try:
        with open(args.data, 'r', encoding='utf-8') as f:
            collected_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: File '{args.data}' not found")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in '{args.data}': {e}")
        sys.exit(1)
    
    print(f"Generating report for idea: '{args.idea}'...")
    print("This may take a minute...")
    
    try:
        # Generate analysis using Mistral
        analysis = generate_report_analysis(collected_data, args.idea)
        
        # Format report
        report = format_report_json(analysis)
        
        # Save report
        output_path = save_report(report, filename=args.output)
        
        print(f"\n✅ Report generated successfully!")
        print(f"Saved to: {output_path}")
        
        # Also print summary
        print("\nReport Summary:")
        vision = report.get('vision', {})
        problem = vision.get('problem', vision.get('probleme', ''))
        solution = vision.get('solution', '')
        print(f"  Vision - Problem: {problem[:100]}...")
        print(f"  Vision - Solution: {solution[:100]}...")
        print(f"  Similar Companies Analyzed: {len(report.get('similarCompanies', []))}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

