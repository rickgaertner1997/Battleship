import Cell from "./fleetCell.jsx";

export default function FleetBoard({ grid, onDropShip }) {
  return (
    <div className="board">
      {grid.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={value}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onDropShip(rowIndex, colIndex);
            }}
          />
        ))
      )}
    </div>
  );
}