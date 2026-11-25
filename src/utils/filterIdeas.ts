import type { Idea, IdeaCategory } from '../data/ideas'

export type CategoryFilter = 'All' | IdeaCategory

export const CATEGORY_FILTERS: readonly CategoryFilter[] = ['All', 'Study', 'Software', 'Personal']

export function isCategoryFilter(value: string): value is CategoryFilter {
  return (CATEGORY_FILTERS as readonly string[]).includes(value)
}

export interface IdeaFilterCriteria {
  query: string
  category: CategoryFilter
}

function matchesKeyword(idea: Idea, keyword: string) {
  return idea.title.toLowerCase().includes(keyword) || idea.notes.toLowerCase().includes(keyword)
}

function matchesCategory(idea: Idea, category: CategoryFilter) {
  return category === 'All' || idea.category === category
}

export function filterIdeas(ideas: readonly Idea[], { query, category }: IdeaFilterCriteria): Idea[] {
  const keyword = query.trim().toLowerCase()
  return ideas.filter((idea) => matchesKeyword(idea, keyword) && matchesCategory(idea, category))
}
