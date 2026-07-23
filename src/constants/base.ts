export const AttackCellState = {
  Hit: "hit",
  Miss: "miss",
  Sunk: "sunk",
} as const;

export type AttackCellValue =
  (typeof AttackCellState)[keyof typeof AttackCellState];

export enum FleetCellState {
  Empty,
  Ship,
}

export const CELL_SIZE = 60;