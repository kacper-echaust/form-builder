import { render, screen } from '@testing-library/react'
import { Provider } from '../components/ui/provider'
import { DefaultInputs } from '../components/EditorPage/Inspector/DefaultInputs'
import userEvent from '@testing-library/user-event'

describe('DefaultInputs', () => {
  const mockOnChange = vi.fn()
  const Wrapper = ({ errors = {} }) => {
    return (
      <Provider>
        <DefaultInputs
          onChange={mockOnChange}
          formValues={{ label: '', required: false }}
          errors={errors}
        />
      </Provider>
    )
  }

  it('shows label and required fields', () => {
    render(<Wrapper />)

    expect(screen.getByLabelText(/label/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/required/i)).toBeInTheDocument()
  })
  it('shows errors if provided', () => {
    render(<Wrapper errors={{ label: 'Label is required' }} />)

    expect(screen.getByText(/label is required/i)).toBeInTheDocument()
  })
  it('calls onChange when label input is change', async () => {
    render(<Wrapper />)

    const user = userEvent.setup()
    const labelInput = screen.getByLabelText(/label/i)

    await user.type(labelInput, '1')

    expect(mockOnChange).toHaveBeenCalledWith('label', '1')
  })
  it('calls onChange when required checkbox is change', async () => {
    render(<Wrapper />)

    const user = userEvent.setup()
    const checkbox = screen.getByLabelText(/required/i)

    await user.click(checkbox)

    expect(mockOnChange).toHaveBeenCalledWith('required', true)
  })
})
