/**
 * Parser progressif pour construire l'arbre au fur et à mesure que les données arrivent
 */

import { Node, Edge } from "@xyflow/react"
import type { ComprehensiveStrategy } from "@/types/strategy-v2"

/**
 * Crée les nœuds progressivement à partir des données partielles
 */
export function createNodesProgressively(strategy: Partial<ComprehensiveStrategy>): Node[] {
  const nodes: Node[] = []

  // Node racine - Tagline (si disponible)
  if (strategy.tagline) {
    nodes.push({
      id: "root",
      type: "input",
      data: { label: `💡 ${strategy.tagline}` },
      position: { x: 450, y: 30 },
      style: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        border: "none",
        borderRadius: "12px",
        padding: "14px 22px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 8px 16px rgba(102,126,234,0.2)",
        textAlign: "center",
        minWidth: "280px",
        whiteSpace: "pre-line",
      },
    })
  }

  // Node nom du projet (si disponible)
  if (strategy.projectName) {
    nodes.push({
      id: "project-name",
      data: { label: strategy.projectName },
      position: { x: 450, y: 120 },
      style: {
        background: "white",
        color: "#1f2937",
        border: "3px solid #667eea",
        borderRadius: "12px",
        padding: "16px 24px",
        fontSize: "15px",
        fontWeight: "600",
        boxShadow: "0 4px 12px rgba(102,126,234,0.15)",
        textAlign: "center",
        minWidth: "300px",
        whiteSpace: "pre-line",
      },
    })
  }

  // Nodes principaux - 5 carrés
  const mainNodes = [
    { id: "vision", label: "🎯 Vision\nStrategy & Market", x: 50, color: "#3b82f6", hasData: !!strategy.vision },
    { id: "solution", label: "💡 Solution\nMVP", x: 280, color: "#8b5cf6", hasData: !!strategy.solution },
    { id: "model", label: "💼 Model\nBusiness & Tech", x: 510, color: "#10b981", hasData: !!strategy.model },
    { id: "growth", label: "📈 Growth\nLaunch", x: 740, color: "#f59e0b", hasData: !!strategy.growth },
    { id: "unicorn", label: "🦄 Unicorn\nKPIs & AI", x: 970, color: "#ec4899", hasData: !!strategy.unicorn },
  ]

  mainNodes.forEach(node => {
    nodes.push({
      id: node.id,
      data: { label: node.label },
      position: { x: node.x, y: 250 },
      style: {
        background: node.hasData ? node.color : "#e5e7eb",
        color: node.hasData ? "white" : "#9ca3af",
        border: "none",
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "14px",
        fontWeight: "500",
        textAlign: "center",
        whiteSpace: "pre-line",
        opacity: node.hasData ? 1 : 0.5,
      },
    })
  })

  // Ajouter les sous-nœuds si les données sont disponibles
  if (strategy.vision?.strategy) {
    const strategyNodes = [
      { id: "vision-vision", label: `🎯 Vision\n${strategy.vision.strategy.vision}`, detail: strategy.vision.strategy.visionDetail, y: 410 },
      { id: "vision-mission", label: `🚀 Mission\n${strategy.vision.strategy.mission}`, detail: strategy.vision.strategy.missionDetail, y: 540 },
      { id: "vision-values", label: `💎 Values\n${strategy.vision.strategy.values}`, detail: strategy.vision.strategy.valuesDetail, y: 670 },
    ]
    strategyNodes.forEach(node => {
      nodes.push({
        id: node.id,
        data: { label: node.label, detail: node.detail },
        position: { x: 20, y: node.y },
        style: {
          background: "white",
          color: "#1f2937",
          border: "2px solid #3b82f6",
          borderRadius: "8px",
          padding: "14px 18px",
          fontSize: "13px",
          minWidth: "180px",
          textAlign: "center",
          whiteSpace: "pre-line",
          cursor: "pointer",
        },
      })
    })
  }

  if (strategy.vision?.marketStudy) {
    const marketNodes = [
      { id: "vision-market", label: `📊 Market\n${strategy.vision.marketStudy.marketSize}`, detail: strategy.vision.marketStudy.marketSizeDetail, y: 800 },
      { id: "vision-competition", label: `⚔️ Competition\n${strategy.vision.marketStudy.competition}`, detail: strategy.vision.marketStudy.competitionDetail, y: 930 },
      { id: "vision-opportunity", label: `🎯 Opportunity\n${strategy.vision.marketStudy.opportunity}`, detail: strategy.vision.marketStudy.opportunityDetail, y: 1060 },
    ]
    marketNodes.forEach(node => {
      nodes.push({
        id: node.id,
        data: { label: node.label, detail: node.detail },
        position: { x: 20, y: node.y },
        style: {
          background: "white",
          color: "#1f2937",
          border: "2px solid #3b82f6",
          borderRadius: "8px",
          padding: "14px 18px",
          fontSize: "13px",
          minWidth: "180px",
          textAlign: "center",
          whiteSpace: "pre-line",
          cursor: "pointer",
        },
      })
    })
  }

  // Solution
  if (strategy.solution?.mvp) {
    const solutionNodes = [
      { id: "solution-concept", label: `💡 Concept\n${strategy.solution.mvp.concept}`, detail: strategy.solution.mvp.conceptDetail, y: 410 },
      { id: "solution-feature1", label: `⭐ Feature 1\n${strategy.solution.mvp.coreFeature1}`, detail: strategy.solution.mvp.coreFeature1Detail, y: 540 },
      { id: "solution-feature2", label: `⭐ Feature 2\n${strategy.solution.mvp.coreFeature2}`, detail: strategy.solution.mvp.coreFeature2Detail, y: 670 },
      { id: "solution-feature3", label: `⭐ Feature 3\n${strategy.solution.mvp.coreFeature3}`, detail: strategy.solution.mvp.coreFeature3Detail, y: 800 },
      { id: "solution-ux", label: `🎨 UX\n${strategy.solution.mvp.userExperience}`, detail: strategy.solution.mvp.userExperienceDetail, y: 930 },
    ]
    solutionNodes.forEach(node => {
      nodes.push({
        id: node.id,
        data: { label: node.label, detail: node.detail },
        position: { x: 250, y: node.y },
        style: {
          background: "white",
          color: "#1f2937",
          border: "2px solid #8b5cf6",
          borderRadius: "8px",
          padding: "14px 18px",
          fontSize: "13px",
          minWidth: "180px",
          textAlign: "center",
          whiteSpace: "pre-line",
          cursor: "pointer",
        },
      })
    })
  }

  // Model - Business
  if (strategy.model?.businessModel) {
    const businessNodes = [
      { id: "model-revenue", label: `💰 Revenue\n${strategy.model.businessModel.revenueStreams}`, detail: strategy.model.businessModel.revenueStreamsDetail, y: 410 },
      { id: "model-pricing", label: `💵 Pricing\n${strategy.model.businessModel.pricingStrategy}`, detail: strategy.model.businessModel.pricingStrategyDetail, y: 540 },
      { id: "model-economics", label: `📊 Economics\n${strategy.model.businessModel.unitEconomics}`, detail: strategy.model.businessModel.unitEconomicsDetail, y: 670 },
    ]
    businessNodes.forEach(node => {
      nodes.push({
        id: node.id,
        data: { label: node.label, detail: node.detail },
        position: { x: 480, y: node.y },
        style: {
          background: "white",
          color: "#1f2937",
          border: "2px solid #10b981",
          borderRadius: "8px",
          padding: "14px 18px",
          fontSize: "13px",
          minWidth: "180px",
          textAlign: "center",
          whiteSpace: "pre-line",
          cursor: "pointer",
        },
      })
    })
  }

  // Model - Tech
  if (strategy.model?.techStack) {
    const techNodes = [
      { id: "model-frontend", label: `🎨 Frontend\n${strategy.model.techStack.frontend}`, detail: strategy.model.techStack.frontendDetail, y: 800 },
      { id: "model-backend", label: `⚙️ Backend\n${strategy.model.techStack.backend}`, detail: strategy.model.techStack.backendDetail, y: 930 },
      { id: "model-ai", label: `🤖 AI Tools\n${strategy.model.techStack.aiTools}`, detail: strategy.model.techStack.aiToolsDetail, y: 1060 },
    ]
    techNodes.forEach(node => {
      nodes.push({
        id: node.id,
        data: { label: node.label, detail: node.detail },
        position: { x: 480, y: node.y },
        style: {
          background: "white",
          color: "#1f2937",
          border: "2px solid #10b981",
          borderRadius: "8px",
          padding: "14px 18px",
          fontSize: "13px",
          minWidth: "180px",
          textAlign: "center",
          whiteSpace: "pre-line",
          cursor: "pointer",
        },
      })
    })
  }

  // Growth - Timeline
  if (strategy.growth?.launchTimeline) {
    const timelineNodes = [
      { id: "growth-phase1", label: `1️⃣ ${strategy.growth.launchTimeline.phase1}`, detail: strategy.growth.launchTimeline.phase1Detail, y: 410 },
      { id: "growth-phase2", label: `2️⃣ ${strategy.growth.launchTimeline.phase2}`, detail: strategy.growth.launchTimeline.phase2Detail, y: 540 },
      { id: "growth-phase3", label: `3️⃣ ${strategy.growth.launchTimeline.phase3}`, detail: strategy.growth.launchTimeline.phase3Detail, y: 670 },
    ]
    timelineNodes.forEach(node => {
      nodes.push({
        id: node.id,
        data: { label: node.label, detail: node.detail },
        position: { x: 710, y: node.y },
        style: {
          background: "white",
          color: "#1f2937",
          border: "2px solid #f59e0b",
          borderRadius: "8px",
          padding: "14px 18px",
          fontSize: "13px",
          minWidth: "180px",
          textAlign: "center",
          whiteSpace: "pre-line",
          cursor: "pointer",
        },
      })
    })
  }

  // Growth - Strategy
  if (strategy.growth?.growthStrategy) {
    const growthStrategyNodes = [
      { id: "growth-acquisition", label: `📢 Acquisition\n${strategy.growth.growthStrategy.acquisitionChannels}`, detail: strategy.growth.growthStrategy.acquisitionChannelsDetail, y: 800 },
      { id: "growth-retention", label: `🔄 Retention\n${strategy.growth.growthStrategy.retentionStrategy}`, detail: strategy.growth.growthStrategy.retentionStrategyDetail, y: 930 },
      { id: "growth-scaling", label: `📈 Scaling\n${strategy.growth.growthStrategy.scalingPlan}`, detail: strategy.growth.growthStrategy.scalingPlanDetail, y: 1060 },
    ]
    growthStrategyNodes.forEach(node => {
      nodes.push({
        id: node.id,
        data: { label: node.label, detail: node.detail },
        position: { x: 710, y: node.y },
        style: {
          background: "white",
          color: "#1f2937",
          border: "2px solid #f59e0b",
          borderRadius: "8px",
          padding: "14px 18px",
          fontSize: "13px",
          minWidth: "180px",
          textAlign: "center",
          whiteSpace: "pre-line",
          cursor: "pointer",
        },
      })
    })
  }

  // Unicorn - KPIs
  if (strategy.unicorn?.kpis) {
    const kpiNodes = [
      { id: "unicorn-north-star", label: `⭐ North Star\n${strategy.unicorn.kpis.northStarMetric}`, detail: strategy.unicorn.kpis.northStarMetricDetail, y: 410 },
      { id: "unicorn-acquisition", label: `📊 Acquisition\n${strategy.unicorn.kpis.acquisitionMetrics}`, detail: strategy.unicorn.kpis.acquisitionMetricsDetail, y: 540 },
      { id: "unicorn-engagement", label: `💪 Engagement\n${strategy.unicorn.kpis.engagementMetrics}`, detail: strategy.unicorn.kpis.engagementMetricsDetail, y: 670 },
    ]
    kpiNodes.forEach(node => {
      nodes.push({
        id: node.id,
        data: { label: node.label, detail: node.detail },
        position: { x: 940, y: node.y },
        style: {
          background: "white",
          color: "#1f2937",
          border: "2px solid #ec4899",
          borderRadius: "8px",
          padding: "14px 18px",
          fontSize: "13px",
          minWidth: "180px",
          textAlign: "center",
          whiteSpace: "pre-line",
          cursor: "pointer",
        },
      })
    })
  }

  // Unicorn - AI Agents
  if (strategy.unicorn?.aiAgents) {
    const agentNodes = [
      { id: "unicorn-agent1", label: `🤖 ${strategy.unicorn.aiAgents.agent1}`, detail: `${strategy.unicorn.aiAgents.agent1Detail}\n\nImpact: ${strategy.unicorn.aiAgents.agent1Impact}`, y: 800 },
      { id: "unicorn-agent2", label: `🤖 ${strategy.unicorn.aiAgents.agent2}`, detail: `${strategy.unicorn.aiAgents.agent2Detail}\n\nImpact: ${strategy.unicorn.aiAgents.agent2Impact}`, y: 930 },
      { id: "unicorn-agent3", label: `🤖 ${strategy.unicorn.aiAgents.agent3}`, detail: `${strategy.unicorn.aiAgents.agent3Detail}\n\nImpact: ${strategy.unicorn.aiAgents.agent3Impact}`, y: 1060 },
    ]
    agentNodes.forEach(node => {
      nodes.push({
        id: node.id,
        data: { label: node.label, detail: node.detail },
        position: { x: 940, y: node.y },
        style: {
          background: "white",
          color: "#1f2937",
          border: "2px solid #ec4899",
          borderRadius: "8px",
          padding: "14px 18px",
          fontSize: "13px",
          minWidth: "180px",
          textAlign: "center",
          whiteSpace: "pre-line",
          cursor: "pointer",
        },
      })
    })
  }

  return nodes
}

/**
 * Crée les edges basés sur les nœuds disponibles
 */
export function createEdgesProgressively(nodes: Node[]): Edge[] {
  const edges: Edge[] = []
  const nodeIds = new Set(nodes.map(n => n.id))

  // Helper pour ajouter un edge seulement si les deux nœuds existent
  const addEdge = (id: string, source: string, target: string, color: string) => {
    if (nodeIds.has(source) && nodeIds.has(target)) {
      edges.push({
        id,
        source,
        target,
        animated: true,
        style: { stroke: color, strokeWidth: 2 },
      })
    }
  }

  // Connexions principales
  addEdge("e-root-project", "root", "project-name", "#667eea")
  addEdge("e-project-vision", "project-name", "vision", "#3b82f6")
  addEdge("e-project-solution", "project-name", "solution", "#8b5cf6")
  addEdge("e-project-model", "project-name", "model", "#10b981")
  addEdge("e-project-growth", "project-name", "growth", "#f59e0b")
  addEdge("e-project-unicorn", "project-name", "unicorn", "#ec4899")

  // Vision
  addEdge("e-vision-vision", "vision", "vision-vision", "#3b82f6")
  addEdge("e-vision-mission", "vision", "vision-mission", "#3b82f6")
  addEdge("e-vision-values", "vision", "vision-values", "#3b82f6")
  addEdge("e-vision-market", "vision", "vision-market", "#3b82f6")
  addEdge("e-vision-competition", "vision", "vision-competition", "#3b82f6")
  addEdge("e-vision-opportunity", "vision", "vision-opportunity", "#3b82f6")

  // Solution
  addEdge("e-solution-concept", "solution", "solution-concept", "#8b5cf6")
  addEdge("e-solution-feature1", "solution", "solution-feature1", "#8b5cf6")
  addEdge("e-solution-feature2", "solution", "solution-feature2", "#8b5cf6")
  addEdge("e-solution-feature3", "solution", "solution-feature3", "#8b5cf6")
  addEdge("e-solution-ux", "solution", "solution-ux", "#8b5cf6")

  // Model
  addEdge("e-model-revenue", "model", "model-revenue", "#10b981")
  addEdge("e-model-pricing", "model", "model-pricing", "#10b981")
  addEdge("e-model-economics", "model", "model-economics", "#10b981")
  addEdge("e-model-frontend", "model", "model-frontend", "#10b981")
  addEdge("e-model-backend", "model", "model-backend", "#10b981")
  addEdge("e-model-ai", "model", "model-ai", "#10b981")

  // Growth
  addEdge("e-growth-phase1", "growth", "growth-phase1", "#f59e0b")
  addEdge("e-growth-phase2", "growth", "growth-phase2", "#f59e0b")
  addEdge("e-growth-phase3", "growth", "growth-phase3", "#f59e0b")
  addEdge("e-growth-acquisition", "growth", "growth-acquisition", "#f59e0b")
  addEdge("e-growth-retention", "growth", "growth-retention", "#f59e0b")
  addEdge("e-growth-scaling", "growth", "growth-scaling", "#f59e0b")

  // Unicorn
  addEdge("e-unicorn-north-star", "unicorn", "unicorn-north-star", "#ec4899")
  addEdge("e-unicorn-acquisition", "unicorn", "unicorn-acquisition", "#ec4899")
  addEdge("e-unicorn-engagement", "unicorn", "unicorn-engagement", "#ec4899")
  addEdge("e-unicorn-agent1", "unicorn", "unicorn-agent1", "#ec4899")
  addEdge("e-unicorn-agent2", "unicorn", "unicorn-agent2", "#ec4899")
  addEdge("e-unicorn-agent3", "unicorn", "unicorn-agent3", "#ec4899")

  return edges
}
