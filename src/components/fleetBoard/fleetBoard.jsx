import FleetGrid from "./fleetGrid.jsx";
import PlacedShips from "./placedShips.jsx";

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