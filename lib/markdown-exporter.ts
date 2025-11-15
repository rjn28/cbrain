/**
 * Utilitaire pour exporter la stratégie en format Markdown
 */

import type { MistralStrategyData } from "@/types/strategy"

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
- [Concurrents](#-concurrents)

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

## 🏆 Concurrents

${Object.entries(strategy.competitors || {})
  .filter(([key]) => key.endsWith('Detail'))
  .map(([key, detail]) => {
    const num = key.replace('competitor', '').replace('Detail', '')
    const competitorKey = `competitor${num}` as keyof typeof strategy.competitors
    const competitorName = strategy.competitors?.[competitorKey] 
      ? String(strategy.competitors[competitorKey]).split(' - ')[0] 
      : `Concurrent ${num}`
    return `### Concurrent ${num}: ${competitorName}\n\n${detail}\n`
  })
  .join('\n')}

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
