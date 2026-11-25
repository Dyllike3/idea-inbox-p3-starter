# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## A. Project context

Idea Inbox is a small React + TypeScript web app where students browse study, software, and personal ideas. It is the P3 project used for HW4 (Claude Code workflow and strict TDD).

**Implemented today:** a static list of four sample ideas (`src/data/ideas.ts`), each shown as a card with title, category pill, and notes; an idea count badge; a responsive two-column grid that collapses to one column under 650px.

**HW4 scope — Idea Explorer** (source of truth: `docs/PRD.md`):
- AC1 keyword search over `title` and `notes`, case-insensitive, live as the user types.
- AC2 result count that reflects the filtered list, and a `No matching ideas.` empty state.
- AC3 category dropdown (`All`, `Study`, `Software`, `Personal`) combined with search using AND; `All` removes only the category restriction.

Each AC is built in its own RED → GREEN → REFACTOR cycle, in the order AC1 → AC2 → AC3. Workflow steps: `docs/HW4-RUNBOOK.md`. Current progress and resume instructions: `docs/hw4/WORKFLOW-STATE.md` (read it first when starting a new or cleared session).

## B. Technology stack

Versions are those resolved in `package-lock.json` / observed on this machine.

| Area | Tool |
| --- | --- |
| UI | React 19.2, React DOM 19.2 |
| Language | TypeScript ~5.9 (`strict`, `noUnusedLocals`, `noUnusedParameters`) |
| Build / dev server | Vite 7 with `@vitejs/plugin-react` 5 |
| Tests | Vitest 4, jsdom 27, React Testing Library 16, `@testing-library/jest-dom` 6 |
| Lint | ESLint 9 flat config, `typescript-eslint` 8, `eslint-plugin-react-hooks` 5 |
| Styling | Plain CSS (`src/styles.css`), no CSS framework |
| Environment | Windows 10, Node.js 24 (20.19+ / 22.12+ also supported), npm 11, Git |

### Commands

On Windows PowerShell use `npm.cmd` because `npm.ps1` may be blocked by execution policy.

- `npm.cmd test` — run all tests once (`vitest run`)
- `npm.cmd test -- src/App.test.tsx` — run one test file
- `npm.cmd test -- -t "keyword search"` — run tests whose name matches
- `npm.cmd run test:watch` — Vitest watch mode
- `npm.cmd run typecheck` — `tsc --noEmit`
- `npm.cmd run lint` — ESLint
- `npm.cmd run build` — typecheck, then `vite build` into `dist/`
- `npm.cmd run dev` — Vite dev server, usually http://localhost:5173

## C. Architecture decisions

- **Layout:** `src/main.tsx` mounts `<App />` in `StrictMode`. `src/App.tsx` composes the page. `src/components/` holds presentational components. `src/data/` holds types and static data. Tests sit next to the code they cover (`*.test.tsx`).
- **Data model:** `Idea { id, title, notes, category }` with `IdeaCategory = 'Study' | 'Software' | 'Personal'`. `starterIdeas` is the only data source; there is no backend, storage, or fetch.
- **Component responsibilities:** `App` owns UI state and derives the visible list. `IdeaCard` is a pure, stateless `<li>` that renders one idea and knows nothing about filtering.
- **State management:** local React state in `App` (`useState`) for the search query and selected category. The filtered list is *derived* during render from `starterIdeas` + state; do not store it in separate state or sync it with effects. No Redux/Zustand/context.
- **Data flow:** one direction — controlled inputs update state in `App` → `App` computes visible ideas → passes each to `IdeaCard`.
- **Design constraints:** keep filtering logic a pure function (input ideas + criteria → ideas) so it can be tested and reused; keep the existing visual style and responsive grid; ideas stay in a `<ul>` so each card is a `listitem`.

## D. Coding conventions

- **TypeScript:** strict mode, no `any`, no non-null assertions except the existing root mount. Use `import type` for type-only imports. Reuse `Idea` / `IdeaCategory` instead of redefining string unions.
- **React:** function components and hooks only; named exports for components (`export function IdeaCard`), default export only for `App`. Stable `key={idea.id}`. Follow the react-hooks lint rules.
- **Naming:** components `PascalCase.tsx` in `src/components/`; helpers `camelCase.ts`; tests `<Name>.test.tsx`. CSS classes are lowercase BEM-like (`idea-card__top`).
- **Formatting:** match the existing style — 2-space indent, single quotes, no semicolons.
- **Accessibility:** native, labeled form controls (`<label>` + `<input type="search">`, `<label>` + `<select>`) so they are reachable by role and accessible name. Announce changing result counts politely (`aria-live="polite"` / `role="status"`). Keep semantic headings and landmarks already in `App`.
- **Error handling:** the feature has no I/O, so there are no async errors to handle. Treat odd input defensively instead: trim surrounding whitespace in the query, treat a blank query as "no keyword", never crash on unexpected characters (use plain `includes`, not user-built regex).

## E. Testing strategy

- **Framework:** Vitest in jsdom (`css: true`), setup in `src/test/setup.ts` loads jest-dom matchers. Use React Testing Library; prefer `@testing-library/user-event`-style interaction only if it is already installed — otherwise `fireEvent` from RTL (do not add a dependency without asking).
- **What to test:** visible behavior through roles, labels, and text (`getByRole('searchbox' | 'combobox')`, `getAllByRole('listitem')`, `getByText`). Do not assert on internal state, class names, or component internals.
- **Priorities:** acceptance criteria in `docs/PRD.md` first, then edge cases (case-insensitivity, whitespace, empty query, no matches, combined filters, singular/plural count), then regressions of the starter behavior.
- **Strict TDD:** for each AC — RED: write tests only, run them, confirm they fail for the *missing behavior* (not a typo/import error), commit `test: RED ...`. GREEN: minimum production code to pass, rerun, commit `feat: GREEN ...`. REFACTOR: behavior-preserving cleanup with tests green, commit `refactor: ...`, or record why no refactor was needed. Never write production code in a RED commit and never weaken a test to get to GREEN.
- **Regression:** run the full suite plus `typecheck` and `lint` before every GREEN/REFACTOR commit. Save real outputs under `docs/hw4/evidence/`.

## F. Do's and don'ts

**Do**
- Keep changes scoped to the current acceptance criterion and the files in the approved plan (`docs/hw4/IMPLEMENTATION-PLAN.md`).
- Make small, reviewable commits with conventional prefixes (`test:`, `feat:`, `refactor:`, `docs:`, `chore:`).
- Update `docs/hw4/WORKFLOW-STATE.md` after each phase so a cleared session can resume.

**Don't**
- Add runtime or dev dependencies without explicit approval.
- Add a backend, database, authentication, routing, persistence, idea creation/editing, or AI features (PRD non-goals).
- Squash, amend, rebase, reset, or force-push — the TDD history is graded evidence.
- Invent test output, commit hashes, or session logs.
- Read, print, or commit `.env*` files or credentials; never commit `node_modules/`, `dist/`, or `coverage/`.

## G. Additional context

Product requirements:
@docs/PRD.md

Architecture decisions:
@docs/ARCHITECTURE.md
