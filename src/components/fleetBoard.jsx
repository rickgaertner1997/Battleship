import Cell from "./fleetCell.jsx";

export default function FleetBoard({
  grid,
  placedShips,
  onDropShip,
  onRepositionShip,
  isFleetLocked,
}) {
  return (
    <div className="board-wrapper">
      <div className="board">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              onDragOver={(e) => {
                if (isFleetLocked) return;
                e.preventDefault();
              }}
              onDrop={(e) => {
                if (isFleetLocked) return;
                e.preventDefault();
                onDropShip(rowIndex, colIndex);
              }}
            />
          ))
        )}
      </div>

      {placedShips.map((ship, i) => (
        <img
          key={`${ship.id}-${ship.row}-${ship.col}`}
          src={ship.image}
          alt={ship.name}
          className="ship-overlay"
          style={{
            left: `${ship.col * 60}px`,
            top: `${ship.row * 60}px`,
            width:
              ship.orientation === "horizontal"
                ? `${ship.length * 60}px`
                : `60px`,
            height:
              ship.orientation === "horizontal"
                ? `60px`
                : `${ship.length * 60}px`,
          }}
          onClick={() => {
            if (isFleetLocked) return;
            onRepositionShip(ship);
          }}
          draggable={false}
        />
      ))}
    </div>
  );
}