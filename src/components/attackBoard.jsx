import Cell from "./attackCell.jsx";
import { AttackCellState } from "../constants/base.ts"; 
import {ships} from "../constants/ships.ts"; 
import {performAttack} from "../utils/performAttack.js";

export default function AttackBoard({
  grid,
  setGrid,
  enemyGrid,
  playerFleetGrid,
  setEnemyAttackGrid,
  enemyAttackGrid,
  setAiHitCount,
  aiHitCount,
  hitCount,
  setHitCount,
  totalShipCells,
  setWinner,
  disabled
}) {

  function handleCellClick(row, col) {
    if (disabled) return;
    console.log("setGrid");
    console.log(setGrid);
    setGrid((prev) => {
      const result = performAttack({
        row,
        col,
        attackGrid: prev,
        enemyGrid,
        hitCount,
        totalShipCells,
        setHitCount,
        setWinner,
        winnerName: "player",
      });

      return result.nextGrid;
    });

  setEnemyAttackGrid((prevAi) => {
      const availableCells = [];

      for (let row = 0; row < prevAi.length; row++) {
        for (let col = 0; col < prevAi[row].length; col++) {
          if (prevAi[row][col] === null) {
            availableCells.push({ row, col });
          }
        }
      }

      if (availableCells.length === 0) return prevAi;

      const randomCell =
        availableCells[Math.floor(Math.random() * availableCells.length)];

      const result = performAttack({
        row: randomCell.row,
        col: randomCell.col,
        attackGrid: prevAi,
        enemyGrid: playerFleetGrid,
        hitCount: aiHitCount,
        totalShipCells,
        setHitCount: setAiHitCount,
        setWinner,
        winnerName: "ai",
      });

      setLastAiAttackWasHit(result.wasHit);

      if (result.wasHit) {
        console.log("AI made a hit");
      } else {
        console.log("AI missed");
      }

      if (result.wasSunk) {
        console.log("AI sunk a ship");
      }

      return result.nextGrid;
    });

  };
  
  return (
    <div className="board-wrapper">
      <div className="board">
        {grid.map((row, row_id) =>
          row.map((value, column_id) => (
            <Cell
              key={`${row_id}-${column_id}`}
              value={ value }
              disabled={disabled}
              onClick={() => handleCellClick(row_id, column_id)}
            />
          ))
        )}
      </div>
    </div>
  );
}