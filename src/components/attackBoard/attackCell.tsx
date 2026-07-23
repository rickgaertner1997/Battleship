import { AttackCellState } from "../../constants/base";
import type { AttackCellValue } from "../../constants/base";

interface CellProps {
  value: AttackCellValue | null;
  onClick: () => void;
  disabled: boolean;
}

export default function Cell({
  value,
  onClick,
  disabled,
}: CellProps) {
  let symbol = "";

  if (value !== null && value !== AttackCellState.Miss) {
    symbol = "X";
  }

  if (value === AttackCellState.Miss) {
    symbol = "O";
  }

  if (value === AttackCellState.Sunk) {
    symbol = "🔥";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="cell"
      aria-label={`cell ${value}`}
    >
      {symbol}
    </button>
  );
}