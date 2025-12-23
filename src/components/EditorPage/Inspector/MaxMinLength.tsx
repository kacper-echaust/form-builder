import { Flex, Field, Input } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'

const MaxMinLength = ({ errors, onChange, formValues }: FieldSettings) => {
  return (
    <Flex>
      <Field.Root padding="2" invalid={!!errors.minLength}>
        <Field.Label>Min characters</Field.Label>
        <Input
          min={1}
          max={30}
          name="minLength"
          type="number"
          onChange={(e) => onChange('minLength', e.target.value)}
          value={formValues.minLength}
        />
        <Field.ErrorText>{errors.minLength}</Field.ErrorText>
      </Field.Root>
      <Field.Root padding="2" invalid={!!errors.maxLength}>
        <Field.Label>Max characters</Field.Label>
        <Input
          min={1}
          max={30}
          name="maxLength"
          type="number"
          onChange={(e) => onChange('maxLength', e.target.value)}
          value={formValues.maxLength}
        />
        <Field.ErrorText>{errors.maxLength}</Field.ErrorText>
      </Field.Root>
    </Flex>
  )
}

export { MaxMinLength }
