import { AttackCellState } from "../constants/base.ts";
import { ships } from "../constants/ships.ts";

export function performAttack({
  row,
  col,
  attackGrid,
  enemyGrid,
}) {
  const nextGrid = attackGrid.map((gridRow) => [...gridRow]);

  if (nextGrid[row][col] !== null) {
    return {
      nextGrid: attackGrid,
      wasHit: false,
      wasSunk: false,
      alreadyAttacked: true,
    };
  }

  const shipId = enemyGrid[row][col];

  if (shipId == null) {
    nextGrid[row][col] = AttackCellState.Miss;

    return {
      nextGrid,
      wasHit: false,
      wasSunk: false,
      alreadyAttacked: false,
    };
  }

  nextGrid[row][col] = AttackCellState.Hit;

  const selectedShip =
    ships.find((ship) => ship.id === shipId) ?? null;

  const hitParts = [];

  for (let gridRow = 0; gridRow < enemyGrid.length; gridRow++) {
    for (
      let gridCol = 0;
      gridCol < enemyGrid[gridRow].length;
      gridCol++
    ) {
      const belongsToShip =
        enemyGrid[gridRow][gridCol] === shipId;

      const isDamaged =
        nextGrid[gridRow][gridCol] === AttackCellState.Hit ||
        nextGrid[gridRow][gridCol] === AttackCellState.Sunk;

      if (belongsToShip && isDamaged) {
        hitParts.push({
          row: gridRow,
          col: gridCol,
        });
      }
    }
  }

  const wasSunk =
    selectedShip !== null &&
    hitParts.length === selectedShip.length;

  if (wasSunk) {
    hitParts.forEach(({ row, col }) => {
      nextGrid[row][col] = AttackCellState.Sunk;
    });
  }

  return {
    nextGrid,
    wasHit: true,
    wasSunk,
    alreadyAttacked: false,
  };
}