#!/usr/bin/env python
"""
Report generation utilities
"""
import json
import os
from datetime import datetime
from typing import Dict, Any
from pathlib import Path


def save_report(report_data: Dict[str, Any], filename: str = None, output_dir: str = "data/outputs"):
    """
    Save report as JSON file
    """
    # Create output directory if it doesn't exist
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    # Generate filename if not provided
    if not filename:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"strategy_report_{timestamp}.json"
    
    filepath = os.path.join(output_dir, filename)
    
    # Add metadata
    report_with_metadata = {
        "generated_at": datetime.now().isoformat(),
        "report": report_data
    }
    
    # Save JSON
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(report_with_metadata, f, indent=2, ensure_ascii=False)
    
    print(f"Report saved to: {filepath}")
    return filepath


def format_report_json(analysis: Dict[str, Any]) -> Dict[str, Any]:
    """
    Format the analysis into the final report structure
    Ensures all required fields are present
    """
    # Ensure all sections exist with defaults if missing
    # Support both old French field names and new English ones for backward compatibility
    vision_data = analysis.get("vision", {})
    market_data = analysis.get("market", analysis.get("marche", {}))
    product_data = analysis.get("product", analysis.get("produit", {}))
    planning_data = analysis.get("planning", {})
    acquisition_data = analysis.get("acquisition", {})
    metrics_data = analysis.get("metrics", analysis.get("mesure", {}))
    
    report = {
        "vision": {
            "problem": vision_data.get("problem", vision_data.get("probleme", "")),
            "solution": vision_data.get("solution", ""),
            "uniqueValue": vision_data.get("uniqueValue", vision_data.get("valeurUnique", "")),
            "targetAudience": vision_data.get("targetAudience", vision_data.get("ciblePrincipale", "")),
            "positioning": vision_data.get("positioning", vision_data.get("positionnement", ""))
        },
        "market": {
            "marketSize": market_data.get("marketSize", market_data.get("tailleMarche", "")),
            "directCompetitors": market_data.get("directCompetitors", market_data.get("concurrenceDirecte", [])),
            "competitorWeaknesses": market_data.get("competitorWeaknesses", market_data.get("pointsFaiblesConcurrents", "")),
            "trends": market_data.get("trends", market_data.get("tendances", ""))
        },
        "businessModel": {
            "revenueModel": analysis.get("businessModel", {}).get("revenueModel", analysis.get("businessModel", {}).get("modeleRevenu", "")),
            "pricing": analysis.get("businessModel", {}).get("pricing", analysis.get("businessModel", {}).get("prix", "")),
            "initialCosts": analysis.get("businessModel", {}).get("initialCosts", analysis.get("businessModel", {}).get("coutsInitiaux", "")),
            "breakEvenPoint": analysis.get("businessModel", {}).get("breakEvenPoint", analysis.get("businessModel", {}).get("seuilRentabilite", ""))
        },
        "product": {
            "coreFeatures": product_data.get("coreFeatures", product_data.get("fonctionnalitesCore", [])),
            "userFlow": product_data.get("userFlow", []),
            "design": product_data.get("design", ""),
            "techStack": product_data.get("techStack", "")
        },
        "planning": {
            "step1": planning_data.get("step1", planning_data.get("etape1", "")),
            "step2": planning_data.get("step2", planning_data.get("etape2", "")),
            "step3": planning_data.get("step3", planning_data.get("etape3", ""))
        },
        "acquisition": {
            "socialMedia": acquisition_data.get("socialMedia", acquisition_data.get("reseauxSociaux", "")),
            "seo": acquisition_data.get("seo", ""),
            "partnerships": acquisition_data.get("partnerships", acquisition_data.get("partenariats", "")),
            "advertising": acquisition_data.get("advertising", acquisition_data.get("publicite", ""))
        },
        "metrics": {
            "keyMetrics": metrics_data.get("keyMetrics", metrics_data.get("metriques", [])),
            "tools": metrics_data.get("tools", metrics_data.get("outils", [])),
            "successThresholds": metrics_data.get("successThresholds", metrics_data.get("seuilsSucces", ""))
        },
        "similarCompanies": analysis.get("similarCompanies", [])
    }
    
    return report

