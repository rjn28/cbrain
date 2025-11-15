# 🏗️ Architecture du projet cbrain

## 📁 Structure des dossiers

```
cbrain-rebuild/
├── app/                          # Pages Next.js (App Router)
│   ├── api/
│   │   └── generate-strategy/    # API route Mistral AI
│   │       └── route.ts
│   ├── cbrain/                   # Page principale
│   │   └── page.tsx
│   ├── layout.tsx                # Layout global
│   └── page.tsx                  # Redirection vers /cbrain
│
├── components/                   # Composants React
│   ├── home/                     # Composants de la page d'accueil
│   │   ├── HomeHeader.tsx        # Header avec fond animé
│   │   ├── IntegrationIcons.tsx  # Icônes des partenaires
│   │   └── SearchBar.tsx         # Barre de recherche
│   ├── workflow/                 # Composants du workflow
│   │   ├── FloatingPromptBar.tsx # Barre de prompt flottante
│   │   └── LoadingOverlay.tsx    # Overlay de chargement
│   ├── cbrain-canvas.tsx         # Canvas principal React Flow
│   └── detail-panel.tsx          # Modal de détails
│
├── config/                       # Configuration
│   ├── animation.ts              # Configuration des animations
│   └── integrations.ts           # Liste des intégrations
│
├── lib/                          # Utilitaires
│   └── mistral-strategy-parser.ts # Parser Mistral → React Flow
│
├── types/                        # Types TypeScript
│   └── strategy.ts               # Types de la stratégie
│
└── public/                       # Assets statiques
    ├── logoqdrant.svg
    └── logofal.svg
```

## 🔄 Flux de données

```
1. Utilisateur entre une idée
   ↓
2. SearchBar → handleSubmit → onGenerate
   ↓
3. API Route (/api/generate-strategy)
   ↓
4. Mistral AI génère la stratégie
   ↓
5. Parser (mistral-strategy-parser.ts)
   ↓
6. Création des nœuds et edges React Flow
   ↓
7. Animation progressive (config/animation.ts)
   ↓
8. Affichage de l'arbre
   ↓
9. Clic sur un nœud → DetailPanel
```

## 🧩 Composants principaux

### CbrainCanvas
Composant racine qui orchestre tout le workflow :
- Gère l'état global (idea, isGenerating, showWorkflow)
- Coordonne les sous-composants
- Gère l'animation de l'arbre

### HomeHeader
Page d'accueil avec :
- Titre et sous-titre
- Icônes des intégrations
- Barre de recherche
- Fond animé avec formes géométriques

### FloatingPromptBar
Barre de prompt qui apparaît en bas après génération :
- Permet de modifier l'idée
- Bouton "Régénérer"
- Auto-resize du textarea

### DetailPanel
Modal flottante centrée :
- Affiche les détails d'un nœud
- Design adaptatif selon le type de nœud
- Icônes et couleurs contextuelles

## 📊 Types de données

### MistralStrategyData
Structure complète de la stratégie générée :
- `titreProjet` : Nom du projet
- `ideeCourte` : Description courte
- `strategie` : Persona, problème, objectif (+ détails)
- `produit` : Concept, features (+ détails)
- `stack` : Frontend, backend, partenaires (+ détails)
- `planning` : Étapes 1, 2, 3 (+ détails)
- `agents` : Mistral, Fal, ElevenLabs, Qdrant (+ détails)

Chaque élément a :
- Un texte court (15-20 mots) pour l'affichage dans le nœud
- Un texte détaillé (2-3 paragraphes) pour la modal

## 🎨 Animations

### Séquence d'animation (3,2 secondes)
1. **400ms** : Nœud racine
2. **700ms** : Nom du projet
3. **1000ms** : Branche "Pourquoi"
4. **1300ms** : Branche "Quoi"
5. **1600ms** : Branche "Comment"
6. **1900ms** : Branche "Quand"
7. **2200ms** : Branche "Agents IA"
8. **2400-3000ms** : Sous-nœuds progressifs
9. **3200ms** : Fin (arrêt du loading)

Configuration dans `config/animation.ts`

## 🎯 Bonnes pratiques

### Séparation des responsabilités
- **Components** : UI pure, pas de logique métier
- **Config** : Constantes et configuration
- **Lib** : Utilitaires et parsers
- **Types** : Interfaces TypeScript centralisées

### Nommage
- Composants : PascalCase (`HomeHeader.tsx`)
- Fonctions : camelCase (`createNodesFromMistral`)
- Constantes : UPPER_SNAKE_CASE (`ANIMATION_DURATION`)
- Types : PascalCase (`MistralStrategyData`)

### Documentation
- JSDoc sur toutes les fonctions publiques
- Commentaires explicatifs dans le code
- Types TypeScript stricts

### Performance
- Composants séparés pour éviter les re-renders
- useCallback pour les handlers
- Lazy loading des animations

## 🚀 Commandes

```bash
# Développement
npm run dev

# Build production
npm run build

# Déploiement Netlify
netlify deploy --prod
```

## 🔧 Configuration

### Variables d'environnement
```bash
MISTRAL_API_KEY=your_api_key_here
```

### Netlify
- Build command: `npm run build`
- Publish directory: `.next`
- Plugin: `@netlify/plugin-nextjs`

## 📝 Maintenance

### Ajouter une nouvelle intégration
1. Ajouter dans `config/integrations.ts`
2. L'icône apparaîtra automatiquement

### Modifier l'animation
1. Éditer `config/animation.ts`
2. Ajuster les délais et la séquence

### Ajouter un nouveau type de nœud
1. Mettre à jour `types/strategy.ts`
2. Modifier le prompt dans `app/api/generate-strategy/route.ts`
3. Ajouter la logique dans `lib/mistral-strategy-parser.ts`
4. Mettre à jour `components/detail-panel.tsx` pour les couleurs/icônes

## 🐛 Debugging

### Logs utiles
- Console navigateur : Erreurs React Flow
- Logs Netlify : Erreurs API Mistral
- Network tab : Requêtes API

### Problèmes courants
- **Nœuds ne s'affichent pas** : Vérifier la structure des données Mistral
- **Animation saccadée** : Réduire le nombre d'étapes
- **Modal ne s'ouvre pas** : Vérifier que `detail` existe dans les données
