import { Box, Grid } from '@chakra-ui/react'
import { SingleField } from './SingleField'

const fields = [
  { name: 'Text input', type: 'text', id: '1', required: false },
  { name: 'Textarea', type: 'textarea', id: '2', required: false },
  { name: 'Checkbox', type: 'checkbox', id: '3', required: false },
  { name: 'Radio', type: 'radio', id: '4', required: false },
  { name: 'Select', type: 'select', id: '5', required: false },
  { name: 'Date', type: 'date', id: '6', required: false },
  { name: 'Number', type: 'number', id: '7', required: false },
]

const SideBar = () => {
  return (
    <Box
      w={{ base: '100vw', lg: '200px' }}
      p="4"
      borderRight={{ base: '', lg: '1px solid #eee' }}
      flexShrink={0}
    >
      <Box mb="4" fontWeight="bold" fontSize="lg">
        Form Fields
      </Box>
      <Grid
        templateColumns={{ base: 'repeat(4,1fr)', lg: 'repeat(2,1fr)' }}
        gap="4"
        touchAction="none"
      >
        {fields.map((field) => (
          <SingleField field={field} key={field.id} />
        ))}
      </Grid>
    </Box>
  )
}

export { SideBar }
