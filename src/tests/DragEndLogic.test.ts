import type { DragEndEvent } from '@dnd-kit/core'
import { handleDragEndLogic } from '../utils/handleDragEndLogic'

describe('DragAndLogi', () => {
  it('calls handleAddFieldToCanvas when dropped on canvas', () => {
    const fn = vi.fn()
    const event = {
      active: { id: '1', data: { name: 'Text input' } },
      over: { id: 'canvas' },
    } as unknown as DragEndEvent

    handleDragEndLogic(event, fn)

    expect(fn).toHaveBeenCalledWith(event.active)
  })
  it('does not call function when over is null', () => {
    const fn = vi.fn()

    const event = {
      active: { id: '1' },
      over: null,
    } as unknown as DragEndEvent

    handleDragEndLogic(event, fn)
    expect(fn).not.toHaveBeenCalled()
  })
})
