/**
 * Transforme la stratégie en 5 carrés en nœuds React Flow
 */

import { Node, Edge } from '@xyflow/react'
import { ComprehensiveStrategy } from '@/types/strategy-v2'
import { SQUARE_COLORS } from '@/config/nodes-v2'

export function strategyToNodesV2(strategy: ComprehensiveStrategy): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []
  
  let nodeId = 0
  const getId = () => `node-${nodeId++}`
  
  // Root node
  const rootId = getId()
  nodes.push({
    id: rootId,
    type: 'default',
    position: { x: 400, y: 0 },
    data: { 
      label: '🧠 CBrain Strategy Framework',
      isMain: true,
    },
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: '2px solid #5a67d8',
      borderRadius: '12px',
      padding: '16px 24px',
      fontSize: '18px',
      fontWeight: 'bold',
      minWidth: '300px',
    },
  })
  
  // Project name
  const projectId = getId()
  nodes.push({
    id: projectId,
    type: 'default',
    position: { x: 350, y: 100 },
    data: { 
      label: `${strategy.projectName}\n${strategy.tagline}`,
      isMain: true,
    },
    style: {
      background: 'white',
      border: '2px solid #e2e8f0',
      borderRadius: '10px',
      padding: '12px 20px',
      fontSize: '14px',
      textAlign: 'center',
      minWidth: '400px',
      whiteSpace: 'pre-line',
    },
  })
  edges.push({
    id: `${rootId}-${projectId}`,
    source: rootId,
    target: projectId,
    animated: true,
  })
  
  // Carré 1: Vision (gauche haut)
  const vision1Id = getId()
  nodes.push({
    id: vision1Id,
    type: 'default',
    position: { x: 50, y: 250 },
    data: { 
      label: '🎯 Carré 1: Vision',
      isMain: true,
    },
    style: {
      background: SQUARE_COLORS.vision.main,
      color: 'white',
      border: `3px solid ${SQUARE_COLORS.vision.border}`,
      borderRadius: '12px',
      padding: '14px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      minWidth: '200px',
    },
  })
  edges.push({
    id: `${projectId}-${vision1Id}`,
    source: projectId,
    target: vision1Id,
    animated: true,
    style: { stroke: SQUARE_COLORS.vision.main },
  })
  
  // Vision - Strategy
  const visionStratId = getId()
  nodes.push({
    id: visionStratId,
    type: 'default',
    position: { x: 20, y: 350 },
    data: { 
      label: `📋 ${strategy.vision.strategy.title}\n${strategy.vision.strategy.vision}`,
      detail: {
        vision: strategy.vision.strategy.visionDetail,
        mission: strategy.vision.strategy.missionDetail,
        values: strategy.vision.strategy.valuesDetail,
      },
    },
    style: {
      background: SQUARE_COLORS.vision.light,
      border: `2px solid ${SQUARE_COLORS.vision.border}`,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '12px',
      minWidth: '180px',
      maxWidth: '220px',
      whiteSpace: 'pre-line',
    },
  })
  edges.push({
    id: `${vision1Id}-${visionStratId}`,
    source: vision1Id,
    target: visionStratId,
  })
  
  // Vision - Market
  const visionMarketId = getId()
  nodes.push({
    id: visionMarketId,
    type: 'default',
    position: { x: 20, y: 480 },
    data: { 
      label: `📊 ${strategy.vision.marketStudy.title}\n${strategy.vision.marketStudy.marketSize}`,
      detail: {
        marketSize: strategy.vision.marketStudy.marketSizeDetail,
        competition: strategy.vision.marketStudy.competitionDetail,
        opportunity: strategy.vision.marketStudy.opportunityDetail,
        targetSegment: strategy.vision.marketStudy.targetSegmentDetail,
      },
    },
    style: {
      background: SQUARE_COLORS.vision.light,
      border: `2px solid ${SQUARE_COLORS.vision.border}`,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '12px',
      minWidth: '180px',
      maxWidth: '220px',
      whiteSpace: 'pre-line',
    },
  })
  edges.push({
    id: `${vision1Id}-${visionMarketId}`,
    source: vision1Id,
    target: visionMarketId,
  })
  
  // Carré 2: Solution (gauche milieu)
  const solution2Id = getId()
  nodes.push({
    id: solution2Id,
    type: 'default',
    position: { x: 300, y: 250 },
    data: { 
      label: '💡 Carré 2: Solution MVP',
      isMain: true,
    },
    style: {
      background: SQUARE_COLORS.solution.main,
      color: 'white',
      border: `3px solid ${SQUARE_COLORS.solution.border}`,
      borderRadius: '12px',
      padding: '14px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      minWidth: '220px',
    },
  })
  edges.push({
    id: `${projectId}-${solution2Id}`,
    source: projectId,
    target: solution2Id,
    animated: true,
    style: { stroke: SQUARE_COLORS.solution.main },
  })
  
  // Solution - MVP
  const solutionMvpId = getId()
  nodes.push({
    id: solutionMvpId,
    type: 'default',
    position: { x: 270, y: 350 },
    data: { 
      label: `🚀 ${strategy.solution.mvp.title}\n${strategy.solution.mvp.concept}`,
      detail: {
        concept: strategy.solution.mvp.conceptDetail,
        feature1: strategy.solution.mvp.coreFeature1Detail,
        feature2: strategy.solution.mvp.coreFeature2Detail,
        feature3: strategy.solution.mvp.coreFeature3Detail,
        ux: strategy.solution.mvp.userExperienceDetail,
        differentiation: strategy.solution.mvp.differentiationDetail,
      },
    },
    style: {
      background: SQUARE_COLORS.solution.light,
      border: `2px solid ${SQUARE_COLORS.solution.border}`,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '12px',
      minWidth: '200px',
      maxWidth: '240px',
      whiteSpace: 'pre-line',
    },
  })
  edges.push({
    id: `${solution2Id}-${solutionMvpId}`,
    source: solution2Id,
    target: solutionMvpId,
  })
  
  // Carré 3: Modèle (centre)
  const model3Id = getId()
  nodes.push({
    id: model3Id,
    type: 'default',
    position: { x: 570, y: 250 },
    data: { 
      label: '💼 Carré 3: Modèle',
      isMain: true,
    },
    style: {
      background: SQUARE_COLORS.model.main,
      color: 'white',
      border: `3px solid ${SQUARE_COLORS.model.border}`,
      borderRadius: '12px',
      padding: '14px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      minWidth: '200px',
    },
  })
  edges.push({
    id: `${projectId}-${model3Id}`,
    source: projectId,
    target: model3Id,
    animated: true,
    style: { stroke: SQUARE_COLORS.model.main },
  })
  
  // Model - Business
  const modelBusinessId = getId()
  nodes.push({
    id: modelBusinessId,
    type: 'default',
    position: { x: 540, y: 350 },
    data: { 
      label: `💰 ${strategy.model.businessModel.title}\n${strategy.model.businessModel.revenueStreams}`,
      detail: {
        revenue: strategy.model.businessModel.revenueStreamsDetail,
        pricing: strategy.model.businessModel.pricingStrategyDetail,
        costs: strategy.model.businessModel.costStructureDetail,
        economics: strategy.model.businessModel.unitEconomicsDetail,
      },
    },
    style: {
      background: SQUARE_COLORS.model.light,
      border: `2px solid ${SQUARE_COLORS.model.border}`,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '12px',
      minWidth: '180px',
      maxWidth: '220px',
      whiteSpace: 'pre-line',
    },
  })
  edges.push({
    id: `${model3Id}-${modelBusinessId}`,
    source: model3Id,
    target: modelBusinessId,
  })
  
  // Model - Tech
  const modelTechId = getId()
  nodes.push({
    id: modelTechId,
    type: 'default',
    position: { x: 540, y: 480 },
    data: { 
      label: `⚙️ ${strategy.model.techStack.title}\n${strategy.model.techStack.frontend}`,
      detail: {
        frontend: strategy.model.techStack.frontendDetail,
        backend: strategy.model.techStack.backendDetail,
        infrastructure: strategy.model.techStack.infrastructureDetail,
        ai: strategy.model.techStack.aiToolsDetail,
        security: strategy.model.techStack.securityDetail,
      },
    },
    style: {
      background: SQUARE_COLORS.model.light,
      border: `2px solid ${SQUARE_COLORS.model.border}`,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '12px',
      minWidth: '180px',
      maxWidth: '220px',
      whiteSpace: 'pre-line',
    },
  })
  edges.push({
    id: `${model3Id}-${modelTechId}`,
    source: model3Id,
    target: modelTechId,
  })
  
  // Carré 4: Croissance (droite milieu)
  const growth4Id = getId()
  nodes.push({
    id: growth4Id,
    type: 'default',
    position: { x: 820, y: 250 },
    data: { 
      label: '📈 Carré 4: Croissance',
      isMain: true,
    },
    style: {
      background: SQUARE_COLORS.growth.main,
      color: 'white',
      border: `3px solid ${SQUARE_COLORS.growth.border}`,
      borderRadius: '12px',
      padding: '14px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      minWidth: '220px',
    },
  })
  edges.push({
    id: `${projectId}-${growth4Id}`,
    source: projectId,
    target: growth4Id,
    animated: true,
    style: { stroke: SQUARE_COLORS.growth.main },
  })
  
  // Growth - Timeline
  const growthTimelineId = getId()
  nodes.push({
    id: growthTimelineId,
    type: 'default',
    position: { x: 790, y: 350 },
    data: { 
      label: `📅 ${strategy.growth.launchTimeline.title}\n${strategy.growth.launchTimeline.phase1}`,
      detail: {
        phase1: strategy.growth.launchTimeline.phase1Detail,
        phase2: strategy.growth.launchTimeline.phase2Detail,
        phase3: strategy.growth.launchTimeline.phase3Detail,
      },
    },
    style: {
      background: SQUARE_COLORS.growth.light,
      border: `2px solid ${SQUARE_COLORS.growth.border}`,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '12px',
      minWidth: '200px',
      maxWidth: '240px',
      whiteSpace: 'pre-line',
    },
  })
  edges.push({
    id: `${growth4Id}-${growthTimelineId}`,
    source: growth4Id,
    target: growthTimelineId,
  })
  
  // Growth - Strategy
  const growthStrategyId = getId()
  nodes.push({
    id: growthStrategyId,
    type: 'default',
    position: { x: 790, y: 480 },
    data: { 
      label: `🎯 ${strategy.growth.growthStrategy.title}\n${strategy.growth.growthStrategy.acquisitionChannels}`,
      detail: {
        acquisition: strategy.growth.growthStrategy.acquisitionChannelsDetail,
        retention: strategy.growth.growthStrategy.retentionStrategyDetail,
        scaling: strategy.growth.growthStrategy.scalingPlanDetail,
        partnerships: strategy.growth.growthStrategy.partnershipsDetail,
      },
    },
    style: {
      background: SQUARE_COLORS.growth.light,
      border: `2px solid ${SQUARE_COLORS.growth.border}`,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '12px',
      minWidth: '200px',
      maxWidth: '240px',
      whiteSpace: 'pre-line',
    },
  })
  edges.push({
    id: `${growth4Id}-${growthStrategyId}`,
    source: growth4Id,
    target: growthStrategyId,
  })
  
  // Carré 5: Unicorn (droite)
  const unicorn5Id = getId()
  nodes.push({
    id: unicorn5Id,
    type: 'default',
    position: { x: 1090, y: 250 },
    data: { 
      label: '🦄 Carré 5: Unicorn',
      isMain: true,
    },
    style: {
      background: SQUARE_COLORS.unicorn.main,
      color: 'white',
      border: `3px solid ${SQUARE_COLORS.unicorn.border}`,
      borderRadius: '12px',
      padding: '14px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      minWidth: '200px',
    },
  })
  edges.push({
    id: `${projectId}-${unicorn5Id}`,
    source: projectId,
    target: unicorn5Id,
    animated: true,
    style: { stroke: SQUARE_COLORS.unicorn.main },
  })
  
  // Unicorn - KPIs
  const unicornKpisId = getId()
  nodes.push({
    id: unicornKpisId,
    type: 'default',
    position: { x: 1060, y: 350 },
    data: { 
      label: `📊 ${strategy.unicorn.kpis.title}\n${strategy.unicorn.kpis.northStarMetric}`,
      detail: {
        northStar: strategy.unicorn.kpis.northStarMetricDetail,
        acquisition: strategy.unicorn.kpis.acquisitionMetricsDetail,
        engagement: strategy.unicorn.kpis.engagementMetricsDetail,
        revenue: strategy.unicorn.kpis.revenueMetricsDetail,
      },
    },
    style: {
      background: SQUARE_COLORS.unicorn.light,
      border: `2px solid ${SQUARE_COLORS.unicorn.border}`,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '12px',
      minWidth: '180px',
      maxWidth: '220px',
      whiteSpace: 'pre-line',
    },
  })
  edges.push({
    id: `${unicorn5Id}-${unicornKpisId}`,
    source: unicorn5Id,
    target: unicornKpisId,
  })
  
  // Unicorn - Learnings
  const unicornLearningsId = getId()
  nodes.push({
    id: unicornLearningsId,
    type: 'default',
    position: { x: 1060, y: 480 },
    data: { 
      label: `📚 ${strategy.unicorn.learnings.title}\n${strategy.unicorn.learnings.assumptions}`,
      detail: {
        assumptions: strategy.unicorn.learnings.assumptionsDetail,
        experiments: strategy.unicorn.learnings.experimentsDetail,
        pivot: strategy.unicorn.learnings.pivotStrategyDetail,
      },
    },
    style: {
      background: SQUARE_COLORS.unicorn.light,
      border: `2px solid ${SQUARE_COLORS.unicorn.border}`,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '12px',
      minWidth: '180px',
      maxWidth: '220px',
      whiteSpace: 'pre-line',
    },
  })
  edges.push({
    id: `${unicorn5Id}-${unicornLearningsId}`,
    source: unicorn5Id,
    target: unicornLearningsId,
  })
  
  // Unicorn - AI Agents
  const unicornAiId = getId()
  nodes.push({
    id: unicornAiId,
    type: 'default',
    position: { x: 1060, y: 610 },
    data: { 
      label: `🤖 ${strategy.unicorn.aiAgents.title}\n${strategy.unicorn.aiAgents.agent1}`,
      detail: {
        agent1: strategy.unicorn.aiAgents.agent1Detail,
        agent1Impact: strategy.unicorn.aiAgents.agent1Impact,
        agent2: strategy.unicorn.aiAgents.agent2Detail,
        agent2Impact: strategy.unicorn.aiAgents.agent2Impact,
        agent3: strategy.unicorn.aiAgents.agent3Detail,
        agent3Impact: strategy.unicorn.aiAgents.agent3Impact,
      },
    },
    style: {
      background: SQUARE_COLORS.unicorn.light,
      border: `2px solid ${SQUARE_COLORS.unicorn.border}`,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '12px',
      minWidth: '180px',
      maxWidth: '220px',
      whiteSpace: 'pre-line',
    },
  })
  edges.push({
    id: `${unicorn5Id}-${unicornAiId}`,
    source: unicorn5Id,
    target: unicornAiId,
  })
  
  return { nodes, edges }
}
