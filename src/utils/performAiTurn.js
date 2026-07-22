import { performAttack } from "./performAttack.js";
import { getAvailableCells } from "./getAvailableCells.js";

export function performAiTurn({
  attackGrid,
  playerFleetGrid,
  currentHitCount,
  totalShipCells,
}) {
  let nextGrid = attackGrid;
  let nextHitCount = currentHitCount;
  let lastAttack = null;
  let response = "";

  while (nextHitCount < totalShipCells) {
    const availableCells = getAvailableCells(nextGrid);

    if (availableCells.length === 0) {
      break;
    }

    const randomIndex = Math.floor(Math.random() * availableCells.length);
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

    // AI continues only after a hit.
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