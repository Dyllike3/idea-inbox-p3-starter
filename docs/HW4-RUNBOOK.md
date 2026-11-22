# HW4 Claude Code Runbook

This is a starter only. It does not contain actual Claude Code sessions or claimed TDD work. You and your partner must perform the workflow in Claude Code and save authentic evidence.

## 0. Bootstrap (PowerShell)

1. Extract the ZIP, open a terminal inside the `idea-inbox-p3-starter` folder.
2. Run `npm install` and `npm test`.
3. Run `npm run typecheck`, `npm run lint`, `npm run build`.
4. Run `git init`, `git add .`, `git commit -m "chore: bootstrap P3 idea inbox starter"`.
5. Create a GitHub repository with no auto-generated README and push the baseline.
6. Create your HW4 feature branch with `git switch -c hw4/idea-explorer-tdd`.

## 1. Project instructions and permissions

1. Launch Claude Code: `claude` (after installation and login).
2. Use `/init`. Export this session or save the initial CLAUDE.md contents.
3. Ask Claude to inspect the actual project and revise CLAUDE.md to cover stack, architecture, conventions, tests, do's/don'ts. Add valid @imports for docs/PRD.md and docs/ARCHITECTURE.md.
4. Ask for `.claude/settings.json` with conservative permissions; verify using `/permissions`.
5. Commit the setup changes. Document what changed between initial and revised CLAUDE.md.

## 2. Explore and Plan

1. Use Plan mode (`/plan` or Shift+Tab).
2. Require explicit Glob, Grep, and Read of the actual repository before proposing changes; inspect `src/App.tsx`, `src/components/IdeaCard.tsx`, `src/data/ideas.ts`, and tests.
3. Plan exactly AC1/AC2/AC3 from docs/PRD.md and choose test strategy.
4. Save the Plan mode transcript and commit a short final plan doc if helpful.

## 3. Strict TDD

For AC1, then AC2, then AC3:
- RED: write only tests, run `npm test`, verify expected failure, commit `test: RED ...`.
- GREEN: implement minimum behavior needed, run tests, commit `feat: GREEN ...`.
- REFACTOR: improve structure without behavioral change, run tests again, commit `refactor: ...`.
- Stop between phases and review the diff. Never squash/redact Git history.

Take factual snapshots (`git log --oneline --decorate -15`, test output, `/export`) and save them to docs/hw4/ as evidence.

## 4. Context management

- Export a session before `/clear` or at phase boundaries.
- Use `/compact` after planning or the first TDD cycle, recording what was retained.
- Use `/clear` to start a separate acceptance criterion cleanly; rely on checked-in docs and CLAUDE.md.
- Exit and resume with `claude --continue` and record what persisted.
- Do not fabricate commands or logs. Remove private tokens before committing exports.

## 5. Deliverables

- GitHub URL, `CLAUDE.md`, `.claude/settings.json`.
- Git history with RED/GREEN/REFACTOR commits.
- Annotated actual session log (commands, tool calls, result + commentary).
- 1–2 page English reflection based on real experience.
- Genuine teammate participation: divide documented work fairly.

## Suggested reflection outline

1. Previous coding workflow vs Explore → Plan → Implement → Commit.
2. Why TDD caught or did not catch misunderstandings.
3. What `/compact`, `/clear`, and `claude --continue` actually accomplished.
4. Drawbacks, limitations, and what you would keep/change.
