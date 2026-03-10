export function createGrid(rows, columns, defaultValue = null) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => defaultValue)
  );
}