# 🚀 Guide de création du repo GitHub

## Étape 1 : Préparer le repo local

```bash
# Vérifier le statut
git status

# Ajouter tous les fichiers
git add .

# Créer le commit
git commit -m "feat: initial commit - cbrain strategy generator with Mistral AI"
```

## Étape 2 : Créer le repo sur GitHub

### Option A : Via l'interface web (recommandé)

1. Aller sur [github.com/new](https://github.com/new)
2. Remplir les informations :
   - **Repository name** : `cbrain-strategy-generator`
   - **Description** : `🧠 AI-powered strategy generator with interactive tree visualization using Mistral AI and React Flow`
   - **Visibility** : Public ou Private (selon ta préférence)
   - ⚠️ **NE PAS** cocher "Add a README file"
   - ⚠️ **NE PAS** cocher "Add .gitignore"
   - ⚠️ **NE PAS** cocher "Choose a license"
3. Cliquer sur **"Create repository"**

### Option B : Via GitHub CLI

```bash
# Installer GitHub CLI si nécessaire
brew install gh

# Se connecter
gh auth login

# Créer le repo
gh repo create cbrain-strategy-generator --public --source=. --remote=origin --push
```

## Étape 3 : Lier le repo local au repo GitHub

Si tu as créé le repo via l'interface web, copie les commandes affichées :

```bash
# Ajouter le remote
git remote add origin https://github.com/TON_USERNAME/cbrain-strategy-generator.git

# Vérifier le remote
git remote -v

# Pousser le code
git branch -M main
git push -u origin main
```

## Étape 4 : Configurer les secrets pour Netlify (optionnel)

Si tu veux utiliser GitHub Actions pour déployer sur Netlify :

1. Aller dans **Settings** → **Secrets and variables** → **Actions**
2. Ajouter les secrets :
   - `MISTRAL_API_KEY` : Ta clé API Mistral
   - `NETLIFY_AUTH_TOKEN` : Token d'authentification Netlify
   - `NETLIFY_SITE_ID` : ID du site Netlify

## Étape 5 : Ajouter des badges au README (optionnel)

Ajoute ces badges en haut du README.md :

```markdown
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TON_USERNAME/cbrain-strategy-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
```

## Étape 6 : Protéger la branche main (recommandé)

1. Aller dans **Settings** → **Branches**
2. Cliquer sur **Add rule**
3. Branch name pattern : `main`
4. Cocher :
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging

## 📝 Commandes Git utiles

```bash
# Voir l'historique
git log --oneline

# Créer une nouvelle branche
git checkout -b feature/nouvelle-fonctionnalite

# Pousser une branche
git push origin feature/nouvelle-fonctionnalite

# Mettre à jour depuis GitHub
git pull origin main

# Voir les différences
git diff

# Annuler les modifications
git restore fichier.ts
```

## 🔒 Sécurité

⚠️ **Important** : Ne jamais commiter :
- `.env.local` (déjà dans .gitignore)
- Clés API
- Tokens d'authentification
- Mots de passe

✅ **Toujours utiliser** :
- `.env.example` pour documenter les variables nécessaires
- GitHub Secrets pour les CI/CD
- Variables d'environnement Netlify pour la production

## 🎉 C'est fait !

Ton repo est maintenant sur GitHub ! Tu peux :
- Partager le lien avec d'autres développeurs
- Configurer des webhooks Netlify pour le déploiement automatique
- Ajouter des collaborateurs
- Créer des issues et des pull requests

---

**Lien du repo** : `https://github.com/TON_USERNAME/cbrain-strategy-generator`
