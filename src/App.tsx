import { useState } from 'react'
import { EditorPage } from './components/EditorPage/EditorPage'
import { FormPreview } from './components/FormPreview/FormPreview'
import { CanvasFieldsProvider } from './context/CanvasFieldsContext'
import { PreviewButton } from './components/PreviewButton'

const App = () => {
  const [preview, setPreview] = useState(false)

  return (
    <CanvasFieldsProvider>
      <PreviewButton setPreview={setPreview} preview={preview} />
      {!preview ? <EditorPage /> : <FormPreview />}
    </CanvasFieldsProvider>
  )
}

export { App }
