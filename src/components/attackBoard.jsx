import Cell from "./attackCell.jsx";
import { AttackCellState } from "../constants/base.ts"; 
import {ships} from "../constants/ships.ts"; 
export default function AttackBoard({ grid, setGrid, enemyGrid}) {

  function handleAttack(row, col){
    const enemy = enemyGrid[row][col]
    return enemy == null ? AttackCellState.Miss : enemyGrid; 
  }

 // TODO: Optimize the search
  function getHittedShipParts(enemyGrid, attackGrid, shipId) {
    
    let shipsPartsCell = []
    for (let row = 0; row < enemyGrid.length; row++) {
      for (let col = 0; col < enemyGrid[row].length; col++) {
        const enemyCell = enemyGrid[row][col];
        if (enemyCell == shipId) {
          if (attackGrid[row][col] == AttackCellState.Hit) {
            shipsPartsCell << {row: row, col: col}
          }
        }
      }
    }

    return shipsPartsCell;
  }

  function getShip(shipId) {
    return ships.find(ship => ship.id === shipId) || null;
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
      console.log("EnemyCell " + enemyCell);
      const selectedShip = getShip(enemyCell);
      console.log("BACK")
      console.log(selectedShip);

      const hittedShipParts = getHittedShipParts(
        enemyGrid,
        next,
        enemyCell
      );

      console.log("Shipparts");
      console.log(hittedShipParts);
      console.log(hittedShipParts.length == selectedShip.length)
     
      if (hittedShipParts.length == selectedShip.length){
        hittedShipParts.map(cell => {
          next[cell.row][cell.col] = AttackCellState.Sunk;
        });
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