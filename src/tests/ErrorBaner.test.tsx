import { render, screen } from '@testing-library/react'
import { ErrorBaner } from '../components/ErrorBaner'
import { Provider } from '../components/ui/provider'

describe('Error Baner', () => {
  it('shows error baner', () => {
    render(
      <Provider>
        <ErrorBaner error="Some error" />
      </Provider>
    )

    expect(screen.getByText(/some error/i)).toBeInTheDocument()
  })
})
