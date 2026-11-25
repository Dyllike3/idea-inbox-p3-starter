import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

function visibleTitles() {
  return screen.queryAllByRole('listitem').map((item) => item.querySelector('h3')?.textContent)
}

function search(text: string) {
  fireEvent.change(screen.getByRole('searchbox', { name: 'Search ideas' }), {
    target: { value: text },
  })
}

describe('Idea Inbox starter', () => {
  it('shows the application heading and four starter ideas', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Idea Inbox' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
    expect(screen.getByText('API response explorer')).toBeInTheDocument()
  })
})

describe('AC1 — keyword search', () => {
  it('renders a labeled search input that starts empty', () => {
    render(<App />)

    expect(screen.getByRole('searchbox', { name: 'Search ideas' })).toHaveValue('')
  })

  it('keeps only ideas whose title matches as the user types', () => {
    render(<App />)

    search('quiz')

    expect(visibleTitles()).toEqual(['Retrieval practice quiz'])
  })

  it('matches idea notes case-insensitively', () => {
    render(<App />)

    search('json')
    expect(visibleTitles()).toEqual(['API response explorer'])

    search('JSON')
    expect(visibleTitles()).toEqual(['API response explorer'])
  })

  it('returns every idea whose title or notes contain the keyword', () => {
    render(<App />)

    search('PLAN')

    expect(visibleTitles()).toEqual(['Desk setup checklist', 'Reading sprint routine'])
  })

  it('ignores leading and trailing whitespace in the query', () => {
    render(<App />)

    search('   quiz  ')

    expect(visibleTitles()).toEqual(['Retrieval practice quiz'])
  })

  it('shows all ideas again when the query is cleared or only whitespace', () => {
    render(<App />)

    search('quiz')
    search('')
    expect(screen.getAllByRole('listitem')).toHaveLength(4)

    search('    ')
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })
})

describe('AC2 — result count and empty state', () => {
  function resultCount() {
    return screen.getByRole('status')
  }

  it('shows the total count of visible ideas initially', () => {
    render(<App />)

    expect(resultCount()).toHaveTextContent('4 ideas')
  })

  it('uses the singular form when exactly one idea matches', () => {
    render(<App />)

    search('quiz')

    expect(resultCount()).toHaveTextContent('1 idea')
    expect(resultCount()).not.toHaveTextContent('1 ideas')
  })

  it('updates the count to the number of filtered ideas', () => {
    render(<App />)

    search('plan')

    expect(resultCount()).toHaveTextContent('2 ideas')
  })

  it('shows an empty state and zero count when nothing matches', () => {
    render(<App />)

    search('xyz-no-match')

    expect(screen.getByText('No matching ideas.')).toBeInTheDocument()
    expect(resultCount()).toHaveTextContent('0 ideas')
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('hides the empty state again when the query matches ideas', () => {
    render(<App />)

    search('xyz-no-match')
    search('')

    expect(screen.queryByText('No matching ideas.')).not.toBeInTheDocument()
    expect(resultCount()).toHaveTextContent('4 ideas')
  })
})

describe('AC3 — category filter', () => {
  function chooseCategory(category: string) {
    fireEvent.change(screen.getByRole('combobox', { name: 'Category' }), {
      target: { value: category },
    })
  }

  it('renders an accessible category dropdown that defaults to All', () => {
    render(<App />)

    const select = screen.getByRole('combobox', { name: 'Category' })
    expect(select).toHaveValue('All')
    expect(
      screen.getAllByRole('option').map((option) => option.textContent),
    ).toEqual(['All', 'Study', 'Software', 'Personal'])
  })

  it('shows only ideas in the chosen category', () => {
    render(<App />)

    chooseCategory('Study')
    expect(visibleTitles()).toEqual(['Retrieval practice quiz', 'Reading sprint routine'])
    expect(screen.getByRole('status')).toHaveTextContent('2 ideas')

    chooseCategory('Personal')
    expect(visibleTitles()).toEqual(['Desk setup checklist'])
    expect(screen.getByRole('status')).toHaveTextContent('1 idea')
  })

  it('combines the category with the keyword using AND', () => {
    render(<App />)

    search('plan')
    chooseCategory('Study')

    expect(visibleTitles()).toEqual(['Reading sprint routine'])
  })

  it('removes only the category restriction when All is selected again', () => {
    render(<App />)

    search('plan')
    chooseCategory('Study')
    chooseCategory('All')

    expect(screen.getByRole('searchbox', { name: 'Search ideas' })).toHaveValue('plan')
    expect(visibleTitles()).toEqual(['Desk setup checklist', 'Reading sprint routine'])
  })

  it('shows the empty state when category and keyword have no overlap', () => {
    render(<App />)

    search('quiz')
    chooseCategory('Software')

    expect(screen.getByText('No matching ideas.')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('0 ideas')
  })
})
