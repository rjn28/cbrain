# Guide de Test Rapide - CBrain V2

## 🚀 Lancer l'Application

```bash
# Démarrer le serveur de développement
npm run dev
```

Puis ouvrir : **http://localhost:3000/cbrain-v2**

---

## 🎯 Tester la Nouvelle Structure

### Test 1 : Mode Démo (Rapide)

1. **Activer le mode démo** dans `.env.local` :
   ```bash
   USE_DEMO_DATA=true
   ```

2. **Redémarrer** le serveur :
   ```bash
   npm run dev
   ```

3. **Tester** :
   - Entrez n'importe quelle idée (ex: "plateforme de e-learning")
   - La stratégie s'affiche en ~1.5 secondes
   - Observez les 5 carrés colorés

### Test 2 : Mode Production (Avec Mistral AI)

1. **Désactiver le mode démo** dans `.env.local` :
   ```bash
   USE_DEMO_DATA=false
   MISTRAL_API_KEY=votre_cle_api
   ```

2. **Redémarrer** et tester :
   - Entrez une idée détaillée
   - Attendez 5-10 secondes
   - Stratégie complète générée par Mistral

---

## 🔍 Vérifier les 5 Carrés

### Carré 1 : Vision (Bleu) 🎯
- Cliquez sur "Strategic Vision"
- Vérifiez : vision, mission, values
- Cliquez sur "Market Analysis"
- Vérifiez : market size, competition, opportunity, target segment

### Carré 2 : Solution (Violet) 💡
- Cliquez sur "MVP Solution"
- Vérifiez : concept, 3 core features, UX, differentiation

### Carré 3 : Modèle (Vert) 💼
- Cliquez sur "Business Model"
- Vérifiez : revenue streams, pricing, costs, unit economics
- Cliquez sur "Technical Stack"
- Vérifiez : frontend, backend, infrastructure, AI tools, security

### Carré 4 : Croissance (Orange) 📈
- Cliquez sur "Launch Timeline"
- Vérifiez : 3 phases avec durées
- Cliquez sur "Growth Strategy"
- Vérifiez : acquisition, retention, scaling, partnerships

### Carré 5 : Unicorn (Rose) 🦄
- Cliquez sur "Key Performance Indicators"
- Vérifiez : North Star Metric, acquisition, engagement, revenue metrics
- Cliquez sur "Learning Framework"
- Vérifiez : assumptions, experiments, pivot strategy
- Cliquez sur "AI Agents Strategy"
- Vérifiez : 3 agents avec détails et impact

---

## 🎨 Vérifier l'Interface

### Animations
- [ ] Les nœuds apparaissent progressivement
- [ ] Les connexions s'animent
- [ ] Les transitions sont fluides

### Interactions
- [ ] Clic sur un nœud ouvre le détail
- [ ] Le panel de détail s'anime
- [ ] Le bouton de fermeture fonctionne
- [ ] Le chat contextuel est accessible

### Couleurs
- [ ] Vision : Bleu (#3B82F6)
- [ ] Solution : Violet (#8B5CF6)
- [ ] Modèle : Vert (#10B981)
- [ ] Croissance : Orange (#F59E0B)
- [ ] Unicorn : Rose (#EC4899)

---

## 🧪 Idées de Test

### Idées Simples
```
"Application de fitness avec IA"
"Marketplace pour freelances"
"Outil de gestion de projet"
```

### Idées Complexes
```
"Plateforme SaaS pour automatiser le recrutement avec IA, 
incluant analyse de CV, matching intelligent et interviews vidéo"

"Application mobile de santé mentale avec thérapie par IA, 
suivi d'humeur et communauté de support"
```

### Idées Techniques
```
"API de traitement d'images avec ML pour e-commerce"
"Infrastructure de monitoring temps réel pour microservices"
```

---

## 🐛 Problèmes Courants

### L'arbre ne s'affiche pas
**Solution** :
1. Vérifiez la console (F12)
2. Regardez les erreurs réseau
3. Activez le mode démo pour tester

### Erreur 429
**Solution** :
1. Attendez 30 secondes
2. Réessayez
3. Le système réessaie automatiquement 3 fois

### Détails ne s'affichent pas
**Solution** :
1. Vérifiez que vous cliquez sur un nœud enfant (pas un carré principal)
2. Les carrés principaux ne sont pas cliquables

---

## 📊 Comparer V1 vs V2

### Tester V1 (Ancienne Version)
```
http://localhost:3000/cbrain
```

### Tester V2 (Nouvelle Version)
```
http://localhost:3000/cbrain-v2
```

### Différences à Observer

| Aspect | V1 | V2 |
|--------|----|----|
| Nombre de nœuds | ~15 | ~20 |
| Profondeur | Basique | Détaillée |
| Structure | Linéaire | 5 carrés |
| Business Model | ❌ | ✅ |
| KPIs | ❌ | ✅ |
| Learnings | ❌ | ✅ |

---

## 📝 Feedback

### Ce qui fonctionne bien
- [ ] Structure claire et logique
- [ ] Couleurs distinctives
- [ ] Détails riches et actionnables
- [ ] Animation fluide

### À améliorer
- [ ] Temps de génération
- [ ] Disposition des nœuds
- [ ] Contenu des détails
- [ ] Autre : _______________

---

## 🚀 Prochaines Actions

1. **Tester** avec vos propres idées
2. **Comparer** V1 et V2
3. **Noter** les améliorations souhaitées
4. **Partager** vos retours

---

## 📞 Support

- 📖 [Documentation complète](./5-SQUARES-FRAMEWORK.md)
- 🐛 [Guide de dépannage](./TROUBLESHOOTING.md)
- ⚡ [Optimisations](./PERFORMANCE.md)

---

**Bon test ! 🎉**
