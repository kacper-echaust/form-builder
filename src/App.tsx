import { useState } from 'react'
import { EditorPage } from './components/EditorPage/EditorPage'
import { FormPreview } from './components/FormPreview/FormPreview'
import { CanvasFieldsProvider } from './context/CanvasFieldsContext'
import { Button } from '@chakra-ui/react'

const App = () => {
  const [preview, setPreview] = useState(false)
  return (
    <CanvasFieldsProvider>
      <Button
        onClick={() => setPreview(!preview)}
        position="absolute"
        top={5}
        left={5}
      >
        {preview ? 'Go to edit' : 'Live preview'}
      </Button>
      {!preview ? <EditorPage /> : <FormPreview />}
    </CanvasFieldsProvider>
  )
}

export { App }
