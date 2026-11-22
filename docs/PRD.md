# Idea Inbox — Product Requirements

## Purpose
A lightweight place for students to browse and organize unstructured ideas. This starter deliberately has only a static Idea List. A future P3 may add persistence, capture, editing, and authentication if specified by the full P3 assignment.

## Existing starter behavior
- Display four sample ideas from `src/data/ideas.ts`.
- Show title, notes, and category for each idea.
- Responsive two-column layout on desktop and one column on mobile.

## HW4 feature: Idea Explorer (not implemented)
Develop a searchable, category-filterable idea list using strict TDD.

### AC1 — Keyword search
- User can enter a keyword into a labeled search input.
- Match `title` or `notes`, case-insensitively.
- Unmatched ideas disappear; matching ideas remain.
- Search updates without a submit action.

### AC2 — Empty result state
- If search matches no ideas, display a clear `No matching ideas.` message.
- The displayed idea count reflects the filtered results.

### AC3 — Category filter
- User can choose `All`, `Study`, `Software`, or `Personal` through an accessible dropdown.
- Category filter combines with the keyword query (AND condition).
- Selecting `All` removes only the category restriction.

## Non-goals for this homework
- Backend, database, authentication, and real API integration.
- Adding or editing ideas.
- AI features.

## Evidence requirement
All three ACs must be implemented via observable RED → GREEN → REFACTOR cycles in Claude Code. Save actual failing/passing test outputs and commit hashes; do not invent them.
