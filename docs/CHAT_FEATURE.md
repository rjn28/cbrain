# 💬 Fonctionnalité de Chat Contextuel

## Vue d'ensemble

Chaque modal de détail dispose maintenant d'un mini-chat intégré permettant d'itérer avec Mistral AI sur l'élément spécifique de la stratégie.

## Fonctionnalités

### 🤖 Chat Contextuel
- Discussion en temps réel avec Mistral AI
- Contexte automatique basé sur le nœud sélectionné
- Réponses concises et actionnables (2-3 phrases)
- Historique de conversation maintenu

### 👍👎 Système de Vote
- Pouce en l'air (👍) pour les bonnes réponses
- Pouce en bas (👎) pour les mauvaises réponses
- Feedback visuel immédiat
- Permet d'améliorer les futures interactions

### 🎨 Interface
- Toggle entre "Détails" et "Discuter"
- Design cohérent avec le reste de l'application
- Scroll automatique vers les nouveaux messages
- Indicateur de chargement pendant la réponse

## Architecture

### Composants

#### `NodeChat.tsx`
Composant de chat réutilisable avec :
- Gestion de l'état des messages
- Système de rating
- Auto-scroll
- Gestion du loading

#### `DetailPanel.tsx`
Modal mise à jour avec :
- Toggle chat/détails
- Intégration du composant NodeChat
- Bouton "Discuter" dans le footer

### API Route

#### `/api/chat-node`
Endpoint dédié pour le chat contextuel :
- **Input** : `nodeTitle`, `nodeContent`, `userMessage`, `conversationHistory`
- **Output** : `message` (réponse de Mistral)
- **Modèle** : `mistral-small-latest`
- **Max tokens** : 300 (réponses concises)

## Utilisation

### Pour l'utilisateur

1. Cliquer sur n'importe quel nœud de l'arbre
2. Dans la modal, cliquer sur "Discuter"
3. Poser une question ou demander des améliorations
4. Recevoir une réponse de Mistral AI
5. Voter avec 👍 ou 👎
6. Continuer la conversation

### Exemples de questions

**Pour un Persona :**
- "Quels sont les besoins spécifiques de ce persona ?"
- "Comment mieux cibler cette audience ?"
- "Quels canaux de communication privilégier ?"

**Pour un Problème :**
- "Comment quantifier l'impact de ce problème ?"
- "Quelles sont les causes racines ?"
- "Comment valider que c'est un vrai problème ?"

**Pour une Feature :**
- "Comment prioriser cette fonctionnalité ?"
- "Quels sont les risques techniques ?"
- "Comment mesurer le succès ?"

## Prompt System

Le système utilise un prompt contextualisé :

```
Tu es un expert en stratégie business qui aide à affiner et améliorer des éléments de stratégie.

Contexte actuel :
- Élément : [Titre du nœud]
- Contenu actuel : [Détails du nœud]

Ta mission :
- Répondre de manière concise et actionnable (2-3 phrases max)
- Proposer des améliorations concrètes
- Poser des questions pertinentes pour affiner la stratégie
- Être constructif et encourageant
```

## Données collectées

### Ratings
Les votes (👍/👎) sont stockés localement dans l'état du composant.

**Utilisation future possible :**
- Analyser les réponses les mieux notées
- Améliorer le prompt system
- Fine-tuner le modèle
- Créer une base de connaissances

### Historique
L'historique de conversation est maintenu pendant la session et envoyé à chaque requête pour le contexte.

## Performance

### Optimisations
- Réponses limitées à 300 tokens
- Pas de streaming (réponse complète)
- Debouncing sur l'input (via Enter)
- Scroll optimisé avec `useRef`

### Coûts
- ~100-300 tokens par réponse
- Modèle `mistral-small-latest` (économique)
- Pas de stockage côté serveur

## Améliorations futures

### Court terme
- [ ] Sauvegarder l'historique dans localStorage
- [ ] Ajouter des suggestions de questions
- [ ] Permettre de copier les réponses
- [ ] Ajouter un bouton "Régénérer"

### Moyen terme
- [ ] Streaming des réponses
- [ ] Synthèse vocale des réponses
- [ ] Export de la conversation
- [ ] Partage de conversations

### Long terme
- [ ] Fine-tuning basé sur les votes
- [ ] Multi-agents (différents experts)
- [ ] Génération d'images avec Fal.ai
- [ ] Intégration avec Qdrant pour RAG

## Sécurité

### Validations
- ✅ Vérification des inputs côté serveur
- ✅ Limitation de la longueur des messages
- ✅ Rate limiting (via Netlify)
- ✅ Clé API côté serveur uniquement

### Données sensibles
- ❌ Pas de stockage des conversations
- ❌ Pas de données personnelles
- ✅ Contexte limité au nœud actuel

## Troubleshooting

### Le chat ne répond pas
1. Vérifier la clé API Mistral
2. Vérifier les logs Netlify
3. Vérifier la console navigateur

### Réponses incohérentes
1. Le contexte est peut-être trop court
2. Augmenter `max_tokens` dans l'API route
3. Améliorer le prompt system

### Performance lente
1. Vérifier la latence réseau
2. Considérer le streaming
3. Optimiser le prompt

---

**Version** : 1.0.0  
**Date** : Novembre 2024  
**Statut** : ✅ En production
