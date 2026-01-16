import { Flex } from '@chakra-ui/react'
import { SideBar } from './SideBar'
import { Canvas } from './Canvas'
import { Inspector } from './Inspector/Inspector'
import { DndContext } from '@dnd-kit/core'
import { useCanvasFields } from '../../hooks/useCanvasFields'
import type { DragEndEvent } from '@dnd-kit/core'
import { CanvasFieldsContext } from '../../context/CanvasFieldsContext'
import { useContext } from 'react'
import { ErrorBaner } from '../ErrorBaner'

const EditorPage = () => {
  const { handleAddFieldToCanvas } = useCanvasFields()
  const { error } = useContext(CanvasFieldsContext)

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    if (!over) return

    if (over.id === 'canvas') {
      handleAddFieldToCanvas(active)
    }
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="space-around">
      {error && <ErrorBaner error={error} />}
      <DndContext onDragEnd={handleDragEnd}>
        <SideBar />
        <Canvas />
      </DndContext>
      <Inspector />
    </Flex>
  )
}
export { EditorPage }
