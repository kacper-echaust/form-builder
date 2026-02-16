import { render, screen } from '@testing-library/react'
import { SideBar } from '../components/EditorPage/SideBar'
import { Provider } from '../components/ui/provider'

describe('Side Bar', () => {
  it('renders the sidebar title', () => {
    render(
      <Provider>
        <SideBar />
      </Provider>
    )

    expect(screen.getByText(/form fields/i)).toBeInTheDocument()
  })
  it('renders all from fields', () => {
    render(
      <Provider>
        <SideBar />
      </Provider>
    )

    expect(
      screen.getByRole('button', { name: /text input/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /textarea/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /checkbox/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /radio/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /select/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /date/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /number/i })).toBeInTheDocument()
  })
})
