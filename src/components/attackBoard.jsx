import Cell from "./attackCell.jsx";
import { AttackCellState } from "../constants/base.ts"; 
export default function AttackBoard({ grid, setGrid, enemyGrid}) {

  function handleAttack(row, col){
    const enemy = enemyGrid[row][col]
    return enemy == null ? AttackCellState.Miss : enemyGrid; 
  }
  
  function handleCellClick(row, col) {
  
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = handleAttack(row, col);
      return next;
    });
  }

  return (
    <div className="board-wrapper">
      <div className="board">
        {grid.map((row, row_id) =>
          row.map((value, column_id) => (
            <Cell
              key={`${row_id}-${column_id}`}
              value={ value }
              onClick={() => handleCellClick(row_id, column_id)}
            />
          ))
        )}
      </div>
    </div>
  );
}