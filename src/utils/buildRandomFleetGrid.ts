import { createGrid } from "./createGrid";
import { placeShipOnGrid } from "./placeShip";

const DEFAULT_BOARD_SIZE = 10;

export type ShipId = string | number;
export type ShipOrientation = "horizontal" | "vertical";
export type FleetGrid = (ShipId | null)[][];

export interface Ship {
  id: ShipId;
  length: number;
  name?: string;
}

export function buildRandomFleetGrid(
  ships: Ship[],
  boardSize: number = DEFAULT_BOARD_SIZE
): FleetGrid {
  let grid = createGrid(boardSize, boardSize) as FleetGrid;

  for (const ship of ships) {
    let placed = false;

    while (!placed) {
      const orientation: ShipOrientation =
        Math.random() > 0.5 ? "horizontal" : "vertical";

      const row = Math.floor(Math.random() * boardSize);
      const col = Math.floor(Math.random() * boardSize);

      const result = placeShipOnGrid(
        grid,
        ship,
        row,
        col,
        orientation
      );

      if (result.ok) {
        grid = result.nextGrid;
        placed = true;
      }
    }
  }

  return grid;
}