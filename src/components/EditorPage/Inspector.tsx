import { Box, Checkbox, Field, Input, Stack } from '@chakra-ui/react'

const Inspector = () => {
  return (
    <Box w="250px" p="4" borderLeft="1px solid #eee" flexShrink={0}>
      <Box mb="4" fontWeight="bold" fontSize="lg">
        Inspector Fields
      </Box>
      <Stack>
        <Field.Root>
          <Field.Label>Label</Field.Label>
          <Input placeholder="Field label..." name="label" />
        </Field.Root>

        {/* Placeholder */}
        <Field.Root>
          <Field.Label>Placeholder</Field.Label>
          <Input placeholder="Placeholder..." name="placeholder" />
        </Field.Root>

        {/* Required */}
        <Checkbox.Root name="required">
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Required</Checkbox.Label>
        </Checkbox.Root>
      </Stack>
    </Box>
  )
}

export { Inspector }
