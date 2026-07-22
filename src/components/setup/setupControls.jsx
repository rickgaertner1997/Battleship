export default function SetupControls({
  orientation,
  isFleetLocked,
  allShipsPlaced,
  onRotate,
  onReset,
  onReady,
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <button
          onClick={onRotate}
          disabled={isFleetLocked}
        >
          Rotate ({orientation})
        </button>

        <button
          onClick={onReset}
          disabled={isFleetLocked}
        >
          Reset Board
        </button>

        <button
          onClick={onReady}
          disabled={!allShipsPlaced || isFleetLocked}
        >
          {isFleetLocked ? "Fleet Locked" : "Ready"}
        </button>
      </div>

      {!allShipsPlaced && !isFleetLocked && (
        <p>Place all ships before pressing Ready.</p>
      )}
    </>
  );
}