import { useState } from "react";

import SetupPhase from "./components/setup/setupPhase";
import AttackPhase from "./components/battle/attackPhase";

import { ships } from "./constants/ships";

import { useFleetSetup } from "./hooks/useFleetSetup";
import { useBattle } from "./hooks/useBattle";

import { buildRandomFleetGrid } from "./utils/buildRandomFleetGrid";

type Phase = "setup" | "attack";

const TOTAL_SHIP_CELLS = ships.reduce(
  (total, ship) => total + ship.length,
  0
);

export default function App() {
  const [phase, setPhase] = useState<Phase>("setup");

  const fleetSetup = useFleetSetup(ships);
  const battle = useBattle();

  function handleReady(): void {
    const fleetLocked = fleetSetup.lockFleet();

    if (!fleetLocked) {
      return;
    }

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