import { Flex } from '@chakra-ui/react'
import { SideBar } from './SideBar'
import { Canvas } from './Canvas'
import { Inspector } from './Inspector/Inspector'
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { useCanvasFields } from '../../hooks/useCanvasFields'
import { CanvasFieldsContext } from '../../context/CanvasFieldsContext'
import { useContext } from 'react'
import { ErrorBaner } from '../ErrorBaner'
import { handleDragEndLogic } from '../../utils/handleDragEndLogic'

const EditorPage = () => {
  const { handleAddFieldToCanvas } = useCanvasFields()
  const { error } = useContext(CanvasFieldsContext)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  )
  const handleDragEnd = (event: DragEndEvent) => {
    handleDragEndLogic(event, handleAddFieldToCanvas)
  }

  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent={{ base: 'center', lg: 'space-around' }}
      wrap="wrap"
    >
      {error && <ErrorBaner error={error} key={error} />}
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <SideBar />
        <Canvas />
      </DndContext>
      <Inspector />
    </Flex>
  )
}
export { EditorPage }
