import { render, screen } from '@testing-library/react'
import { Provider } from '../components/ui/provider'
import { SingleField } from '../components/EditorPage/SingleField'

describe('Single Field', () => {
  it('shows single field', () => {
    render(
      <Provider>
        <SingleField
          field={{ id: '1', type: 'type', required: false, name: 'name' }}
        />
      </Provider>
    )
    expect(screen.getByRole('button', { name: /name/i })).toBeInTheDocument()
  })
})
