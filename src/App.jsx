import { useState } from "react";
import FleetBoard from "./components/fleetBoard.jsx";
import ShipDock from "./components/shipDock.jsx";
import { createGrid } from "./utils/createGrid.js";
import { placeShipOnGrid } from "./utils/placeShip.js";
import { buildGridFromShips } from "./utils/buildGridFromShips.js";
import { ships } from "./constants/ships.js";

function App() {
  const [playerFleetGrid, setPlayerFleetGrid] = useState(() => createGrid(10, 10));
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
    if (placedShips.length !== ships.length) return;

    setDraggedShip(null);
    setIsFleetLocked(true);
  }

  const availableShips = ships.filter(
    (ship) =>
      !placedShips.some((placedShip) => placedShip.id === ship.id) ||
      draggedShip?.id === ship.id
  );

  const allShipsPlaced = placedShips.length === ships.length;

  return (
    <div style={{ padding: 24 }}>
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
    </div>
  );
}

export default App;