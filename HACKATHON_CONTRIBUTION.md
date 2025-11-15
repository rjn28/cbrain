# Ma Contribution au Hackathon - CBrain

**Roch Junior NICOLAS**

---

## 💻 Développement Front-End

J'ai créé l'interface utilisateur complète avec **Next.js 14** et **React 18** :
- Page d'accueil animée avec fond géométrique
- Visualisation interactive avec **React Flow** (arbre stratégique)
- Système d'animation progressive des nœuds
- Modal de détails avec chat contextuel intégré
- Design system avec 5 couleurs distinctives (Bleu, Violet, Vert, Orange, Rose)
- Interface responsive et animations fluides

---

## 🤖 Intégration Mistral AI

J'ai intégré l'API Mistral AI pour la génération intelligente :
- Création de prompts structurés pour obtenir des stratégies en JSON
- Système de génération en 5 carrés : Vision, Solution, Modèle, Croissance, Unicorn
- Chat contextuel sur chaque élément avec historique de conversation
- Gestion d'erreurs robuste avec retry automatique (exponential backoff)
- Optimisation des performances (modèle `open-mistral-7b`, température 0.3)
- Parsing JSON avec auto-correction des réponses incomplètes

---

## 🔧 Création du Parser pour l'Arborescence

J'ai développé le système de transformation des données Mistral en arbre React Flow :
- Parser V1 : transformation JSON → nœuds React Flow avec positionnement intelligent
- Parser V2 : refonte complète pour le framework 5 carrés (20+ nœuds)
- Système d'animation séquentielle des nœuds et edges
- Configuration des couleurs, positions et connexions
- Gestion des détails structurés par carré stratégique

---

## ⚙️ Développement Back-End

J'ai créé l'infrastructure API avec Next.js App Router :
- API `/api/generate-strategy` : endpoint pour générer les stratégies
- API `/api/chat-node` : endpoint pour le chat contextuel
- Gestion des variables d'environnement et validation des entrées
- Système de retry avec exponential backoff pour les erreurs 429
- Fallback automatique vers données de démo en cas d'échec
- Logs détaillés et codes HTTP appropriés

---

## 📊 Résultats

- **~3,000 lignes de code** écrites
- **Temps de génération** : 5-10 secondes (60% plus rapide)
- **2 versions** de l'architecture (V1 et V2)
- **Déployé sur Netlify** avec CI/CD automatisé

---

**Technologies** : Next.js, React, TypeScript, Mistral AI, React Flow, Tailwind CSS

**GitHub** : https://github.com/rjn28/cbrain  
**Demo** : https://cbrain-stategy.netlify.app
