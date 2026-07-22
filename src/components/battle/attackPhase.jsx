import AttackBoard from "../attackBoard/attackBoard.jsx";

export default function AttackPhase({
  battle,
  playerFleetGrid,
  totalShipCells,
}) {
  const {
    enemyGrid,
    enemyAttackGrid,
    setEnemyAttackGrid,
    attackGrid,
    setAttackGrid,
    playerHitCount,
    setPlayerHitCount,
    aiHitCount,
    setAiHitCount,
    lastAiAttackWasHit,
    setLastAiAttackWasHit,
    lastAiAttack,
    setLastAiAttack,
    aiResponse,
    setAiResponse,
    winner,
    setWinner,
  } = battle;

  return (
    <>
      <h1>Attack Phase</h1>

      {winner === "player" && <h2>You win!</h2>}
      {winner === "ai" && <h2>The AI wins!</h2>}

      <div className="fleet-layout">
        <AttackBoard
          grid={attackGrid}
          setGrid={setAttackGrid}
          enemyGrid={enemyGrid}
          playerFleetGrid={playerFleetGrid}
          enemyAttackGrid={enemyAttackGrid}
          setEnemyAttackGrid={setEnemyAttackGrid}
          aiHitCount={aiHitCount}
          setAiHitCount={setAiHitCount}
          hitCount={playerHitCount}
          setHitCount={setPlayerHitCount}
          totalShipCells={totalShipCells}
          setWinner={setWinner}
          disabled={winner !== null}
          lastAiAttackWasHit={lastAiAttackWasHit}
          setLastAiAttackWasHit={setLastAiAttackWasHit}
          lastAiAttack={lastAiAttack}
          setLastAiAttack={setLastAiAttack}
          aiResponse={aiResponse}
          setAiResponse={setAiResponse}
        />
      </div>
    </>
  );
}