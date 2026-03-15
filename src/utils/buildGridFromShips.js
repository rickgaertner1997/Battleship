import { createGrid } from "./createGrid.js";

export function buildGridFromShips(placedShips, size = 10) {
  const grid = createGrid(size, size);

  for (const ship of placedShips) {
    const { row, col, length, orientation, id } = ship;

    if (orientation === "horizontal") {
      for (let i = 0; i < length; i++) {
        grid[row][col + i] = id;
      }
    } else {
      for (let i = 0; i < length; i++) {
        grid[row + i][col] = id;
      }
    }
  }

  return grid;
}