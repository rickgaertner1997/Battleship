export function placeShipOnGrid(grid, ship, row, col, orientation) {
  const length = ship.length;
  const nextGrid = grid.map((r) => [...r]);

  if (orientation === "horizontal") {
    if (col + length > 10) return { ok: false, nextGrid: grid };

    for (let i = 0; i < length; i++) {
      if (grid[row][col + i] !== null) {
        return { ok: false, nextGrid: grid };
      }
    }

    for (let i = 0; i < length; i++) {
      nextGrid[row][col + i] = ship.id;
    }
  } else {
    if (row + length > 10) return { ok: false, nextGrid: grid };

    for (let i = 0; i < length; i++) {
      if (grid[row + i][col] !== null) {
        return { ok: false, nextGrid: grid };
      }
    }

    for (let i = 0; i < length; i++) {
      nextGrid[row + i][col] = ship.id;
    }
  }

  return { ok: true, nextGrid };
}