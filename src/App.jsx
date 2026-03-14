import { useState } from 'react'
import AttackBoard from "./components/attackBoard.jsx";
import { ships } from "./constants/ships.js";
import FleetBoard from './components/fleetBoard.jsx';
import ShipDock from './components/shipDock.jsx';
import { createGrid } from "./utils/createGrid.js";
import  { placeShipOnGrid } from "./utils/placeShip.js";

function App() {
  const [playerFleetGrid, setPlayerFleetGrid] = useState(() => createGrid(10, 10));
  const [placedShips, setPlacedShips] = useState([]);
  const [draggedShip, setDraggedShip] = useState(null);

  function handleDragShip(ship) {
    setDraggedShip(ship);
  }

  function handleDropShip(row, col) {
    if (!draggedShip) return;

    const result = placeShipOnGrid(playerFleetGrid, draggedShip, row, col);

    if (!result.ok) return;

    setPlayerFleetGrid(result.nextGrid);

    setPlacedShips((prev) => [
      ...prev,
      {
        ...draggedShip,
        row,
        col,
        orientation: "horizontal",
      },
    ]);

    setDraggedShip(null);
  }

  const availableShips = ships.filter(
    (ship) => !placedShips.some((placed) => placed.id === ship.id)
  );

  return (
    <div>
      <h1>Fleet Setup</h1>

      <div className="fleet-layout">
        <FleetBoard
          grid={playerFleetGrid}
          placedShips={placedShips}
          onDropShip={handleDropShip}
        />
        <ShipDock
          ships={availableShips}
          onDragShip={handleDragShip}
        />
      </div>
    </div>
  );
}

export default App;