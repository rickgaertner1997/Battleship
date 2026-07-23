import Cell from "./attackCell";
import type { AttackCellValue } from "../../constants/base";

interface AttackGridProps {
  grid: (AttackCellValue | null)[][];
  disabled: boolean;
  onCellClick: (row: number, col: number) => void;
}

export default function AttackGrid({
  grid,
  disabled,
  onCellClick,
}: AttackGridProps) {
  return (
    <div className="board-wrapper">
      <div className="board">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={value}
              disabled={disabled}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}