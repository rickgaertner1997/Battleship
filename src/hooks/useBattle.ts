import { useState } from "react";

import type { AttackCellValue } from "../constants/base";

import { createGrid } from "../utils/createGrid";

const BOARD_SIZE = 10;

export type ShipId = string | number;

export interface AttackPosition {
  row: number;
  col: number;
}

export type AttackGrid =
  (AttackCellValue | null)[][];

export type FleetGrid =
  (ShipId | null)[][];

export type Winner =
  | "player"
  | "ai"
  | null;

export function useBattle() {
  const [enemyGrid, setEnemyGrid] =
    useState<FleetGrid>(() =>
      createGrid<ShipId | null>(
        BOARD_SIZE,
        BOARD_SIZE
      )
    );

  const [enemyAttackGrid, setEnemyAttackGrid] =
    useState<AttackGrid>(() =>
      createGrid<AttackCellValue | null>(
        BOARD_SIZE,
        BOARD_SIZE
      )
    );

  const [attackGrid, setAttackGrid] =
    useState<AttackGrid>(() =>
      createGrid<AttackCellValue | null>(
        BOARD_SIZE,
        BOARD_SIZE
      )
    );

  const [playerHitCount, setPlayerHitCount] =
    useState<number>(0);

  const [aiHitCount, setAiHitCount] =
    useState<number>(0);

  const [
    lastAiAttackWasHit,
    setLastAiAttackWasHit,
  ] = useState<boolean>(false);

  const [lastAiAttack, setLastAiAttack] =
    useState<AttackPosition | null>(null);

  const [aiResponse, setAiResponse] =
    useState<string>("");

  const [winner, setWinner] =
    useState<Winner>(null);

  const [isTurnLocked, setIsTurnLocked] =
    useState<boolean>(false);

  function resetBattle(): void {
    setEnemyGrid(
      createGrid<ShipId | null>(
        BOARD_SIZE,
        BOARD_SIZE
      )
    );

    setEnemyAttackGrid(
      createGrid<AttackCellValue | null>(
        BOARD_SIZE,
        BOARD_SIZE
      )
    );

    setAttackGrid(
      createGrid<AttackCellValue | null>(
        BOARD_SIZE,
        BOARD_SIZE
      )
    );

    setPlayerHitCount(0);
    setAiHitCount(0);
    setLastAiAttackWasHit(false);
    setLastAiAttack(null);
    setAiResponse("");
    setWinner(null);
    setIsTurnLocked(false);
  }

  return {
    enemyGrid,
    setEnemyGrid,

    enemyAttackGrid,
    setEnemyAttackGrid,

    attackGrid,
    setAttackGrid,

    playerHitCount,
    setPlayerHitCount,

    aiHitCount,
    setAiHitCount,

    lastAiAttackWasHit,
    setLastAiAttackWasHit,

    lastAiAttack,
    setLastAiAttack,

    aiResponse,
    setAiResponse,

    winner,
    setWinner,

    isTurnLocked,
    setIsTurnLocked,

    resetBattle,
  };
}