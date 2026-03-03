import Cell from "./cell.jsx";

export default function Board({ grid, setGrid }) {
  function handleCellClick(row, col) {
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = next[row][col] === 0 ? 1 : 0;
      return next;
    });
  }

  return (
    <div className="board">
      {grid.map((row, r) =>
        row.map((value, c) => (
          <Cell
            key={`${r}-${c}`}
            value={value}
            onClick={() => handleCellClick(r, c)}
          />
        ))
      )}
    </div>
  );
}