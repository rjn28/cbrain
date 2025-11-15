# 🧠 cbrain - Générateur de Stratégie IA

[![Netlify Status](https://api.netlify.com/api/v1/badges/1480863b-67f2-40da-b46b-2e6fda2c1b1b/deploy-status)](https://app.netlify.com/sites/cbrain-stategy/deploys)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Mistral AI](https://img.shields.io/badge/Mistral-AI-orange)](https://mistral.ai/)
[![License](https://img.shields.io/badge/License-Private-red)](https://github.com/rjn28/cbrain)

Application web interactive qui transforme n'importe quelle idée en stratégie complète visualisée sous forme d'arbre animé, propulsée par Mistral AI et React Flow.

🔗 **[Demo Live](https://cbrain-stategy.netlify.app)** | 📚 **[Documentation](./docs/README.md)**

## ✨ Fonctionnalités

- 🎯 **Génération automatique** de stratégie complète via Mistral AI
- 🌳 **Visualisation interactive** avec React Flow
- 🎨 **Animations fluides** pour l'apparition progressive des nœuds
- 📱 **Design responsive** et moderne
- 💡 **Détails approfondis** au clic sur chaque élément
- ⚡ **Performance optimisée** avec Next.js 16

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Clé API Mistral AI

### Installation

```bash
# Cloner le projet
git clone https://github.com/rjn28/cbrain.git
cd cbrain

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local et ajouter votre MISTRAL_API_KEY
```

### Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Déploiement

```bash
# Avec Netlify CLI
netlify deploy --prod
```

## 📁 Structure du projet

```
cbrain-rebuild/
├── app/                    # Pages Next.js
│   ├── api/               # API routes
│   └── cbrain/            # Page principale
├── components/            # Composants React
│   ├── home/             # Composants page d'accueil
│   └── workflow/         # Composants workflow
├── config/               # Configuration
├── lib/                  # Utilitaires
├── types/                # Types TypeScript
└── public/               # Assets statiques
```

Voir [ARCHITECTURE.md](./ARCHITECTURE.md) pour plus de détails.

## 🛠️ Stack technique

- **Framework** : Next.js 16 (App Router)
- **UI** : React 18 + Tailwind CSS
- **Visualisation** : React Flow
- **IA** : Mistral AI
- **Langage** : TypeScript
- **Déploiement** : Netlify

## 📖 Documentation

- [Architecture](./docs/ARCHITECTURE.md) - Structure détaillée du projet
- [Performance](./docs/PERFORMANCE.md) - Optimisations et gestion des erreurs
- [Contributing](./docs/CONTRIBUTING.md) - Guide de contribution
- [Project Summary](./docs/PROJECT_SUMMARY.md) - Résumé complet du projet
- [Structure](./docs/STRUCTURE.txt) - Visualisation de la structure
- [ENV Setup](./ENV_SETUP.md) - Configuration des variables d'environnement

## 🎯 Workflow utilisateur

1. L'utilisateur entre son idée dans la barre de recherche
2. Mistral AI génère une stratégie complète (persona, produit, stack, planning, agents IA)
3. L'arbre stratégique s'anime progressivement
4. L'utilisateur peut cliquer sur chaque nœud pour voir les détails
5. Il peut modifier son idée et régénérer

## 🧩 Composants principaux

### CbrainCanvas
Composant racine qui orchestre le workflow complet

### HomeHeader
Page d'accueil avec fond animé et barre de recherche

### DetailPanel
Modal flottante affichant les détails de chaque élément

### FloatingPromptBar
Barre de prompt pour modifier l'idée après génération

## 🎨 Personnalisation

### Ajouter une intégration
Éditer `config/integrations.ts`

### Modifier l'animation
Éditer `config/animation.ts`

### Changer les couleurs
Éditer `components/detail-panel.tsx` (fonction `getColorForTitle`)

## 🐛 Debugging

### Logs
- Console navigateur : Erreurs React
- Network tab : Requêtes API
- Netlify logs : Erreurs production

### Problèmes courants

**L'arbre ne s'affiche pas**
- Vérifier la clé API Mistral
- Vérifier la structure des données retournées

**Animation saccadée**
- Réduire le nombre d'étapes dans `config/animation.ts`

**Modal ne s'ouvre pas**
- Vérifier que les données contiennent les champs `*Detail`

**Erreur 429 (Service Capacity Exceeded)**
- L'API Mistral est temporairement surchargée
- Le système réessaie automatiquement 3 fois avec délais croissants
- Si l'erreur persiste, utilisez le mode démo : `USE_DEMO_DATA=true` dans `.env.local`
- Attendez quelques minutes avant de réessayer

## 📊 Performance

- Build optimisé avec Turbopack
- Lazy loading des composants
- Animations GPU-accelerated
- Code splitting automatique
- **Modèle Mistral optimisé** : `open-mistral-7b` pour des réponses 60% plus rapides
- **Retry automatique** avec exponential backoff pour gérer les erreurs 429
- **Fallback vers données de démo** en cas d'indisponibilité de l'API

Voir [PERFORMANCE.md](./docs/PERFORMANCE.md) pour plus de détails sur les optimisations.

## 🔒 Sécurité

- Clé API Mistral côté serveur uniquement
- Validation des entrées utilisateur
- Rate limiting sur l'API

## 📝 Licence

Projet personnel - Tous droits réservés

## 👤 Auteur

Roch Junior NICOLAS

## 🙏 Remerciements

- Mistral AI pour l'API
- React Flow pour la visualisation
- Netlify pour l'hébergement
- Partenaires du hackathon : Fal.ai, ElevenLabs, Qdrant, N8n, Lovable

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Vérifier les logs Netlify

---

**Version** : 1.0.0  
**Dernière mise à jour** : Novembre 2024  
**Statut** : ✅ En production
