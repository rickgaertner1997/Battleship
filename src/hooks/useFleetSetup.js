import { useState } from "react";
import { createGrid } from "../utils/createGrid.js";
import { placeShipOnGrid } from "../utils/placeShip.js";
import { buildGridFromShips } from "../utils/buildGridFromShips.js";

const BOARD_SIZE = 10;

export function useFleetSetup(ships) {
  const [playerFleetGrid, setPlayerFleetGrid] = useState(() =>
    createGrid(BOARD_SIZE, BOARD_SIZE)
  );

  const [placedShips, setPlacedShips] = useState([]);
  const [draggedShip, setDraggedShip] = useState(null);
  const [shipOrientation, setShipOrientation] =
    useState("horizontal");
  const [isFleetLocked, setIsFleetLocked] = useState(false);

  function handleDragShip(ship) {
    if (isFleetLocked) return;

    setDraggedShip(ship);
  }

  function handleRotateShip() {
    if (isFleetLocked) return;

    setShipOrientation((currentOrientation) =>
      currentOrientation === "horizontal"
        ? "vertical"
        : "horizontal"
    );
  }

  function handleDropShip(row, col) {
    if (isFleetLocked || !draggedShip) return;

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

    setPlacedShips((currentShips) => [
      ...currentShips,
      placedShip,
    ]);

    setDraggedShip(null);
  }

  function removePlacedShip(shipId) {
    if (isFleetLocked) return;

    const nextPlacedShips = placedShips.filter(
      (ship) => ship.id !== shipId
    );

    setPlacedShips(nextPlacedShips);

    setPlayerFleetGrid(
      buildGridFromShips(nextPlacedShips, BOARD_SIZE)
    );
  }

  function handleRepositionShip(ship) {
    if (isFleetLocked) return;

    removePlacedShip(ship.id);
    setDraggedShip(ship);
    setShipOrientation(ship.orientation ?? "horizontal");
  }

  function resetFleet() {
    if (isFleetLocked) return;

    setPlayerFleetGrid(createGrid(BOARD_SIZE, BOARD_SIZE));
    setPlacedShips([]);
    setDraggedShip(null);
    setShipOrientation("horizontal");
  }

  function lockFleet() {
    if (placedShips.length !== ships.length) {
      return false;
    }

    setDraggedShip(null);
    setIsFleetLocked(true);

    return true;
  }

  const availableShips = ships.filter(
    (ship) =>
      !placedShips.some(
        (placedShip) => placedShip.id === ship.id
      ) || draggedShip?.id === ship.id
  );

  const allShipsPlaced = placedShips.length === ships.length;

  return {
    playerFleetGrid,
    placedShips,
    draggedShip,
    shipOrientation,
    isFleetLocked,
    availableShips,
    allShipsPlaced,
    handleDragShip,
    handleRotateShip,
    handleDropShip,
    handleRepositionShip,
    resetFleet,
    lockFleet,
  };
}