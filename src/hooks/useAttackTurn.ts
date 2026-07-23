import type { Dispatch, SetStateAction } from "react";

import { AttackCellState } from "../constants/base";
import type { AttackCellValue } from "../constants/base";
import type { FleetCellState } from "../constants/base";

import { performAttack } from "../utils/performAttack";
import { performAiTurn } from "../utils/performAiTurn";

interface AttackPosition {
  row: number;
  col: number;
}

type AttackGrid = (AttackCellValue | null)[][];
type FleetGrid = FleetCellState[][];
type Winner = "player" | "ai" | null;

interface UseAttackTurnProps {
  grid: AttackGrid;
  setGrid: Dispatch<SetStateAction<AttackGrid>>;

  enemyGrid: FleetGrid;
  playerFleetGrid: FleetGrid;

  enemyAttackGrid: AttackGrid;
  setEnemyAttackGrid: Dispatch<SetStateAction<AttackGrid>>;

  hitCount: number;
  setHitCount: Dispatch<SetStateAction<number>>;

  aiHitCount: number;
  setAiHitCount: Dispatch<SetStateAction<number>>;

  totalShipCells: number;

  setWinner: Dispatch<SetStateAction<Winner>>;
  setAiResponse: Dispatch<SetStateAction<string>>;
  setLastAiAttackWasHit: Dispatch<SetStateAction<boolean>>;
  setLastAiAttack: Dispatch<SetStateAction<AttackPosition | null>>;

  disabled: boolean;
}

interface UseAttackTurnResult {
  handleCellClick: (row: number, col: number) => void;
}

export function useAttackTurn({
  grid,
  setGrid,
  enemyGrid,
  playerFleetGrid,
  enemyAttackGrid,
  setEnemyAttackGrid,
  hitCount,
  setHitCount,
  aiHitCount,
  setAiHitCount,
  totalShipCells,
  setWinner,
  setAiResponse,
  setLastAiAttackWasHit,
  setLastAiAttack,
  disabled,
}: UseAttackTurnProps): UseAttackTurnResult {
  
  function handleCellClick(row: number, col: number): void {


    if (disabled || grid[row]?.[col] !== null) {
      return;
    }

    const playerResult = performAttack({
      row,
      col,
      attackGrid: grid,
      enemyGrid,
    });

    setGrid(playerResult.nextGrid);

    const nextPlayerHitCount = playerResult.wasHit
      ? hitCount + 1
      : hitCount;

    if (playerResult.wasHit) {
      setHitCount(nextPlayerHitCount);

      if (nextPlayerHitCount >= totalShipCells) {
        setWinner("player");
        return;
      }

      setAiResponse(
        playerResult.wasSunk
          ? "You sunk one of the AI's ships!"
          : "You hit an AI ship!"
      );

      return;
    }

    const aiTurn = performAiTurn({
      attackGrid: enemyAttackGrid,
      playerFleetGrid,
      currentHitCount: aiHitCount,
      totalShipCells,
    });

    setEnemyAttackGrid(aiTurn.nextGrid);
    setAiHitCount(aiTurn.nextHitCount);
    setAiResponse(aiTurn.response);

    if (aiTurn.lastAttack) {
      setLastAiAttack(aiTurn.lastAttack);

      const lastAttackValue =
        aiTurn.nextGrid[aiTurn.lastAttack.row]?.[aiTurn.lastAttack.col];

      setLastAiAttackWasHit(lastAttackValue === AttackCellState.Hit);
    }

    if (aiTurn.won) {
      setWinner("ai");
    }
  }

  return { handleCellClick };
}