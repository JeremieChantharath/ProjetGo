// Constantes pour le layout du plateau de Go
export const BOARD_PADDING = 16; // Padding en pixels
export const GRID_MARGIN_PERCENT = 16; // Marge de la grille en pourcentage
export const GRID_SIZE_PERCENT = 100 - (2 * GRID_MARGIN_PERCENT); // Taille de la grille en pourcentage

/**
 * Calcule l'espacement entre les intersections
 * @param size Taille du plateau (9 pour 9x9)
 * @returns Espacement en pourcentage entre chaque intersection
 */
export const calculateIntersectionSpacing = (size: number): number => {
  return GRID_SIZE_PERCENT / (size - 1);
};

/**
 * Calcule la position en pourcentage pour une intersection donnée
 * @param position Position de l'intersection (0 à size-1)
 * @param size Taille du plateau (9 pour 9x9)
 * @returns Position en pourcentage avec marges
 */
export const calculateIntersectionPosition = (position: number, size: number): number => {
  const spacing = calculateIntersectionSpacing(size);
  return GRID_MARGIN_PERCENT + (position * spacing);
};

/**
 * Calcule la position en pourcentage pour une ligne de grille
 * @param position Position de la ligne (0 à size-1)
 * @param size Taille du plateau (9 pour 9x9)
 * @returns Position en pourcentage avec marges
 */
export const calculateGridLinePosition = (position: number, size: number): number => {
  const spacing = calculateIntersectionSpacing(size);
  return GRID_MARGIN_PERCENT + (position * spacing);
};
