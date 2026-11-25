# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Idea Inbox is a React 19 + TypeScript + Vite starter that renders a static list of four sample ideas. It is the base for the HW4 "Idea Explorer" feature (keyword search, empty-result state, category filter), which is specified in `docs/PRD.md` and must be built with observable RED → GREEN → REFACTOR commits. The workflow steps are in `docs/HW4-RUNBOOK.md`.

## Commands

On Windows PowerShell use `npm.cmd` if `npm.ps1` is blocked by execution policy.

- `npm test`: run all tests once (`vitest run`)
- `npm test -- src/App.test.tsx`: run a single test file
- `npm test -- -t "part of test name"`: run tests matching a name
- `npm run test:watch`: Vitest watch mode
- `npm run typecheck`: `tsc --noEmit`
- `npm run lint`: ESLint (flat config, typescript-eslint + react-hooks)
- `npm run build`: typecheck, then `vite build` to `dist/`
- `npm run dev`: Vite dev server (usually http://localhost:5173)

Requires Node.js 20.19+ or 22.12+.

## Architecture

- `src/data/ideas.ts` defines the `Idea` type, the `IdeaCategory` union (`'Study' | 'Software' | 'Personal'`) and the static `starterIdeas` array. There is no backend or persistence; this array is the only data source.
- `src/App.tsx` composes the page and owns any list state. It renders the idea count and maps ideas to `IdeaCard`. Per `docs/ARCHITECTURE.md`, search/filter state should stay local to `App` (no state library, no new dependencies).
- `src/components/IdeaCard.tsx` is a presentational `<li>` card (title, category pill, notes). Ideas render inside a `<ul>`, so tests count cards with `getAllByRole('listitem')`.
- Styling is plain CSS in `src/styles.css` (BEM-like class names, two-column grid collapsing to one column under 650px).

## Testing

Vitest runs in jsdom with `css: true`; `src/test/setup.ts` loads `@testing-library/jest-dom/vitest` matchers. Tests use React Testing Library and should query visible behavior (roles, labels, text), not implementation details. Use accessible native form controls (labeled `<input>`, `<select>`) so they are queryable by role and label.

## Constraints from project docs

- Non-goals: backend, database, authentication, real API integration, adding/editing ideas, AI features.
- TDD evidence (failing/passing output, commit hashes) must be real; never invent logs or squash/rewrite history.
