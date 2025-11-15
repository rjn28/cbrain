/**
 * Prompt optimisé pour la génération de stratégie en 5 carrés
 * Approche expert conseil en développement d'idées
 */

export function getComprehensiveStrategyPrompt(idea: string): string {
  return `You are an expert business consultant specializing in startup strategy and idea development.
Transform the following idea into a comprehensive 5-square strategic framework.

IDEA: "${idea}"

Generate a complete strategic analysis following this proven framework. Return ONLY valid JSON.

{
  "projectName": "Catchy project name (2-4 words)",
  "tagline": "Compelling tagline (10-15 words)",
  
  "vision": {
    "strategy": {
      "title": "Strategic Vision",
      "vision": "Long-term vision statement (15-20 words)",
      "visionDetail": "Detailed vision: where you want to be in 5-10 years, impact on industry, transformation goals (3-4 sentences)",
      "mission": "Core mission statement (15-20 words)",
      "missionDetail": "Mission breakdown: daily purpose, who you serve, how you serve them, why it matters (3-4 sentences)",
      "values": "Core values (10-15 words)",
      "valuesDetail": "Values explanation: principles guiding decisions, culture, team behavior, customer relationships (3-4 sentences)"
    },
    "marketStudy": {
      "title": "Market Analysis",
      "marketSize": "Total addressable market (TAM) (10-15 words)",
      "marketSizeDetail": "Market sizing: TAM/SAM/SOM breakdown, growth rate, market trends, future projections (3-4 sentences)",
      "competition": "Competitive landscape (15-20 words)",
      "competitionDetail": "Competition analysis: main players, their strengths/weaknesses, market gaps, your positioning (3-4 sentences)",
      "opportunity": "Market opportunity (15-20 words)",
      "opportunityDetail": "Opportunity details: unmet needs, emerging trends, timing advantages, market shifts (3-4 sentences)",
      "targetSegment": "Primary target segment (10-15 words)",
      "targetSegmentDetail": "Segment profile: demographics, psychographics, pain points, buying behavior, accessibility (3-4 sentences)"
    }
  },
  
  "solution": {
    "mvp": {
      "title": "MVP Solution",
      "concept": "Core product concept (15-20 words)",
      "conceptDetail": "Concept explanation: what it does, how it works, unique approach, user journey (3-4 sentences)",
      "coreFeature1": "Essential feature #1 (10-15 words)",
      "coreFeature1Detail": "Feature 1 deep dive: functionality, user benefit, technical approach, success metrics (3-4 sentences)",
      "coreFeature2": "Essential feature #2 (10-15 words)",
      "coreFeature2Detail": "Feature 2 deep dive: functionality, user benefit, technical approach, success metrics (3-4 sentences)",
      "coreFeature3": "Essential feature #3 (10-15 words)",
      "coreFeature3Detail": "Feature 3 deep dive: functionality, user benefit, technical approach, success metrics (3-4 sentences)",
      "userExperience": "UX philosophy (15-20 words)",
      "userExperienceDetail": "UX strategy: design principles, user flow, accessibility, mobile-first approach, delight factors (3-4 sentences)",
      "differentiation": "Key differentiators (15-20 words)",
      "differentiationDetail": "Competitive advantages: unique features, better approach, innovation, defensibility, network effects (3-4 sentences)"
    }
  },
  
  "model": {
    "businessModel": {
      "title": "Business Model",
      "revenueStreams": "Revenue sources (15-20 words)",
      "revenueStreamsDetail": "Revenue breakdown: primary/secondary streams, pricing tiers, monetization strategy, revenue mix (3-4 sentences)",
      "pricingStrategy": "Pricing approach (15-20 words)",
      "pricingStrategyDetail": "Pricing details: model (freemium/subscription/usage), tiers, value-based pricing, competitive positioning (3-4 sentences)",
      "costStructure": "Main cost drivers (15-20 words)",
      "costStructureDetail": "Cost analysis: fixed vs variable costs, major expenses, optimization opportunities, break-even point (3-4 sentences)",
      "unitEconomics": "Unit economics summary (15-20 words)",
      "unitEconomicsDetail": "Economics breakdown: CAC, LTV, LTV:CAC ratio, payback period, margin structure, path to profitability (3-4 sentences)"
    },
    "techStack": {
      "title": "Technical Stack",
      "frontend": "Frontend technologies (10-15 words)",
      "frontendDetail": "Frontend rationale: framework choice, performance, developer experience, ecosystem, scalability (3-4 sentences)",
      "backend": "Backend technologies (10-15 words)",
      "backendDetail": "Backend rationale: architecture, database, APIs, scalability, reliability, maintenance (3-4 sentences)",
      "infrastructure": "Infrastructure & DevOps (10-15 words)",
      "infrastructureDetail": "Infrastructure strategy: hosting, CI/CD, monitoring, scaling, disaster recovery, costs (3-4 sentences)",
      "aiTools": "AI/ML tools & APIs (10-15 words)",
      "aiToolsDetail": "AI integration: specific tools (Mistral, etc.), use cases, implementation, competitive advantage (3-4 sentences)",
      "security": "Security measures (10-15 words)",
      "securityDetail": "Security strategy: data protection, authentication, compliance, privacy, vulnerability management (3-4 sentences)"
    }
  },
  
  "growth": {
    "launchTimeline": {
      "title": "Launch Timeline",
      "phase1": "Phase 1: Foundation (10-15 words)",
      "phase1Detail": "Foundation phase: MVP development, initial testing, core team building, first users (3-4 sentences)",
      "phase1Duration": "Duration estimate (e.g., '8-12 weeks')",
      "phase2": "Phase 2: Validation (10-15 words)",
      "phase2Detail": "Validation phase: beta launch, user feedback, iteration, product-market fit, early traction (3-4 sentences)",
      "phase2Duration": "Duration estimate (e.g., '12-16 weeks')",
      "phase3": "Phase 3: Scale (10-15 words)",
      "phase3Detail": "Scale phase: full launch, marketing push, team expansion, feature development, market penetration (3-4 sentences)",
      "phase3Duration": "Duration estimate (e.g., '16-24 weeks')"
    },
    "growthStrategy": {
      "title": "Growth Strategy",
      "acquisitionChannels": "User acquisition channels (15-20 words)",
      "acquisitionChannelsDetail": "Acquisition strategy: primary channels, content marketing, partnerships, paid ads, viral loops (3-4 sentences)",
      "retentionStrategy": "Retention approach (15-20 words)",
      "retentionStrategyDetail": "Retention tactics: onboarding, engagement loops, value delivery, community building, customer success (3-4 sentences)",
      "scalingPlan": "Scaling roadmap (15-20 words)",
      "scalingPlanDetail": "Scaling strategy: geographic expansion, new segments, feature expansion, team growth, infrastructure (3-4 sentences)",
      "partnerships": "Strategic partnerships (15-20 words)",
      "partnershipsDetail": "Partnership strategy: key partners, integration opportunities, co-marketing, distribution channels, ecosystem (3-4 sentences)"
    }
  },
  
  "unicorn": {
    "kpis": {
      "title": "Key Performance Indicators",
      "northStarMetric": "North Star Metric (10-15 words)",
      "northStarMetricDetail": "NSM explanation: why this metric, how it reflects value, target numbers, measurement frequency (3-4 sentences)",
      "acquisitionMetrics": "Acquisition KPIs (15-20 words)",
      "acquisitionMetricsDetail": "Acquisition tracking: CAC, conversion rates, channel performance, viral coefficient, growth rate (3-4 sentences)",
      "engagementMetrics": "Engagement KPIs (15-20 words)",
      "engagementMetricsDetail": "Engagement tracking: DAU/MAU, retention curves, feature adoption, session time, user satisfaction (3-4 sentences)",
      "revenueMetrics": "Revenue KPIs (15-20 words)",
      "revenueMetricsDetail": "Revenue tracking: MRR/ARR, ARPU, churn rate, expansion revenue, gross margin, burn rate (3-4 sentences)"
    },
    "learnings": {
      "title": "Learning Framework",
      "assumptions": "Key assumptions to test (15-20 words)",
      "assumptionsDetail": "Assumptions list: customer needs, pricing, channels, product-market fit, growth levers to validate (3-4 sentences)",
      "experiments": "Planned experiments (15-20 words)",
      "experimentsDetail": "Experiment framework: A/B tests, user interviews, MVPs, landing pages, validation methods (3-4 sentences)",
      "pivotStrategy": "Pivot readiness (15-20 words)",
      "pivotStrategyDetail": "Pivot approach: decision triggers, alternative paths, flexibility points, learning integration (3-4 sentences)"
    },
    "aiAgents": {
      "title": "AI Agents Strategy",
      "agent1": "AI Agent #1 name & role (10-15 words)",
      "agent1Detail": "Agent 1 details: specific function, AI model used, integration points, user benefit (3-4 sentences)",
      "agent1Impact": "Expected impact (e.g., '30% efficiency gain')",
      "agent2": "AI Agent #2 name & role (10-15 words)",
      "agent2Detail": "Agent 2 details: specific function, AI model used, integration points, user benefit (3-4 sentences)",
      "agent2Impact": "Expected impact (e.g., '50% cost reduction')",
      "agent3": "AI Agent #3 name & role (10-15 words)",
      "agent3Detail": "Agent 3 details: specific function, AI model used, integration points, user benefit (3-4 sentences)",
      "agent3Impact": "Expected impact (e.g., '2x user engagement')"
    }
  }
}

CRITICAL REQUIREMENTS:
- Return ONLY valid JSON, no markdown, no explanations
- Short fields: max 20 words, punchy and clear
- Detail fields: exactly 3-4 complete sentences, concrete and actionable
- Be specific with numbers, timelines, and metrics
- Use real-world business language
- Focus on viability and execution
- Leverage AI tools (Mistral, Fal.ai, ElevenLabs, Qdrant, N8n, Lovable)
- Think like a seasoned startup advisor
- Respond in ENGLISH`
}
