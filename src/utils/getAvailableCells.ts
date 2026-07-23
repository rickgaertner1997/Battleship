export interface GridPosition {
  row: number;
  col: number;
}

export function getAvailableCells<T>(
  grid: (T | null)[][]
): GridPosition[] {
  const availableCells: GridPosition[] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === null) {
        availableCells.push({ row, col });
      }
    }
  }

  return availableCells;
}