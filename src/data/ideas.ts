export type IdeaCategory = 'Study' | 'Software' | 'Personal'

export interface Idea {
  id: string
  title: string
  notes: string
  category: IdeaCategory
}

export const starterIdeas: Idea[] = [
  {
    id: 'idea-1',
    title: 'Retrieval practice quiz',
    notes: 'Create short self-test questions after each lecture.',
    category: 'Study',
  },
  {
    id: 'idea-2',
    title: 'API response explorer',
    notes: 'Compare JSON requests and responses while debugging.',
    category: 'Software',
  },
  {
    id: 'idea-3',
    title: 'Desk setup checklist',
    notes: 'Plan monitor placement, cable routing, and lighting.',
    category: 'Personal',
  },
  {
    id: 'idea-4',
    title: 'Reading sprint routine',
    notes: 'Make a focused reading plan for difficult articles.',
    category: 'Study',
  },
]
