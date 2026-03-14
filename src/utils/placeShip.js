export function placeShipOnGrid(grid, ship, row, col) {
  const length = ship.length;

  if (col + length > 10) {
    return { ok: false, nextGrid: grid };
  }

  for (let i = 0; i < length; i++) {
    if (grid[row][col + i] !== null) {
      return { ok: false, nextGrid: grid };
    }
  }

  const nextGrid = grid.map((r) => [...r]);

  for (let i = 0; i < length; i++) {
    nextGrid[row][col + i] = ship.id;
  }

  return { ok: true, nextGrid };
}