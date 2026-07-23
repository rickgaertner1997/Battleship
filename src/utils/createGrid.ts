export function createGrid<T = null>(
  rows: number,
  columns: number,
  defaultValue: T = null as T
): T[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => defaultValue)
  );
}