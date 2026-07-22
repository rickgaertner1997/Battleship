import { useState } from "react";
import { createGrid } from "../utils/createGrid.js";

const BOARD_SIZE = 10;

export function useBattle() {
  const [enemyGrid, setEnemyGrid] = useState(() =>
    createGrid(BOARD_SIZE, BOARD_SIZE)
  );

  const [enemyAttackGrid, setEnemyAttackGrid] = useState(() =>
    createGrid(BOARD_SIZE, BOARD_SIZE)
  );

  const [attackGrid, setAttackGrid] = useState(() =>
    createGrid(BOARD_SIZE, BOARD_SIZE)
  );

  const [playerHitCount, setPlayerHitCount] = useState(0);
  const [aiHitCount, setAiHitCount] = useState(0);

  const [lastAiAttackWasHit, setLastAiAttackWasHit] =
    useState(false);

  const [lastAiAttack, setLastAiAttack] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [winner, setWinner] = useState(null);

  function resetBattle() {
    setEnemyGrid(createGrid(BOARD_SIZE, BOARD_SIZE));
    setEnemyAttackGrid(createGrid(BOARD_SIZE, BOARD_SIZE));
    setAttackGrid(createGrid(BOARD_SIZE, BOARD_SIZE));
    setPlayerHitCount(0);
    setAiHitCount(0);
    setLastAiAttackWasHit(false);
    setLastAiAttack(null);
    setAiResponse("");
    setWinner(null);
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
    resetBattle,
  };
}