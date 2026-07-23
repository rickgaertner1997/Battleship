import type {
  Dispatch,
  SetStateAction,
} from "react";

import AiDialogue from "./aiDialogue";
import AttackGrid from "./attackGrid";
import MiniFleetGrid from "./miniFleetGrid";

import { useAttackTurn } from "../../hooks/useAttackTurn";

import type {
  AttackGrid as AttackGridData,
  AttackPosition,
  FleetGrid,
  Winner,
} from "../../hooks/useBattle";


interface AttackBoardProps {
  grid: AttackGridData;
  setGrid: Dispatch<
    SetStateAction<AttackGridData>
  >;

  enemyGrid: FleetGrid;
  playerFleetGrid: FleetGrid;

  enemyAttackGrid: AttackGridData;
  setEnemyAttackGrid: Dispatch<
    SetStateAction<AttackGridData>
  >;

  aiHitCount: number;
  setAiHitCount: Dispatch<
    SetStateAction<number>
  >;

  hitCount: number;
  setHitCount: Dispatch<
    SetStateAction<number>
  >;

  totalShipCells: number;

  setWinner: Dispatch<
    SetStateAction<Winner>
  >;

  disabled: boolean;

  isTurnLocked: boolean;
  setIsTurnLocked: Dispatch<
    SetStateAction<boolean>
  >;

  lastAiAttackWasHit: boolean;
  setLastAiAttackWasHit: Dispatch<
    SetStateAction<boolean>
  >;

  lastAiAttack: AttackPosition | null;
  setLastAiAttack: Dispatch<
    SetStateAction<AttackPosition | null>
  >;

  aiResponse: string;
  setAiResponse: Dispatch<
    SetStateAction<string>
  >;
}

export default function AttackBoard(
  props: AttackBoardProps
) {

  const {
    grid,
    enemyGrid,
    playerFleetGrid,
    enemyAttackGrid,
    lastAiAttack,
    aiResponse,
    disabled,
    isTurnLocked,
  } = props;

  const { handleCellClick } =
    useAttackTurn(props);

  const isGridDisabled =
    disabled || isTurnLocked;

  return (
    <div className="attack-board-section">
      <MiniFleetGrid
        fleetGrid={playerFleetGrid}
        attackGrid={enemyAttackGrid}
      />

      <AiDialogue
        lastAiAttack={lastAiAttack}
        aiResponse={aiResponse}
      />

      <AttackGrid
        grid={grid}
        enemyGrid={enemyGrid}
        disabled={isGridDisabled}
        onCellClick={handleCellClick}
      />
    </div>
  );
}