import { CELL_SIZE } from "../../constants/base.ts";

export default function ShipOverlay({
  ship,
  isFleetLocked,
  onRepositionShip,
}) {
  const isHorizontal = ship.orientation === "horizontal";

  const width = isHorizontal
    ? ship.length * CELL_SIZE
    : CELL_SIZE;

  const height = isHorizontal
    ? CELL_SIZE
    : ship.length * CELL_SIZE;

  function handleClick() {
    if (isFleetLocked) return;

    onRepositionShip(ship);
  }

  return (
    <img
      src={ship.image}
      alt={ship.name}
      className="ship-overlay"
      style={{
        left: `${ship.col * CELL_SIZE}px`,
        top: `${ship.row * CELL_SIZE}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={handleClick}
      draggable={false}
    />
  );
}