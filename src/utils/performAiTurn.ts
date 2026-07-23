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
  wasHit: boolean;
  won: boolean;
}

export function performAiTurn({
  attackGrid,
  playerFleetGrid,
  currentHitCount,
  totalShipCells,
}: PerformAiTurnOptions): PerformAiTurnResult {
  const availableCells = getAvailableCells(attackGrid);

  if (availableCells.length === 0) {
    return {
      nextGrid: attackGrid,
      nextHitCount: currentHitCount,
      lastAttack: null,
      response: "",
      wasHit: false,
      won: currentHitCount >= totalShipCells,
    };
  }

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const selectedCell = availableCells[randomIndex];

  const result = performAttack({
    row: selectedCell.row,
    col: selectedCell.col,
    attackGrid,
    enemyGrid: playerFleetGrid,
  });

  const nextHitCount = result.wasHit
    ? currentHitCount + 1
    : currentHitCount;

  let response: string;

  if (result.wasSunk) {
    response = "The AI sank one of your ships!";
  } else if (result.wasHit) {
    response = "The AI hit your ship!";
  } else {
    response = "The AI missed. Your turn!";
  }

  return {
    nextGrid: result.nextGrid,
    nextHitCount,
    lastAttack: selectedCell,
    response,
    wasHit: result.wasHit,
    won: nextHitCount >= totalShipCells,
  };
}