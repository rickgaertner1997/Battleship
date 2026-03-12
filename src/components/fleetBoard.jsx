import Cell from "./fleetCell.jsx";

export default function FleetBoard({ grid, placedShips, onDropShip }) {
  return (
    <div className="board-wrapper">
      <div className="board">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onDropShip(rowIndex, colIndex);
              }}
            />
          ))
        )}
      </div>

      {placedShips.map((ship, i) => (
        <img
          key={i}
          src={ship.image}
          alt={ship.name}
          className="ship-overlay"
          style={{
            left: `${ship.col * 40}px`,
            top: `${ship.row * 40}px`,
            width: `${ship.length * 40}px`,
            height: "40px",
          }}
          draggable={false}
        />
      ))}
    </div>
  );
}