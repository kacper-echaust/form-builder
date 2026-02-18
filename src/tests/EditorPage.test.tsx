import { render, screen } from '@testing-library/react'
import { Provider } from '../components/ui/provider'
import { EditorPage } from '../components/EditorPage/EditorPage'
import { CanvasFieldsContext } from '../context/CanvasFieldsContext'

describe('Editor Page', () => {
  const Wrapper = ({ error }: { error?: string }) => {
    const mockContext = {
      canvasFields: [],
      setCanvasFields: vi.fn(),
      isEditField: false,
      setIsEditField: vi.fn(),
      error: error || '',
      setError: vi.fn(),
    }
    return (
      <Provider>
        <CanvasFieldsContext.Provider value={mockContext}>
          <EditorPage />
        </CanvasFieldsContext.Provider>
      </Provider>
    )
  }
  it('render all components', () => {
    render(<Wrapper />)
    expect(screen.getByText(/form fields/i)).toBeInTheDocument()
    expect(screen.getByText(/canvas/i)).toBeInTheDocument()
    expect(screen.getByText(/inspector fields/i)).toBeInTheDocument()
  })
  it('shows error', () => {
    render(<Wrapper error="some error" />)

    expect(screen.getByText(/some error/i)).toBeInTheDocument()
  })
})
