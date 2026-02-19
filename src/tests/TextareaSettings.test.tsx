import { render, screen } from '@testing-library/react'
import { Provider } from '../components/ui/provider'
import userEvent from '@testing-library/user-event'
import { TextareaSettings } from '../components/EditorPage/Inspector/TextareaSettings'

describe('TextareaSettings', () => {
  const mockOnChange = vi.fn()
  const Wrapper = ({ error }: { error?: string }) => {
    const mockFormValues = {
      label: '',
      required: false,
    }
    const mockErrors = {
      placeholder: error || '',
    }
    return (
      <Provider>
        <TextareaSettings
          onChange={mockOnChange}
          formValues={mockFormValues}
          errors={mockErrors}
        />
      </Provider>
    )
  }
  it('render', () => {
    render(<Wrapper />)

    expect(screen.getByLabelText(/placeholder/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/min characters/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/max characters/i)).toBeInTheDocument()
  })
  it('shows error when exist', () => {
    render(<Wrapper error="some error" />)

    expect(screen.getByText(/some error/i)).toBeInTheDocument()
  })
  it('user can type in input', async () => {
    render(<Wrapper />)

    const user = userEvent.setup()
    const input = screen.getByLabelText(/placeholder/i)

    await user.type(input, 'value')

    expect(mockOnChange).toHaveBeenCalled()
  })
})
