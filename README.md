# Idea Inbox — P3 / HW4 Idea Explorer

A small React + TypeScript app for browsing study, software and personal ideas. For HW4 the **Idea Explorer** feature was added with Claude Code using strict RED → GREEN → REFACTOR TDD.

## Features

- Four sample ideas shown as cards (title, category, notes) in a responsive grid.
- **AC1 — Keyword search:** labeled search input; matches title or notes, case-insensitive, trims whitespace, updates as you type.
- **AC2 — Result count and empty state:** count badge (`1 idea` / `N ideas`, announced via `role="status"`) and a `No matching ideas.` message.
- **AC3 — Category filter:** accessible `All / Study / Software / Personal` dropdown, combined with the keyword (AND); `All` removes only the category restriction.

Filtering logic is a pure function in `src/utils/filterIdeas.ts`; state lives in `App`.

## Requirements

Node.js 20.19+ / 22.12+ / 24, npm, Git. On Windows PowerShell use `npm.cmd`.

## Commands

```sh
npm install
npm test             # Vitest, 17 tests
npm run typecheck
npm run lint
npm run build
npm run dev          # http://localhost:5173
```

## HW4 documents

| Deliverable | Location |
| --- | --- |
| Project instructions | [`CLAUDE.md`](CLAUDE.md) (original `/init` output: [`docs/hw4/evidence/CLAUDE.init-original.md`](docs/hw4/evidence/CLAUDE.init-original.md)) |
| Permissions | [`.claude/settings.json`](.claude/settings.json) |
| Approved Plan mode plan | [`docs/hw4/IMPLEMENTATION-PLAN.md`](docs/hw4/IMPLEMENTATION-PLAN.md) |
| Annotated session log | [`docs/hw4/ANNOTATED-SESSION-LOG.md`](docs/hw4/ANNOTATED-SESSION-LOG.md) |
| Reflection | [`docs/hw4/REFLECTION.md`](docs/hw4/REFLECTION.md) |
| Evidence (test outputs, UI screenshots, context management) | [`docs/hw4/evidence/`](docs/hw4/evidence/) |
| Workflow state / resume file | [`docs/hw4/WORKFLOW-STATE.md`](docs/hw4/WORKFLOW-STATE.md) |
| Submission checklist | [`docs/hw4/SUBMISSION-CHECKLIST.md`](docs/hw4/SUBMISSION-CHECKLIST.md) |

Product and architecture background: [`docs/PRD.md`](docs/PRD.md), [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/HW4-RUNBOOK.md`](docs/HW4-RUNBOOK.md).

## TDD commits

| AC | RED | GREEN | REFACTOR |
| --- | --- | --- | --- |
| AC1 keyword search | `7b3c942` | `f3352b8` (after test-setup fix `1bf9f7c`) | `9b8e9fe` |
| AC2 count + empty state | `4c3716d` | `05ac412` | `786fd7e` |
| AC3 category filter | `63d6d9a` | `e90434b` | `fc0ae3d` |
