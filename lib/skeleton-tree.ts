/**
 * Génère un arbre fictif (skeleton) pour l'animation de chargement
 */

import { Node, Edge } from "@xyflow/react"

/**
 * Crée des nœuds skeleton pour l'animation de chargement
 */
export function createSkeletonNodes(): Node[] {
  const nodes: Node[] = []

  // Node racine - skeleton
  nodes.push({
    id: "skeleton-root",
    type: "input",
    data: { label: "💡 Analyzing your idea..." },
    position: { x: 450, y: 30 },
    style: {
      background: "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)",
      color: "#9ca3af",
      border: "none",
      borderRadius: "12px",
      padding: "14px 22px",
      fontSize: "14px",
      fontWeight: "600",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      textAlign: "center",
      minWidth: "280px",
      whiteSpace: "pre-line",
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  })

  // Node nom du projet - skeleton
  nodes.push({
    id: "skeleton-project",
    data: { label: "Building your strategy..." },
    position: { x: 450, y: 120 },
    style: {
      background: "#f3f4f6",
      color: "#9ca3af",
      border: "3px solid #e5e7eb",
      borderRadius: "12px",
      padding: "16px 24px",
      fontSize: "15px",
      fontWeight: "600",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center",
      minWidth: "300px",
      whiteSpace: "pre-line",
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  })

  // Nodes principaux - 5 carrés skeleton
  const mainSkeletonNodes = [
    { id: "skeleton-vision", label: "🎯 Vision", x: 50, color: "#e5e7eb" },
    { id: "skeleton-solution", label: "💡 Solution", x: 280, color: "#e5e7eb" },
    { id: "skeleton-model", label: "💼 Model", x: 510, color: "#e5e7eb" },
    { id: "skeleton-growth", label: "📈 Growth", x: 740, color: "#e5e7eb" },
    { id: "skeleton-unicorn", label: "🦄 Unicorn", x: 970, color: "#e5e7eb" },
  ]

  mainSkeletonNodes.forEach(node => {
    nodes.push({
      id: node.id,
      data: { label: node.label },
      position: { x: node.x, y: 250 },
      style: {
        background: node.color,
        color: "#9ca3af",
        border: "none",
        borderRadius: "12px",
        padding: "16px 20px",
        fontSize: "14px",
        fontWeight: "500",
        textAlign: "center",
        whiteSpace: "pre-line",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    })
  })

  // Quelques sous-nœuds skeleton pour chaque carré
  const subSkeletonNodes = [
    // Vision
    { id: "skeleton-vision-1", x: 20, y: 410 },
    { id: "skeleton-vision-2", x: 20, y: 540 },
    { id: "skeleton-vision-3", x: 20, y: 670 },
    
    // Solution
    { id: "skeleton-solution-1", x: 250, y: 410 },
    { id: "skeleton-solution-2", x: 250, y: 540 },
    { id: "skeleton-solution-3", x: 250, y: 670 },
    
    // Model
    { id: "skeleton-model-1", x: 480, y: 410 },
    { id: "skeleton-model-2", x: 480, y: 540 },
    { id: "skeleton-model-3", x: 480, y: 670 },
    
    // Growth
    { id: "skeleton-growth-1", x: 710, y: 410 },
    { id: "skeleton-growth-2", x: 710, y: 540 },
    { id: "skeleton-growth-3", x: 710, y: 670 },
    
    // Unicorn
    { id: "skeleton-unicorn-1", x: 940, y: 410 },
    { id: "skeleton-unicorn-2", x: 940, y: 540 },
    { id: "skeleton-unicorn-3", x: 940, y: 670 },
  ]

  subSkeletonNodes.forEach(node => {
    nodes.push({
      id: node.id,
      data: { label: "..." },
      position: { x: node.x, y: node.y },
      style: {
        background: "#f9fafb",
        color: "#d1d5db",
        border: "2px solid #e5e7eb",
        borderRadius: "8px",
        padding: "14px 18px",
        fontSize: "13px",
        minWidth: "180px",
        textAlign: "center",
        whiteSpace: "pre-line",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    })
  })

  return nodes
}

/**
 * Crée des edges skeleton pour l'animation de chargement
 */
export function createSkeletonEdges(): Edge[] {
  return [
    // Connexion root -> project
    { id: "skeleton-e-root-project", source: "skeleton-root", target: "skeleton-project", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 3 } },
    
    // Connexions principales
    { id: "skeleton-e-project-vision", source: "skeleton-project", target: "skeleton-vision", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 2 } },
    { id: "skeleton-e-project-solution", source: "skeleton-project", target: "skeleton-solution", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 2 } },
    { id: "skeleton-e-project-model", source: "skeleton-project", target: "skeleton-model", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 2 } },
    { id: "skeleton-e-project-growth", source: "skeleton-project", target: "skeleton-growth", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 2 } },
    { id: "skeleton-e-project-unicorn", source: "skeleton-project", target: "skeleton-unicorn", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 2 } },
    
    // Vision
    { id: "skeleton-e-vision-1", source: "skeleton-vision", target: "skeleton-vision-1", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    { id: "skeleton-e-vision-2", source: "skeleton-vision", target: "skeleton-vision-2", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    { id: "skeleton-e-vision-3", source: "skeleton-vision", target: "skeleton-vision-3", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    
    // Solution
    { id: "skeleton-e-solution-1", source: "skeleton-solution", target: "skeleton-solution-1", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    { id: "skeleton-e-solution-2", source: "skeleton-solution", target: "skeleton-solution-2", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    { id: "skeleton-e-solution-3", source: "skeleton-solution", target: "skeleton-solution-3", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    
    // Model
    { id: "skeleton-e-model-1", source: "skeleton-model", target: "skeleton-model-1", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    { id: "skeleton-e-model-2", source: "skeleton-model", target: "skeleton-model-2", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    { id: "skeleton-e-model-3", source: "skeleton-model", target: "skeleton-model-3", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    
    // Growth
    { id: "skeleton-e-growth-1", source: "skeleton-growth", target: "skeleton-growth-1", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    { id: "skeleton-e-growth-2", source: "skeleton-growth", target: "skeleton-growth-2", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    { id: "skeleton-e-growth-3", source: "skeleton-growth", target: "skeleton-growth-3", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    
    // Unicorn
    { id: "skeleton-e-unicorn-1", source: "skeleton-unicorn", target: "skeleton-unicorn-1", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    { id: "skeleton-e-unicorn-2", source: "skeleton-unicorn", target: "skeleton-unicorn-2", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
    { id: "skeleton-e-unicorn-3", source: "skeleton-unicorn", target: "skeleton-unicorn-3", animated: true, style: { stroke: "#e5e7eb", strokeWidth: 1.5 } },
  ]
}
