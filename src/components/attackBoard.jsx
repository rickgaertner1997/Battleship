import Cell from "./cell.jsx";
import { AttackCellState } from "../constants/base.ts"; 
export default function AttackBoard({ grid, setGrid }) {
  
  function handleCellClick(row, col) {
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = AttackCellState.Miss
      return next;
    });
  }

  return (
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
  );
}