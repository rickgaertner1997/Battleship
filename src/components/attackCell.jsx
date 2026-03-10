import { createRoot } from 'react-dom/client'
import { AttackCellState } from "../constants/base.js";

export default function Cell({ value, onClick }) {

  let symbol = '';

  if (value === AttackCellState.Miss) {
    symbol = 'X';
  }

  if (value === AttackCellState.Hit) {
    symbol = 'O';
  }

  return (
    <button
      type='button'
      onClick={onClick}
      className='cell'
      aria-label={`cell ${value}`}
    >
      {symbol}
    </button>
  );
}