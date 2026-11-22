import { IdeaCard } from './components/IdeaCard'
import { starterIdeas } from './data/ideas'

export default function App() {
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
          <span className="count">{starterIdeas.length} ideas</span>
        </div>

        <ul className="idea-grid">
          {starterIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </ul>
      </main>

      <footer className="footer">Built as a clean starting point for the Claude Code HW4 workflow.</footer>
    </div>
  )
}
