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
}
export type FormType = {
  label: string
  placeholder?: string | undefined
  required: boolean
  minLength?: string
  maxLength?: string
  options?: SelectOption[]
  fromTo?: DateOption
}
export type FieldSettings = {
  onChange: (field: string, value: FieldValue) => void
  formValues: FormType
  errors: FormErrors
}
export type SelectOption = {
  id: string
  optionName: string
}

export type FieldValue = string | boolean | SelectOption[] | DateOption

type DateOption = {
  from: string
  to: string
}
export type FormErrors = Partial<Record<keyof FormType, string>>
