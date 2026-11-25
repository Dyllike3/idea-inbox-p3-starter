# Evidence 02 — AC1 Keyword search TDD cycle

**Acceptance criterion (docs/PRD.md):** labeled search input; match `title` or `notes` case-insensitively; unmatched ideas disappear; updates without submit. Plan additions: trim whitespace, blank query shows all.

| Phase | Commit | Command | Result | Raw output |
| --- | --- | --- | --- | --- |
| RED | `7b3c942` test: RED add keyword search tests (AC1) | `npm.cmd test` | 6 failed, 1 passed — all `Unable to find an accessible element with the role "searchbox" and name "Search ideas"` | [ac1-red.txt](ac1-red.txt) |
| GREEN attempt 1 | not committed as feat | `npm.cmd test` | 6 failed — searchbox found but named `"Search ideas Search ideas"` | [ac1-green-attempt1-failed.txt](ac1-green-attempt1-failed.txt) |
| Test harness fix | `1bf9f7c` test: unmount rendered trees after each test | `npm.cmd test` with fix + pre-GREEN `App.tsx` | still 6 failed for missing searchbox → fix alone does not satisfy AC1 | [ac1-cleanup-fix-check.txt](ac1-cleanup-fix-check.txt) |
| GREEN | `f3352b8` feat: GREEN implement keyword search (AC1) | `npm.cmd test -- --reporter=verbose`, `typecheck`, `lint` | 7/7 pass, exit 0 ×3 | [ac1-green.txt](ac1-green.txt) |
| REFACTOR | `9b8e9fe` refactor: extract idea filtering logic (AC1) | same | 7/7 pass, exit 0 ×3 | [ac1-refactor.txt](ac1-refactor.txt) |

## Tests written first (`src/App.test.tsx`, commit `7b3c942`)

1. renders a labeled search input that starts empty
2. keeps only ideas whose title matches as the user types (`quiz`)
3. matches idea notes case-insensitively (`json`, `JSON`)
4. returns every idea whose title or notes contain the keyword (`PLAN` → 2 ideas)
5. ignores leading and trailing whitespace in the query (`   quiz  `)
6. shows all ideas again when the query is cleared or only whitespace

Interaction uses `fireEvent.change` because `@testing-library/user-event` is not installed and CLAUDE.md forbids new dependencies.

## What happened in GREEN

The first implementation was correct, but the tests still failed. The failure message listed a searchbox whose accessible name was "Search ideas Search ideas". Diagnosis: `vite.config.ts` does not enable Vitest `globals`, so React Testing Library never registers its automatic `afterEach(cleanup)`. Each test's `render(<App />)` stayed mounted, so the second test saw two `<label for="idea-search">` elements pointing at the same id. The fix was test infrastructure (`src/test/setup.ts` calls `cleanup()` after each test), committed separately and checked against the pre-GREEN `App.tsx` to show it did not make the AC1 tests pass by itself. The assertions were not changed.

This defect was latent in the starter: with only one test, nothing exposed it.

## GREEN implementation (`f3352b8`)

`useState('')` for the query, a `<label htmlFor="idea-search">` + `<input type="search">`, and an inline `starterIdeas.filter(...)` on trimmed, lowercased title/notes. The `{starterIdeas.length} ideas` badge was intentionally left alone so AC2 starts from a real RED.

## REFACTOR (`9b8e9fe`)

Extracted `filterIdeas(ideas, { query })` and `matchesKeyword` to `src/utils/filterIdeas.ts`. Reason: separates pure matching logic from the component and gives AC3 one place to add a category criterion. Observable behavior unchanged (same 7 tests pass).
