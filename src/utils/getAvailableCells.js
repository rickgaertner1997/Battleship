export function getAvailableCells(grid) {
  const availableCells = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === null) {
        availableCells.push({ row, col });
      }
    }
  }

  return availableCells;
}