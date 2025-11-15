# 🚀 Guide de déploiement complet

## Option 1 : Déploiement rapide (recommandé)

### Via le script automatique

```bash
./scripts/setup-github.sh
```

Le script va :
1. ✅ Vérifier Git
2. ✅ Ajouter tous les fichiers
3. ✅ Créer le commit initial
4. ✅ Configurer le remote GitHub
5. ✅ Pousser le code

## Option 2 : Déploiement manuel

### 1. Créer le repo sur GitHub

Aller sur https://github.com/new et créer un repo nommé `cbrain-strategy-generator`

### 2. Pousser le code

```bash
# Ajouter les fichiers
git add .

# Commit
git commit -m "feat: initial commit - cbrain strategy generator"

# Ajouter le remote (remplacer TON_USERNAME)
git remote add origin https://github.com/TON_USERNAME/cbrain-strategy-generator.git

# Pousser
git branch -M main
git push -u origin main
```

### 3. Configurer Netlify

```bash
# Déployer sur Netlify
netlify deploy --prod

# Ou configurer le déploiement automatique
netlify link
```

### 4. Ajouter les variables d'environnement sur Netlify

```bash
netlify env:set MISTRAL_API_KEY "votre_clé_api"
```

Ou via l'interface web :
1. Aller sur https://app.netlify.com
2. Sélectionner votre site
3. Site settings → Environment variables
4. Ajouter `MISTRAL_API_KEY`

## 📋 Checklist avant déploiement

- [ ] `.env.local` n'est PAS commité
- [ ] `.gitignore` est configuré
- [ ] `.env.example` est présent
- [ ] `npm run build` fonctionne
- [ ] Documentation à jour
- [ ] Variables d'environnement configurées sur Netlify

## 🔗 Liens utiles

- **Repo GitHub** : https://github.com/rjn28/cbrain
- **Site Netlify** : https://cbrain-stategy.netlify.app
- **Admin Netlify** : https://app.netlify.com/projects/cbrain-stategy

## 🎉 Après le déploiement

Ton application sera accessible à :
- **Production** : https://cbrain-stategy.netlify.app
- **Preview** : Chaque PR aura son URL de preview

Les déploiements automatiques seront déclenchés à chaque push sur `main`.
