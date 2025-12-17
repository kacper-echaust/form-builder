import { Box, Button, Stack } from '@chakra-ui/react'
import { DefaultInputs } from './DefaultInputs'
import { useInspector } from '../../../hooks/useInspector'
import { TextInputSettings } from './TextInputSettings'
import { TextareaSettings } from './TextareaSettings'
import { NumberSettings } from './NumberSettings'
import { DateSettings } from './DateSettings'
import { SelectSettings } from './SelectSettings'

const Inspector = () => {
  const { editField, handleChange, form, handleAcceptEdit, handleCancelEdit } =
    useInspector()
  const getActiveField = () => {
    switch (editField?.type) {
      case 'text':
        return <TextInputSettings onChange={handleChange} formValues={form} />
      case 'textarea':
        return <TextareaSettings onChange={handleChange} formValues={form} />
      case 'checkbox':
        return
      case 'radio':
        return
      case 'select':
        return <SelectSettings onChange={handleChange} formValues={form} />
      case 'date':
        return <DateSettings onChange={handleChange} formValues={form} />
      case 'number':
        return <NumberSettings onChange={handleChange} formValues={form} />
    }
  }
  return (
    <Box w="250px" p="4" borderLeft="1px solid #eee" flexShrink={0}>
      <Box mb="4" fontWeight="bold" fontSize="lg">
        Inspector Fields
      </Box>
      {editField ? (
        <Stack>
          <DefaultInputs onChange={handleChange} formValues={form} />
          {getActiveField()}
          <Button onClick={handleAcceptEdit}>Accept</Button>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  )
}

export { Inspector }
