import { useState } from 'react'
import AttackBoard from "./components/attackBoard.jsx";
import { createGrid } from "./utils/createGrid.js";
import { ships } from "./constants/ships.js";
import FleetBoard from './components/fleetBoard.jsx';
import ShipDock from './components/shipDock.jsx';

function App() {
  const [ playerAttackGrid, setAttackPlayerGrid] = useState(() => createGrid(10, 10));
  const [ playerFleetGrid, setPlayerFeetGrid] = useState(() => createGrid(10, 10));
// <AttackBoard grid={ playerAttackGrid } setGrid={ setAttackPlayerGrid } />

  return (
    <div>
      <h1>Fleet Setup</h1>

      <div className="fleet-layout">
        <FleetBoard grid={ playerFleetGrid } setGrid={ setPlayerFeetGrid } />
        <ShipDock ships={ships} />
      </div>
     </div>
  );
}

export default App
