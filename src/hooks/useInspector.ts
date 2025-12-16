import { useContext, useEffect, useState } from 'react'
import type { FieldValue, FormType } from '../types'
import { CanvasFieldsContext } from '../context/CanvasFieldsContext'

const useInspector = () => {
  const { setCanvasFields, canvasFields } = useContext(CanvasFieldsContext)
  const editField = canvasFields.find((field) => field.isEdit === true)

  const [form, setForm] = useState<FormType>({
    label: editField?.label || '',
    required: editField?.required || false,
  })
  useEffect(() => {
    setForm((prev) => {
      return { ...prev, ...editField }
    })
  }, [editField])

  const handleChange = (field: string, value: FieldValue) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAcceptEdit = () => {
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
    setForm({
      label: '',
      required: false,
    })
  }
  const handleCancelEdit = () => {
    setCanvasFields((prev) => {
      return prev.map((field) =>
        field.isEdit === true ? { ...field, isEdit: false } : field
      )
    })
  }

  return {
    form,
    handleChange,
    handleAcceptEdit,
    handleCancelEdit,
    editField,
  }
}

export { useInspector }
