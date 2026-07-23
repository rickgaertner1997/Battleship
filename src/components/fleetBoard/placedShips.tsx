import ShipOverlay from "./shipOverlay";

import type { PlacedShip } from "../../hooks/useFleetSetup";

interface PlacedShipsProps {
  placedShips: PlacedShip[];
  isFleetLocked: boolean;
  onRepositionShip: (ship: PlacedShip) => void;
}

export default function PlacedShips({
  placedShips,
  isFleetLocked,
  onRepositionShip,
}: PlacedShipsProps) {
  return placedShips.map((ship) => (
    <ShipOverlay
      key={`${ship.id}-${ship.row}-${ship.col}`}
      ship={ship}
      isFleetLocked={isFleetLocked}
      onRepositionShip={onRepositionShip}
    />
  ));
}