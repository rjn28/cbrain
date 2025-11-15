/**
 * Utilitaire pour exporter la stratégie en format Markdown
 */

import type { MistralStrategyData } from "@/types/strategy"
import type { ComprehensiveStrategy } from "@/types/strategy-v2"

/**
 * Génère un fichier Markdown à partir des données de stratégie
 * @param strategy - Données de la stratégie Mistral
 * @returns Contenu Markdown formaté
 */
export function generateMarkdown(strategy: MistralStrategyData): string {
  const date = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return `# ${strategy.titreProjet}

> ${strategy.ideeCourte}

**Date de génération** : ${date}  
**Généré par** : cbrain + Mistral AI

---

## 📋 Table des matières

- [Stratégie](#-stratégie)
  - [Persona](#persona)
  - [Problème](#problème)
  - [Objectif](#objectif)
- [Produit](#-produit)
  - [Concept](#concept)
  - [Fonctionnalité 1](#fonctionnalité-1)
  - [Fonctionnalité 2](#fonctionnalité-2)
- [Stack Technique](#-stack-technique)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Partenaires](#partenaires)
- [Planning](#-planning)
  - [Étape 1](#étape-1)
  - [Étape 2](#étape-2)
  - [Étape 3](#étape-3)
- [Agents IA](#-agents-ia)
  - [Mistral AI](#mistral-ai)
  - [Fal.ai](#falai)
  - [ElevenLabs](#elevenlabs)
  - [Qdrant](#qdrant)

---

## 🎯 Stratégie

### Persona

**${strategy.strategie.persona}**

${strategy.strategie.personaDetail}

### Problème

**${strategy.strategie.probleme}**

${strategy.strategie.problemeDetail}

### Objectif

**${strategy.strategie.objectif}**

${strategy.strategie.objectifDetail}

---

## 🎁 Produit

### Concept

**${strategy.produit.concept}**

${strategy.produit.conceptDetail}

### Fonctionnalité 1

**${strategy.produit.feature1}**

${strategy.produit.feature1Detail}

### Fonctionnalité 2

**${strategy.produit.feature2}**

${strategy.produit.feature2Detail}

---

## 💻 Stack Technique

### Frontend

**${strategy.stack.frontend}**

${strategy.stack.frontendDetail}

### Backend

**${strategy.stack.backend}**

${strategy.stack.backendDetail}

### Partenaires

**${strategy.stack.partenaires}**

${strategy.stack.partenairesDetail}

---

## 📅 Planning

### Étape 1

**${strategy.planning.etape1}**

${strategy.planning.etape1Detail}

### Étape 2

**${strategy.planning.etape2}**

${strategy.planning.etape2Detail}

### Étape 3

**${strategy.planning.etape3}**

${strategy.planning.etape3Detail}

---

## ✨ Agents IA

### Mistral AI

**${strategy.agents.mistral}**

${strategy.agents.mistralDetail}

### Fal.ai

**${strategy.agents.fal}**

${strategy.agents.falDetail}

### ElevenLabs

**${strategy.agents.elevenlabs}**

${strategy.agents.elevenlabsDetail}

### Qdrant

**${strategy.agents.qdrant}**

${strategy.agents.qdrantDetail}

---

## 📝 Notes

Ce document a été généré automatiquement par **cbrain**, propulsé par **Mistral AI**.

Pour plus d'informations, visitez [cbrain](https://cbrain-stategy.netlify.app)
`
}

/**
 * Télécharge le contenu Markdown en tant que fichier
 * @param content - Contenu Markdown
 * @param filename - Nom du fichier (sans extension)
 */
export function downloadMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${filename}.md`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Génère un nom de fichier sécurisé à partir du titre du projet
 * @param title - Titre du projet
 * @returns Nom de fichier sécurisé
 */
export function sanitizeFilename(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlever les accents
    .replace(/[^a-z0-9]+/g, "-") // Remplacer les caractères spéciaux par des tirets
    .replace(/^-+|-+$/g, "") // Enlever les tirets au début et à la fin
}

/**
 * Génère un fichier Markdown à partir des données de stratégie v2
 * @param strategy - Données de la stratégie ComprehensiveStrategy
 * @returns Contenu Markdown formaté
 */
export function generateMarkdownV2(strategy: ComprehensiveStrategy): string {
  const date = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return `# ${strategy.projectName}

> ${strategy.tagline}

**Date de génération** : ${date}  
**Généré par** : cbrain + Mistral AI

---

## 📋 Table des matières

- [Vision](#-vision)
  - [Stratégie](#stratégie)
  - [Étude de marché](#étude-de-marché)
- [Solution](#-solution)
  - [MVP](#mvp)
- [Modèle](#-modèle)
  - [Business Model](#business-model)
  - [Stack Technique](#stack-technique)
- [Croissance](#-croissance)
  - [Timeline de lancement](#timeline-de-lancement)
  - [Stratégie de croissance](#stratégie-de-croissance)
- [Unicorn](#-unicorn)
  - [KPIs](#kpis)
  - [Apprentissages](#apprentissages)
  - [Agents IA](#agents-ia)

---

## 🎯 Vision

### Stratégie

#### Vision
**${strategy.vision.strategy.vision}**

${strategy.vision.strategy.visionDetail}

#### Mission
**${strategy.vision.strategy.mission}**

${strategy.vision.strategy.missionDetail}

#### Valeurs
**${strategy.vision.strategy.values}**

${strategy.vision.strategy.valuesDetail}

### Étude de marché

#### Taille du marché
**${strategy.vision.marketStudy.marketSize}**

${strategy.vision.marketStudy.marketSizeDetail}

#### Concurrence
**${strategy.vision.marketStudy.competition}**

${strategy.vision.marketStudy.competitionDetail}

#### Opportunité
**${strategy.vision.marketStudy.opportunity}**

${strategy.vision.marketStudy.opportunityDetail}

#### Segment cible
**${strategy.vision.marketStudy.targetSegment}**

${strategy.vision.marketStudy.targetSegmentDetail}

---

## 💡 Solution

### MVP

#### Concept
**${strategy.solution.mvp.concept}**

${strategy.solution.mvp.conceptDetail}

#### Fonctionnalité principale 1
**${strategy.solution.mvp.coreFeature1}**

${strategy.solution.mvp.coreFeature1Detail}

#### Fonctionnalité principale 2
**${strategy.solution.mvp.coreFeature2}**

${strategy.solution.mvp.coreFeature2Detail}

#### Fonctionnalité principale 3
**${strategy.solution.mvp.coreFeature3}**

${strategy.solution.mvp.coreFeature3Detail}

#### Expérience utilisateur
**${strategy.solution.mvp.userExperience}**

${strategy.solution.mvp.userExperienceDetail}

#### Différenciation
**${strategy.solution.mvp.differentiation}**

${strategy.solution.mvp.differentiationDetail}

---

## 💼 Modèle

### Business Model

#### Sources de revenus
**${strategy.model.businessModel.revenueStreams}**

${strategy.model.businessModel.revenueStreamsDetail}

#### Stratégie de pricing
**${strategy.model.businessModel.pricingStrategy}**

${strategy.model.businessModel.pricingStrategyDetail}

#### Structure de coûts
**${strategy.model.businessModel.costStructure}**

${strategy.model.businessModel.costStructureDetail}

#### Unit Economics
**${strategy.model.businessModel.unitEconomics}**

${strategy.model.businessModel.unitEconomicsDetail}

### Stack Technique

#### Frontend
**${strategy.model.techStack.frontend}**

${strategy.model.techStack.frontendDetail}

#### Backend
**${strategy.model.techStack.backend}**

${strategy.model.techStack.backendDetail}

#### Infrastructure
**${strategy.model.techStack.infrastructure}**

${strategy.model.techStack.infrastructureDetail}

#### Outils IA
**${strategy.model.techStack.aiTools}**

${strategy.model.techStack.aiToolsDetail}

#### Sécurité
**${strategy.model.techStack.security}**

${strategy.model.techStack.securityDetail}

---

## 📈 Croissance

### Timeline de lancement

#### Phase 1: ${strategy.growth.launchTimeline.phase1}
**Durée**: ${strategy.growth.launchTimeline.phase1Duration}

${strategy.growth.launchTimeline.phase1Detail}

#### Phase 2: ${strategy.growth.launchTimeline.phase2}
**Durée**: ${strategy.growth.launchTimeline.phase2Duration}

${strategy.growth.launchTimeline.phase2Detail}

#### Phase 3: ${strategy.growth.launchTimeline.phase3}
**Durée**: ${strategy.growth.launchTimeline.phase3Duration}

${strategy.growth.launchTimeline.phase3Detail}

### Stratégie de croissance

#### Canaux d'acquisition
**${strategy.growth.growthStrategy.acquisitionChannels}**

${strategy.growth.growthStrategy.acquisitionChannelsDetail}

#### Stratégie de rétention
**${strategy.growth.growthStrategy.retentionStrategy}**

${strategy.growth.growthStrategy.retentionStrategyDetail}

#### Plan de scaling
**${strategy.growth.growthStrategy.scalingPlan}**

${strategy.growth.growthStrategy.scalingPlanDetail}

#### Partenariats
**${strategy.growth.growthStrategy.partnerships}**

${strategy.growth.growthStrategy.partnershipsDetail}

---

## 🦄 Unicorn

### KPIs

#### North Star Metric
**${strategy.unicorn.kpis.northStarMetric}**

${strategy.unicorn.kpis.northStarMetricDetail}

#### Métriques d'acquisition
**${strategy.unicorn.kpis.acquisitionMetrics}**

${strategy.unicorn.kpis.acquisitionMetricsDetail}

#### Métriques d'engagement
**${strategy.unicorn.kpis.engagementMetrics}**

${strategy.unicorn.kpis.engagementMetricsDetail}

${strategy.unicorn.kpis.revenueMetrics ? `
#### Métriques de revenus
**${strategy.unicorn.kpis.revenueMetrics}**

${strategy.unicorn.kpis.revenueMetricsDetail}
` : ''}

${strategy.unicorn.learnings ? `
### Apprentissages

#### Hypothèses
**${strategy.unicorn.learnings.assumptions}**

${strategy.unicorn.learnings.assumptionsDetail}

#### Expérimentations
**${strategy.unicorn.learnings.experiments}**

${strategy.unicorn.learnings.experimentsDetail}

#### Stratégie de pivot
**${strategy.unicorn.learnings.pivotStrategy}**

${strategy.unicorn.learnings.pivotStrategyDetail}
` : ''}

### Agents IA

#### Agent 1: ${strategy.unicorn.aiAgents.agent1}
**Impact**: ${strategy.unicorn.aiAgents.agent1Impact}

${strategy.unicorn.aiAgents.agent1Detail}

#### Agent 2: ${strategy.unicorn.aiAgents.agent2}
**Impact**: ${strategy.unicorn.aiAgents.agent2Impact}

${strategy.unicorn.aiAgents.agent2Detail}

#### Agent 3: ${strategy.unicorn.aiAgents.agent3}
**Impact**: ${strategy.unicorn.aiAgents.agent3Impact}

${strategy.unicorn.aiAgents.agent3Detail}

${strategy.qdrantThinking ? `
---

## 🧠 Qdrant Thinking - YC Insights

### Entreprises YC Similaires

#### ${strategy.qdrantThinking.ycInsights.company1}
**Batch**: ${strategy.qdrantThinking.ycInsights.company1Batch}

${strategy.qdrantThinking.ycInsights.company1Detail}

#### ${strategy.qdrantThinking.ycInsights.company2}
**Batch**: ${strategy.qdrantThinking.ycInsights.company2Batch}

${strategy.qdrantThinking.ycInsights.company2Detail}

#### ${strategy.qdrantThinking.ycInsights.company3}
**Batch**: ${strategy.qdrantThinking.ycInsights.company3Batch}

${strategy.qdrantThinking.ycInsights.company3Detail}

### Learnings Stratégiques

#### Validation Marché
**${strategy.qdrantThinking.learnings.marketValidation}**

${strategy.qdrantThinking.learnings.marketValidationDetail}

#### Avantage Concurrentiel
**${strategy.qdrantThinking.learnings.competitiveAdvantage}**

${strategy.qdrantThinking.learnings.competitiveAdvantageDetail}

#### Leçons Clés
**${strategy.qdrantThinking.learnings.keyLearnings}**

${strategy.qdrantThinking.learnings.keyLearningsDetail}
` : ''}

---

## 📝 Notes

Ce document a été généré automatiquement par **cbrain**, propulsé par **Mistral AI**.

Pour plus d'informations, visitez [cbrain](https://cbrain-stategy.netlify.app)
`
}
