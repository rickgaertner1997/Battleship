import {
  AttackCellState,
} from "../../constants/base";

import type {
  AttackCellValue,
  FleetCellState,
} from "../../constants/base";

interface MiniFleetGridProps {
  fleetGrid: FleetCellState[][];
  attackGrid: (
    | AttackCellValue
    | null
  )[][];
}

export default function MiniFleetGrid({
  fleetGrid,
  attackGrid,
}: MiniFleetGridProps) {
  return (
    <div className="mini-fleet">
      <h3 className="mini-fleet__title">
        Your fleet
      </h3>

      <div className="mini-fleet__grid">
        {fleetGrid.flatMap(
          (row, rowIndex) =>
            row.map(
              (shipId, colIndex) => {
                const attackValue =
                  attackGrid[rowIndex]?.[
                    colIndex
                  ] ?? null;

                const hasShip =
                  shipId !== null;

                const wasHit =
                  attackValue ===
                    AttackCellState.Hit ||
                  attackValue ===
                    AttackCellState.Sunk;

                const wasMiss =
                  attackValue ===
                  AttackCellState.Miss;

                let className =
                  "mini-fleet__cell";

                if (hasShip) {
                  className +=
                    " mini-fleet__cell--ship";
                }

                if (wasHit) {
                  className +=
                    " mini-fleet__cell--hit";
                }

                if (wasMiss) {
                  className +=
                    " mini-fleet__cell--miss";
                }

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={className}
                  />
                );
              }
            )
        )}
      </div>
    </div>
  );
}