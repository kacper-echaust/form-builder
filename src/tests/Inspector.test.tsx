import { render, screen } from '@testing-library/react'
import { Inspector } from '../components/EditorPage/Inspector/Inspector'
import { Provider } from '../components/ui/provider'
import userEvent from '@testing-library/user-event'

const mockUseInpector = vi.fn()

vi.mock('../hooks/useInspector.ts', () => ({
  useInspector: () => mockUseInpector(),
}))

beforeEach(() => {
  mockUseInpector.mockReturnValue({
    editField: null,
    handleAcceptEdit: vi.fn(),
    handleCancelEdit: vi.fn(),
  })
})

describe('Insepctor', () => {
  it('render Inspector Fields when editField is null', () => {
    mockUseInpector.mockReturnValue({
      editField: null,
    })

    render(
      <Provider>
        <Inspector />
      </Provider>
    )

    expect(screen.getByText(/inspector fields/i)).toBeInTheDocument()
  })
  it('renders SelectSettings when type is select', () => {
    mockUseInpector.mockReturnValue({
      editField: { type: 'select', isNew: false },
    })
    render(
      <Provider>
        <Inspector />
      </Provider>
    )

    expect(screen.getByText(/add option/i)).toBeInTheDocument()
  })
  it('renders TextInputSettings when type is text', () => {
    mockUseInpector.mockReturnValue({
      editField: { type: 'text', isNew: false },
    })

    render(
      <Provider>
        <Inspector />
      </Provider>
    )

    expect(screen.getByLabelText(/placeholder/i)).toBeInTheDocument()
  })
  it('renders TextAreaSettings when type is textarea', () => {
    mockUseInpector.mockReturnValue({
      editField: { type: 'textarea', isNew: false },
    })

    render(
      <Provider>
        <Inspector />
      </Provider>
    )

    expect(screen.getByLabelText(/placeholder/i)).toBeInTheDocument()
  })
  it('renders RadioSettings when type is radio', () => {
    mockUseInpector.mockReturnValue({
      editField: { type: 'radio', isNew: false },
    })

    render(
      <Provider>
        <Inspector />
      </Provider>
    )

    expect(screen.getByText(/add option/i)).toBeInTheDocument()
  })
  it('renders DateSettings when type is date', () => {
    mockUseInpector.mockReturnValue({
      editField: { type: 'date', isNew: false },
    })

    render(
      <Provider>
        <Inspector />
      </Provider>
    )

    expect(screen.getByLabelText(/from/i)).toBeInTheDocument()
  })
  it('renders DefaultInputs when type is checkbox', () => {
    mockUseInpector.mockReturnValue({
      editField: { type: 'checkbox', isNew: false },
    })

    render(
      <Provider>
        <Inspector />
      </Provider>
    )

    expect(screen.getByLabelText(/label/i)).toBeInTheDocument()
  })
  it('renders DefaultInputs when type is number', () => {
    mockUseInpector.mockReturnValue({
      editField: { type: 'number', isNew: false },
    })

    render(
      <Provider>
        <Inspector />
      </Provider>
    )

    expect(screen.getByLabelText(/label/i)).toBeInTheDocument()
  })
  it('renders Accept and Cancel buttons when editField exist', () => {
    mockUseInpector.mockReturnValue({
      editField: { type: 'text', isNew: false },
    })
    render(
      <Provider>
        <Inspector />
      </Provider>
    )
    expect(screen.getByRole('button', { name: /accept/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })
  it('disables Cancel button when field is new', () => {
    mockUseInpector.mockReturnValue({
      editField: { type: 'text', isNew: true },
    })
    render(
      <Provider>
        <Inspector />
      </Provider>
    )
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled()
  })
  it('calls handeAcceptEdit and handleCancelEdit when Accept or Cancel is clicked', async () => {
    const mockAccept = vi.fn()
    const mockCancel = vi.fn()
    mockUseInpector.mockReturnValue({
      editField: { type: 'text', isNew: false },
      handleAcceptEdit: mockAccept,
      handleCancelEdit: mockCancel,
    })
    render(
      <Provider>
        <Inspector />
      </Provider>
    )
    const user = userEvent.setup()
    const acceptButton = screen.getByRole('button', { name: /accept/i })
    const cancelButton = screen.getByRole('button', { name: /cancel/i })

    await user.click(acceptButton)
    await user.click(cancelButton)

    expect(mockAccept).toHaveBeenCalled()
    expect(mockCancel).toHaveBeenCalled()
  })
})
