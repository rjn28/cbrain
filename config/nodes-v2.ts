/**
 * Configuration des nœuds pour la structure en 5 carrés
 */

export const SQUARE_NODE_IDS = [
  "root",
  "project-name",
  // Carré 1: Vision
  "square1-vision",
  "vision-strategy",
  "vision-market",
  // Carré 2: Solution
  "square2-solution",
  "solution-mvp",
  // Carré 3: Modèle
  "square3-model",
  "model-business",
  "model-tech",
  // Carré 4: Croissance
  "square4-growth",
  "growth-timeline",
  "growth-strategy",
  // Carré 5: Unicorn
  "square5-unicorn",
  "unicorn-kpis",
  "unicorn-learnings",
  "unicorn-ai",
] as const

export const MAIN_SQUARE_IDS = [
  "root",
  "project-name",
  "square1-vision",
  "square2-solution",
  "square3-model",
  "square4-growth",
  "square5-unicorn",
] as const

export const DEFAULT_VIEWPORT = {
  x: 400,
  y: 100,
  zoom: 0.6,
}

export const ZOOM_LIMITS = {
  min: 0.3,
  max: 1.5,
}

// Couleurs pour chaque carré
export const SQUARE_COLORS = {
  vision: {
    main: '#3B82F6', // blue
    light: '#DBEAFE',
    border: '#2563EB',
  },
  solution: {
    main: '#8B5CF6', // purple
    light: '#EDE9FE',
    border: '#7C3AED',
  },
  model: {
    main: '#10B981', // green
    light: '#D1FAE5',
    border: '#059669',
  },
  growth: {
    main: '#F59E0B', // orange
    light: '#FEF3C7',
    border: '#D97706',
  },
  unicorn: {
    main: '#EC4899', // pink
    light: '#FCE7F3',
    border: '#DB2777',
  },
}
