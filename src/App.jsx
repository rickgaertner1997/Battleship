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

  function handleDragShip(ship) {
    setDraggedShip(ship);
    setShipOrientation(ship.orientation ?? "horizontal");
  }

  function handleRotateShip() {
    setShipOrientation((prev) =>
      prev === "horizontal" ? "vertical" : "horizontal"
    );
  }

  function handleDropShip(row, col) {
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
    setPlayerFleetGrid(createGrid(10, 10));
    setPlacedShips([]);
    setDraggedShip(null);
    setShipOrientation("horizontal");
  }

  function removePlacedShip(shipId) {
    const nextPlacedShips = placedShips.filter((ship) => ship.id !== shipId);
    setPlacedShips(nextPlacedShips);
    setPlayerFleetGrid(buildGridFromShips(nextPlacedShips, 10));
  }

  function handleRepositionShip(ship) {
    removePlacedShip(ship.id);
    setDraggedShip(ship);
    setShipOrientation(ship.orientation ?? "horizontal");
  }

  const availableShips = ships.filter(
    (ship) =>
      !placedShips.some((placedShip) => placedShip.id === ship.id) ||
      draggedShip?.id === ship.id
  );

  return (
    <div style={{ padding: 24 }}>
      <h1>Fleet Setup</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <button onClick={handleRotateShip}>
          Rotate ({shipOrientation})
        </button>
        <button onClick={resetFleet}>
          Reset Board
        </button>
      </div>

      <div className="fleet-layout">
        <FleetBoard
          grid={playerFleetGrid}
          placedShips={placedShips}
          onDropShip={handleDropShip}
          onRepositionShip={handleRepositionShip}
        />
        <ShipDock ships={availableShips} onDragShip={handleDragShip} />
      </div>
    </div>
  );
}

export default App;