<!--
Provenance: this is the plan Claude Code wrote while in genuine Plan mode
(EnterPlanMode tool → Glob/Grep/Read exploration → ExitPlanMode), approved by
the user on 2026-11-24 in the Desktop Code tab. Copied verbatim from Claude's
plan file (~/.claude/plans/humming-sauteeing-graham-of-b411dd84-...md).
There was no earlier prepared feature plan in this repository; the only
pre-existing planning text is the AC list in docs/PRD.md and the generic steps
in docs/HW4-RUNBOOK.md, both written before this session.
-->

# Plan: Idea Explorer (AC1 → AC2 → AC3) via strict TDD

## Context

HW4 requires building the PRD's Idea Explorer feature (keyword search, result count/empty state, category filter) in `idea-inbox-p3-starter` with observable RED → GREEN → REFACTOR commits per acceptance criterion. Today `App` renders the static `starterIdeas` array with a hard-coded `{n} ideas` badge and no state. Outcome: a filterable list, 9 TDD commits (or documented reasons for skipped refactors), and evidence files under `docs/hw4/evidence/`.

## Exploration findings (Plan mode, Glob/Grep/Read)

- `Glob src/**/*.{ts,tsx,css}` → 7 files; only one app test (`src/App.test.tsx`).
- `Grep useState|useMemo|filter\(|search|category` in `src` → no state or filtering exists; `category` only in `ideas.ts` and the `IdeaCard` pill.
- `Grep user-event|fireEvent|getByRole|getByLabelText` → `user-event` is not installed; tests use RTL `screen` + role queries. Use `fireEvent.change` (no new dependency).
- `Read src/App.tsx`: count is `<span className="count">{starterIdeas.length} ideas</span>` — always plural; hero copy says search "is not included" (stale after the feature).
- `Read src/App.test.tsx`: starter test asserts exactly 4 `listitem`s → empty state must not be an `<li>`, and default (empty query, All) must still show 4.
- `Read src/data/ideas.ts`: `IdeaCategory = 'Study' | 'Software' | 'Personal'`; useful fixtures:
  - `quiz` → idea-1 only (title); `JSON` → idea-2 only (notes, tests case-insensitivity as `json`)
  - `plan` → idea-3 ("Plan monitor…") + idea-4 ("reading plan…") — mixed case, 2 results
  - Study → idea-1, idea-4; Personal → idea-3; Study + `plan` → idea-4 only
- `Read src/components/IdeaCard.tsx`: pure `<li>`; no change needed.
- `Read src/styles.css`: no form styles; `.section-head` flex row can hold controls.

## Design

- **State** in `App`: `const [query, setQuery] = useState('')`, later `const [category, setCategory] = useState<CategoryFilter>('All')`.
- **Derived list** computed during render (no stored copy, no effect).
- **Controls** (native, labeled):
  - `<label htmlFor="idea-search">Search ideas</label><input id="idea-search" type="search">` → role `searchbox`, name "Search ideas".
  - `<label htmlFor="idea-category">Category</label><select id="idea-category">` with All/Study/Software/Personal → role `combobox`, name "Category".
- **Count**: `<span className="count" role="status">` → `1 idea` / `N ideas` / `0 ideas`.
- **Empty state**: `<p className="empty-state">No matching ideas.</p>` rendered instead of the `<ul>` when zero results.
- **Matching**: `query.trim().toLowerCase()`; blank → all; `title` or `notes` `.toLowerCase().includes(q)`; category `All` or equal.

## TDD sequence (tests in `src/App.test.tsx`, run with `npm.cmd test`)

### AC1 — Keyword search
- RED tests: searchbox labeled "Search ideas" exists; typing `quiz` leaves only "Retrieval practice quiz"; `JSON`/`json` matches notes of "API response explorer"; `PLAN` returns the two ideas whose notes contain plan; `  quiz  ` (padded) matches like `quiz`; clearing back to empty/whitespace shows all 4. Expected failure: no element with role searchbox.
- GREEN: add `query` state + input + inline filter in `App`. **Count badge left unchanged** (it belongs to AC2, keeping GREEN minimal).
- REFACTOR candidate: extract pure `filterIdeas(ideas, { query })` to `src/utils/filterIdeas.ts`, used by `App`.

### AC2 — Result count and empty state
- RED tests: count reads `1 idea` after `quiz`; `2 ideas` after `plan`; `4 ideas` initially; `xyz-no-match` shows `No matching ideas.`, `0 ideas`, and no listitems. Expected failure: badge still reads `4 ideas` / no empty message.
- GREEN: count from filtered length with singular/plural; conditional empty state.
- REFACTOR candidate: extract `formatIdeaCount(n)` (or keep inline if trivial — decide and document).

### AC3 — Category filter
- RED tests: combobox "Category" with options All, Study, Software, Personal (default All); Study → 2 study ideas; Personal → 1; Study + `plan` → only "Reading sprint routine" (AND); switching back to All with `plan` still active → 2 plan ideas (only category restriction removed); Software + `quiz` → empty state. Expected failure: no combobox.
- GREEN: `category` state + select; extend filter with category.
- REFACTOR candidate: export `CATEGORY_FILTERS`/`CategoryFilter` type built from `IdeaCategory`, move category into `filterIdeas` criteria; optional `IdeaFilters` component if `App` gets crowded; add minimal CSS for controls; update stale hero copy (presentational only).

Each phase: run tests → save raw output to `docs/hw4/evidence/ac{N}-{red|green|refactor}.txt` → review `git diff` → commit only that phase's files (`test: RED …`, `feat: GREEN …`, `refactor: …`). After each GREEN/REFACTOR also run `typecheck` and `lint`. Update `WORKFLOW-STATE.md` after each cycle.

## Files

- Modify: `src/App.tsx`, `src/App.test.tsx`, `src/styles.css`
- Create: `src/utils/filterIdeas.ts` (refactor), `docs/hw4/IMPLEMENTATION-PLAN.md`, `docs/hw4/evidence/*`
- Unchanged: `src/components/IdeaCard.tsx`, `src/data/ideas.ts`

## Risks

- RED failing for the wrong reason (typo, bad import) → read failure message, confirm it is "unable to find role searchbox/combobox" or text mismatch.
- AC1 GREEN accidentally satisfying AC2 → keep count untouched in AC1 GREEN.
- `getByRole('status')` ambiguity → only the count has `role="status"`.
- Dataset is tiny → assertions use exact titles so filtering mistakes are visible.
- Auto-mode/ask permission rules may prompt on `git commit`.

## Verification

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
git log --oneline --decorate
```
Plus manual UI check with `npm.cmd run dev` in the browser pane: type `plan`, choose Study, choose All, type gibberish.
