import { Box, Stack } from '@chakra-ui/react'
import type { Field } from '../../types'

const Canvas = ({ fields }: { fields: Field[] | [] }) => {
  return (
    <Box flex="1" p="6" minH="100vh" flexShrink={0} bgColor="#fafafa">
      <Box mb="4" fontWeight="bold" fontSize="lg">
        Canvas (Your Form)
      </Box>
      <Stack>
        {fields.map((field) => (
          <Box
            key={field.type}
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
