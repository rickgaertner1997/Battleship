import "../styles/components/shipDock.css";

import type { Ship } from "../../utils/placeShip";

interface ShipDockProps {
  ships: Ship[];
  onDragShip: (ship: Ship) => void;
}

export default function ShipDock({
  ships,
  onDragShip,
}: ShipDockProps) {
  return (
    <div className="ship-dock">
      <h2>Your Fleet</h2>

      <div className="ship-list">
        {ships.map((ship) => (
          <div
            key={ship.id}
            className="ship-card"
            draggable
            onDragStart={() => onDragShip(ship)}
          >
            <img
              src={ship.image}
              alt={ship.name}
              className="ship-image"
              draggable={false}
            />
            <span>{ship.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}