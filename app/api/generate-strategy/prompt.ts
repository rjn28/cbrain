/**
 * Mistral AI prompt for strategy generation
 */

export function getStrategyPrompt(idea: string): string {
  return `You are a business strategy and startup creation expert.
From the following idea, generate a complete strategy in JSON format.

IDEA: "${idea}"

You must return ONLY a valid JSON object (no markdown, no text before or after) with this EXACT structure:

{
  "titreProjet": "Short project name (2-4 words max)",
  "ideeCourte": "Short description of the idea (15-20 words max)",
  "strategie": {
    "persona": "Target persona description (15-20 words)",
    "personaDetail": "Detailed persona explanation: demographics, behaviors, needs, motivations, barriers (2-3 paragraphs)",
    "probleme": "Problem solved (15-20 words)",
    "problemeDetail": "In-depth problem analysis: context, impact, consequences, why it matters (2-3 paragraphs)",
    "objectif": "Main objective (15-20 words)",
    "objectifDetail": "Objective details: metrics, timeline, expected impact, long-term vision (2-3 paragraphs)"
  },
  "produit": {
    "concept": "Product concept (15-20 words)",
    "conceptDetail": "Complete concept description: added value, differentiation, market positioning (2-3 paragraphs)",
    "feature1": "Key feature 1 (10-15 words)",
    "feature1Detail": "Detailed feature 1 explanation: how it works, user benefits, implementation (2-3 paragraphs)",
    "feature2": "Key feature 2 (10-15 words)",
    "feature2Detail": "Detailed feature 2 explanation: how it works, user benefits, implementation (2-3 paragraphs)"
  },
  "stack": {
    "frontend": "Frontend technologies (5-10 words)",
    "frontendDetail": "Frontend choice justification: advantages, ecosystem, scalability, developer experience (2-3 paragraphs)",
    "backend": "Backend technologies (5-10 words)",
    "backendDetail": "Backend choice justification: performance, security, maintenance, integrations (2-3 paragraphs)",
    "partenaires": "Key partners (5-10 words)",
    "partenairesDetail": "Partners role: specific integrations, added value, synergies (2-3 paragraphs)"
  },
  "planning": {
    "etape1": "First step (10-15 words)",
    "etape1Detail": "Step 1 details: tasks, deliverables, required resources, risks (2-3 paragraphs)",
    "etape2": "Second step (10-15 words)",
    "etape2Detail": "Step 2 details: tasks, deliverables, required resources, risks (2-3 paragraphs)",
    "etape3": "Third step (10-15 words)",
    "etape3Detail": "Step 3 details: tasks, deliverables, required resources, risks (2-3 paragraphs)"
  },
  "agents": {
    "mistral": "Mistral AI usage (10-15 words)",
    "mistralDetail": "Detailed Mistral use cases: AI features, integration, benefits (2-3 paragraphs)",
    "fal": "Fal.ai usage (10-15 words)",
    "falDetail": "Detailed Fal use cases: image generation, integration, benefits (2-3 paragraphs)",
    "elevenlabs": "ElevenLabs usage (10-15 words)",
    "elevenlabsDetail": "Detailed ElevenLabs use cases: synthetic voice, integration, benefits (2-3 paragraphs)",
    "qdrant": "Qdrant usage (10-15 words)",
    "qdrantDetail": "Detailed Qdrant use cases: vector search, integration, benefits (2-3 paragraphs)"
  }
}

IMPORTANT:
- Respond ONLY with JSON, nothing else
- Short texts must be SHORT (max 20 words)
- "Detail" texts must be LONG and DETAILED (2-3 paragraphs of 3-4 sentences each)
- Be concrete, actionable and professional
- Use hackathon partners (Mistral, Fal, ElevenLabs, Qdrant, N8n, Lovable)
- Respond in ENGLISH`
}
