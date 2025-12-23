import { Field, Input } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'
import { MaxMinLength } from './MaxMinLength'

const TextareaSettings = ({ onChange, formValues, errors }: FieldSettings) => {
  const { placeholder } = formValues
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
      <MaxMinLength
        errors={errors}
        onChange={onChange}
        formValues={formValues}
      />
    </>
  )
}

export { TextareaSettings }
