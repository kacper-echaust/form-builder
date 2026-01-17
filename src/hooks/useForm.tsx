import { useState } from 'react'
import type { FieldValue, FormErrors, FormType } from '../types'

const useForm = () => {
  const [form, setForm] = useState<FormType>({
    label: '',
    required: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const handleValidateForm = (data: FormType) => {
    const newErrors: FormErrors = {}
    //Label
    if (!data.label.trim() || !data.label) {
      newErrors.label = 'Label is required'
    }
    if (data.label.length > 20) {
      newErrors.label = 'The maximum number of characters is 20'
    }
    if (data.placeholder && data.placeholder.length > 20) {
      newErrors.placeholder = 'The maximum number of characters is 20'
    }
    //Min & max length
    if (data.minLength !== undefined && data.minLength === '') {
      newErrors.minLength = 'Min characters is required'
    }
    if (data.maxLength) {
      if (!data.maxLength) {
        newErrors.maxLength = 'Max characters is required'
      }
    }
    if (
      data.minLength !== undefined &&
      data.maxLength !== undefined &&
      Number(data.minLength) >= Number(data.maxLength)
    ) {
      newErrors.minLength = 'Min cannot be greater than or equal to max'
    }
    //Date
    if (data.fromTo) {
      if (!data.from) {
        newErrors.from = 'Date need to be choose'
      }
      if (!data.to) {
        newErrors.to = 'Date need to be choose'
      }
    }
    //Select
    if (data.options) {
      if (data.options?.length < 2) {
        newErrors.options = 'Min 2 options need to be added'
      }
      const hasEmptyValues = Object.values(data.options).some(
        (value) => value.optionName === ''
      )
      if (hasEmptyValues) {
        newErrors.options = 'Option cannot be empty.'
      }
    }
    setErrors(newErrors)
    return newErrors
  }
  const handleChangeForm = (field: string, value: FieldValue) => {
    const updated = { ...form, [field]: value }
    setForm(updated)
    handleValidateForm(updated)
  }
  const handleResetForm = () => {
    setForm({
      label: '',
      required: false,
    })
    setErrors({})
  }
  const handleSubmitForm = () => {
    const validate = handleValidateForm(form)
    setErrors(validate)
    return Object.keys(validate).length === 0
  }

  return {
    handleChangeForm,
    form,
    errors,
    handleResetForm,
    handleSubmitForm,
    setForm,
  }
}
export { useForm }
