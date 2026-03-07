import "../styles/components/shipDock.css";

export default function ShipDock({ ships }) {
  return (
    <div className="ship-dock">
      <h2>Your Fleet</h2>

      <div className="ship-list">
        {ships.map((ship) => (
          <div key={ship.id} className="ship-card">
            <img
              src={ship.image}
              alt={ship.name}
              className="ship-image"
            />
            <span className="ship-name">{ship.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}