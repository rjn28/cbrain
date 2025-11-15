/**
 * Parser v2 pour transformer les données ComprehensiveStrategy en nœuds et edges React Flow
 * Compatible avec la nouvelle structure en 5 carrés
 */

import { Node, Edge } from "@xyflow/react"
import type { ComprehensiveStrategy } from "@/types/strategy-v2"

/**
 * Crée les nœuds React Flow à partir de la stratégie v2
 * @param strategy - Données de stratégie au format ComprehensiveStrategy
 * @returns Liste des nœuds pour React Flow
 */
export function createNodesFromMistralV2(strategy: ComprehensiveStrategy): Node[] {
  const nodes: Node[] = []

  // Node racine - Tagline
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
      boxShadow: "0 8px 16px rgba(102,126,234,0.4)",
      textAlign: "center",
      minWidth: "280px",
      whiteSpace: "pre-line",
    },
  })

  // Node nom du projet
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
      boxShadow: "0 4px 12px rgba(102,126,234,0.2)",
      textAlign: "center",
      minWidth: "300px",
      whiteSpace: "pre-line",
    },
  })

  // Nodes principaux - 5 carrés
  const mainNodes = [
    { id: "vision", label: "🎯 Vision\nStrategy & Market", x: 50, color: "#3b82f6" },
    { id: "solution", label: "💡 Solution\nMVP", x: 280, color: "#8b5cf6" },
    { id: "model", label: "💼 Model\nBusiness & Tech", x: 510, color: "#10b981" },
    { id: "growth", label: "📈 Growth\nLaunch", x: 740, color: "#f59e0b" },
    { id: "unicorn", label: "🦄 Unicorn\nKPIs & AI", x: 970, color: "#ec4899" },
  ]

  mainNodes.forEach(node => {
    nodes.push({
      id: node.id,
      data: { label: node.label },
      position: { x: node.x, y: 250 },
      style: {
        background: node.color,
        color: "white",
        border: "none",
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "14px",
        fontWeight: "500",
        textAlign: "center",
        whiteSpace: "pre-line",
      },
    })
  })

  // ===== SQUARE 1: VISION =====
  
  // Sous-nodes Strategy
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

  // Sous-nodes Market Study
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

  // ===== SQUARE 2: SOLUTION =====
  
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

  // ===== SQUARE 3: MODEL =====
  
  // Sous-nodes Business Model
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

  // Sous-nodes Tech Stack
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

  // ===== SQUARE 4: GROWTH =====
  
  // Sous-nodes Timeline
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

  // Sous-nodes Growth Strategy
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

  // ===== SQUARE 5: UNICORN =====
  
  // Sous-nodes KPIs
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

  // Sous-nodes AI Agents
  const agentNodes = [
    { id: "unicorn-agent1", label: `🤖 ${strategy.unicorn.aiAgents.agent1}`, detail: strategy.unicorn.aiAgents.agent1Detail, y: 800 },
    { id: "unicorn-agent2", label: `🤖 ${strategy.unicorn.aiAgents.agent2}`, detail: strategy.unicorn.aiAgents.agent2Detail, y: 930 },
    { id: "unicorn-agent3", label: `🤖 ${strategy.unicorn.aiAgents.agent3}`, detail: strategy.unicorn.aiAgents.agent3Detail, y: 1060 },
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

  return nodes
}

/**
 * Crée les connexions (edges) entre les nœuds de l'arbre v2
 * @returns Liste des edges pour React Flow
 */
export function createEdgesFromMistralV2(): Edge[] {
  return [
    // Connexion root -> project-name
    { id: "e-root-project", source: "root", target: "project-name", animated: true, style: { stroke: "#667eea", strokeWidth: 3 } },
    
    // Connexions principales depuis project-name vers les 5 carrés
    { id: "e-project-vision", source: "project-name", target: "vision", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
    { id: "e-project-solution", source: "project-name", target: "solution", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 2 } },
    { id: "e-project-model", source: "project-name", target: "model", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
    { id: "e-project-growth", source: "project-name", target: "growth", animated: true, style: { stroke: "#f59e0b", strokeWidth: 2 } },
    { id: "e-project-unicorn", source: "project-name", target: "unicorn", animated: true, style: { stroke: "#ec4899", strokeWidth: 2 } },
    
    // SQUARE 1: Vision - Strategy
    { id: "e-vision-vision", source: "vision", target: "vision-vision", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 } },
    { id: "e-vision-mission", source: "vision", target: "vision-mission", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 } },
    { id: "e-vision-values", source: "vision", target: "vision-values", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 } },
    
    // SQUARE 1: Vision - Market
    { id: "e-vision-market", source: "vision", target: "vision-market", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 } },
    { id: "e-vision-competition", source: "vision", target: "vision-competition", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 } },
    { id: "e-vision-opportunity", source: "vision", target: "vision-opportunity", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 } },
    
    // SQUARE 2: Solution
    { id: "e-solution-concept", source: "solution", target: "solution-concept", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 1.5 } },
    { id: "e-solution-feature1", source: "solution", target: "solution-feature1", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 1.5 } },
    { id: "e-solution-feature2", source: "solution", target: "solution-feature2", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 1.5 } },
    { id: "e-solution-feature3", source: "solution", target: "solution-feature3", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 1.5 } },
    { id: "e-solution-ux", source: "solution", target: "solution-ux", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 1.5 } },
    
    // SQUARE 3: Model - Business
    { id: "e-model-revenue", source: "model", target: "model-revenue", animated: true, style: { stroke: "#10b981", strokeWidth: 1.5 } },
    { id: "e-model-pricing", source: "model", target: "model-pricing", animated: true, style: { stroke: "#10b981", strokeWidth: 1.5 } },
    { id: "e-model-economics", source: "model", target: "model-economics", animated: true, style: { stroke: "#10b981", strokeWidth: 1.5 } },
    
    // SQUARE 3: Model - Tech
    { id: "e-model-frontend", source: "model", target: "model-frontend", animated: true, style: { stroke: "#10b981", strokeWidth: 1.5 } },
    { id: "e-model-backend", source: "model", target: "model-backend", animated: true, style: { stroke: "#10b981", strokeWidth: 1.5 } },
    { id: "e-model-ai", source: "model", target: "model-ai", animated: true, style: { stroke: "#10b981", strokeWidth: 1.5 } },
    
    // SQUARE 4: Growth - Timeline
    { id: "e-growth-phase1", source: "growth", target: "growth-phase1", animated: true, style: { stroke: "#f59e0b", strokeWidth: 1.5 } },
    { id: "e-growth-phase2", source: "growth", target: "growth-phase2", animated: true, style: { stroke: "#f59e0b", strokeWidth: 1.5 } },
    { id: "e-growth-phase3", source: "growth", target: "growth-phase3", animated: true, style: { stroke: "#f59e0b", strokeWidth: 1.5 } },
    
    // SQUARE 4: Growth - Strategy
    { id: "e-growth-acquisition", source: "growth", target: "growth-acquisition", animated: true, style: { stroke: "#f59e0b", strokeWidth: 1.5 } },
    { id: "e-growth-retention", source: "growth", target: "growth-retention", animated: true, style: { stroke: "#f59e0b", strokeWidth: 1.5 } },
    { id: "e-growth-scaling", source: "growth", target: "growth-scaling", animated: true, style: { stroke: "#f59e0b", strokeWidth: 1.5 } },
    
    // SQUARE 5: Unicorn - KPIs
    { id: "e-unicorn-north-star", source: "unicorn", target: "unicorn-north-star", animated: true, style: { stroke: "#ec4899", strokeWidth: 1.5 } },
    { id: "e-unicorn-acquisition", source: "unicorn", target: "unicorn-acquisition", animated: true, style: { stroke: "#ec4899", strokeWidth: 1.5 } },
    { id: "e-unicorn-engagement", source: "unicorn", target: "unicorn-engagement", animated: true, style: { stroke: "#ec4899", strokeWidth: 1.5 } },
    
    // SQUARE 5: Unicorn - AI Agents
    { id: "e-unicorn-agent1", source: "unicorn", target: "unicorn-agent1", animated: true, style: { stroke: "#ec4899", strokeWidth: 1.5 } },
    { id: "e-unicorn-agent2", source: "unicorn", target: "unicorn-agent2", animated: true, style: { stroke: "#ec4899", strokeWidth: 1.5 } },
    { id: "e-unicorn-agent3", source: "unicorn", target: "unicorn-agent3", animated: true, style: { stroke: "#ec4899", strokeWidth: 1.5 } },
  ]
}
