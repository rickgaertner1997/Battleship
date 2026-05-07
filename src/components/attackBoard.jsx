import Cell from "./attackCell.jsx";
import { AttackCellState } from "../constants/base.ts"; 
export default function AttackBoard({ grid, setGrid, enemyGrid}) {

  function handleAttack(row, col){
    const enemy = enemyGrid[row][col]
    return enemy == null ? AttackCellState.Miss : enemyGrid; 
  }

  function isShipDestroyed(enemyGrid, attackGrid, shipId) {
    for (let row = 0; row < enemyGrid.length; row++) {
      for (let col = 0; col < enemyGrid[row].length; col++) {
        const enemyCell = enemyGrid[row][col];

        if (enemyCell?.shipId === shipId) {
          if (attackGrid[row][col] !== AttackCellState.Hit) {
            return false;
          }
        }
      }
    }

    return true;
  }

  // TODO: Optimize the search
  function markShipAsSunk(enemyGrid, attackGrid, shipId) {
    const next = attackGrid.map((row) => [...row]);

    for (let row = 0; row < enemyGrid.length; row++) {
      for (let col = 0; col < enemyGrid[row].length; col++) {
        if (enemyGrid[row][col]?.shipId === shipId) {
          next[row][col] = AttackCellState.Sunk;
        }
      }
    }
    return next;
  }
  
  function handleCellClick(row, col) {
  setGrid((prev) => {
    let next = prev.map((r) => [...r]);

    if (next[row][col] !== null) return prev;

    const enemyCell = enemyGrid[row][col];

    if (enemyCell == null) {
      next[row][col] = AttackCellState.Miss;
    } else {
      next[row][col] = AttackCellState.Hit;

      const destroyed = isShipDestroyed(
        enemyGrid,
        next,
        enemyCell.shipId
      );

      if (destroyed) {
        next = markShipAsSunk(
          enemyGrid,
          next,
          enemyCell.shipId
        );
      }
    }

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