import { Box, Icon, Stack } from '@chakra-ui/react'
import { useDroppable } from '@dnd-kit/core'
import { useContext } from 'react'
import { CanvasFieldsContext } from '../../context/CanvasFieldsContext'
import { MdDraw } from 'react-icons/md'

const Canvas = () => {
  const { canvasFields, setCanvasFields } = useContext(CanvasFieldsContext)
  const { setNodeRef } = useDroppable({ id: 'canvas' })
  console.log(canvasFields)
  const handleEdit = (uid: string) => {
    setCanvasFields((prev) => {
      const isEdited = prev.find((field) => field.isEdit === true)
      if (isEdited) return prev
      return prev.map((field) =>
        field.uid === uid ? { ...field, isEdit: true } : field
      )
    })
  }
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
            onClick={() => handleEdit(field.uid)}
            key={field.uid}
            p="4"
            color="black"
            border={field.isEdit ? '2px solid' : '1px solid #ddd'}
            borderColor={field.isEdit ? 'gray.500' : 'black'}
            bg={field.isEdit ? 'gray.400' : 'white'}
            borderRadius="md"
            cursor="pointer"
            display="flex"
            justifyContent="space-between"
          >
            {field.name}
            {field.isEdit && (
              <Icon size="md">
                <MdDraw />
              </Icon>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export { Canvas }
