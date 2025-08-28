// Script de debug pour vérifier les calculs de position du plateau
// Ce script calcule les positions attendues et les compare avec les valeurs utilisées

// Constantes du plateau
const BOARD_PADDING = 16;
const GRID_MARGIN_PERCENT = 16;
const GRID_SIZE_PERCENT = 100 - (2 * GRID_MARGIN_PERCENT);

/**
 * Calcule l'espacement entre les intersections
 */
const calculateIntersectionSpacing = (size) => {
  return GRID_SIZE_PERCENT / (size - 1);
};

/**
 * Calcule la position en pourcentage pour une intersection donnée
 */
const calculateIntersectionPosition = (position, size) => {
  const spacing = calculateIntersectionSpacing(size);
  return GRID_MARGIN_PERCENT + (position * spacing);
};

/**
 * Calcule la position en pourcentage pour une ligne de grille
 */
const calculateGridLinePosition = (position, size) => {
  const spacing = calculateIntersectionSpacing(size);
  return GRID_MARGIN_PERCENT + (position * spacing);
};

// Test avec un plateau 9x9
const size = 9;
console.log('=== DEBUG POSITIONS POUR PLATEAU 9x9 ===\n');

console.log('Constantes:');
console.log(`BOARD_PADDING: ${BOARD_PADDING}px`);
console.log(`GRID_MARGIN_PERCENT: ${GRID_MARGIN_PERCENT}%`);
console.log(`GRID_SIZE_PERCENT: ${GRID_SIZE_PERCENT}%\n`);

const spacing = calculateIntersectionSpacing(size);
console.log(`Espacement entre intersections: ${spacing.toFixed(2)}%\n`);

console.log('Positions des intersections:');
for (let i = 0; i < size; i++) {
  const position = calculateIntersectionPosition(i, size);
  console.log(`Index ${i}: ${position.toFixed(2)}%`);
}

console.log('\nPositions des lignes de grille:');
for (let i = 0; i < size; i++) {
  const position = calculateGridLinePosition(i, size);
  console.log(`Ligne ${i}: ${position.toFixed(2)}%`);
}

console.log('\n=== VÉRIFICATIONS ===');
console.log(`Première intersection (0,0): ${calculateIntersectionPosition(0, size).toFixed(2)}%`);
console.log(`Dernière intersection (8,8): ${calculateIntersectionPosition(8, size).toFixed(2)}%`);
console.log(`Centre du plateau (4,4): ${calculateIntersectionPosition(4, size).toFixed(2)}%`);

// Vérification que les positions sont bien dans les limites
const firstPos = calculateIntersectionPosition(0, size);
const lastPos = calculateIntersectionPosition(size - 1, size);
console.log(`\nVérification des limites:`);
console.log(`Première position (${firstPos.toFixed(2)}%) >= Marge (${GRID_MARGIN_PERCENT}%): ${firstPos >= GRID_MARGIN_PERCENT ? 'OK' : 'ERREUR'}`);
console.log(`Dernière position (${lastPos.toFixed(2)}%) <= 100-Marge (${100-GRID_MARGIN_PERCENT}%): ${lastPos <= (100-GRID_MARGIN_PERCENT) ? 'OK' : 'ERREUR'}`);

// Calcul des tailles des intersections
const intersectionSize = calculateIntersectionSpacing(size);
console.log(`\nTaille des intersections: ${intersectionSize.toFixed(2)}%`);
console.log(`Demi-taille (pour centrage): ${(intersectionSize/2).toFixed(2)}%`);

// Test des marges négatives pour le centrage
console.log('\n=== MARGES NÉGATIVES POUR CENTRAGE ===');
for (let i = 0; i < size; i++) {
  const pos = calculateIntersectionPosition(i, size);
  const marginLeft = -(intersectionSize/2);
  const marginTop = -(intersectionSize/2);
  console.log(`Intersection ${i}: position=${pos.toFixed(2)}%, marginLeft=${marginLeft.toFixed(2)}%, marginTop=${marginTop.toFixed(2)}%`);
}
