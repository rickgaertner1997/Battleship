import { performAttack } from "../utils/performAttack.js";
import { performAiTurn } from "../utils/performAiTurn.js";

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
}) {
  function handleCellClick(row, col) {
    if (disabled || grid[row][col] !== null) {
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

      // Keep this return if a hit means the player attacks again.
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
      setLastAiAttack?.(aiTurn.lastAttack);

      const lastAttackValue =
        aiTurn.nextGrid[aiTurn.lastAttack.row][aiTurn.lastAttack.col];

      setLastAiAttackWasHit(lastAttackValue === "hit");
    }

    if (aiTurn.won) {
      setWinner("ai");
    }
  }

  return { handleCellClick };
}