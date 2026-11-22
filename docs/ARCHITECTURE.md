# Architecture Decisions

## Stack
- React 19 with TypeScript, Vite, and plain CSS.
- Vitest + React Testing Library + jest-dom matchers for tests.
- ESLint for code quality.

## Project layout
- `src/App.tsx`: page composition and future search state.
- `src/data/ideas.ts`: strongly typed demo data.
- `src/components/IdeaCard.tsx`: single display card.
- `src/styles.css`: responsive page styling.
- `src/App.test.tsx`: starter UI test; add behavior-oriented tests for HW4.

## Decisions
- No backend is intentionally included in the starter; the data layer is static and may be replaced later.
- Keep state local for the small HW4 feature; avoid adding extra dependencies.
- Test visible behavior (roles, labels, content), not implementation details.
- Use accessible native form controls and semantic HTML.

## Verification
- `npm run test`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
