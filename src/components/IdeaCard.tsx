import type { Idea } from '../data/ideas'

interface IdeaCardProps {
  idea: Idea
}

export function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <li className="idea-card">
      <div className="idea-card__top">
        <h3>{idea.title}</h3>
        <span className="pill">{idea.category}</span>
      </div>
      <p>{idea.notes}</p>
    </li>
  )
}
