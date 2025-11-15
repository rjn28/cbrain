/**
 * Prompts spécifiques pour chaque catégorie de l'arbre stratégique
 */

export function getProjectSummaryPrompt(idea: string): string {
  return `You are a strategic business advisor. Based on this startup idea, generate ONLY a project summary in JSON format.

Startup idea: "${idea}"

CRITICAL: Return ONLY valid JSON with NO markdown formatting (no **, no *, no links). Start directly with { and end with }. Do NOT use markdown in text values.

Structure:
{
  "projectName": "Short catchy name (2-4 words)",
  "tagline": "One-line description (max 10 words)"
}

Be strategic, specific, and future-focused.`
}

export function getQdrantThinkingPrompt(idea: string, projectName: string): string {
  return `Find 3 real YC companies similar to this idea: "${idea}". Keep responses VERY SHORT.

CRITICAL: Return ONLY valid JSON. NO markdown. NO special chars. Max 10 words per detail.

{
  "ycInsights": {
    "company1": "Real YC Company Name 1",
    "company1Detail": "One key lesson (max 10 words)",
    "company1Batch": "S20",
    "company2": "Real YC Company Name 2",
    "company2Detail": "One key lesson (max 10 words)",
    "company2Batch": "W21",
    "company3": "Real YC Company Name 3",
    "company3Detail": "One key lesson (max 10 words)",
    "company3Batch": "S21"
  },
  "learnings": {
    "marketValidation": "Market insight (3-5 words)",
    "marketValidationDetail": "One sentence (max 10 words)",
    "competitiveAdvantage": "Advantage (3-5 words)",
    "competitiveAdvantageDetail": "One sentence (max 10 words)",
    "keyLearnings": "Main lesson (3-5 words)",
    "keyLearningsDetail": "One sentence (max 10 words)"
  }
}`
}

export function getVisionPrompt(idea: string, projectName: string): string {
  return `You are a strategic business advisor. Based on this startup idea, generate the VISION section in JSON format.

Startup idea: "${idea}"
Project name: "${projectName}"

CRITICAL: Return ONLY valid JSON with NO markdown formatting (no **, no *, no links). Start directly with { and end with }. Do NOT use markdown in text values.

Structure:
{
  "strategy": {
    "vision": "Main vision (5-8 words)",
    "visionDetail": "Detailed vision explanation (2-3 sentences)",
    "mission": "Mission statement (5-8 words)",
    "missionDetail": "Detailed mission explanation (2-3 sentences)",
    "values": "Core values (3-5 words)",
    "valuesDetail": "Values explanation (2-3 sentences)"
  },
  "marketStudy": {
    "marketSize": "Market size description (5-8 words)",
    "marketSizeDetail": "Market analysis (2-3 sentences)",
    "competition": "Competition overview (5-8 words)",
    "competitionDetail": "Competition analysis (2-3 sentences)",
    "opportunity": "Market opportunity (5-8 words)",
    "opportunityDetail": "Opportunity explanation (2-3 sentences)"
  }
}`
}

export function getSolutionPrompt(idea: string, projectName: string): string {
  return `You are a product strategist. Based on this startup idea, generate the SOLUTION (MVP) section in JSON format.

Startup idea: "${idea}"
Project name: "${projectName}"

CRITICAL: Return ONLY valid JSON with NO markdown formatting (no **, no *, no links). Start directly with { and end with }. Do NOT use markdown in text values.

Structure:
{
  "mvp": {
    "concept": "Core concept (5-8 words)",
    "conceptDetail": "Concept explanation (2-3 sentences)",
    "coreFeature1": "Feature 1 name (3-5 words)",
    "coreFeature1Detail": "Feature 1 description (2-3 sentences)",
    "coreFeature2": "Feature 2 name (3-5 words)",
    "coreFeature2Detail": "Feature 2 description (2-3 sentences)",
    "coreFeature3": "Feature 3 name (3-5 words)",
    "coreFeature3Detail": "Feature 3 description (2-3 sentences)",
    "userExperience": "UX approach (5-8 words)",
    "userExperienceDetail": "UX explanation (2-3 sentences)"
  }
}`
}

export function getModelPrompt(idea: string, projectName: string): string {
  return `You are a business model expert. Based on this startup idea, generate the MODEL (Business & Tech) section in JSON format.

Startup idea: "${idea}"
Project name: "${projectName}"

CRITICAL: Return ONLY valid JSON with NO markdown formatting (no **, no *, no links). Start directly with { and end with }. Do NOT use markdown in text values.

Structure:
{
  "businessModel": {
    "revenueStreams": "Revenue model (5-8 words)",
    "revenueStreamsDetail": "Revenue explanation (2-3 sentences)",
    "pricingStrategy": "Pricing approach (5-8 words)",
    "pricingStrategyDetail": "Pricing explanation (2-3 sentences)",
    "unitEconomics": "Economics summary (5-8 words)",
    "unitEconomicsDetail": "Economics explanation (2-3 sentences)"
  },
  "techStack": {
    "frontend": "Frontend tech (3-5 words)",
    "frontendDetail": "Frontend explanation (2-3 sentences)",
    "backend": "Backend tech (3-5 words)",
    "backendDetail": "Backend explanation (2-3 sentences)",
    "aiTools": "AI tools (3-5 words)",
    "aiToolsDetail": "AI tools explanation (2-3 sentences)"
  }
}`
}

export function getGrowthPrompt(idea: string, projectName: string): string {
  return `You are a growth strategist. Based on this startup idea, generate the GROWTH (Launch) section in JSON format.

Startup idea: "${idea}"
Project name: "${projectName}"

CRITICAL: Return ONLY valid JSON with NO markdown formatting (no **, no *, no links). Start directly with { and end with }. Do NOT use markdown in text values.

Structure:
{
  "launchTimeline": {
    "phase1": "Phase 1 name (3-5 words)",
    "phase1Detail": "Phase 1 description (2-3 sentences)",
    "phase2": "Phase 2 name (3-5 words)",
    "phase2Detail": "Phase 2 description (2-3 sentences)",
    "phase3": "Phase 3 name (3-5 words)",
    "phase3Detail": "Phase 3 description (2-3 sentences)"
  },
  "growthStrategy": {
    "acquisitionChannels": "Acquisition channels (5-8 words)",
    "acquisitionChannelsDetail": "Acquisition explanation (2-3 sentences)",
    "retentionStrategy": "Retention approach (5-8 words)",
    "retentionStrategyDetail": "Retention explanation (2-3 sentences)",
    "scalingPlan": "Scaling strategy (5-8 words)",
    "scalingPlanDetail": "Scaling explanation (2-3 sentences)"
  }
}`
}

export function getUnicornPrompt(idea: string, projectName: string): string {
  return `You are a venture capital advisor. Based on this startup idea, generate the UNICORN (KPIs & AI) section in JSON format.

Startup idea: "${idea}"
Project name: "${projectName}"

CRITICAL: Return ONLY valid JSON with NO markdown formatting (no **, no *, no links). Start directly with { and end with }. Do NOT use markdown in text values.

Structure:
{
  "kpis": {
    "northStarMetric": "North Star metric (5-8 words)",
    "northStarMetricDetail": "North Star explanation (2-3 sentences)",
    "acquisitionMetrics": "Acquisition KPIs (5-8 words)",
    "acquisitionMetricsDetail": "Acquisition KPIs explanation (2-3 sentences)",
    "engagementMetrics": "Engagement KPIs (5-8 words)",
    "engagementMetricsDetail": "Engagement KPIs explanation (2-3 sentences)"
  },
  "aiAgents": {
    "agent1": "AI Agent 1 name (3-5 words)",
    "agent1Detail": "Agent 1 description (2-3 sentences)",
    "agent1Impact": "Agent 1 impact (1 sentence)",
    "agent2": "AI Agent 2 name (3-5 words)",
    "agent2Detail": "Agent 2 description (2-3 sentences)",
    "agent2Impact": "Agent 2 impact (1 sentence)",
    "agent3": "AI Agent 3 name (3-5 words)",
    "agent3Detail": "Agent 3 description (2-3 sentences)",
    "agent3Impact": "Agent 3 impact (1 sentence)"
  }
}`
}
