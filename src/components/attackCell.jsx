import { createRoot } from 'react-dom/client'
import { AttackCellState } from "../constants/base.js";

export default function Cell({ value, onClick, disabled }) {

  let symbol = '';

  if (value !== null && value!== AttackCellState.Miss){
    symbol = 'X'
  }

  if (value === AttackCellState.Miss) {
    symbol = 'O';
  }

    if (value === AttackCellState.Sunk) {
    symbol = '🔥';
  }

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className='cell'
      aria-label={`cell ${value}`}
    >
      {symbol}
    </button>
  );
}