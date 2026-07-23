import {
  AttackCellState,
} from "../../constants/base";

import type {
  AttackCellValue,
} from "../../constants/base";

interface AttackCellProps {
  value: AttackCellValue | null;
  onClick: () => void;
  disabled: boolean;
}

export default function AttackCell({
  value,
  onClick,
  disabled,
}: AttackCellProps) {
  let symbol = "";

  if (value === AttackCellState.Hit) {
    symbol = "X";
  }

  if (value === AttackCellState.Miss) {
    symbol = "O";
  }

  return (
    <button
      type="button"
      className="cell"
      disabled={disabled}
      onClick={onClick}
    >
      {symbol}
    </button>
  );
}