import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from '../components/ui/provider'
import { useState } from 'react'
import { RadioSettings } from '../components/EditorPage/Inspector/RadioSettings'

describe('radioOptions', () => {
  const Wrapper = () => {
    const [values, setValues] = useState({
      placeholder: '',
      required: false,
      label: '',
      radioOptions: [],
    })
    return (
      <Provider>
        <RadioSettings
          onChange={(key, value) => {
            setValues((prev) => ({
              ...prev,
              [key]: value,
            }))
          }}
          formValues={values}
          errors={{}}
        />
      </Provider>
    )
  }
  it('render', () => {
    render(<Wrapper />)

    expect(screen.getByText(/options/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /add option/i })
    ).toBeInTheDocument()
  })
  it('adds new option', async () => {
    render(<Wrapper />)

    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /add option/i })

    await user.click(button)

    expect(screen.getByDisplayValue(/add some option/i)).toBeInTheDocument()
  })
  it('user can rename option', async () => {
    render(<Wrapper />)

    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /add option/i })

    await user.click(button)

    const input = await screen.findByDisplayValue(/add some option/i)

    await user.clear(input)
    await user.type(input, 'new value')

    expect(input).toHaveDisplayValue(/new value/i)
  })
  it('user can delete option', async () => {
    render(<Wrapper />)

    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /add option/i })

    await user.click(button)

    const deleteButton = screen.getByLabelText(/delete option/i)

    await user.click(deleteButton)

    expect(
      screen.queryByDisplayValue(/add some option/i)
    ).not.toBeInTheDocument()
  })
  it('user does not add more than 9 options', async () => {
    render(<Wrapper />)

    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /add option/i })

    for (let i = 0; i < 10; i++) {
      await user.click(button)
    }

    expect(screen.getAllByDisplayValue(/add some option/i)).toHaveLength(9)
  })
  it('shows radioOptions error', () => {
    render(
      <Provider>
        <RadioSettings
          onChange={vi.fn()}
          formValues={{ placeholder: '', label: '', required: false }}
          errors={{ radioOptions: 'Some error' }}
        />
      </Provider>
    )
    expect(screen.getByText(/some error/i)).toBeInTheDocument()
  })
})
