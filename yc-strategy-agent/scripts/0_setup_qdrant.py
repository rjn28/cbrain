#!/usr/bin/env python
"""
One-time setup script to load YC companies from CSV into Qdrant collection
"""
import sys
import os
from pathlib import Path

# Add parent directory to path to import lib
sys.path.insert(0, str(Path(__file__).parent.parent))

from lib.qdrant_client import upload_companies_from_csv

if __name__ == "__main__":
    # Path to companies.csv
    csv_path = os.path.join(
        Path(__file__).parent.parent,
        "data",
        "companies.csv"
    )
    
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found")
        print("Please ensure companies.csv is in the data/ directory")
        sys.exit(1)
    
    print(f"Loading companies from {csv_path}...")
    print("This may take a few minutes...")
    
    try:
        upload_companies_from_csv(csv_path)
        print("\n✅ Setup complete! Companies are now indexed in Qdrant.")
    except Exception as e:
        print(f"\n❌ Error during setup: {e}")
        sys.exit(1)

