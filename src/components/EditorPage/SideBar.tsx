import { Box, Grid } from '@chakra-ui/react'
import { SingleField } from './SingleField'

const fields = [
  { label: 'Text input', type: 'text', id: '1', required: false },
  { label: 'Textarea', type: 'textarea', id: '2', required: false },
  { label: 'Checkbox', type: 'checkbox', id: '3', required: false },
  { label: 'Radio', type: 'radio', id: '4', required: false },
  { label: 'Select', type: 'select', id: '5', required: false },
  { label: 'Date', type: 'date', id: '6', required: false },
  { label: 'Number', type: 'number', id: '7', required: false },
]

const SideBar = () => {
  return (
    <Box w="250px" p="4" borderRight="1px solid #eee" flexShrink={0}>
      <Box mb="4" fontWeight="bold" fontSize="lg">
        Form Fields
      </Box>
      <Grid templateColumns="repeat(2,1fr)" gap="4">
        {fields.map((field) => (
          <SingleField field={field} key={field.id} />
        ))}
      </Grid>
    </Box>
  )
}

export { SideBar }
