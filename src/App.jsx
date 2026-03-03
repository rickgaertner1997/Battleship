import { useState } from 'react'
import Board from "./components/board.jsx";
import { createGrid } from "./utils/createGrid.js";

function App() {
  const [ playerGrid, setPlayerGrid] = useState(() => createGrid(10, 10));

  return (
    <div style={{ padding: 24 }}>
      <Board grid={ playerGrid } setGrid={ setPlayerGrid } />
    </div>
  );
}

export default App
