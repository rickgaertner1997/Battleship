import ShipOverlay from "./ShipOverlay.jsx";

export default function PlacedShips({
  placedShips,
  isFleetLocked,
  onRepositionShip,
}) {
  return placedShips.map((ship) => (
    <ShipOverlay
      key={`${ship.id}-${ship.row}-${ship.col}`}
      ship={ship}
      isFleetLocked={isFleetLocked}
      onRepositionShip={onRepositionShip}
    />
  ));
}