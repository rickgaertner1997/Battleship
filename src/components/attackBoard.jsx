import Cell from "./attackCell.jsx";
import { AttackCellState } from "../constants/base.ts"; 
import {ships} from "../constants/ships.ts"; 
import {performAttack} from "../utils/performAttack.js";

export default function AttackBoard({
  grid,
  setGrid,
  enemyGrid,
  hitCount,
  setHitCount,
  totalShipCells,
  setWinner,
  disabled
}) {

  function handleCellClick(row, col) {
  if (disabled) return;

  setGrid((prev) =>
    performAttack({
      row,
      col,
      attackGrid: prev,
      enemyGrid,
      hitCount,
      totalShipCells,
      setHitCount,
      setWinner,
      winnerName: "player",
    })
  );
}
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