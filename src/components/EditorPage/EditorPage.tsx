import { Flex } from '@chakra-ui/react'
import { SideBar } from './SideBar'
import { Canvas } from './Canvas'
import { Inspector } from './Inspector/Inspector'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useCanvasFields } from '../../hooks/useCanvasFields'
import { CanvasFieldsContext } from '../../context/CanvasFieldsContext'
import { useContext } from 'react'
import { ErrorBaner } from '../ErrorBaner'
import { handleDragEndLogic } from '../../utils/handleDragEndLogic'

const EditorPage = () => {
  const { handleAddFieldToCanvas } = useCanvasFields()
  const { error } = useContext(CanvasFieldsContext)

  const handleDragEnd = (event: DragEndEvent) => {
    handleDragEndLogic(event, handleAddFieldToCanvas)
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="space-around">
      {error && <ErrorBaner error={error} key={error} />}
      <DndContext onDragEnd={handleDragEnd}>
        <SideBar />
        <Canvas />
      </DndContext>
      <Inspector />
    </Flex>
  )
}
export { EditorPage }
