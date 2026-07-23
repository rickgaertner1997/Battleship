import { useRef } from "react";
import type {
  Dispatch,
  SetStateAction,
} from "react";

import { AttackCellState } from "../constants/base";
import type {
  AttackCellValue,
  FleetCellState,
} from "../constants/base";

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
  setGrid: Dispatch<
    SetStateAction<AttackGrid>
  >;

  enemyGrid: FleetGrid;
  playerFleetGrid: FleetGrid;

  enemyAttackGrid: AttackGrid;
  setEnemyAttackGrid: Dispatch<
    SetStateAction<AttackGrid>
  >;

  hitCount: number;
  setHitCount: Dispatch<
    SetStateAction<number>
  >;

  aiHitCount: number;
  setAiHitCount: Dispatch<
    SetStateAction<number>
  >;

  totalShipCells: number;

  setWinner: Dispatch<
    SetStateAction<Winner>
  >;

  setAiResponse: Dispatch<
    SetStateAction<string>
  >;

  setLastAiAttackWasHit: Dispatch<
    SetStateAction<boolean>
  >;

  setLastAiAttack: Dispatch<
    SetStateAction<AttackPosition | null>
  >;

  disabled: boolean;

  isTurnLocked: boolean;
  setIsTurnLocked: Dispatch<
    SetStateAction<boolean>
  >;
}

interface UseAttackTurnResult {
  handleCellClick: (
    row: number,
    col: number
  ) => void;
}

const AI_MESSAGE_DELAY_MS = 1000;

function delay(
  milliseconds: number
): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(
      resolve,
      milliseconds
    );
  });
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
  isTurnLocked,
  setIsTurnLocked,
}: UseAttackTurnProps): UseAttackTurnResult {
  const aiIsPlayingRef = useRef(false);

  async function runAiTurn(): Promise<void> {
    aiIsPlayingRef.current = true;
    setIsTurnLocked(true);

    let currentGrid = enemyAttackGrid;
    let currentHitCount = aiHitCount;

    try {
      setAiResponse(
        "You missed. The AI is choosing a target..."
      );

      await delay(AI_MESSAGE_DELAY_MS);

      while (true) {
        const aiTurn = performAiTurn({
          attackGrid: currentGrid,
          playerFleetGrid,
          currentHitCount,
          totalShipCells,
        });

        currentGrid = aiTurn.nextGrid;
        currentHitCount =
          aiTurn.nextHitCount;

        setEnemyAttackGrid(currentGrid);
        setAiHitCount(currentHitCount);
        setAiResponse(aiTurn.response);

        if (aiTurn.lastAttack) {
          setLastAiAttack(
            aiTurn.lastAttack
          );

          const attackValue =
            currentGrid[
              aiTurn.lastAttack.row
            ]?.[aiTurn.lastAttack.col];

          setLastAiAttackWasHit(
            attackValue ===
              AttackCellState.Hit ||
              attackValue ===
                AttackCellState.Sunk
          );
        }

        if (aiTurn.won) {
          setWinner("ai");
          return;
        }

        await delay(
          AI_MESSAGE_DELAY_MS
        );

        if (!aiTurn.wasHit) {
          return;
        }
      }
    } finally {
      aiIsPlayingRef.current = false;
      setIsTurnLocked(false);
    }
  }

  function handleCellClick(
    row: number,
    col: number
  ): void {
    if (
      disabled ||
      isTurnLocked ||
      aiIsPlayingRef.current ||
      grid[row]?.[col] !== null
    ) {
      return;
    }

    const playerResult = performAttack({
      row,
      col,
      attackGrid: grid,
      enemyGrid,
    });

    setGrid(playerResult.nextGrid);

    const nextPlayerHitCount =
      playerResult.wasHit
        ? hitCount + 1
        : hitCount;

    if (playerResult.wasHit) {
      setHitCount(
        nextPlayerHitCount
      );

      if (
        nextPlayerHitCount >=
        totalShipCells
      ) {
        setWinner("player");
        return;
      }

      setAiResponse(
        playerResult.wasSunk
          ? "You sank one of the AI's ships! Attack again."
          : "Direct hit! Attack again."
      );

      return;
    }

    void runAiTurn();
  }

  return { handleCellClick };
}