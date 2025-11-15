/**
 * Configuration des animations pour l'arbre stratégique
 */

import type { Node, Edge } from "@xyflow/react"

export interface AnimationStep {
  delay: number
  nodes: Node[]
  edges: Edge[]
}

/**
 * Crée la séquence d'animation pour l'affichage progressif de l'arbre
 * @param nodes - Tous les nœuds de l'arbre
 * @param edges - Toutes les connexions de l'arbre
 * @returns Séquence d'animation avec délais
 */
export function createAnimationSequence(
  nodes: Node[],
  edges: Edge[]
): AnimationStep[] {
  return [
    // 1. Nœud racine
    { delay: 400, nodes: [nodes[0]], edges: [] },
    
    // 2. Nom du projet
    { delay: 700, nodes: [nodes[0], nodes[1]], edges: [edges[0]] },
    
    // 3-8. Branches principales (ajout de competitors)
    { delay: 1000, nodes: nodes.slice(0, 3), edges: edges.slice(0, 2) },
    { delay: 1300, nodes: nodes.slice(0, 4), edges: edges.slice(0, 3) },
    { delay: 1600, nodes: nodes.slice(0, 5), edges: edges.slice(0, 4) },
    { delay: 1900, nodes: nodes.slice(0, 6), edges: edges.slice(0, 5) },
    { delay: 2200, nodes: nodes.slice(0, 7), edges: edges.slice(0, 6) },
    { delay: 2500, nodes: nodes.slice(0, 8), edges: edges.slice(0, 7) },
    
    // 9+. Sous-nœuds progressifs (incluant concurrents)
    { delay: 2700, nodes: nodes.slice(0, Math.min(9, nodes.length)), edges: edges.slice(0, Math.min(8, edges.length)) },
    { delay: 2900, nodes: nodes.slice(0, Math.min(12, nodes.length)), edges: edges.slice(0, Math.min(11, edges.length)) },
    { delay: 3100, nodes: nodes.slice(0, Math.min(15, nodes.length)), edges: edges.slice(0, Math.min(14, edges.length)) },
    
    // Final. Tous les nœuds
    { delay: 3300, nodes: nodes, edges: edges },
  ]
}

/**
 * Durée totale de l'animation en millisecondes
 */
export const ANIMATION_DURATION = 3500
