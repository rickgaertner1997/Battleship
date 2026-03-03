export function createGrid(rows, columns, defaultValue = 0) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => defaultValue)
  );
}