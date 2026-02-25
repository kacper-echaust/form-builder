import { act, render, screen } from '@testing-library/react'
import { FormPreview } from '../components/FormPreview/FormPreview'
import { Provider } from '../components/ui/provider'
import { CanvasFieldsContext } from '../context/CanvasFieldsContext'

describe('Form preview', () => {
  const Wrapper = ({ type, fromTo }: { type: string; fromTo?: boolean }) => {
    const defaultField = {
      id: '1',
      isEdit: false,
      isNew: false,
      label: 'some label',
      name: 'some name',
      placeholder: 'some placeholder',
      required: true,
      type: type,
      uid: '1a',
      fromTo: fromTo,
    }

    const mockContext = {
      canvasFields: [defaultField],
      setCanvasFields: vi.fn(),
      isEditField: false,
      setIsEditField: vi.fn(),
      error: '',
      setError: vi.fn(),
    }

    return (
      <Provider>
        <CanvasFieldsContext.Provider value={mockContext}>
          <FormPreview />
        </CanvasFieldsContext.Provider>
      </Provider>
    )
  }

  it('shows text input', () => {
    render(<Wrapper type="text" />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
  it('shows checkbox', () => {
    render(<Wrapper type="checkbox" />)

    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })
  it('shows textarea', () => {
    render(<Wrapper type="textarea" />)

    expect(screen.getByLabelText(/some label/i)).toBeInTheDocument()
  })
  it('shows radio', async () => {
    await act(async () => {
      render(<Wrapper type="radio" />)
    })

    expect(screen.getByLabelText(/some label/i)).toBeInTheDocument()
  })
  it('shows select', () => {
    render(<Wrapper type="select" />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
  it('shows date', () => {
    const { rerender } = render(<Wrapper type="date" fromTo={false} />)

    expect(document.querySelectorAll('input[type="date"]')).toHaveLength(1)

    rerender(<Wrapper type="date" fromTo={true} />)

    expect(document.querySelectorAll('input[type="date"]')).toHaveLength(2)
  })
  it('shows number', () => {
    render(<Wrapper type="number" />)

    expect(screen.getByLabelText(/some label/i)).toBeInTheDocument()
  })
})
