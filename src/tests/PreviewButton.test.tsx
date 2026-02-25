import { render, screen } from '@testing-library/react'
import { PreviewButton } from '../components/PreviewButton'
import { Provider } from '../components/ui/provider'
import { userEvent } from '@testing-library/user-event'
import { useState } from 'react'
import { CanvasFieldsContext } from '../context/CanvasFieldsContext'
import type { CanvasFieldsType } from '../types'
import { ErrorBaner } from '../components/ErrorBaner'

describe('PreviewButton', () => {
  const Wrapper = ({ fields }: { fields: CanvasFieldsType[] }) => {
    const [preview, setPreview] = useState(false)
    const [error, setError] = useState('')
    const mockContext = {
      canvasFields: fields,
      setCanvasFields: vi.fn(),
      isEditField: false,
      setIsEditField: vi.fn(),
      error: error,
      setError: setError,
    }
    return (
      <Provider>
        <CanvasFieldsContext.Provider value={mockContext}>
          <PreviewButton setPreview={setPreview} preview={preview} />
          <ErrorBaner error={error} />
        </CanvasFieldsContext.Provider>
      </Provider>
    )
  }
  const defaultField = {
    id: '1',
    name: 'name',
    type: 'type',
    uid: '123',
    label: 'label',
    required: false,
  }
  const user = userEvent.setup()

  it('toggles preview text', async () => {
    render(
      <Wrapper
        fields={[
          {
            ...defaultField,
            isNew: false,
            isEdit: false,
          },
        ]}
      />
    )
    const button = screen.getByRole('button', { name: /live preview/i })

    await user.click(button)

    expect(
      screen.getByRole('button', { name: /go to edit/i })
    ).toBeInTheDocument()
  })
  it('cannot go to preview when fields array is empty', async () => {
    render(<Wrapper fields={[]} />)

    const button = screen.getByRole('button', { name: /live preview/i })

    await user.click(button)

    expect(screen.getByText(/form is empty/i)).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /go to edit/i })
    ).not.toBeInTheDocument()
  })
  it('cannot go to preview when field is editing', async () => {
    render(
      <Wrapper fields={[{ ...defaultField, isNew: false, isEdit: true }]} />
    )

    const button = screen.getByRole('button', { name: /live preview/i })

    await user.click(button)

    expect(
      screen.getByText(
        /the preview is unavailable while the field is in edit mode/i
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /go to edit/i })
    ).not.toBeInTheDocument()
  })
})
