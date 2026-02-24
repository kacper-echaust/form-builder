import { render, screen } from '@testing-library/react'
import { Provider } from '../components/ui/provider'
import { MaxMinLength } from '../components/EditorPage/Inspector/MaxMinLength'
import userEvent from '@testing-library/user-event'

describe('MaxMinLength', () => {
  const mockOnChange = vi.fn()
  const Wrapper = () => {
    return (
      <Provider>
        <MaxMinLength
          onChange={mockOnChange}
          errors={{ minLength: 'some min error', maxLength: 'some max error' }}
          formValues={{
            label: '',
            required: false,
            maxLength: '',
            minLength: '',
          }}
        />
      </Provider>
    )
  }

  it('render', () => {
    render(<Wrapper />)

    expect(screen.getByLabelText(/min characters/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/max characters/i)).toBeInTheDocument()
  })
  it('shows error', () => {
    render(<Wrapper />)

    expect(screen.getByText(/some min error/i)).toBeInTheDocument()
    expect(screen.getByText(/some max error/i)).toBeInTheDocument()
  })
  it('calls onChange when min value changes', async () => {
    render(<Wrapper />)

    const user = userEvent.setup()
    const minInput = screen.getByLabelText(/min characters/i)

    await user.clear(minInput)
    await user.type(minInput, '1')

    expect(mockOnChange).toHaveBeenCalledWith('minLength', '1')
  })
})
