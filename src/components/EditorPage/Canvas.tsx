import { Box, Flex, Icon, Stack } from '@chakra-ui/react'
import { useDroppable } from '@dnd-kit/core'
import { useContext } from 'react'
import { CanvasFieldsContext } from '../../context/CanvasFieldsContext'
import { MdDraw } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'

const Canvas = () => {
  const { canvasFields, setCanvasFields } = useContext(CanvasFieldsContext)
  const { setNodeRef } = useDroppable({ id: 'canvas' })
  const handleEdit = (uid: string) => {
    setCanvasFields((prev) =>
      prev.map((field) =>
        field.uid === uid
          ? { ...field, isEdit: true }
          : { ...field, isEdit: false }
      )
    )
  }
  const handleDelete = (uid: string) => {
    setCanvasFields((prev) => {
      return prev.filter((field) => field.uid !== uid)
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
              <Flex justifyContent="space-between" width="60px">
                <Icon
                  size="md"
                  _hover={{
                    color: 'white',
                  }}
                  transition="all 0.2s ease"
                  onClick={() => {
                    handleDelete(field.uid)
                  }}
                >
                  <FaTrash />
                </Icon>
                <Icon size="md">
                  <MdDraw />
                </Icon>
              </Flex>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export { Canvas }
