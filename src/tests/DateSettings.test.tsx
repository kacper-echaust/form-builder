import { render, screen } from '@testing-library/react'
import { DateSettings } from '../components/EditorPage/Inspector/DateSettings'
import { Provider } from '../components/ui/provider'
import userEvent from '@testing-library/user-event'

describe('DateSettings', () => {
  const mockOnChange = vi.fn()
  const Wrapper = ({
    fromTo = false,
    errorFrom,
    errorTo,
  }: {
    fromTo?: boolean
    errorFrom?: string
    errorTo?: string
  }) => {
    return (
      <Provider>
        <DateSettings
          onChange={mockOnChange}
          formValues={{ label: '', required: false, fromTo: fromTo }}
          errors={{ from: errorFrom, to: errorTo }}
        />
      </Provider>
    )
  }
  it('render', () => {
    render(<Wrapper />)

    expect(screen.getByLabelText(/from to/i)).toBeInTheDocument()
  })
  it('does not render date inputs when checkbox is not checked', () => {
    render(<Wrapper fromTo={false} />)

    expect(
      screen.queryByLabelText('From', { exact: true })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText('To', { exact: true })
    ).not.toBeInTheDocument()
  })
  it('shows date inputs when fromTo is true', () => {
    render(<Wrapper fromTo={true} />)

    expect(screen.getByLabelText('From', { exact: true })).toBeInTheDocument()
    expect(screen.getByLabelText('To', { exact: true })).toBeInTheDocument()
  })
  it('calls onChange when date inputs change', async () => {
    render(<Wrapper fromTo={true} />)

    const user = userEvent.setup()

    const fromInput = screen.getByLabelText('From', { exact: true })
    const toInput = screen.getByLabelText('To', { exact: true })

    await user.type(fromInput, '2026-02-25')
    expect(mockOnChange).toHaveBeenCalledWith('from', '2026-02-25')
    await user.type(toInput, '2026-02-26')
    expect(mockOnChange).toHaveBeenCalledWith('to', '2026-02-26')
  })
  it('shows errors if provided', () => {
    render(
      <Wrapper
        fromTo={true}
        errorTo={'Invalid To'}
        errorFrom={'Invalid From'}
      />
    )

    expect(screen.getByText(/invalid to/i)).toBeInTheDocument()
    expect(screen.getByText(/invalid from/i)).toBeInTheDocument()
  })
})
