import type { Active, DragEndEvent } from '@dnd-kit/core'

export const handleDragEndLogic = (
  event: DragEndEvent,
  handleAddFieldToCanvas: (active: Active) => void
) => {
  const { over, active } = event
  if (!over) return

  if (over.id === 'canvas') {
    handleAddFieldToCanvas(active)
  }
}
