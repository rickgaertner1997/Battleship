import { AttackCellState } from "../constants/base.ts";
import { ships } from "../constants/ships.ts";

export function performAttack({
  row,
  col,
  attackGrid,
  enemyGrid,
  hitCount,
  totalShipCells,
  setHitCount,
  setWinner,
  winnerName,
}) {
  function getShip(shipId) {
    return ships.find((ship) => ship.id === shipId) || null;
  }

  function getHittedShipParts(enemyGrid, attackGrid, shipId) {
    const hitParts = [];

    for (let row = 0; row < enemyGrid.length; row++) {
      for (let col = 0; col < enemyGrid[row].length; col++) {
        if (
          enemyGrid[row][col] === shipId &&
          attackGrid[row][col] === AttackCellState.Hit
        ) {
          hitParts.push({ row, col });
        }
      }
    }

    return hitParts;
  }

  const next = attackGrid.map((r) => [...r]);

  if (next[row][col] !== null) return attackGrid;

  const enemyCell = enemyGrid[row][col];

  if (enemyCell == null) {
    next[row][col] = AttackCellState.Miss;
    return next;
  }

asd
  const nextHitCount = hitCount + 1;
  setHitCount(nextHitCount);

  if (nextHitCount === totalShipCells) {
    setWinner(winnerName);
  }

  next[row][col] = AttackCellState.Hit;

  const selectedShip = getShip(enemyCell);
  const hitParts = getHittedShipParts(enemyGrid, next, enemyCell);

  if (selectedShip && hitParts.length === selectedShip.length) {
    hitParts.forEach(({ row, col }) => {
      next[row][col] = AttackCellState.Sunk;
    });
  }

  return next;
}