import AttackCell from "./attackCell";

import {
  AttackCellState,
} from "../../constants/base";

import { ships } from "../../constants/ships";

import type {
  AttackGrid as AttackGridData,
  FleetGrid,
} from "../../hooks/useBattle";

interface AttackGridProps {
  grid: AttackGridData;
  enemyGrid: FleetGrid;
  disabled: boolean;
  onCellClick: (
    row: number,
    col: number
  ) => void;
}

interface ShipPosition {
  row: number;
  col: number;
}

const CELL_SIZE = 60;

export default function AttackGrid({
  grid,
  enemyGrid,
  disabled,
  onCellClick,
}: AttackGridProps) {
  const sunkShipOverlays = ships.flatMap(
    (ship) => {
      const positions: ShipPosition[] = [];

      enemyGrid.forEach((row, rowIndex) => {
        row.forEach(
          (shipId, colIndex) => {
            if (shipId === ship.id) {
              positions.push({
                row: rowIndex,
                col: colIndex,
              });
            }
          }
        );
      });

      if (positions.length === 0) {
        return [];
      }

      const isSunk = positions.every(
        ({ row, col }) =>
          grid[row]?.[col] ===
          AttackCellState.Sunk
      );

      if (!isSunk) {
        return [];
      }

      const rows = positions.map(
        ({ row }) => row
      );

      const columns = positions.map(
        ({ col }) => col
      );

      const firstRow = Math.min(...rows);
      const lastRow = Math.max(...rows);
      const firstCol =
        Math.min(...columns);
      const lastCol =
        Math.max(...columns);

      const isVertical =
        firstCol === lastCol;

      return [
        {
          ...ship,
          firstRow,
          firstCol,
          isVertical,
          widthInCells:
            lastCol - firstCol + 1,
          heightInCells:
            lastRow - firstRow + 1,
        },
      ];
    }
  );

  return (
    <div className="board-wrapper">
      <div className="board">
        {grid.flatMap(
          (row, rowIndex) =>
            row.map(
              (value, colIndex) => (
                <AttackCell
                  key={`${rowIndex}-${colIndex}`}
                  value={value}
                  disabled={disabled}
                  onClick={() =>
                    onCellClick(
                      rowIndex,
                      colIndex
                    )
                  }
                />
              )
            )
        )}
      </div>

      {sunkShipOverlays.map((ship) => (
        <div
          key={ship.id}
          className="sunk-ship-overlay"
          style={{
            top:
              ship.firstRow *
              CELL_SIZE,
            left:
              ship.firstCol *
              CELL_SIZE,
            width:
              ship.widthInCells *
              CELL_SIZE,
            height:
              ship.heightInCells *
              CELL_SIZE,
          }}
        >
          <img
            src={ship.image}
            alt={`${ship.name} sunk`}
            className={
              ship.isVertical
                ? "sunk-ship-image sunk-ship-image--vertical"
                : "sunk-ship-image"
            }
          />
        </div>
      ))}
    </div>
  );
}