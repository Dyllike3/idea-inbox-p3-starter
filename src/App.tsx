import { useState } from 'react'
import { IdeaCard } from './components/IdeaCard'
import { starterIdeas } from './data/ideas'
import { filterIdeas } from './utils/filterIdeas'
import { formatIdeaCount } from './utils/formatIdeaCount'

export default function App() {
  const [query, setQuery] = useState('')
  const visibleIdeas = filterIdeas(starterIdeas, { query })

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="eyebrow">P3 · STARTER PROJECT</div>
        <h1>Idea Inbox</h1>
        <p>
          Keep small study and software ideas in one place. This starter intentionally
          does not include search or filtering; those are the HW4 TDD feature.
        </p>
      </header>

      <main className="content" aria-label="Saved ideas">
        <div className="section-head">
          <div>
            <h2>Saved ideas</h2>
            <p className="muted">A small dataset for developing the Idea Explorer feature.</p>
          </div>
          <span className="count" role="status">
            {formatIdeaCount(visibleIdeas.length)}
          </span>
        </div>

        <label htmlFor="idea-search">Search ideas</label>
        <input
          id="idea-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {visibleIdeas.length === 0 ? (
          <p className="empty-state">No matching ideas.</p>
        ) : (
          <ul className="idea-grid">
            {visibleIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </ul>
        )}
      </main>

      <footer className="footer">Built as a clean starting point for the Claude Code HW4 workflow.</footer>
    </div>
  )
}
