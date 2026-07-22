export default function Cell({ onDragOver, onDrop }) {
  return (
    <div
      className="cell"
      onDragOver={onDragOver}
      onDrop={onDrop}
    />
  );
}