import { Field, Input, Checkbox } from '@chakra-ui/react'

type Props = {
  onChange: (field: string, value: string | boolean) => void
  formValues: {
    label: string
    required: boolean
  }
}

const DefaultInputs = ({ onChange, formValues }: Props) => {
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
