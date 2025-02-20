export const ROWS = 30;
export const COLS = 50;

export const createEmptyGrid = () => {
  return Array.from({ length: 30 }, () => Array(50).fill(0));
};

export const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];
