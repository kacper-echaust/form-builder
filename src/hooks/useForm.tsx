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
      if (data.from && data.to && data.from >= data.to) {
        newErrors.to =
          'The end date cannot be earlier than or equal the start date.'
      }
      if (!data.from) {
        newErrors.from = 'Date need to be choose'
      }
      if (!data.to) {
        newErrors.to = 'Date need to be choose'
      }
    }
    //Select
    if (data.selectOptions) {
      if (data.selectOptions?.length < 2) {
        newErrors.selectOptions = 'Min 2 options need to be added'
      }
      const hasEmptyValues = Object.values(data.selectOptions).some(
        (option) => option.value === ''
      )
      const selectValues = data.selectOptions.map((option) => option.value)
      const hasDuplicates = new Set(selectValues).size !== selectValues.length
      if (hasDuplicates) {
        newErrors.selectOptions = 'Each option must have a different value'
      }
      if (hasEmptyValues) {
        newErrors.selectOptions = 'Option cannot be empty.'
      }
    }
    //Radio
    if (data.radioOptions) {
      if (data.radioOptions?.length < 2) {
        newErrors.radioOptions = 'Min 2 options need to be added'
      }
      const hasEmptyValues = Object.values(data.radioOptions).some(
        (option) => option.value === ''
      )
      if (hasEmptyValues) {
        newErrors.radioOptions = 'Option cannot be empty.'
      }
      const radioValues = data.radioOptions.map((option) => option.value)
      const hasDuplicates = new Set(radioValues).size !== radioValues.length
      if (hasDuplicates) {
        newErrors.radioOptions = 'Each option must have a different value'
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
