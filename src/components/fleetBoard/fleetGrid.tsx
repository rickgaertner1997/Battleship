import type { DragEvent } from "react";

import Cell from "./fleetCell";

import type { FleetGrid as FleetGridType } from "../../utils/placeShip";

interface FleetGridProps {
  grid: FleetGridType;
  isFleetLocked: boolean;
  onDropShip: (row: number, col: number) => void;
}

export default function FleetGrid({
  grid,
  isFleetLocked,
  onDropShip,
}: FleetGridProps) {
  function handleDragOver(
    event: DragEvent<HTMLDivElement>
  ): void {
    if (isFleetLocked) {
      return;
    }

    event.preventDefault();
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>,
    row: number,
    col: number
  ): void {
    if (isFleetLocked) {
      return;
    }

    event.preventDefault();
    onDropShip(row, col);
  }

  return (
    <div className="board">
      {grid.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            onDragOver={handleDragOver}
            onDrop={(event) =>
              handleDrop(event, rowIndex, colIndex)
            }
          />
        ))
      )}
    </div>
  );
}