import Cell from "./fleetCell.jsx";

const CELL_SIZE = 60;

export default function FleetBoard({
  grid,
  placedShips,
  onDropShip,
  onRepositionShip,
}) {
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

      {placedShips.map((ship) => {
        const isHorizontal = ship.orientation === "horizontal";

        return (
          <img
            key={`${ship.id}-${ship.row}-${ship.col}`}
            src={ship.image}
            alt={ship.name}
            className="ship-overlay ship-overlay--interactive"
            style={{
              left: `${ship.col * CELL_SIZE}px`,
              top: `${ship.row * CELL_SIZE}px`,
              width: isHorizontal ? `${ship.length * CELL_SIZE}px` : `60px`,
              height: isHorizontal ? `60px` : `${ship.length * CELL_SIZE}px`,
            }}
            onClick={() => onRepositionShip(ship)}
            draggable={false}
          />
        );
      })}
    </div>
  );
}