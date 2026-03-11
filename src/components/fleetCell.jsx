export default function Cell({ value, onDragOver, onDrop }) {
  return (
    <div
      className={`cell ${value ? "occupied" : ""}`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {value?.image && (
        <img
          src={value.image}
          alt={value.name}
          className="placed-ship-image"
          draggable={false}
        />
      )}
    </div>
  );
}