import Cell from "./attackCell.jsx";

export default function AttackGrid({ grid, disabled, onCellClick }) {
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