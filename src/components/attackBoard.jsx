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
  disabled,
  setLastAiAttackWasHit,
  lastAiAttackWasHit
  
}) {

  function handleCellClick(row, col) {
    if (disabled) return;
    if (grid[row][col] !== null) return;

    const playerResult = performAttack({
      row,
      col,
      attackGrid: grid,
      enemyGrid,
    });

    setGrid(playerResult.nextGrid);

    if (playerResult.wasHit) {
      const nextPlayerHitCount = hitCount + 1;

      setHitCount(nextPlayerHitCount);

      if (nextPlayerHitCount >= totalShipCells) {
        setWinner("player");
        return;
      }
    }

    const availableCells = [];

    for (let aiRow = 0; aiRow < enemyAttackGrid.length; aiRow++) {
      for (
        let aiCol = 0;
        aiCol < enemyAttackGrid[aiRow].length;
        aiCol++
      ) {
        if (enemyAttackGrid[aiRow][aiCol] === null) {
          availableCells.push({
            row: aiRow,
            col: aiCol,
          });
        }
      }
    }

    if (availableCells.length === 0) return;

    const aiCell =
      availableCells[
        Math.floor(Math.random() * availableCells.length)
      ];

    const aiResult = performAttack({
      row: aiCell.row,
      col: aiCell.col,
      attackGrid: enemyAttackGrid,
      enemyGrid: playerFleetGrid,
    });

    setEnemyAttackGrid(aiResult.nextGrid);
    setLastAiAttackWasHit(aiResult.wasHit);
    console.log("AI hit: "+ aiResult.wasHit);
    console.log("aiCell row " + aiCell.row + " aiCell col " + aiCell.col);
    if (aiResult.wasHit) {
      const nextAiHitCount = aiHitCount + 1;

      setAiHitCount(nextAiHitCount);

      if (nextAiHitCount >= totalShipCells) {
        setWinner("ai");
      }
    }
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