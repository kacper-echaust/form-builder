import { Button } from '@chakra-ui/react'
import { useContext, type SetStateAction } from 'react'
import { CanvasFieldsContext } from '../context/CanvasFieldsContext'

type Props = {
  setPreview: React.Dispatch<SetStateAction<boolean>>
  preview: boolean
}

const PreviewButton = ({ setPreview, preview }: Props) => {
  const { setError, canvasFields } = useContext(CanvasFieldsContext)
  const isEdit = canvasFields.find((field) => field.isEdit)

  const TogglePreview = () => {
    if (isEdit)
      return setError(
        'The preview is unavailable while the field is in edit mode.'
      )
    if (canvasFields.length === 0) {
      return setError('Form is empty.')
    }

    setPreview(!preview)
  }
  return (
    <Button onClick={TogglePreview} position="absolute" top={5} left={5}>
      {preview ? 'Go to edit' : 'Live preview'}
    </Button>
  )
}

export { PreviewButton }
