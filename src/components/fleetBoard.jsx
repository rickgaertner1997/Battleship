import FleetGrid from "./FleetGrid.jsx";
import PlacedShips from "./PlacedShips.jsx";

export default function FleetBoard({
  grid,
  placedShips,
  onDropShip,
  onRepositionShip,
  isFleetLocked,
}) {
  return (
    <div className="board-wrapper">
      <FleetGrid
        grid={grid}
        isFleetLocked={isFleetLocked}
        onDropShip={onDropShip}
      />

      <PlacedShips
        placedShips={placedShips}
        isFleetLocked={isFleetLocked}
        onRepositionShip={onRepositionShip}
      />
    </div>
  );
}