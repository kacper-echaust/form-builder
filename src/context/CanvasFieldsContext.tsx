import { createContext, useState, type ReactNode } from 'react'
import type { CanvasFieldsType } from '../types'

type CanvasFieldsContextType = {
  canvasFields: CanvasFieldsType[]
  setCanvasFields: React.Dispatch<React.SetStateAction<CanvasFieldsType[]>>
}

const CanvasFieldsContext = createContext<CanvasFieldsContextType>({
  canvasFields: [],
  setCanvasFields: () => {},
})

const CanvasFieldsProvider = ({ children }: { children: ReactNode }) => {
  const [canvasFields, setCanvasFields] = useState<CanvasFieldsType[]>([])

  return (
    <CanvasFieldsContext.Provider value={{ canvasFields, setCanvasFields }}>
      {children}
    </CanvasFieldsContext.Provider>
  )
}

export { CanvasFieldsProvider, CanvasFieldsContext }
