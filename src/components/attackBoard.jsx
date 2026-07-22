import AiDialogue from "./aiDialogue.jsx";
import AttackGrid from "./attackGrid.jsx";
import { useAttackTurn } from "../hooks/useAttackTurn.js";

export default function AttackBoard(props) {
  const {
    grid,
    lastAiAttack,
    aiResponse,
    disabled,
  } = props;

  const { handleCellClick } = useAttackTurn(props);

  return (
    <div className="attack-board-section">
      <AiDialogue
        lastAiAttack={lastAiAttack}
        aiResponse={aiResponse}
      />

      <AttackGrid
        grid={grid}
        disabled={disabled}
        onCellClick={handleCellClick}
      />
    </div>
  );
}