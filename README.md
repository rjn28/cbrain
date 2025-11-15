# 🧠 cbrain - Générateur de Stratégie IA

Application web interactive qui transforme n'importe quelle idée en stratégie complète visualisée sous forme d'arbre animé, propulsée par Mistral AI et React Flow.

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
git clone <repo-url>
cd cbrain-rebuild

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

## 📊 Performance

- Build optimisé avec Turbopack
- Lazy loading des composants
- Animations GPU-accelerated
- Code splitting automatique

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
