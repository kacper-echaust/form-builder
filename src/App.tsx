import { EditorPage } from './components/EditorPage/EditorPage'
import { CanvasFieldsProvider } from './context/CanvasFieldsContext'

const App = () => {
  return (
    <CanvasFieldsProvider>
      <EditorPage />
    </CanvasFieldsProvider>
  )
}

export { App }
