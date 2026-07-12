export function performAttack({
  row,
  col,
  attackGrid,
  enemyGrid,
  hitCount,
  totalShipCells,
  setHitCount,
  setWinner,
  winnerName,
}) {
  function getShip(shipId) {
    return ships.find((ship) => ship.id === shipId) || null;
  }

  function getHittedShipParts(enemyGrid, attackGrid, shipId) {
    const hitParts = [];

    for (let row = 0; row < enemyGrid.length; row++) {
      for (let col = 0; col < enemyGrid[row].length; col++) {
        if (
          enemyGrid[row][col] === shipId &&
          (
            attackGrid[row][col] === AttackCellState.Hit ||
            attackGrid[row][col] === AttackCellState.Sunk
          )
        ) {
          hitParts.push({ row, col });
        }
      }
    }

    return hitParts;
  }

  const next = attackGrid.map((r) => [...r]);

  if (next[row][col] !== null) {
    return {
      nextGrid: attackGrid,
      wasHit: false,
      wasSunk: false,
      alreadyAttacked: true,
    };
  }

  const enemyCell = enemyGrid[row][col];

  if (enemyCell == null) {
    next[row][col] = AttackCellState.Miss;

    return {
      nextGrid: next,
      wasHit: false,
      wasSunk: false,
      alreadyAttacked: false,
    };
  }

  next[row][col] = AttackCellState.Hit;

  const nextHitCount = hitCount + 1;
  setHitCount(nextHitCount);

  if (nextHitCount === totalShipCells) {
    setWinner(winnerName);
  }

  const selectedShip = getShip(enemyCell);
  const hitParts = getHittedShipParts(enemyGrid, next, enemyCell);

  let wasSunk = false;

  if (selectedShip && hitParts.length === selectedShip.length) {
    wasSunk = true;

    hitParts.forEach(({ row, col }) => {
      next[row][col] = AttackCellState.Sunk;
    });
  }

  return {
    nextGrid: next,
    wasHit: true,
    wasSunk,
    alreadyAttacked: false,
  };
}