import { useContext, useEffect } from 'react'
import { CanvasFieldsContext } from '../context/CanvasFieldsContext'
import type { FormType, UseFormType } from '../types'

const useInspector = (formApi: UseFormType) => {
  const { form, handleSubmitForm, handleResetForm, setForm } = formApi
  const { setCanvasFields, canvasFields } = useContext(CanvasFieldsContext)

  const editField = canvasFields.find((field) => field.isEdit === true)

  useEffect(() => {
    if (editField) {
      const fields: FormType = {
        label: editField.label || '',
        required: editField.required || false,
      }
      switch (editField.type) {
        case 'text':
        case 'textarea':
        case 'number':
          fields.placeholder = editField.placeholder || ''
          fields.minLength = editField.minLength || '1'
          fields.maxLength = editField.maxLength || '1'
          break
        case 'select':
          fields.placeholder = editField.placeholder || ''
          fields.options = editField.options
          break
        case 'date':
          fields.fromTo = editField.fromTo
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
    console.log('accept')
    setCanvasFields((prev) => {
      return prev.map((field) =>
        field.isEdit === true
          ? {
              ...field,
              ...form,
              isEdit: false,
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
