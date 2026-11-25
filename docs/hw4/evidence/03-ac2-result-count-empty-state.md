# Evidence 03 — AC2 Result count and empty state TDD cycle

**Acceptance criterion (docs/PRD.md):** when search matches nothing, show `No matching ideas.`; the displayed idea count reflects the filtered results. Plan additions: singular `1 idea`, count exposed as `role="status"`, empty state is not a list item.

| Phase | Commit | Command | Result | Raw output |
| --- | --- | --- | --- | --- |
| RED | `4c3716d` test: RED add result count and empty state tests (AC2) | `npm.cmd test -- --reporter=verbose` | 5 failed, 7 passed. Four fail with `Unable to find an accessible element with the role "status"`, one with `Unable to find an element with the text: No matching ideas.` | [ac2-red.txt](ac2-red.txt) |
| GREEN | `05ac412` feat: GREEN show filtered result count and empty state (AC2) | `npm.cmd test -- --reporter=verbose`, `run typecheck`, `run lint` | 12/12 pass, exit 0 ×3 | [ac2-green.txt](ac2-green.txt) |
| REFACTOR | `786fd7e` refactor: extract result count formatting and style empty state (AC2) | same | 12/12 pass, exit 0 ×3 | [ac2-refactor.txt](ac2-refactor.txt) |

## Tests written first (`src/App.test.tsx`, commit `4c3716d`)

1. shows the total count of visible ideas initially (`4 ideas`)
2. uses the singular form when exactly one idea matches (`quiz` → `1 idea`, and not `1 ideas`)
3. updates the count to the number of filtered ideas (`plan` → `2 ideas`)
4. shows an empty state and zero count when nothing matches (`xyz-no-match` → `No matching ideas.`, `0 ideas`, no listitems)
5. hides the empty state again when the query matches ideas

## Why RED failed for the right reason

AC1 GREEN deliberately left the badge as `{starterIdeas.length} ideas` without a role, so the count tests could not find `role="status"` and the empty-state test could not find its text. No test failed for an import, typo or setup error.

## GREEN (`05ac412`)

`<span className="count" role="status">` shows `visibleIdeas.length` with an inline `=== 1 ? 'idea' : 'ideas'`. When the list is empty, App renders `<p className="empty-state">No matching ideas.</p>` instead of the `<ul>`, which keeps the starter test's "exactly 4 listitems" assumption valid.

## REFACTOR (`786fd7e`)

- Extracted `formatIdeaCount(count)` to `src/utils/formatIdeaCount.ts`, so the singular/plural rule has a name and is not buried in JSX.
- Added `.empty-state` CSS (dashed card) so the message matches the existing visual style.
- Tests unchanged and still 12/12.
