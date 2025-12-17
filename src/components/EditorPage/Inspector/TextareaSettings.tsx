import { Field, Input, Flex } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'

const TextareaSettings = ({ onChange, formValues }: FieldSettings) => {
  const { placeholder, minLength, maxLength } = formValues
  return (
    <>
      <Field.Root>
        <Field.Label>Placeholder</Field.Label>
        <Input
          name="placeholder"
          onChange={(e) => onChange('placeholder', e.target.value)}
          value={placeholder}
        />
      </Field.Root>
      <Flex>
        <Field.Root padding="2">
          <Field.Label>Min characters</Field.Label>
          <Input
            name="minLength"
            type="number"
            onChange={(e) => onChange('minLength', e.target.value)}
            value={minLength}
          />
        </Field.Root>
        <Field.Root padding="2">
          <Field.Label>Max characters</Field.Label>
          <Input
            name="maxLength"
            type="number"
            onChange={(e) => onChange('maxLength', e.target.value)}
            value={maxLength}
          />
        </Field.Root>
      </Flex>
    </>
  )
}

export { TextareaSettings }
