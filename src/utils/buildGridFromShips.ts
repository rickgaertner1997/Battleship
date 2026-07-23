import { createGrid } from "./createGrid";

export interface PlacedShip {
  id: string | number;
  row: number;
  col: number;
  length: number;
  orientation: "horizontal" | "vertical";
}

export type FleetGrid = (string | number | null)[][];

export function buildGridFromShips(
  placedShips: PlacedShip[],
  size: number = 10
): FleetGrid {
  const grid = createGrid(size, size) as FleetGrid;

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