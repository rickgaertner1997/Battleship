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
    console.log("playerFleetGrid", playerFleetGrid);
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
        next[row][col + i] = {
          shipId: draggedShip.id,
          name: draggedShip.name,
          image: draggedShip.image,
          length: draggedShip.length,
          partIndex: i,
        };
      }

      return next;
    });

    setDraggedShip(null);
  }

  return (
    <div>
       <img src={ships[0].image} alt="test" width="100" />
      <h1>Fleet Setup</h1>
      <div className="fleet-layout">
        <FleetBoard grid={playerFleetGrid} onDropShip={handleDropShip} />
        <ShipDock ships={ships} onDragShip={handleDragShip} />
      </div>
    </div>
  );
}

export default App
