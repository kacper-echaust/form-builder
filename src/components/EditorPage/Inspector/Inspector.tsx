import { Box, Button, Stack } from '@chakra-ui/react'
import { DefaultInputs } from './DefaultInputs'
import { useInspector } from '../../../hooks/useInspector'
import { TextInputSettings } from './TextInputSettings'
import { TextareaSettings } from './TextareaSettings'
import { DateSettings } from './DateSettings'
import { SelectSettings } from './SelectSettings'
import { useForm } from '../../../hooks/useForm'
import { RadioSettings } from './RadioSettings'

const Inspector = () => {
  const formApi = useForm()
  const { handleChangeForm, errors, form } = formApi
  const { editField, handleAcceptEdit, handleCancelEdit } =
    useInspector(formApi)
  const getActiveField = () => {
    switch (editField?.type) {
      case 'text':
        return (
          <TextInputSettings
            onChange={handleChangeForm}
            formValues={form}
            errors={errors}
          />
        )
      case 'textarea':
        return (
          <TextareaSettings
            onChange={handleChangeForm}
            formValues={form}
            errors={errors}
          />
        )
      case 'checkbox':
        return
      case 'radio':
        return (
          <RadioSettings
            onChange={handleChangeForm}
            formValues={form}
            errors={errors}
          />
        )
      case 'number':
        return
      case 'select':
        return (
          <SelectSettings
            onChange={handleChangeForm}
            formValues={form}
            errors={errors}
          />
        )
      case 'date':
        return (
          <DateSettings
            onChange={handleChangeForm}
            formValues={form}
            errors={errors}
          />
        )
    }
  }

  return (
    <Box w="250px" p="4" borderLeft="1px solid #eee" flexShrink={0}>
      <Box mb="4" fontWeight="bold" fontSize="lg">
        Inspector Fields
      </Box>
      {editField ? (
        <Stack>
          <DefaultInputs
            onChange={handleChangeForm}
            formValues={form}
            errors={errors}
          />
          {getActiveField()}
          <Button onClick={handleAcceptEdit}>Accept</Button>
          <Button onClick={handleCancelEdit} disabled={editField.isNew}>
            Cancel
          </Button>
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  )
}

export { Inspector }
