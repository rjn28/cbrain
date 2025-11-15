/**
 * Configuration des intégrations partenaires affichées sur la page d'accueil
 */

export interface Integration {
  name: string
  icon: string
}

export const INTEGRATIONS: Integration[] = [
  { name: "Google Cloud", icon: "https://cdn.simpleicons.org/googlecloud" },
  { name: "Mistral AI", icon: "https://cdn.simpleicons.org/mistralai" },
  { name: "ElevenLabs", icon: "https://cdn.simpleicons.org/elevenlabs" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma" },
  { name: "Qdrant", icon: "/logoqdrant.svg" },
  { name: "N8n", icon: "https://cdn.simpleicons.org/n8n" },
  { name: "Fal.ai", icon: "/logofal.svg" },
  { name: "Lovable", icon: "/lovable-logo-icon.svg" },
]
