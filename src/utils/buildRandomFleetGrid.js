import { createGrid } from "./createGrid.js";
import { placeShipOnGrid } from "./placeShip.js";

const DEFAULT_BOARD_SIZE = 10;

export function buildRandomFleetGrid(
  ships,
  boardSize = DEFAULT_BOARD_SIZE
) {
  let grid = createGrid(boardSize, boardSize);

  for (const ship of ships) {
    let placed = false;

    while (!placed) {
      const orientation =
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