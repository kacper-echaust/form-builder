import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { CanvasFieldsType } from '../types'

type CanvasFieldsContextType = {
  canvasFields: CanvasFieldsType[]
  setCanvasFields: React.Dispatch<React.SetStateAction<CanvasFieldsType[]>>
  isEditField: boolean
  setIsEditField: React.Dispatch<React.SetStateAction<boolean>>
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
}

const CanvasFieldsContext = createContext<CanvasFieldsContextType>({
  canvasFields: [],
  setCanvasFields: () => {},
  isEditField: false,
  setIsEditField: () => {},
  error: '',
  setError: () => {},
})

const CanvasFieldsProvider = ({ children }: { children: ReactNode }) => {
  const [canvasFields, setCanvasFields] = useState<CanvasFieldsType[]>([])
  const [isEditField, setIsEditField] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!error) return

    const timer = setTimeout(() => {
      setError('')
    }, 6000)

    return () => clearTimeout(timer)
  }, [error])

  return (
    <CanvasFieldsContext.Provider
      value={{
        canvasFields,
        setCanvasFields,
        isEditField,
        setIsEditField,
        error,
        setError,
      }}
    >
      {children}
    </CanvasFieldsContext.Provider>
  )
}

export { CanvasFieldsProvider, CanvasFieldsContext }
