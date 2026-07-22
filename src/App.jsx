import { useState } from "react";

import SetupPhase from "./components/setup/setupPhase.jsx";
import AttackPhase from "./components/battle/attackPhase.jsx";

import { ships } from "./constants/ships.js";

import { useFleetSetup } from "./hooks/useFleetSetup.js";
import { useBattle } from "./hooks/useBattle.js";

import { buildRandomFleetGrid } from "./utils/buildRandomFleetGrid.js";

const TOTAL_SHIP_CELLS = ships.reduce(
  (total, ship) => total + ship.length,
  0
);

export default function App() {
  const [phase, setPhase] = useState("setup");

  const fleetSetup = useFleetSetup(ships);
  const battle = useBattle();

  function handleReady() {
    const fleetLocked = fleetSetup.lockFleet();

    if (!fleetLocked) return;

    const enemyGrid = buildRandomFleetGrid(ships);

    battle.setEnemyGrid(enemyGrid);

    setPhase("attack");
  }

  return (
    <main style={{ padding: 24 }}>
      {phase === "setup" ? (
        <SetupPhase
          fleetSetup={fleetSetup}
          onReady={handleReady}
        />
      ) : (
        <AttackPhase
          battle={battle}
          playerFleetGrid={fleetSetup.playerFleetGrid}
          totalShipCells={TOTAL_SHIP_CELLS}
        />
      )}
    </main>
  );
}