import { Checkbox, Field, Input } from '@chakra-ui/react'
import type { FieldSettings } from '../../../types'
import { useState, type ChangeEvent } from 'react'

const DateSettings = ({ onChange, formValues }: FieldSettings) => {
  const { fromTo } = formValues
  const [isChecked, setIsChecked] = useState(fromTo ? true : false)

  const handleChange = (name: string, e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const updated = { from: fromTo?.from || '', to: fromTo?.to || '' }
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
          <Field.Root>
            <Field.Label>From</Field.Label>
            <Input type="date" onChange={(e) => handleChange('from', e)} />
          </Field.Root>
          <Field.Root>
            <Field.Label>To</Field.Label>
            <Input type="date" onChange={(e) => handleChange('to', e)} />
          </Field.Root>
        </>
      )}
    </>
  )
}

export { DateSettings }
