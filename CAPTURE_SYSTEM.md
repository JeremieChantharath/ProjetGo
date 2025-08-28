# Système de Capture du Jeu de Go

## Vue d'ensemble

Ce document décrit l'implémentation du système de capture qui respecte les règles officielles du jeu de Go. Le système a été conçu pour être robuste, performant et facile à comprendre.

## Fonctionnalités Implémentées

### 1. Règles de Capture de Base
- **Capture automatique** : Les pierres sans libertés sont automatiquement capturées
- **Règle du suicide** : Empêche les placements qui créeraient des pierres sans libertés (sauf si capture)
- **Capture de groupes** : Capture entière des groupes connectés sans libertés

### 2. Détection des Groupes
- **Algorithme de connexion** : Identifie les pierres connectées horizontalement et verticalement
- **Gestion des libertés** : Calcule les positions vides adjacentes à chaque groupe
- **Optimisation** : Utilise des structures de données efficaces (Set, Queue)

### 3. Validation des Coups
- **Vérification pré-placement** : Valide les coups avant leur exécution
- **Simulation temporaire** : Teste les conséquences d'un placement
- **Autorisation conditionnelle** : Permet le suicide si capture d'adversaires

## Architecture Technique

### Composants Principaux

#### `gameRules.ts`
Fichier central contenant toutes les fonctions de logique du jeu :
- `isValidPosition()` : Validation des coordonnées
- `getAdjacentPositions()` : Positions voisines d'une intersection
- `getGroup()` : Détection des groupes connectés
- `hasLiberties()` : Vérification des libertés
- `getCapturedGroups()` : Identification des groupes à capturer
- `isValidMove()` : Validation des coups
- `captureStones()` : Exécution des captures

#### `useGameState.ts`
Hook React qui gère l'état du jeu et intègre le système de capture :
- Gestion du plateau de jeu
- Application des règles de capture
- Comptage des pierres capturées
- Logs de débogage

#### Composants UI
- `LibertyIndicator` : Affichage visuel des libertés
- `GroupInfo` : Informations détaillées sur les groupes
- `GameRules` : Explication des règles du jeu

### Algorithme de Capture

```typescript
function captureStones(board: Board) {
  // 1. Identifier tous les groupes sans libertés
  const capturedBlackGroups = getCapturedGroups(board, 1);
  const capturedWhiteGroups = getCapturedGroups(board, 2);
  
  // 2. Retirer les pierres capturées
  for (const group of capturedBlackGroups) {
    for (const { row, col } of group) {
      board[row][col] = 0;
    }
  }
  
  // 3. Retourner le nouveau plateau et le compteur
  return { newBoard: board, capturedCount };
}
```

## Règles Implémentées

### 1. Libertés
- Une **liberté** est une intersection vide adjacente à une pierre
- Les libertés sont partagées entre toutes les pierres d'un groupe
- Un groupe sans libertés est capturé

### 2. Groupes
- Les pierres de même couleur **connectées** forment un groupe
- La connexion se fait horizontalement et verticalement (pas en diagonale)
- Toutes les pierres d'un groupe partagent le même statut de libertés

### 3. Capture
- **Automatique** : Se produit immédiatement après un placement
- **Simultanée** : Tous les groupes sans libertés sont capturés en même temps
- **Comptage** : Chaque joueur garde trace de ses captures

### 4. Suicide
- **Interdit** : Un joueur ne peut pas se suicider
- **Exception** : Permis si le placement capture des pierres adverses
- **Validation** : Vérifié avant chaque placement

## Exemples de Capture

### Capture Simple
```
Avant:    Après:
. . .     . . .
. 1 .     . . .
. . .     . . .
```
Placement d'une pierre blanche au centre capture la pierre noire.

### Capture de Groupe
```
Avant:    Après:
. . .     . . .
. 1 1     . . .
. . .     . . .
```
Placement d'une pierre blanche capture le groupe de 2 pierres noires.

### Suicide Interdit
```
Avant:    Tentative:
. 2 2     . 2 2
. 2 .     . 2 1  ← Interdit (suicide)
. 2 2     . 2 2
```

## Interface Utilisateur

### Indicateurs Visuels
- **Points verts** : Libertés d'un groupe sélectionné
- **Bordure rouge** : Pierre sélectionnée
- **Compteur** : Nombre de pierres capturées par joueur

### Interactions
- **Clic sur intersection vide** : Place une pierre
- **Clic sur pierre existante** : Sélectionne pour voir les libertés
- **Bouton règles** : Affiche l'explication complète du système

## Tests et Validation

### Tests Unitaires
Le fichier `gameRules.test.ts` contient des tests complets pour :
- Validation des positions
- Détection des groupes
- Calcul des libertés
- Logique de capture
- Validation des coups

### Scénarios Testés
- Capture de pierres isolées
- Capture de groupes connectés
- Prévention du suicide
- Autorisation de capture
- Gestion des libertés partagées

## Performance

### Optimisations
- **Structures de données efficaces** : Set pour éviter les doublons
- **Algorithme de parcours** : BFS pour la détection des groupes
- **Calculs conditionnels** : Évite les calculs inutiles
- **Mémoire** : Réutilisation des objets quand possible

### Complexité
- **Détection de groupe** : O(n) où n est le nombre de pierres
- **Validation de coup** : O(n) pour la simulation
- **Capture** : O(n) pour l'identification et l'exécution

## Extensions Futures

### Fonctionnalités Possibles
- **Ko** : Règle spéciale pour éviter les répétitions infinies
- **Territoire** : Calcul automatique des zones contrôlées
- **Fin de partie** : Détection automatique de la fin
- **Historique** : Sauvegarde des coups et possibilité d'annulation

### Améliorations Techniques
- **Cache** : Mémorisation des calculs de groupes
- **Parallélisation** : Traitement simultané de plusieurs groupes
- **Optimisation spatiale** : Structures de données plus compactes

## Conclusion

Le système de capture implémenté respecte fidèlement les règles officielles du jeu de Go tout en offrant une interface utilisateur intuitive et des performances satisfaisantes. L'architecture modulaire permet des extensions futures et la maintenance du code.

La validation complète par tests unitaires garantit la fiabilité du système, et l'interface utilisateur offre une expérience de jeu agréable avec des indicateurs visuels clairs pour comprendre les mécanismes de capture.
