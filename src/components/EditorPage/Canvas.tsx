import { Box, Stack } from '@chakra-ui/react'
import { useDroppable } from '@dnd-kit/core'
import { useContext } from 'react'
import { CanvasFieldsContext } from '../../context/CanvasFieldsContext'

const Canvas = () => {
  const { canvasFields } = useContext(CanvasFieldsContext)
  const { setNodeRef } = useDroppable({ id: 'canvas' })
  console.log(canvasFields)
  return (
    <Box
      ref={setNodeRef}
      flex="1"
      p="6"
      minH="100vh"
      flexShrink={0}
      bgColor="#fafafa"
    >
      <Box
        mb="4"
        fontWeight="bold"
        fontSize="lg"
        color="black"
        textAlign="center"
      >
        Canvas
      </Box>

      <Stack>
        {canvasFields.map((field) => (
          <Box
            key={field.uid}
            p="4"
            bg="white"
            color="black"
            border="1px solid #ddd"
            borderRadius="md"
            cursor="pointer"
          >
            {field.label || field.type}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export { Canvas }
