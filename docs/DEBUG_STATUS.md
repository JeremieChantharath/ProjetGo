# Statut du Debug - Plateau de Go

## ✅ Ce qui fonctionne correctement

### Calculs de position
- **Tests unitaires** : Tous les tests passent (12/12)
- **Calculs de position** : Vérifiés et cohérents
- **Espacement** : 8.5% entre chaque intersection pour un plateau 9x9
- **Marges** : 16% sur tous les côtés
- **Limites** : Toutes les positions sont dans les limites acceptables (16% à 84%)

### Composants implémentés selon les guidelines
- ✅ `Board.tsx` : Utilise `BOARD_PADDING` et `showDebug = false`
- 🔄 `Intersection.tsx` : Utilise `transform: translate` mais pas encore les utilitaires `boardLayout.ts`
- ✅ `BoardLabels.tsx` : Utilise les fonctions de `boardLayout.ts` avec centrage
- ✅ `Grid.tsx` : Utilise `calculateGridLinePosition`
- ✅ `BoardDebug.tsx` : Affiche positions, spacing et indices

## 🔍 Problèmes potentiels identifiés

### 1. Problème de centrage des intersections
Les intersections utilisent des marges négatives en pourcentage :
```typescript
marginLeft: `-${tileSize / 2}%` as any,
marginTop: `-${tileSize / 2}%` as any,
```
**Problème** : React Native peut avoir des problèmes avec les pourcentages négatifs.

### 2. Problème de padding du Board
Le Board utilise `BOARD_PADDING = 16px` mais les labels sont positionnés en pourcentage.
**Risque** : Décalage entre les positions calculées et l'espace disponible.

## 🧪 Tests et vérifications

### Script de debug
- `debug-positions.js` : Calcule et affiche toutes les positions
- Résultats attendus pour 9x9 :
  - Index 0: 16.00% (A1)
  - Index 4: 50.00% (E5) - Centre
  - Index 8: 84.00% (J9)

### Tests unitaires
- `boardLayout.test.ts` : Vérifie tous les calculs ✅ **Tous les tests passent (12/12)**
- `gameRules.test.ts` : Vérifie les règles de jeu 🔄 **11/12 tests passent (1 échec sur la capture)**

## 🚀 Prochaines étapes recommandées

### 1. Vérifier l'affichage réel
- Activer `showDebug={true}` temporairement
- Comparer les positions affichées avec les calculs
- Vérifier l'alignement grille/pierres/labels

### 2. Tester les marges négatives
- Remplacer les marges négatives par des `transform: translate`
- Vérifier que le centrage fonctionne toujours

### 3. Ajuster le padding du Board
- Tester avec `padding: 0` pour voir si c'est le problème
- Ajuster `BOARD_PADDING` si nécessaire

## 📋 Checklist de debug

- [ ] Activer le mode debug
- [ ] Capturer une capture d'écran avec les informations de debug
- [ ] Comparer positions affichées vs calculées
- [ ] Identifier le composant problématique
- [ ] Appliquer la correction
- [ ] Vérifier l'alignement
- [ ] Désactiver le debug

## 🔧 Commandes utiles

```bash
# Lancer les tests
npm test -- --testPathPatterns=boardLayout.test.ts

# Vérifier les calculs
node debug-positions.js

# Démarrer l'app (depuis le répertoire GoGame)
npm start
```

## 📝 Notes de collaboration

- **Cursor** : Implémente les corrections selon les guidelines
- **ChatGPT5** : Peut aider à identifier les problèmes visuels
- **Utilisateur** : Teste et valide les corrections

**Règle importante** : Toujours commiter les changements avec des messages clairs pour faciliter la revue des diffs.
