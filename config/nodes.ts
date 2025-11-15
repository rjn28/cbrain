/**
 * Configuration des nœuds de l'arbre stratégique
 */

/**
 * IDs des nœuds principaux (non cliquables)
 */
export const MAIN_NODE_IDS = [
  "root",
  "project-name",
  "vision",
  "solution",
  "model",
  "growth",
  "unicorn",
] as const

/**
 * Configuration du viewport par défaut pour React Flow
 */
export const DEFAULT_VIEWPORT = {
  x: 350,
  y: 80,
  zoom: 0.65,
}

/**
 * Limites de zoom
 */
export const ZOOM_LIMITS = {
  min: 0.3,
  max: 1.5,
}
