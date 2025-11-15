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
  competitors: {
    competitor1: string
    competitor1Detail: string
    competitor2: string
    competitor2Detail: string
    competitor3: string
    competitor3Detail: string
    competitor4: string
    competitor4Detail: string
    competitor5: string
    competitor5Detail: string
    competitor6: string
    competitor6Detail: string
    competitor7?: string
    competitor7Detail?: string
    competitor8?: string
    competitor8Detail?: string
    competitor9?: string
    competitor9Detail?: string
    competitor10?: string
    competitor10Detail?: string
  }
}
