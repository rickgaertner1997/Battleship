import { useState } from "react";
import FleetBoard from "./components/fleetBoard.jsx";
import AttackBoard from "./components/attackBoard.jsx";
import ShipDock from "./components/shipDock.jsx";
import { createGrid } from "./utils/createGrid.js";
import { placeShipOnGrid } from "./utils/placeShip.js";
import { buildGridFromShips } from "./utils/buildGridFromShips.js";
import { ships } from "./constants/ships.js";

function App() {
  const [phase, setPhase] = useState("setup");
  const [playerFleetGrid, setPlayerFleetGrid] = useState(() => createGrid(10, 10));
  const [attackGrid, setAttackGrid] = useState(() => createGrid(10, 10));
  const [placedShips, setPlacedShips] = useState([]);
  const [draggedShip, setDraggedShip] = useState(null);
  const [shipOrientation, setShipOrientation] = useState("horizontal");
  const [isFleetLocked, setIsFleetLocked] = useState(false);

  function handleDragShip(ship) {
    if (isFleetLocked) return;
    setDraggedShip(ship);
  }

  function handleRotateShip() {
    if (isFleetLocked) return;

    setShipOrientation((prev) =>
      prev === "horizontal" ? "vertical" : "horizontal"
    );
  }

  function handleDropShip(row, col) {
    if (isFleetLocked) return;
    if (!draggedShip) return;

    const result = placeShipOnGrid(
      playerFleetGrid,
      draggedShip,
      row,
      col,
      shipOrientation
    );

    if (!result.ok) return;

    const placedShip = {
      ...draggedShip,
      row,
      col,
      orientation: shipOrientation,
    };

    setPlayerFleetGrid(result.nextGrid);
    setPlacedShips((prev) => [...prev, placedShip]);
    setDraggedShip(null);
  }

  function resetFleet() {
    if (isFleetLocked) return;

    setPlayerFleetGrid(createGrid(10, 10));
    setPlacedShips([]);
    setDraggedShip(null);
    setShipOrientation("horizontal");
  }

  function buildRandomEnemyGrid() {
    let grid = createGrid(10, 10);

    for (const ship of ships) {
      let placed = false;

      while (!placed) {
        const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);

        const result = placeShipOnGrid(grid, ship, row, col, orientation);

        if (result.ok) {
          grid = result.nextGrid;
          placed = true;
        }
      }
    }

    return grid;
  }


  function removePlacedShip(shipId) {
    if (isFleetLocked) return;

    const nextPlacedShips = placedShips.filter((ship) => ship.id !== shipId);
    setPlacedShips(nextPlacedShips);
    setPlayerFleetGrid(buildGridFromShips(nextPlacedShips, 10));
  }
  
  function handleRepositionShip(ship) {
    if (isFleetLocked) return;

    removePlacedShip(ship.id);
    setDraggedShip(ship);
    setShipOrientation(ship.orientation ?? "horizontal");
  }

  function handleReady() {
    const aiGrid = buildRandomEnemyGrid();
    setEnemyGrid(aiGrid);
    
    if (placedShips.length !== ships.length) return;

    setDraggedShip(null);
    setIsFleetLocked(true);
    setPhase("attack");
  }

  const availableShips = ships.filter(
    (ship) =>
      !placedShips.some((placedShip) => placedShip.id === ship.id) ||
      draggedShip?.id === ship.id
  );

  const allShipsPlaced = placedShips.length === ships.length;

  return (
    <div style={{ padding: 24 }}>
      {phase === "setup" ? (
        <>
          <h1>Fleet Setup</h1>

          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <button onClick={handleRotateShip} disabled={isFleetLocked}>
              Rotate ({shipOrientation})
            </button>

            <button onClick={resetFleet} disabled={isFleetLocked}>
              Reset Board
            </button>

            <button onClick={handleReady} disabled={!allShipsPlaced || isFleetLocked}>
              {isFleetLocked ? "Fleet Locked" : "Ready"}
            </button>
          </div>

          {!allShipsPlaced && !isFleetLocked && (
            <p>Place all ships before pressing Ready.</p>
          )}

          <div className="fleet-layout">
            <FleetBoard
              grid={playerFleetGrid}
              placedShips={placedShips}
              onDropShip={handleDropShip}
              onRepositionShip={handleRepositionShip}
              isFleetLocked={isFleetLocked}
            />

            {!isFleetLocked && (
              <ShipDock ships={availableShips} onDragShip={handleDragShip} />
            )}
          </div>
        </>
      ) : (
        <>
          <h1>Attack Phase</h1>
        
          <div className="fleet-layout">
            <AttackBoard grid={attackGrid} setGrid={setAttackGrid} />
          </div>
        </>
      )}
    </div>
  );
}
export default App;
