import { Checkbox, Field, Input } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'

const DateSettings = ({ onChange, formValues, errors }: FieldSettings) => {
  const { fromTo, from, to } = formValues
  return (
    <>
      <Checkbox.Root
        checked={fromTo}
        onCheckedChange={({ checked }) => onChange('fromTo', checked)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>From to ?</Checkbox.Label>
      </Checkbox.Root>
      {fromTo && (
        <>
          <Field.Root invalid={!!errors.from}>
            <Field.Label>From</Field.Label>
            <Input
              type="date"
              value={from?.toString() ?? ''}
              onChange={(e) => onChange('from', e.target.value)}
            />
            <Field.ErrorText>{errors.from}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.to}>
            <Field.Label>To</Field.Label>
            <Input
              type="date"
              value={to?.toString() ?? ''}
              onChange={(e) => onChange('to', e.target.value)}
            />
            <Field.ErrorText>{errors.to}</Field.ErrorText>
          </Field.Root>
        </>
      )}
    </>
  )
}

export { DateSettings }
