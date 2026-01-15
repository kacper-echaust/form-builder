import { Checkbox, Field, Input } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'
import { useState, type ChangeEvent } from 'react'

const DateSettings = ({ onChange, formValues, errors }: FieldSettings) => {
  const { fromTo } = formValues
  const [isChecked, setIsChecked] = useState(fromTo ? true : false)

  const handleChange = (name: string, e: ChangeEvent<HTMLInputElement>) => {
    const dateNow = new Date().toISOString().slice(0, 10)
    onChange('fromTo', {
      from: name === 'from' ? e.target.value : (fromTo?.from ?? dateNow),
      to: name === 'to' ? e.target.value : (fromTo?.to ?? dateNow),
    })
  }

  return (
    <>
      <Checkbox.Root
        checked={isChecked}
        onCheckedChange={() => setIsChecked((prev) => !prev)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>From to ?</Checkbox.Label>
      </Checkbox.Root>
      {isChecked && (
        <>
          <Field.Root invalid={!!errors.fromTo}>
            <Field.Label>From</Field.Label>
            <Input
              type="date"
              onChange={(e) => handleChange('from', e)}
              defaultValue={new Date().toISOString().slice(0, 10)}
            />
            <Field.ErrorText>{errors.fromTo}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.fromTo}>
            <Field.Label>To</Field.Label>
            <Input
              type="date"
              onChange={(e) => handleChange('to', e)}
              defaultValue={new Date().toISOString().slice(0, 10)}
            />
            <Field.ErrorText>{errors.fromTo}</Field.ErrorText>
          </Field.Root>
        </>
      )}
    </>
  )
}

export { DateSettings }
