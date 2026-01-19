import type { Dispatch, SetStateAction } from 'react'

export type Field = {
  id: string
  type: string
  required: boolean
  name: string
}
export type CanvasFieldsType = FormType & {
  id: string
  name: string
  type: string
  uid: string
  isEdit: boolean
  isNew: boolean
}
export type FormType = {
  label: string
  placeholder?: string | ''
  required: boolean
  minLength?: string
  maxLength?: string
  selectOptions?: Option[]
  fromTo?: boolean
  from?: Date
  to?: Date
  radioOptions?: Option[]
}
export type FieldSettings = {
  onChange: (field: string, value: FieldValue) => void
  formValues: FormType
  errors: FormErrors
}
export type Option = {
  id: string
  value: string
}

export type FieldValue = string | boolean | Option[] | Date

export type FormErrors = Partial<{
  label?: string
  placeholder?: string
  required?: string
  minLength?: string
  maxLength?: string
  selectOptions?: string
  from?: string
  to?: string
  radioOptions?: string
}>

export type UseFormType = {
  handleChangeForm: (field: string, value: FieldValue) => void
  form: FormType
  errors: FormErrors
  handleResetForm: () => void
  handleSubmitForm: () => boolean
  setForm: Dispatch<SetStateAction<FormType>>
}
