import FleetBoard from "../fleetBoard/fleetBoard.jsx";
import ShipDock from "../shipDock.jsx";
import SetupControls from "./setupControls.jsx";

export default function SetupPhase({
  fleetSetup,
  onReady,
}) {
  const {
    playerFleetGrid,
    placedShips,
    shipOrientation,
    isFleetLocked,
    availableShips,
    allShipsPlaced,
    handleDragShip,
    handleRotateShip,
    handleDropShip,
    handleRepositionShip,
    resetFleet,
  } = fleetSetup;

  return (
    <>
      <h1>Fleet Setup</h1>

      <SetupControls
        orientation={shipOrientation}
        isFleetLocked={isFleetLocked}
        allShipsPlaced={allShipsPlaced}
        onRotate={handleRotateShip}
        onReset={resetFleet}
        onReady={onReady}
      />

      <div className="fleet-layout">
        <FleetBoard
          grid={playerFleetGrid}
          placedShips={placedShips}
          onDropShip={handleDropShip}
          onRepositionShip={handleRepositionShip}
          isFleetLocked={isFleetLocked}
        />

        {!isFleetLocked && (
          <ShipDock
            ships={availableShips}
            onDragShip={handleDragShip}
          />
        )}
      </div>
    </>
  );
}