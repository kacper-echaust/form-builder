import { useContext } from 'react'
import type { CanvasFieldsType } from '../types'
import type { Active } from '@dnd-kit/core'
import { CanvasFieldsContext } from '../context/CanvasFieldsContext'

const useCanvasFields = () => {
  const { setCanvasFields, canvasFields, setError } =
    useContext(CanvasFieldsContext)
  const handleAddFieldToCanvas = (active: Active) => {
    const isEditField = canvasFields.find((field) => field.isEdit === true)
    if (isEditField)
      return setError(
        'You can’t add a new field until the previous one is completed.'
      )
    const field = active.data.current as CanvasFieldsType | undefined
    if (!field) return console.log('Nie udało się')
    setCanvasFields((prev) => [
      ...prev,
      { ...field, uid: crypto.randomUUID(), isEdit: true, isNew: true },
    ])
  }

  return { handleAddFieldToCanvas }
}

export { useCanvasFields }
