import { AttackCellState } from "../constants/base";
import type { AttackCellValue } from "../constants/base";

import { ships } from "../constants/ships";

export type ShipId = string | number;
export type AttackGrid = (AttackCellValue | null)[][];
export type FleetGrid = (ShipId | null)[][];

interface AttackPosition {
  row: number;
  col: number;
}

interface PerformAttackOptions {
  row: number;
  col: number;
  attackGrid: AttackGrid;
  enemyGrid: FleetGrid;
}

interface PerformAttackResult {
  nextGrid: AttackGrid;
  wasHit: boolean;
  wasSunk: boolean;
  alreadyAttacked: boolean;
}

export function performAttack({
  row,
  col,
  attackGrid,
  enemyGrid,
}: PerformAttackOptions): PerformAttackResult {
  const nextGrid: AttackGrid = attackGrid.map((gridRow) => [
    ...gridRow,
  ]);

  if (nextGrid[row][col] !== null) {
    return {
      nextGrid: attackGrid,
      wasHit: false,
      wasSunk: false,
      alreadyAttacked: true,
    };
  }

  const shipId = enemyGrid[row][col];

  if (shipId === null) {
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

  const hitParts: AttackPosition[] = [];

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