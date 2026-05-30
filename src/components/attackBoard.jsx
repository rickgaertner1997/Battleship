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
    const hitParts = [];

    for (let row = 0; row < enemyGrid.length; row++) {
      for (let col = 0; col < enemyGrid[row].length; col++) {
        const isCorrecteState = checkCorrectState(enemyGrid[row][col], shipId, attackGrid[row][col], AttackCellState.Hit);
        if (isCorrecteState) {
          hitParts.push({ row, col });
        }
      }
    }

    return hitParts;
  }

  function checkCorrectState(enemyCell, shipId, attackCell, state){
    return (enemyCell === shipId && attackCell === state)
  }

  function getShip(shipId) {
    return ships.find(ship => ship.id === shipId) || null;
  }

  function markShipsAsSunk(hittedShipParts, next){
    hittedShipParts.forEach(({ row, col }) => {
      next[row][col] = AttackCellState.Sunk;
    });
    return next;
  }

  function compareLengthsOfArrays(array1, array2){
    return array1.length === array2.length
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
      const selectedShip = getShip(enemyCell);
      const hittedShipParts = getHittedShipParts(
        enemyGrid,
        next,
        enemyCell
      );

     
      if (compareLengthsOfArrays(hittedShipParts, selectedShip)) {
       next = markShipsAsSunk(hittedShipParts, next)
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