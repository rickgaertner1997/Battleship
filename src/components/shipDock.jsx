import "../styles/components/shipDock.css";

export default function ShipDock({ ships, onDragShip }) {
  return (
    <div className="ship-dock">
      <h2>Your Fleet</h2>

      <div className="ship-list">
        {ships.map((ship) => (
          <div
            key={ship.id}
            className="ship-card"
            draggable
            onDragStart={() => {
              console.log("drag start", ship.id);
              onDragShip(ship);
            }}
          >
            <img
              src={ship.image}
              alt={ship.name}
              className="ship-image"
              draggable={false}
            />
            <span className="ship-name">{ship.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}