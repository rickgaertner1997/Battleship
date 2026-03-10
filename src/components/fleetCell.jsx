export default function Cell({ value, onDragOver, onDrop }) {
  return (
    <div
      className={`cell ${value ? "occupied" : ""}`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {value || ""}
    </div>
  );
}