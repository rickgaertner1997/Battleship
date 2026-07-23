import AttackBoard from "../attackBoard/attackBoard";

import type {
  FleetGrid,
  useBattle,
} from "../../hooks/useBattle";

interface AttackPhaseProps {
  battle: ReturnType<typeof useBattle>;
  playerFleetGrid: FleetGrid;
  totalShipCells: number;
}

export default function AttackPhase({
  battle,
  playerFleetGrid,
  totalShipCells,
}: AttackPhaseProps) {
  return (
    <>
      <h1>Attack Phase</h1>

      {battle.winner === "player" && (
        <h2>You win!</h2>
      )}

      {battle.winner === "ai" && (
        <h2>AI wins!</h2>
      )}

      <AttackBoard
        grid={battle.attackGrid}
        setGrid={battle.setAttackGrid}
        enemyGrid={battle.enemyGrid}
        playerFleetGrid={playerFleetGrid}
        enemyAttackGrid={battle.enemyAttackGrid}
        setEnemyAttackGrid={
          battle.setEnemyAttackGrid
        }
        aiHitCount={battle.aiHitCount}
        setAiHitCount={battle.setAiHitCount}
        hitCount={battle.playerHitCount}
        setHitCount={battle.setPlayerHitCount}
        totalShipCells={totalShipCells}
        setWinner={battle.setWinner}
        disabled={battle.winner !== null}
        isTurnLocked={battle.isTurnLocked}
        setIsTurnLocked={
          battle.setIsTurnLocked
        }
        lastAiAttackWasHit={
          battle.lastAiAttackWasHit
        }
        setLastAiAttackWasHit={
          battle.setLastAiAttackWasHit
        }
        lastAiAttack={battle.lastAiAttack}
        setLastAiAttack={
          battle.setLastAiAttack
        }
        aiResponse={battle.aiResponse}
        setAiResponse={battle.setAiResponse}
      />
    </>
  );
}