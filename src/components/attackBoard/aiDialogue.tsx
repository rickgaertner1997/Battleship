interface AttackPosition {
  row: number;
  col: number;
}

interface AiDialogueProps {
  lastAiAttack: AttackPosition | null;
  aiResponse: string;
}

export default function AiDialogue({
  lastAiAttack,
  aiResponse,
}: AiDialogueProps) {
  return (
    <div className="ai-dialogue">
      {lastAiAttack && (
        <div className="speech-bubble attack-bubble">
          AI attacked{" "}
          <strong>
            {String.fromCharCode(65 + lastAiAttack.col)}
            {lastAiAttack.row + 1}
          </strong>
        </div>
      )}

      {aiResponse && (
        <div className="speech-bubble response-bubble">
          {aiResponse}
        </div>
      )}
    </div>
  );
}