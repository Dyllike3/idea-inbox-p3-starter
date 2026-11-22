import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Idea Inbox starter', () => {
  it('shows the application heading and four starter ideas', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Idea Inbox' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
    expect(screen.getByText('API response explorer')).toBeInTheDocument()
  })
})
