import type {
  DragEventHandler,
} from "react";

interface CellProps {
  onDragOver: DragEventHandler<HTMLDivElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
}

export default function Cell({
  onDragOver,
  onDrop,
}: CellProps) {
  return (
    <div
      className="cell"
      onDragOver={onDragOver}
      onDrop={onDrop}
    />
  );
}