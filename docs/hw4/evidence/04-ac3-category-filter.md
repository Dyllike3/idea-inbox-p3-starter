# Evidence 04 — AC3 Category filter TDD cycle

**Acceptance criterion (docs/PRD.md):** choose `All`, `Study`, `Software` or `Personal` through an accessible dropdown; category combines with the keyword (AND); selecting `All` removes only the category restriction.

| Phase | Commit | Command | Result | Raw output |
| --- | --- | --- | --- | --- |
| RED | `63d6d9a` test: RED add category filter tests (AC3) | `npm.cmd test -- --reporter=verbose` | 5 failed, 12 passed, all with `Unable to find an accessible element with the role "combobox" and name "Category"` | [ac3-red.txt](ac3-red.txt) |
| GREEN | `e90434b` feat: GREEN add category filter combined with keyword search (AC3) | `npm.cmd test -- --reporter=verbose`, `run typecheck`, `run lint` | 17/17 pass, exit 0 ×3 | [ac3-green.txt](ac3-green.txt) |
| REFACTOR | `fc0ae3d` refactor: move category criterion into filterIdeas and group filter controls (AC3) | same | 17/17 pass, exit 0 ×3 | [ac3-refactor.txt](ac3-refactor.txt) |
| Copy fix | `7bb4d74` chore: update hero copy now that search and filtering exist | `npm.cmd test`, `run lint` | 17/17 pass, lint exit 0 | (run in session; not saved to a file) |

## Tests written first (`src/App.test.tsx`, commit `63d6d9a`)

1. renders an accessible category dropdown that defaults to All (options in order All, Study, Software, Personal)
2. shows only ideas in the chosen category (Study → 2 ideas, Personal → `Desk setup checklist`, `1 idea`)
3. combines the category with the keyword using AND (`plan` + Study → `Reading sprint routine` only)
4. removes only the category restriction when All is selected again (query stays `plan`, both plan ideas return)
5. shows the empty state when category and keyword have no overlap (`quiz` + Software → `No matching ideas.`, `0 ideas`)

Tests 2 and 5 also exercise AC2 (count and empty state) under the category filter.

## GREEN (`e90434b`)

`useState<'All' | IdeaCategory>('All')`, a `<label htmlFor="idea-category">Category</label>` + `<select>` with four hard-coded options, and an extra `.filter()` after `filterIdeas`. The `onChange` used an `as` cast, which was accepted for GREEN and removed in REFACTOR.

## REFACTOR (`fc0ae3d`)

- `filterIdeas(ideas, { query, category })` now owns both rules (`matchesKeyword && matchesCategory`), so App has one derived value again.
- `CategoryFilter` type and `CATEGORY_FILTERS` constant drive the options; `isCategoryFilter` is a type guard that replaces the cast, as CLAUDE.md asks for strict typing.
- Search and category are grouped in `.filters` / `.filters__field` with form styles and a visible focus outline.
- Tests unchanged and still 17/17.

The hero copy update is a separate `chore:` commit because it changes visible text, even though no test covers it.
