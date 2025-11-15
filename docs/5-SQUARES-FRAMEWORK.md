# Framework des 5 Carrés - CBrain V2

## Vue d'ensemble

La nouvelle version de CBrain implémente une approche structurée en 5 carrés pour le développement d'idées, inspirée des meilleures pratiques de conseil en stratégie startup.

## Les 5 Carrés

### 🎯 Carré 1 : La Vision
**Contient** : Strategy/Vision + Market Study

**Éléments** :
- **Strategy** : Vision long-terme, mission, valeurs fondamentales
- **Market Study** : Taille du marché (TAM/SAM/SOM), analyse concurrentielle, opportunités, segments cibles

**Couleur** : Bleu (#3B82F6)

---

### 💡 Carré 2 : La Solution (MVP)
**Contient** : Product MVP

**Éléments** :
- **MVP** : Concept produit, 3 fonctionnalités core, UX philosophy, différenciation

**Couleur** : Violet (#8B5CF6)

---

### 💼 Carré 3 : Le Modèle
**Contient** : Business Model + Stack Technique

**Éléments** :
- **Business Model** : Sources de revenus, stratégie de pricing, structure de coûts, unit economics
- **Tech Stack** : Frontend, backend, infrastructure, outils IA, sécurité

**Couleur** : Vert (#10B981)

---

### 📈 Carré 4 : La Croissance
**Contient** : Launch Timeline + Growth Strategy

**Éléments** :
- **Launch Timeline** : 3 phases (Foundation, Validation, Scale) avec durées
- **Growth Strategy** : Canaux d'acquisition, rétention, scaling, partenariats

**Couleur** : Orange (#F59E0B)

---

### 🦄 Carré 5 : L'Unicorn
**Contient** : Key KPIs + Learnings + AI Agents

**Éléments** :
- **KPIs** : North Star Metric, métriques d'acquisition, engagement, revenus
- **Learnings** : Hypothèses à tester, expériences, stratégie de pivot
- **AI Agents** : 3 agents IA avec rôles, détails et impact attendu

**Couleur** : Rose (#EC4899)

---

## Architecture Technique

### Nouveaux Fichiers

#### Types
- `types/strategy-v2.ts` - Interfaces TypeScript pour les 5 carrés

#### API
- `app/api/generate-strategy/prompt-v2.ts` - Prompt optimisé Mistral AI

#### Utilitaires
- `lib/demo-data-v2.ts` - Données de démonstration
- `lib/strategy-to-nodes-v2.ts` - Transformation en nœuds React Flow

#### Configuration
- `config/nodes-v2.ts` - Configuration des nœuds et couleurs

#### Composants
- `components/cbrain-canvas-v2.tsx` - Canvas principal v2
- `components/detail-panel-v2.tsx` - Panel de détails v2

#### Pages
- `app/cbrain-v2/page.tsx` - Page de test v2

---

## Utilisation

### Accéder à la V2
```
http://localhost:3000/cbrain-v2
```

### Mode Démo
```bash
# Dans .env.local
USE_DEMO_DATA=true
```

### Génération de Stratégie
1. Entrez votre idée
2. Mistral AI génère une stratégie complète en 5 carrés
3. L'arbre s'anime progressivement
4. Cliquez sur les nœuds pour voir les détails

---

## Prompt Mistral AI

Le prompt v2 est optimisé pour générer :
- **Textes courts** : 10-20 mots max pour les titres
- **Détails riches** : 3-4 phrases complètes pour chaque élément
- **Données concrètes** : Chiffres, métriques, timelines
- **Approche professionnelle** : Langage business, actionnable

---

## Visualisation

### Structure de l'Arbre

```
                    🧠 CBrain Strategy Framework
                              |
                      [Project Name]
                              |
        ┌─────────┬──────────┼──────────┬─────────┐
        │         │          │          │         │
    🎯 Vision  💡 Solution 💼 Modèle  📈 Growth  🦄 Unicorn
        │         │          │          │         │
    ┌───┴───┐     │      ┌───┴───┐  ┌───┴───┐ ┌───┴────┬────┐
Strategy Market  MVP  Business Tech Timeline Growth KPIs Learn AI
```

### Couleurs par Carré
- **Vision** : Bleu - Stratégie et marché
- **Solution** : Violet - Produit et MVP
- **Modèle** : Vert - Business et tech
- **Growth** : Orange - Lancement et croissance
- **Unicorn** : Rose - KPIs, learnings, IA

---

## Avantages de l'Approche 5 Carrés

### 1. Structure Claire
- Séparation logique des préoccupations
- Progression naturelle de la vision à l'exécution
- Facile à comprendre et à communiquer

### 2. Complétude
- Couvre tous les aspects d'une startup
- De la vision stratégique aux métriques opérationnelles
- Inclut l'innovation (AI Agents)

### 3. Actionnable
- Chaque carré contient des éléments concrets
- Timelines et métriques définies
- Expériences et hypothèses à tester

### 4. Professionnelle
- Approche de conseil en stratégie
- Langage business approprié
- Crédible pour investisseurs et partenaires

---

## Prochaines Étapes

### Court Terme
- [ ] Tester avec différentes idées
- [ ] Affiner les prompts Mistral
- [ ] Améliorer l'animation des nœuds
- [ ] Ajouter export Markdown v2

### Moyen Terme
- [ ] Intégration chat contextuel
- [ ] Système de versioning des stratégies
- [ ] Collaboration multi-utilisateurs
- [ ] Templates par industrie

### Long Terme
- [ ] IA pour suggérer des améliorations
- [ ] Analyse comparative avec concurrents
- [ ] Simulation de scénarios
- [ ] Intégration outils de gestion de projet

---

## Comparaison V1 vs V2

| Aspect | V1 (Ancienne) | V2 (5 Carrés) |
|--------|---------------|---------------|
| Structure | 5 piliers linéaires | 5 carrés interconnectés |
| Profondeur | Basique | Approfondie |
| Business Model | Absent | Complet |
| Market Study | Basique | Détaillée |
| KPIs | Absents | Complets |
| Learnings | Absents | Framework complet |
| AI Agents | 4 outils | 3 agents stratégiques |
| Approche | Technique | Conseil stratégique |

---

## Documentation Technique

### Types TypeScript

```typescript
interface ComprehensiveStrategy {
  projectName: string
  tagline: string
  vision: VisionSquare
  solution: SolutionSquare
  model: ModelSquare
  growth: GrowthSquare
  unicorn: UnicornSquare
}
```

### Génération de Nœuds

```typescript
const { nodes, edges } = strategyToNodesV2(strategy)
```

### Couleurs

```typescript
const SQUARE_COLORS = {
  vision: { main: '#3B82F6', light: '#DBEAFE', border: '#2563EB' },
  solution: { main: '#8B5CF6', light: '#EDE9FE', border: '#7C3AED' },
  model: { main: '#10B981', light: '#D1FAE5', border: '#059669' },
  growth: { main: '#F59E0B', light: '#FEF3C7', border: '#D97706' },
  unicorn: { main: '#EC4899', light: '#FCE7F3', border: '#DB2777' },
}
```

---

**Version** : 2.0.0  
**Date** : 15 Novembre 2024  
**Statut** : ✅ Prêt pour test
