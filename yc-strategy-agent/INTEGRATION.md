# Intégration Qdrant Thinking dans CBrain

## 🎯 Vue d'ensemble

La fonctionnalité **Qdrant Thinking** a été intégrée dans l'arbre stratégique CBrain comme **6ème carré**. Elle analyse les entreprises YC similaires et génère des insights stratégiques.

## 🏗️ Architecture

### 1. Nouveau Carré dans l'Arbre

**Position** : x=1200, après Unicorn  
**Couleur** : Cyan (`#06b6d4`)  
**Icône** : 🧠

**Structure** :
```
🧠 Qdrant Thinking
├── 🏢 YC Insights (3 entreprises)
│   ├── Company 1 + Batch
│   ├── Company 2 + Batch
│   └── Company 3 + Batch
└── 📚 Learnings
    ├── ✅ Market Validation
    ├── ⚡ Competitive Advantage
    └── 📚 Key Learnings
```

### 2. Types TypeScript

Fichier : `types/strategy-v2.ts`

```typescript
export interface QdrantThinkingSquare {
  ycInsights: {
    company1: string
    company1Detail: string
    company1Batch: string
    company2: string
    company2Detail: string
    company2Batch: string
    company3: string
    company3Detail: string
    company3Batch: string
  }
  learnings: {
    marketValidation: string
    marketValidationDetail: string
    competitiveAdvantage: string
    competitiveAdvantageDetail: string
    keyLearnings: string
    keyLearningsDetail: string
  }
}

export interface ComprehensiveStrategy {
  // ... autres champs
  qdrantThinking?: QdrantThinkingSquare
}
```

### 3. API Routes

#### `/api/yc-strategy` (POST)
Appelle le script Python pour rechercher des entreprises YC similaires.

**Request** :
```json
{
  "idea": "AI-powered CRM for startups"
}
```

**Response** :
```json
{
  "similarCompanies": [
    {
      "name": "DoorDash",
      "description": "Food delivery platform",
      "batch": "S13",
      "score": 0.95,
      "url": "https://doordash.com"
    }
  ],
  "insights": {
    "marketValidation": "3 entreprises YC similaires trouvées",
    "topCompany": "DoorDash",
    "averageScore": "0.92"
  }
}
```

#### `/api/generate-strategy-progressive` (Mise à jour)
Maintenant inclut la génération de la section Qdrant Thinking.

**Streaming Events** :
```javascript
// Événement Qdrant Thinking
{
  type: "qdrantThinking",
  data: {
    ycInsights: { ... },
    learnings: { ... }
  }
}
```

### 4. Prompts IA

Fichier : `lib/prompts/category-prompts.ts`

```typescript
export function getQdrantThinkingPrompt(
  idea: string, 
  projectName: string, 
  ycCompanies: any[]
): string
```

Génère un prompt Mistral qui analyse les entreprises YC similaires et crée des insights stratégiques.

### 5. Parser Progressif

Fichier : `lib/mistral-strategy-parser-progressive.ts`

- Ajout du 6ème carré principal "qdrant"
- 6 sous-nœuds : 3 pour les entreprises YC, 3 pour les learnings
- Edges avec couleur cyan (`#06b6d4`)

## 🚀 Utilisation

### Mode Actuel (Simulé)

Pour l'instant, le système utilise des **données YC simulées** :

```typescript
const mockYCCompanies = [
  { name: "Similar YC Company 1", description: "Leading company", batch: "S20" },
  { name: "Similar YC Company 2", description: "Innovative approach", batch: "W21" },
  { name: "Similar YC Company 3", description: "Fast-growing startup", batch: "S21" },
]
```

Ces données sont utilisées dans le prompt pour que Mistral génère des insights pertinents.

### Mode Futur (Qdrant Réel)

Pour activer la recherche Qdrant réelle :

1. **Installer les dépendances Python** :
```bash
cd yc-strategy-agent
pip install -r requirements.txt
playwright install
```

2. **Configurer .env** :
```bash
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_key
MISTRAL_API_KEY=your_mistral_key
COLLECTION_NAME=yc_companies
```

3. **Setup Qdrant** (une seule fois) :
```bash
python scripts/0_setup_qdrant.py
```

4. **Modifier l'API** :

Dans `app/api/generate-strategy-progressive/route.ts`, remplacer :

```typescript
// Actuel (simulé)
const mockYCCompanies = [...]

// Par (réel)
const ycResponse = await fetch('http://localhost:3000/api/yc-strategy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ idea })
})
const ycData = await ycResponse.json()
const ycCompanies = ycData.similarCompanies
```

## 📊 Fonctionnalités

### 1. Recherche Sémantique
- Trouve les 3 entreprises YC les plus similaires
- Utilise les embeddings pour la similarité sémantique
- Score de similarité pour chaque entreprise

### 2. Insights Stratégiques
- **Market Validation** : Validation du marché par YC
- **Competitive Advantage** : Comment se différencier
- **Key Learnings** : Leçons des entreprises similaires

### 3. Affichage Progressif
- Le carré Qdrant Thinking apparaît avec les autres
- Les sous-nœuds se construisent progressivement
- Animations fluides et cohérentes

## 🎨 Design

### Couleurs
- **Carré principal** : Cyan (`#06b6d4`)
- **Sous-nœuds** : Blanc avec bordure cyan
- **Hover** : Effet de surbrillance

### Icônes
- 🧠 Qdrant Thinking
- 🏢 Entreprises YC
- ✅ Validation
- ⚡ Avantage
- 📚 Learnings

## 🔧 Maintenance

### Tester la Recherche YC
```bash
cd yc-strategy-agent
python scripts/1_semantic_search.py "AI-powered CRM"
```

### Tester l'API Next.js
```bash
curl -X POST http://localhost:3000/api/yc-strategy \
  -H "Content-Type: application/json" \
  -d '{"idea":"AI-powered CRM"}'
```

### Debug
```bash
# Voir les logs streaming
npm run dev
# Ouvrir /cbrain et observer la console
```

## 📈 Roadmap

### Phase 1 (Actuel) ✅
- [x] Structure TypeScript
- [x] API simulée
- [x] Prompts IA
- [x] Parser progressif
- [x] Affichage dans l'arbre

### Phase 2 (À venir)
- [ ] Intégration Qdrant réelle
- [ ] Cache des résultats YC
- [ ] Scraping des pages YC
- [ ] Google Search pour GTM

### Phase 3 (Futur)
- [ ] Analyse approfondie des concurrents
- [ ] Recommandations stratégiques personnalisées
- [ ] Export des insights YC en PDF
- [ ] Comparaison visuelle avec les YC companies

## 🐛 Troubleshooting

### Erreur "Python not found"
```bash
which python3
# Mettre à jour le chemin dans app/api/yc-strategy/route.ts
```

### Erreur "Qdrant connection"
```bash
# Vérifier les variables d'environnement
cat yc-strategy-agent/.env
```

### Le carré n'apparaît pas
- Vérifier la console du navigateur
- S'assurer que `qdrantThinking` est dans le stream
- Vérifier les types TypeScript

## 📞 Support

Pour toute question sur l'intégration Qdrant Thinking :
1. Consulter les logs de la console
2. Vérifier `TECHNICAL_DOC.md`
3. Tester les scripts Python individuellement

---

**Status** : ✅ Intégré avec données simulées  
**Prochaine étape** : Activer Qdrant réel
