import { Field, Input } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'
import { MaxMinLength } from './MaxMinLength'

const TextareaSettings = ({ onChange, formValues, errors }: FieldSettings) => {
  const { placeholder } = formValues
  return (
    <>
      <Field.Root invalid={!!errors.placeholder}>
        <Field.Label>Placeholder</Field.Label>
        <Input
          name="placeholder"
          onChange={(e) => onChange('placeholder', e.target.value)}
          value={placeholder ?? ''}
        />
        <Field.ErrorText>{errors.placeholder}</Field.ErrorText>
      </Field.Root>
      <MaxMinLength
        errors={errors}
        onChange={onChange}
        formValues={formValues}
      />
    </>
  )
}

export { TextareaSettings }
