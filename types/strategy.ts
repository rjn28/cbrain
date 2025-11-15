/**
 * Types pour la stratégie générée par Mistral AI
 */

export interface MistralStrategyData {
  titreProjet: string
  ideeCourte: string
  strategie: {
    persona: string
    personaDetail: string
    probleme: string
    problemeDetail: string
    objectif: string
    objectifDetail: string
  }
  produit: {
    concept: string
    conceptDetail: string
    feature1: string
    feature1Detail: string
    feature2: string
    feature2Detail: string
  }
  stack: {
    frontend: string
    frontendDetail: string
    backend: string
    backendDetail: string
    partenaires: string
    partenairesDetail: string
  }
  planning: {
    etape1: string
    etape1Detail: string
    etape2: string
    etape2Detail: string
    etape3: string
    etape3Detail: string
  }
  agents: {
    mistral: string
    mistralDetail: string
    fal: string
    falDetail: string
    elevenlabs: string
    elevenlabsDetail: string
    qdrant: string
    qdrantDetail: string
  }
}
