import { Field, Input, Checkbox } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'

const DefaultInputs = ({ onChange, formValues }: FieldSettings) => {
  const { label, required } = formValues
  return (
    <>
      <Field.Root>
        <Field.Label>Label</Field.Label>
        <Input
          value={label}
          name="label"
          onChange={(e) => {
            onChange('label', e.target.value)
          }}
        />
      </Field.Root>

      <Checkbox.Root
        name="required"
        checked={required}
        onCheckedChange={({ checked }) => {
          onChange('required', checked)
        }}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Required</Checkbox.Label>
      </Checkbox.Root>
    </>
  )
}

export { DefaultInputs }
