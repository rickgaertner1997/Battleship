import { useState } from "react";

import { createGrid } from "../utils/createGrid";
import { placeShipOnGrid } from "../utils/placeShip";
import { buildGridFromShips } from "../utils/buildGridFromShips";

import type { FleetCellState } from "../constants/base";

const BOARD_SIZE = 10;

export type ShipOrientation = "horizontal" | "vertical";

export interface Ship {
  id: string | number;
  name: string;
  size: number;
}

export interface PlacedShip extends Ship {
  row: number;
  col: number;
  orientation: ShipOrientation;
}

export type FleetGrid = FleetCellState[][];

interface UseFleetSetupResult {
  playerFleetGrid: FleetGrid;
  placedShips: PlacedShip[];
  draggedShip: Ship | PlacedShip | null;
  shipOrientation: ShipOrientation;
  isFleetLocked: boolean;
  availableShips: Ship[];
  allShipsPlaced: boolean;
  handleDragShip: (ship: Ship) => void;
  handleRotateShip: () => void;
  handleDropShip: (row: number, col: number) => void;
  handleRepositionShip: (ship: PlacedShip) => void;
  resetFleet: () => void;
  lockFleet: () => boolean;
}

export function useFleetSetup(
  ships: Ship[]
): UseFleetSetupResult {
  const [playerFleetGrid, setPlayerFleetGrid] =
    useState<FleetGrid>(() =>
      createGrid(BOARD_SIZE, BOARD_SIZE)
    );

  const [placedShips, setPlacedShips] = useState<PlacedShip[]>(
    []
  );

  const [draggedShip, setDraggedShip] = useState<
    Ship | PlacedShip | null
  >(null);

  const [shipOrientation, setShipOrientation] =
    useState<ShipOrientation>("horizontal");

  const [isFleetLocked, setIsFleetLocked] =
    useState<boolean>(false);

  function handleDragShip(ship: Ship): void {
    if (isFleetLocked) {
      return;
    }

    setDraggedShip(ship);
  }

  function handleRotateShip(): void {
    if (isFleetLocked) {
      return;
    }

    setShipOrientation((currentOrientation) =>
      currentOrientation === "horizontal"
        ? "vertical"
        : "horizontal"
    );
  }

  function handleDropShip(row: number, col: number): void {
    if (isFleetLocked || !draggedShip) {
      return;
    }

    const result = placeShipOnGrid(
      playerFleetGrid,
      draggedShip,
      row,
      col,
      shipOrientation
    );

    if (!result.ok) {
      return;
    }

    const placedShip: PlacedShip = {
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

  function removePlacedShip(shipId: Ship["id"]): void {
    if (isFleetLocked) {
      return;
    }

    const nextPlacedShips = placedShips.filter(
      (ship) => ship.id !== shipId
    );

    setPlacedShips(nextPlacedShips);

    setPlayerFleetGrid(
      buildGridFromShips(nextPlacedShips, BOARD_SIZE)
    );
  }

  function handleRepositionShip(ship: PlacedShip): void {
    if (isFleetLocked) {
      return;
    }

    removePlacedShip(ship.id);
    setDraggedShip(ship);
    setShipOrientation(ship.orientation);
  }

  function resetFleet(): void {
    if (isFleetLocked) {
      return;
    }

    setPlayerFleetGrid(createGrid(BOARD_SIZE, BOARD_SIZE));
    setPlacedShips([]);
    setDraggedShip(null);
    setShipOrientation("horizontal");
  }

  function lockFleet(): boolean {
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