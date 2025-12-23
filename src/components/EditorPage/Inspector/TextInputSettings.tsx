import { Field, Input } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'
import { MaxMinLength } from './MaxMinLength'

const TextInputSettings = ({ onChange, formValues, errors }: FieldSettings) => {
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
        onChange={onChange}
        errors={errors}
        formValues={formValues}
      />
    </>
  )
}

export { TextInputSettings }
