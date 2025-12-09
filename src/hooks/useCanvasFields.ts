import { useContext } from 'react'
import type { CanvasFieldsType } from '../types'
import type { Active } from '@dnd-kit/core'
import { CanvasFieldsContext } from '../context/CanvasFieldsContext'

const useCanvasFields = () => {
  const { setCanvasFields } = useContext(CanvasFieldsContext)
  const handleAddFieldToCanvas = (active: Active) => {
    const field = active.data.current as CanvasFieldsType | undefined
    if (!field) return console.log('Nie udało się')
    setCanvasFields((prev) => [...prev, { ...field, uid: crypto.randomUUID() }])
  }

  return { handleAddFieldToCanvas }
}

export { useCanvasFields }
