import { createContext, useState, type ReactNode } from 'react'
import type { CanvasFieldsType } from '../types'

type CanvasFieldsContextType = {
  canvasFields: CanvasFieldsType[]
  setCanvasFields: React.Dispatch<React.SetStateAction<CanvasFieldsType[]>>
  isEditField: boolean
  setIsEditField: React.Dispatch<React.SetStateAction<boolean>>
}

const CanvasFieldsContext = createContext<CanvasFieldsContextType>({
  canvasFields: [],
  setCanvasFields: () => {},
  isEditField: false,
  setIsEditField: () => {},
})

const CanvasFieldsProvider = ({ children }: { children: ReactNode }) => {
  const [canvasFields, setCanvasFields] = useState<CanvasFieldsType[]>([])
  const [isEditField, setIsEditField] = useState<boolean>(false)

  return (
    <CanvasFieldsContext.Provider
      value={{ canvasFields, setCanvasFields, isEditField, setIsEditField }}
    >
      {children}
    </CanvasFieldsContext.Provider>
  )
}

export { CanvasFieldsProvider, CanvasFieldsContext }
