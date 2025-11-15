/**
 * Parser pour transformer les données Mistral en nœuds et edges React Flow
 */

import { Node, Edge } from "@xyflow/react"
import type { MistralStrategyData } from "@/types/strategy"

/**
 * Crée les nœuds React Flow à partir de la stratégie Mistral
 * @param strategy - Données de stratégie générées par Mistral
 * @returns Liste des nœuds pour React Flow
 */
export function createNodesFromMistral(strategy: MistralStrategyData): Node[] {
  const nodes: Node[] = []

  // Node racine - Idée courte
  nodes.push({
    id: "root",
    type: "input",
    data: { label: `💡 ${strategy.ideeCourte}` },
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
    data: { label: strategy.titreProjet },
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

  // Nodes principaux
  const mainNodes = [
    { id: "why", label: "🎯 Pourquoi\nStratégie", x: 100, color: "#3b82f6" },
    { id: "what", label: "📦 Quoi\nProduit", x: 320, color: "#8b5cf6" },
    { id: "how", label: "💻 Comment\nStack", x: 540, color: "#10b981" },
    { id: "when", label: "📅 Quand\nPlanning", x: 760, color: "#f59e0b" },
    { id: "unicorn", label: "✨ Agents IA", x: 980, color: "#ec4899" },
    { id: "competitors", label: "🏆 Concurrents", x: 1200, color: "#ef4444" },
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

  // Sous-nodes Pourquoi
  const whyNodes = [
    { id: "why-persona", label: `👤 Persona\n${strategy.strategie.persona}`, detail: strategy.strategie.personaDetail, y: 410 },
    { id: "why-problem", label: `⚠️ Problème\n${strategy.strategie.probleme}`, detail: strategy.strategie.problemeDetail, y: 540 },
    { id: "why-goal", label: `🎯 Objectif\n${strategy.strategie.objectif}`, detail: strategy.strategie.objectifDetail, y: 670 },
  ]

  whyNodes.forEach(node => {
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

  // Sous-nodes Quoi
  const whatNodes = [
    { id: "what-concept", label: `💡 Concept\n${strategy.produit.concept}`, detail: strategy.produit.conceptDetail, y: 410 },
    { id: "what-feature1", label: `⭐ Feature 1\n${strategy.produit.feature1}`, detail: strategy.produit.feature1Detail, y: 540 },
    { id: "what-feature2", label: `⭐ Feature 2\n${strategy.produit.feature2}`, detail: strategy.produit.feature2Detail, y: 670 },
  ]

  whatNodes.forEach(node => {
    nodes.push({
      id: node.id,
      data: { label: node.label, detail: node.detail },
      position: { x: 240, y: node.y },
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

  // Sous-nodes Comment
  const howNodes = [
    { id: "how-frontend", label: `🎨 Frontend\n${strategy.stack.frontend}`, detail: strategy.stack.frontendDetail, y: 410 },
    { id: "how-backend", label: `⚙️ Backend\n${strategy.stack.backend}`, detail: strategy.stack.backendDetail, y: 540 },
    { id: "how-partners", label: `🤝 Partenaires\n${strategy.stack.partenaires}`, detail: strategy.stack.partenairesDetail, y: 670 },
  ]

  howNodes.forEach(node => {
    nodes.push({
      id: node.id,
      data: { label: node.label, detail: node.detail },
      position: { x: 460, y: node.y },
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

  // Sous-nodes Quand
  const whenNodes = [
    { id: "when-step1", label: `1️⃣ ${strategy.planning.etape1}`, detail: strategy.planning.etape1Detail, y: 410 },
    { id: "when-step2", label: `2️⃣ ${strategy.planning.etape2}`, detail: strategy.planning.etape2Detail, y: 540 },
    { id: "when-step3", label: `3️⃣ ${strategy.planning.etape3}`, detail: strategy.planning.etape3Detail, y: 670 },
  ]

  whenNodes.forEach(node => {
    nodes.push({
      id: node.id,
      data: { label: node.label, detail: node.detail },
      position: { x: 680, y: node.y },
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

  // Sous-nodes Unicorn (Agents IA)
  const agentNodes = [
    { id: "unicorn-mistral", label: `🤖 Mistral\n${strategy.agents.mistral}`, detail: strategy.agents.mistralDetail, y: 410 },
    { id: "unicorn-fal", label: `🤖 Fal.ai\n${strategy.agents.fal}`, detail: strategy.agents.falDetail, y: 540 },
    { id: "unicorn-elevenlabs", label: `🤖 ElevenLabs\n${strategy.agents.elevenlabs}`, detail: strategy.agents.elevenlabsDetail, y: 670 },
    { id: "unicorn-qdrant", label: `🤖 Qdrant\n${strategy.agents.qdrant}`, detail: strategy.agents.qdrantDetail, y: 800 },
  ]

  agentNodes.forEach(node => {
    nodes.push({
      id: node.id,
      data: { label: node.label, detail: node.detail },
      position: { x: 900, y: node.y },
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

  // Sous-nodes Concurrents
  const competitorNodes: Array<{ id: string; label: string; detail: string; y: number }> = []
  let competitorY = 410
  
  // Extraire les concurrents de la stratégie (competitor1 à competitor10)
  if (strategy.competitors) {
    for (let i = 1; i <= 10; i++) {
      const competitorKey = `competitor${i}` as keyof typeof strategy.competitors
      const competitorDetailKey = `competitor${i}Detail` as keyof typeof strategy.competitors
      
      if (strategy.competitors[competitorKey] && strategy.competitors[competitorDetailKey]) {
        const competitorText = String(strategy.competitors[competitorKey])
        const competitorName = competitorText.split(' - ')[0] || `Concurrent ${i}`
        competitorNodes.push({
          id: `competitor-${i}`,
          label: `🏢 ${competitorName}`,
          detail: String(strategy.competitors[competitorDetailKey]),
          y: competitorY,
        })
        competitorY += 130
      }
    }
  }

  competitorNodes.forEach(node => {
    nodes.push({
      id: node.id,
      data: { label: node.label, detail: node.detail },
      position: { x: 1120, y: node.y },
      style: {
        background: "white",
        color: "#1f2937",
        border: "2px solid #ef4444",
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
 * Crée les connexions (edges) entre les nœuds de l'arbre
 * @param strategy - Données de stratégie pour générer les edges des concurrents dynamiquement
 * @returns Liste des edges pour React Flow
 */
export function createEdgesFromMistral(strategy?: MistralStrategyData): Edge[] {
  const edges: Edge[] = [
    // Connexion root -> project-name
    { id: "e-root-project", source: "root", target: "project-name", animated: true, style: { stroke: "#667eea", strokeWidth: 3 } },
    
    // Connexions principales depuis project-name
    { id: "e-project-why", source: "project-name", target: "why", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
    { id: "e-project-what", source: "project-name", target: "what", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 2 } },
    { id: "e-project-how", source: "project-name", target: "how", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
    { id: "e-project-when", source: "project-name", target: "when", animated: true, style: { stroke: "#f59e0b", strokeWidth: 2 } },
    { id: "e-project-unicorn", source: "project-name", target: "unicorn", animated: true, style: { stroke: "#ec4899", strokeWidth: 2 } },
    { id: "e-project-competitors", source: "project-name", target: "competitors", animated: true, style: { stroke: "#ef4444", strokeWidth: 2 } },
    
    // Pourquoi
    { id: "e-why-persona", source: "why", target: "why-persona", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 } },
    { id: "e-why-problem", source: "why", target: "why-problem", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 } },
    { id: "e-why-goal", source: "why", target: "why-goal", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 } },
    
    // Quoi
    { id: "e-what-concept", source: "what", target: "what-concept", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 1.5 } },
    { id: "e-what-feature1", source: "what", target: "what-feature1", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 1.5 } },
    { id: "e-what-feature2", source: "what", target: "what-feature2", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 1.5 } },
    
    // Comment
    { id: "e-how-frontend", source: "how", target: "how-frontend", animated: true, style: { stroke: "#10b981", strokeWidth: 1.5 } },
    { id: "e-how-backend", source: "how", target: "how-backend", animated: true, style: { stroke: "#10b981", strokeWidth: 1.5 } },
    { id: "e-how-partners", source: "how", target: "how-partners", animated: true, style: { stroke: "#10b981", strokeWidth: 1.5 } },
    
    // Quand
    { id: "e-when-step1", source: "when", target: "when-step1", animated: true, style: { stroke: "#f59e0b", strokeWidth: 1.5 } },
    { id: "e-when-step2", source: "when", target: "when-step2", animated: true, style: { stroke: "#f59e0b", strokeWidth: 1.5 } },
    { id: "e-when-step3", source: "when", target: "when-step3", animated: true, style: { stroke: "#f59e0b", strokeWidth: 1.5 } },
    
    // Unicorn
    { id: "e-unicorn-mistral", source: "unicorn", target: "unicorn-mistral", animated: true, style: { stroke: "#ec4899", strokeWidth: 1.5 } },
    { id: "e-unicorn-fal", source: "unicorn", target: "unicorn-fal", animated: true, style: { stroke: "#ec4899", strokeWidth: 1.5 } },
    { id: "e-unicorn-elevenlabs", source: "unicorn", target: "unicorn-elevenlabs", animated: true, style: { stroke: "#ec4899", strokeWidth: 1.5 } },
    { id: "e-unicorn-qdrant", source: "unicorn", target: "unicorn-qdrant", animated: true, style: { stroke: "#ec4899", strokeWidth: 1.5 } },
  ]

  // Ajouter les edges pour les concurrents
  if (strategy?.competitors) {
    for (let i = 1; i <= 10; i++) {
      const competitorKey = `competitor${i}` as keyof typeof strategy.competitors
      const competitorDetailKey = `competitor${i}Detail` as keyof typeof strategy.competitors
      
      if (strategy.competitors[competitorKey] && strategy.competitors[competitorDetailKey]) {
        edges.push({
          id: `e-competitors-${i}`,
          source: "competitors",
          target: `competitor-${i}`,
          animated: true,
          style: { stroke: "#ef4444", strokeWidth: 1.5 },
        })
      }
    }
  }

  return edges
}
