import { useState } from 'react'
import AttackBoard from "./components/attackBoard.jsx";
import { createGrid } from "./utils/createGrid.js";
import { ships } from "./constants/ships.js";
import FleetBoard from './components/fleetBoard.jsx';
import ShipDock from './components/shipDock.jsx';

function App() {
  const [playerAttackGrid, setAttackPlayerGrid] = useState(() => createGrid(10, 10));
  const [playerFleetGrid,   setPlayerFleetGrid] = useState(() => createGrid(10, 10));
  const [draggedShip, setDraggedShip] = useState(null);
// <AttackBoard grid={ playerAttackGrid } setGrid={ setAttackPlayerGrid } />

  function handleDragShip(ship) {
    setDraggedShip(ship);
  }

  function handleDropShip(row, col) {
    if (!draggedShip) return;

    const length = draggedShip.length;
    console.log("trying to place", draggedShip.name, "at", row, col, "length:", length);

    setPlayerFleetGrid((prev) => {
      const next = prev.map((r) => [...r]);

      if (col + length > 10) {
        console.log("out of bounds");
        return prev;
      }

      for (let i = 0; i < length; i++) {
        if (next[row][col + i] !== null) {
          console.log("overlap at", row, col + i);
          return prev;
        }
      }

      for (let i = 0; i < length; i++) {
        next[row][col + i] = "X";
      }

      return next;
    });

    setDraggedShip(null);
  }

  return (
    <div>
      <h1>Fleet Setup</h1>
      <div className="fleet-layout">
        <FleetBoard grid={playerFleetGrid} onDropShip={handleDropShip} />
        <ShipDock ships={ships} onDragShip={handleDragShip} />
      </div>
    </div>
  );
}

export default App
