import type { Idea } from '../data/ideas'

export interface IdeaFilterCriteria {
  query: string
}

function matchesKeyword(idea: Idea, keyword: string) {
  return idea.title.toLowerCase().includes(keyword) || idea.notes.toLowerCase().includes(keyword)
}

export function filterIdeas(ideas: readonly Idea[], { query }: IdeaFilterCriteria): Idea[] {
  const keyword = query.trim().toLowerCase()
  return ideas.filter((idea) => matchesKeyword(idea, keyword))
}
