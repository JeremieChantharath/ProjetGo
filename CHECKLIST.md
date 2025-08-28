# 🎮 Checklist - Application Go 9x9

## 📋 **Étapes d'installation et configuration**

### ✅ **Prérequis (vérifier)**
- [x ] Node.js installé (`node --version`)
- [ x] npm installé (`npm --version`)
- [x ] Terminal PowerShell ouvert

### ✅ **Installation des outils**
- [ x] Installer Expo CLI globalement : `npm install -g @expo/cli`
- [ x] Vérifier l'installation : `expo --version`

### ✅ **Création du projet**
- [x ] Créer le projet : `npx create-expo-app GoGame --template blank-typescript`
- [x ] Aller dans le dossier : `cd GoGame`
- [x ] Installer les dépendances : `npm install`

### ✅ **Test initial**
- [x] Lancer le projet : `npm start`
- [x] Scanner le QR code avec Expo Go sur votre téléphone
- [x] Vérifier que l'app se lance sur votre téléphone

### ✅ **Mise sur GitHub**
- [x] Vérifier le statut Git : `git status`
- [x] Ajouter tous les fichiers : `git add .`
- [x] Premier commit : `git commit -m "Initial commit: Projet Go 9x9 avec Expo"`
- [x] Créer un repository sur GitHub
- [x] Lier le repository local à GitHub : `git remote add origin [URL]`
- [x] Pousser le code : `git push -u origin main`

## 🎯 **Fonctionnalités à développer**

### ✅ **Phase 1 : Structure de base (Aujourd'hui)**
- [x] Navigation entre écrans
- [x] Écran de connexion (input nom + bouton)
- [x] Écran de jeu (plateau 9x9 visuel)
- [ ] Design de base

### ✅ **Phase 2 : Logique de jeu (Prochaine session)**
- [x] Plateau interactif (poser des pierres)
- [x] Alternance des tours
- [ ] Règles de capture basiques
- [ ] Gestion des scores

### ✅ **Phase 3 : Mode 2 joueurs local**
- [ ] Gestion des 2 joueurs
- [ ] Fin de partie
- [ ] Nouvelle partie
- [ ] Historique des coups

### ✅ **Phase 4 : Finalisation**
- [ ] Tests sur différents appareils
- [ ] Correction des bugs
- [ ] Interface utilisateur améliorée
- [ ] Préparation pour le Play Store

## 🚨 **En cas de problème**

### **Erreur d'installation**
- Vérifier que Node.js est à jour
- Essayer `npm cache clean --force`
- Redémarrer le terminal

### **App ne se lance pas**
- Vérifier que Expo Go est installé sur le téléphone
- Vérifier que le téléphone et l'ordinateur sont sur le même réseau WiFi
- Redémarrer le projet : `npm start`

### **Erreurs de compilation**
- Vérifier que toutes les dépendances sont installées
- Essayer `npm install` à nouveau
- Vérifier la version de Node.js (recommandé : 18+)

## 📱 **Commandes utiles**

```bash
# Démarrer le projet
npm start

# Build pour production
expo build:android

# Installer une nouvelle dépendance
npm install nom-du-package

# Vérifier les erreurs
npm run lint
```

## 🎯 **Objectif du jour**

**Résultat attendu en 2 heures :**
- ✅ App qui compile sans erreur
- ✅ Interface de connexion fonctionnelle
- ✅ Plateau de Go 9x9 visuel
- ✅ App installée sur votre téléphone

---

**Dernière mise à jour :** Aujourd'hui
**Prochaine session :** Logique de jeu et interactions
