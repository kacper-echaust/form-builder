import { Checkbox, Field, Input } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'
import { useState, type ChangeEvent } from 'react'

const DateSettings = ({ onChange, formValues, errors }: FieldSettings) => {
  const { fromTo } = formValues
  const [isChecked, setIsChecked] = useState(fromTo ? true : false)

  const handleChange = (name: string, e: ChangeEvent<HTMLInputElement>) => {
    if (!isChecked) return
    const dateNow = new Date().toISOString().slice(0, 10)
    const updated = { from: fromTo?.from || dateNow, to: fromTo?.to || dateNow }
    onChange('fromTo', { ...updated, [name]: e.target.value })
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
