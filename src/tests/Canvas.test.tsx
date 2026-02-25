import { render, screen } from '@testing-library/react'
import { Canvas } from '../components/EditorPage/Canvas'
import { Provider } from '../components/ui/provider'
import { CanvasFieldsContext } from '../context/CanvasFieldsContext'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

describe('Canvas', () => {
  const mockSetError = vi.fn()
  const Wrapper = ({
    firstIsNew,
    secondIsNew,
  }: {
    firstIsNew: boolean
    secondIsNew: boolean
  }) => {
    const [fields, setFields] = useState([
      {
        id: '1',
        name: 'name',
        type: 'type',
        uid: '123',
        label: 'label',
        required: false,
        isNew: firstIsNew,
        isEdit: false,
      },
      {
        id: '12',
        name: 'Text box',
        type: 'textbox',
        uid: '1232',
        label: 'label2',
        required: false,
        isNew: secondIsNew,
        isEdit: false,
      },
    ])
    const mockContext = {
      canvasFields: fields,
      setCanvasFields: setFields,
      isEditField: false,
      setIsEditField: vi.fn(),
      error: '',
      setError: mockSetError,
    }
    return (
      <Provider>
        <CanvasFieldsContext.Provider value={mockContext}>
          <Canvas />
        </CanvasFieldsContext.Provider>
      </Provider>
    )
  }

  it('render', () => {
    render(<Wrapper firstIsNew={false} secondIsNew={false} />)

    expect(screen.getByText(/name/i)).toBeInTheDocument()
  })
  it('shows action icons when field is clicked', async () => {
    render(<Wrapper firstIsNew={false} secondIsNew={false} />)

    const field = screen.getByText(/name/i)
    const user = userEvent.setup()

    await user.click(field)

    expect(await screen.findByLabelText(/trash/i)).toBeInTheDocument()
    expect(await screen.findByLabelText(/draw/i)).toBeInTheDocument()
  })
  it('removes field when delete is clicked', async () => {
    render(<Wrapper firstIsNew={false} secondIsNew={false} />)

    const field = screen.getByText(/name/i)
    const user = userEvent.setup()

    await user.click(field)
    const trash = await screen.findByLabelText(/trash/i)
    expect(trash).toBeInTheDocument()

    await user.click(trash)
    expect(screen.queryByText(/name/i)).not.toBeInTheDocument()
  })
  it('shows error when new field is editing', async () => {
    render(<Wrapper firstIsNew={false} secondIsNew={true} />)

    const field1 = screen.getByText(/name/i)
    const field2 = screen.getByText(/text box/i)
    const user = userEvent.setup()

    await user.click(field1)
    await user.click(field2)

    expect(mockSetError).toHaveBeenCalledTimes(1)
  })
})
