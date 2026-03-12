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
  const [placedShips, setPlacedShips] = useState([]);
// <AttackBoard grid={ playerAttackGrid } setGrid={ setAttackPlayerGrid } />
  function handleDragShip(ship) {
    setDraggedShip(ship);
  }

  function handleDropShip(row, col) {
    if (!draggedShip) return;

    const length = draggedShip.length;

    let wasPlaced = false;

    setPlayerFleetGrid((prev) => {
      const next = prev.map((r) => [...r]);

      if (col + length > 10) return prev;

      for (let i = 0; i < length; i++) {
        if (next[row][col + i] !== null) return prev;
      }

      for (let i = 0; i < length; i++) {
        next[row][col + i] = draggedShip.id;
      }

      wasPlaced = true;
      return next;
    });

    if (wasPlaced) {
      setPlacedShips((prev) => [
        ...prev,
        {
          id: draggedShip.id,
          name: draggedShip.name,
          image: draggedShip.image,
          row,
          col,
          length: draggedShip.length,
          orientation: "horizontal",
        },
      ]);

      setDraggedShip(null);
    }
  }

  return (
    <div>
       <img src={ships[0].image} alt="test" width="100" />
      <h1>Fleet Setup</h1>
      <div className="fleet-layout">
        <FleetBoard
          grid={playerFleetGrid}
          placedShips={placedShips}
          onDropShip={handleDropShip}
        />
        <ShipDock ships={ships} onDragShip={handleDragShip} />
      </div>
    </div>
  );
}

export default App
