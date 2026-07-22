import Cell from "./fleetCell.jsx";

export default function FleetGrid({
  grid,
  isFleetLocked,
  onDropShip,
}) {
  function handleDragOver(event) {
    if (isFleetLocked) return;

    event.preventDefault();
  }

  function handleDrop(event, row, col) {
    if (isFleetLocked) return;

    event.preventDefault();
    onDropShip(row, col);
  }

  return (
    <div className="board">
      {grid.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            onDragOver={handleDragOver}
            onDrop={(event) =>
              handleDrop(event, rowIndex, colIndex)
            }
          />
        ))
      )}
    </div>
  );
}