/**
 * Types pour la nouvelle structure stratégique en 5 carrés
 * Approche expert conseil en développement d'idées
 */

// Carré 1 : La Vision
export interface VisionSquare {
  strategy: {
    title: string
    vision: string
    visionDetail: string
    mission: string
    missionDetail: string
    values: string
    valuesDetail: string
  }
  marketStudy: {
    title: string
    marketSize: string
    marketSizeDetail: string
    competition: string
    competitionDetail: string
    opportunity: string
    opportunityDetail: string
    targetSegment: string
    targetSegmentDetail: string
  }
}

// Carré 2 : La Solution (MVP)
export interface SolutionSquare {
  mvp: {
    title: string
    concept: string
    conceptDetail: string
    coreFeature1: string
    coreFeature1Detail: string
    coreFeature2: string
    coreFeature2Detail: string
    coreFeature3: string
    coreFeature3Detail: string
    userExperience: string
    userExperienceDetail: string
    differentiation: string
    differentiationDetail: string
  }
}

// Carré 3 : Le Modèle
export interface ModelSquare {
  businessModel: {
    title: string
    revenueStreams: string
    revenueStreamsDetail: string
    pricingStrategy: string
    pricingStrategyDetail: string
    costStructure: string
    costStructureDetail: string
    unitEconomics: string
    unitEconomicsDetail: string
  }
  techStack: {
    title: string
    frontend: string
    frontendDetail: string
    backend: string
    backendDetail: string
    infrastructure: string
    infrastructureDetail: string
    aiTools: string
    aiToolsDetail: string
    security: string
    securityDetail: string
  }
}

// Carré 4 : La Croissance
export interface GrowthSquare {
  launchTimeline: {
    title: string
    phase1: string
    phase1Detail: string
    phase1Duration: string
    phase2: string
    phase2Detail: string
    phase2Duration: string
    phase3: string
    phase3Detail: string
    phase3Duration: string
  }
  growthStrategy: {
    title: string
    acquisitionChannels: string
    acquisitionChannelsDetail: string
    retentionStrategy: string
    retentionStrategyDetail: string
    scalingPlan: string
    scalingPlanDetail: string
    partnerships: string
    partnershipsDetail: string
  }
}

// Carré 5 : L'Unicorn
export interface UnicornSquare {
  kpis: {
    title: string
    northStarMetric: string
    northStarMetricDetail: string
    acquisitionMetrics: string
    acquisitionMetricsDetail: string
    engagementMetrics: string
    engagementMetricsDetail: string
    revenueMetrics: string
    revenueMetricsDetail: string
  }
  learnings: {
    title: string
    assumptions: string
    assumptionsDetail: string
    experiments: string
    experimentsDetail: string
    pivotStrategy: string
    pivotStrategyDetail: string
  }
  aiAgents: {
    title: string
    agent1: string
    agent1Detail: string
    agent1Impact: string
    agent2: string
    agent2Detail: string
    agent2Impact: string
    agent3: string
    agent3Detail: string
    agent3Impact: string
  }
}

// Carré 6 : Qdrant Thinking (YC Insights)
export interface QdrantThinkingSquare {
  ycInsights: {
    title: string
    company1: string
    company1Detail: string
    company1Batch: string
    company2: string
    company2Detail: string
    company2Batch: string
    company3: string
    company3Detail: string
    company3Batch: string
  }
  learnings: {
    title: string
    marketValidation: string
    marketValidationDetail: string
    competitiveAdvantage: string
    competitiveAdvantageDetail: string
    keyLearnings: string
    keyLearningsDetail: string
  }
}

// Structure complète de la stratégie
export interface ComprehensiveStrategy {
  projectName: string
  tagline: string
  vision: VisionSquare
  solution: SolutionSquare
  model: ModelSquare
  growth: GrowthSquare
  unicorn: UnicornSquare
  qdrantThinking?: QdrantThinkingSquare  // Optional pour compatibilité
}
