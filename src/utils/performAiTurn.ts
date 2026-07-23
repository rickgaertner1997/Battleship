import { performAttack } from "./performAttack";
import { getAvailableCells } from "./getAvailableCells";

import type { AttackCellValue } from "../constants/base";
import type { GridPosition } from "./getAvailableCells";

export type ShipId = string | number;
export type AttackGrid = (AttackCellValue | null)[][];
export type FleetGrid = (ShipId | null)[][];

interface PerformAiTurnOptions {
  attackGrid: AttackGrid;
  playerFleetGrid: FleetGrid;
  currentHitCount: number;
  totalShipCells: number;
}

interface PerformAiTurnResult {
  nextGrid: AttackGrid;
  nextHitCount: number;
  lastAttack: GridPosition | null;
  response: string;
  won: boolean;
}

export function performAiTurn({
  attackGrid,
  playerFleetGrid,
  currentHitCount,
  totalShipCells,
}: PerformAiTurnOptions): PerformAiTurnResult {
  let nextGrid: AttackGrid = attackGrid;
  let nextHitCount = currentHitCount;
  let lastAttack: GridPosition | null = null;
  let response = "";

  while (nextHitCount < totalShipCells) {
    const availableCells = getAvailableCells(nextGrid);

    if (availableCells.length === 0) {
      break;
    }

    const randomIndex = Math.floor(
      Math.random() * availableCells.length
    );

    const selectedCell = availableCells[randomIndex];

    const result = performAttack({
      row: selectedCell.row,
      col: selectedCell.col,
      attackGrid: nextGrid,
      enemyGrid: playerFleetGrid,
    });

    nextGrid = result.nextGrid;
    lastAttack = selectedCell;

    if (result.wasSunk) {
      response = "The AI sunk one of your ships!";
    } else if (result.wasHit) {
      response = "The AI hit your ship!";
    } else {
      response = "The AI missed.";
    }

    if (result.wasHit) {
      nextHitCount += 1;
    }

    if (!result.wasHit) {
      break;
    }
  }

  return {
    nextGrid,
    nextHitCount,
    lastAttack,
    response,
    won: nextHitCount >= totalShipCells,
  };
}