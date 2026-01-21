import { useContext, useEffect } from 'react'
import { CanvasFieldsContext } from '../context/CanvasFieldsContext'
import type { FormType, UseFormType } from '../types'

const useInspector = (formApi: UseFormType) => {
  const { form, handleSubmitForm, handleResetForm, setForm } = formApi
  const { setCanvasFields, canvasFields, setError } =
    useContext(CanvasFieldsContext)
  const editField = canvasFields.find((field) => field.isEdit === true)
  useEffect(() => {
    if (editField) {
      const fields: FormType = {
        label: editField.label || '',
        required: editField.required || false,
      }
      switch (editField.type) {
        case 'text':
          fields.placeholder = editField.placeholder || ''
          fields.maxLength = editField.maxLength || '0'
          fields.minLength = editField.minLength || '0'
          break
        case 'textarea':
          fields.placeholder = editField.placeholder || ''
          fields.maxLength = editField.maxLength || '0'
          fields.minLength = editField.minLength || '0'
          break
        case 'number':
          fields.placeholder = editField.placeholder || ''
          break
        case 'select':
          fields.placeholder = editField.placeholder || ''
          fields.selectOptions = editField.selectOptions || []
          break
        case 'date':
          fields.fromTo = editField.fromTo || false
          fields.from = editField.from || undefined
          fields.to = editField.to || undefined
          break
        case 'radio':
          fields.radioOptions = editField.radioOptions || []
          break
      }
      setForm(fields)
    }
  }, [editField])
  const handleEdit = (uid: string) => {
    setCanvasFields((prev) => {
      return prev.map((field) =>
        field.uid === uid
          ? { ...field, isEdit: true }
          : { ...field, isEdit: false }
      )
    })
  }
  const handleAcceptEdit = () => {
    if (!handleSubmitForm()) return
    const sameLabel = canvasFields.filter(
      (field) => field.label == form.label && field.uid !== editField?.uid
    )
    if (sameLabel.length > 0) return setError('This label already exists.')
    setCanvasFields((prev) => {
      return prev.map((field) =>
        field.isEdit === true
          ? {
              ...field,
              ...form,
              isEdit: false,
              isNew: false,
            }
          : field
      )
    })
    handleResetForm()
  }
  const handleCancelEdit = () => {
    setCanvasFields((prev) => {
      return prev.map((field) =>
        field.isEdit === true ? { ...field, isEdit: false } : field
      )
    })
    handleResetForm()
  }

  return {
    handleAcceptEdit,
    handleCancelEdit,
    editField,
    handleEdit,
  }
}

export { useInspector }
