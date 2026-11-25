# HW4 Submission Checklist

Audit of the repository against the HW4 runbook and rubric (Part 1: 12.5, Part 2: 15, Part 3: 15, Part 4: 7.5 points). ✅ = done with evidence in the repo; ⚠️ = needs the student.

GitHub branch: https://github.com/Dyllike3/idea-inbox-p3-starter/tree/hw4/idea-explorer-tdd

## Part 1 — Project instructions and permissions (12.5)

| Item | Status | Evidence |
| --- | --- | --- |
| `/init` run by the user | ✅ | transcript `<command-name>/init</command-name>`; `evidence/01-project-setup.md` §1 |
| Original `/init` output saved | ✅ | `evidence/CLAUDE.init-original.md`, commit `0efc0b9` |
| CLAUDE.md revised (stack, architecture, conventions, tests, do's/don'ts) | ✅ | `CLAUDE.md`, commit `5fe6e72`; change table in `01-project-setup.md` §2 |
| Valid `@imports` (`docs/PRD.md`, `docs/ARCHITECTURE.md`) | ✅ | `01-project-setup.md` §3 |
| `.claude/settings.json` conservative permissions | ✅ | commit `7a4bc3b`; two invalid `Write(./.env*)` rules found by the CLI and removed in session 2; `evidence/settings-validation.txt` |
| `/permissions` check | ⚠️ optional | Validated against the JSON schema instead; the `/permissions` dialog is not available in the Desktop Code tab. A screenshot from a terminal `claude` session would strengthen this. |

## Part 2 — Explore and Plan (15)

| Item | Status | Evidence |
| --- | --- | --- |
| Plan mode entered | ✅ | `EnterPlanMode` tool call 05:42:24Z (session log §3) |
| Glob / Grep / Read of real files before proposing | ✅ | session log §2 (2 Glob, 2 Grep, 5 Read) |
| Plan covers AC1–AC3 and test strategy | ✅ | `docs/hw4/IMPLEMENTATION-PLAN.md` |
| Plan approved and saved | ✅ | `ExitPlanMode` approved; commit `694a616` |

## Part 3 — Strict TDD (15)

| Item | Status | Evidence |
| --- | --- | --- |
| AC1 RED → GREEN → REFACTOR | ✅ | `7b3c942` → (`1bf9f7c`) → `f3352b8` → `9b8e9fe`; `evidence/02-*` |
| AC2 RED → GREEN → REFACTOR | ✅ | `4c3716d` → `05ac412` → `786fd7e`; `evidence/03-*` |
| AC3 RED → GREEN → REFACTOR | ✅ | `63d6d9a` → `e90434b` → `fc0ae3d`; `evidence/04-*` |
| RED commits contain tests only | ✅ | `git log --stat`: each RED commit changes only `src/App.test.tsx` |
| Real failing/passing outputs saved | ✅ | `evidence/ac*-red/green/refactor.txt` |
| No squash / amend / rebase / force push | ✅ | linear history; `deny` rules in settings |
| All ACs work | ✅ | 17/17 tests; manual UI check `evidence/05-ui-check.md` |

## Part 4 — Context management, session log, reflection (7.5)

| Item | Status | Evidence |
| --- | --- | --- |
| `/compact` | ✅ | `evidence/compact-transcript-evidence.txt` |
| `/clear` and resume from files | ✅ | `evidence/clear-transcript-evidence.txt`, `evidence/07-context-management.md` |
| `claude --continue` | ✅ | `evidence/continue-transcript-evidence.txt`, `evidence/ui/continue-demo.webp`, `07-context-management.md` §3 |
| `/export` | ⚠️ optional, not run | runbook lists it; metadata extracts used instead |
| Annotated session log | ✅ | `docs/hw4/ANNOTATED-SESSION-LOG.md` |
| 1–2 page reflection | ✅ | `docs/hw4/REFLECTION.md` (read and edit it so it is in your own voice) |

## Final verification

| Check | Result |
| --- | --- |
| `npm.cmd test` | 17 passed (17) |
| `npm.cmd run typecheck` | exit 0 |
| `npm.cmd run lint` | exit 0 |
| `npm.cmd run build` | built, exit 0 |

Saved in `evidence/06-final-verification.txt`.

## Manual steps (student)

### 1. `claude --continue` demo ✅

Done by the user at 23:24–23:31 and recorded from the CLI transcript. Nothing left to do.

### 2. Teammate participation ⚠️

HW4 is a pair assignment. The repository has **no teammate commits, sessions or documents**. Either have your partner do and commit real work (for example review the session log, run the final checks, or write their part of the reflection), or explain the situation to the instructor. Do not add a teammate name or contribution that did not happen.

### 3. Before submitting

- Read `REFLECTION.md` and adjust anything that does not match your own experience.
- Make sure the grader can open the repository: unauthenticated requests to it returned 404, so it appears to be private. Make it public or add the grader as a collaborator.
- Fill in the partner name at the top of `ANNOTATED-SESSION-LOG.md` once it is real.
- Submit the branch URL above on Canvas yourself.
