# YC Strategy Agent System

An agentic system that finds semantically similar YC companies to a startup idea, scrapes their information, researches their GTM strategies, and generates strategic recommendations.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
playwright install  # Install browser for scraping
```

2. Create `.env` file with your API keys (see `.env.example` for template):
```bash
# Create .env file manually with:
# QDRANT_URL=...
# QDRANT_API_KEY=...
# MISTRAL_API_KEY=...
# GOOGLE_API_KEY=...
# GOOGLE_SEARCH_ENGINE_ID=...
# COLLECTION_NAME=yc_companies
# EMBEDDING_MODEL=BAAI/bge-small-en
# VECTOR_SIZE=384
# DISTANCE_METRIC=Cosine
# MISTRAL_MODEL=mistral-large-latest
```

3. Setup Qdrant collection (one-time):
```bash
python scripts/0_setup_qdrant.py
```

## Usage

### Individual Scripts (for testing)

1. **Semantic Search**: Find similar companies
```bash
python scripts/1_semantic_search.py "AI-powered CRM for startups"
```

2. **Scrape YC Listing**: Extract company info from YC page
```bash
python scripts/2_scrape_yc_listing.py https://www.ycombinator.com/companies/doordash
```

3. **Scrape Landing Page**: Extract content from company website
```bash
python scripts/3_scrape_landing_page.py https://www.doordash.com
```

4. **Google Search**: Find strategic insights
```bash
python scripts/4_google_search.py "DoorDash"
```

5. **Generate Report**: Create strategic report from collected data
```bash
python scripts/5_generate_report.py --data collected_data.json
```

### Full Pipeline

Run the orchestrator to execute all steps:
```bash
python scripts/0_orchestrator.py "AI-powered CRM for startups"
```

Output will be saved as JSON in `data/outputs/`.

## Directory Structure

- `scripts/` - Individual testable scripts
- `lib/` - Reusable library functions
- `data/` - Input CSV and output reports

