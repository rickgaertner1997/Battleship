export type ShipId = string | number;

export type ShipOrientation =
  | "horizontal"
  | "vertical";

export type FleetGrid =
  (ShipId | null)[][];

export interface Ship {
  id: ShipId;
  name: string;
  length: number;
  image: string;
}

export interface PlaceShipResult {
  ok: boolean;
  nextGrid: FleetGrid;
}

export function placeShipOnGrid(
  grid: FleetGrid,
  ship: Ship,
  row: number,
  col: number,
  orientation: ShipOrientation
): PlaceShipResult {
  const length = ship.length;
  const rowCount = grid.length;
  const columnCount = grid[0]?.length ?? 0;

  const nextGrid: FleetGrid = grid.map(
    (gridRow) => [...gridRow]
  );

  if (
    row < 0 ||
    row >= rowCount ||
    col < 0 ||
    col >= columnCount
  ) {
    return {
      ok: false,
      nextGrid: grid,
    };
  }

  if (orientation === "horizontal") {
    if (col + length > columnCount) {
      return {
        ok: false,
        nextGrid: grid,
      };
    }

    for (let i = 0; i < length; i++) {
      if (grid[row][col + i] !== null) {
        return {
          ok: false,
          nextGrid: grid,
        };
      }
    }

    for (let i = 0; i < length; i++) {
      nextGrid[row][col + i] = ship.id;
    }
  } else {
    if (row + length > rowCount) {
      return {
        ok: false,
        nextGrid: grid,
      };
    }

    for (let i = 0; i < length; i++) {
      if (grid[row + i][col] !== null) {
        return {
          ok: false,
          nextGrid: grid,
        };
      }
    }

    for (let i = 0; i < length; i++) {
      nextGrid[row + i][col] = ship.id;
    }
  }

  return {
    ok: true,
    nextGrid,
  };
}