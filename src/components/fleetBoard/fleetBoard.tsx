import FleetGrid from "./fleetGrid";
import PlacedShips from "./placedShips";

import type { PlacedShip } from "../../hooks/useFleetSetup";
import type { FleetGrid as FleetGridData } from "../../utils/placeShip";

interface FleetBoardProps {
  grid: FleetGridData;
  placedShips: PlacedShip[];
  onDropShip: (row: number, col: number) => void;
  onRepositionShip: (ship: PlacedShip) => void;
  isFleetLocked: boolean;
}

export default function FleetBoard({
  grid,
  placedShips,
  onDropShip,
  onRepositionShip,
  isFleetLocked,
}: FleetBoardProps) {
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