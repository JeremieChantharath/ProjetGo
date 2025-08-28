// Debug des positions du plateau de Go
// Exécuter avec: node debug-positions.js

const GRID_MARGIN_PERCENT = 16;
const GRID_SIZE_PERCENT = 100 - (2 * GRID_MARGIN_PERCENT);

const calculateIntersectionSpacing = (size) => {
  return GRID_SIZE_PERCENT / (size - 1);
};

const calculateIntersectionPosition = (position, size) => {
  const spacing = calculateIntersectionSpacing(size);
  return GRID_MARGIN_PERCENT + (position * spacing);
};

console.log('=== DEBUG POSITIONS PLATEAU GO 9x9 ===');
console.log(`Marge: ${GRID_MARGIN_PERCENT}%`);
console.log(`Taille grille: ${GRID_SIZE_PERCENT}%`);
console.log(`Espacement: ${calculateIntersectionSpacing(9)}%`);

console.log('\n=== POSITIONS DES COORDONNÉES ===');
for (let i = 0; i < 9; i++) {
  const pos = calculateIntersectionPosition(i, 9);
  const label = i === 0 ? 'A' : i === 1 ? 'B' : i === 2 ? 'C' : i === 3 ? 'D' : 
                i === 4 ? 'E' : i === 5 ? 'F' : i === 6 ? 'G' : i === 7 ? 'H' : 'J';
  console.log(`${label}: ${pos.toFixed(1)}%`);
}

console.log('\n=== POSITIONS DES LIGNES ===');
for (let i = 0; i < 9; i++) {
  const pos = calculateIntersectionPosition(i, 9);
  console.log(`Ligne ${i+1}: ${pos.toFixed(1)}%`);
}
