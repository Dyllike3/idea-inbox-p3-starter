# Evidence 07 — Context management (`/compact`, `/clear`, `claude --continue`)

All commands below were typed by the user in the Claude desktop app's Code tab (Claude Code 2.1.330). Times are PST on 2026-11-24 (UTC 2026-11-25 in the transcripts).

Transcripts live in `~/.claude/projects/E--idea-inbox-p3-starter/` (the Desktop session's working folder is the outer `E:\idea-inbox-p3-starter`, so that is the project key). They are not committed: they contain the full conversation, local paths and account metadata. Only extracted metadata fields are saved here.

| Session file | Role |
| --- | --- |
| `b411dd84-2136-4693-bd2d-e7a60a7ebd97.jsonl` | Session 1: setup, Plan mode, AC1–AC3, `/compact` |
| `c7ea7f75-c2e5-4398-a76c-5fbdb5c70eb2.jsonl` | Session 2: started by `/clear`; documentation, final verification, push |

## 1. `/compact` (22:04)

Raw fields: [compact-transcript-evidence.txt](compact-transcript-evidence.txt).

- `compact_boundary` entry, `trigger: "manual"`, `preTokens: 153831`, `durationMs: 71382`, timestamp `2026-11-25T06:04:32.748Z`.
- Why: after the AC1 cycle the context was ~154k tokens, mostly long Vitest failure dumps (`ac1-red.txt` alone is 129 KB) and schema JSON that were already saved to files.
- What survived: Claude Code's own summary (request, constraints, file states, errors and fixes, pending tasks) plus the latest messages. After compaction Claude re-read `WORKFLOW-STATE.md`, `02-ac1-keyword-search.md`, `App.tsx`, `filterIdeas.ts` and `setup.ts`, then started AC2 RED without asking the user anything.
- A false start is also recorded: at ~22:02 the user clicked a reply button saying "Compact is done" before the command had been sent. Claude checked the transcript, found no `compact_boundary`, and asked the user to type `/compact`. The real compaction followed.

## 2. `/clear` (23:12:48)

Raw fields: [clear-transcript-evidence.txt](clear-transcript-evidence.txt).

- The new session file starts with `{"type":"derived-from", ... "id":"b411dd84-...","via":"clear"}`, followed by the user entry `<command-name>/clear</command-name>` at `2026-11-25T07:12:48.757Z` and the harness record `"commandRun":{"command":"clear","args":""}`.
- Why: Part 3 (implementation) was finished and committed. The next phase was writing documents, which needs facts, not the old conversation. Clearing at a committed boundary means nothing is lost if the conversation is gone.

### What the cleared session started with

Only these were in context at the start of session 2:

1. The user's new prompt, which listed the files to read.
2. The auto-memory index `MEMORY.md` and its one entry (`hw4-idea-inbox-project.md`), which says the real repo is the nested `idea-inbox-p3-starter` folder, the branch name, the remote, "ask before push", and "resume from `docs/hw4/WORKFLOW-STATE.md`".

`CLAUDE.md` was **not** loaded at the start of session 2. The Desktop session's working folder is the outer folder, and `CLAUDE.md` lives in the nested repo, so it is only picked up when Claude touches files in that subfolder with its file tools. In session 2 Claude first read it with `cat` (Bash), which does not trigger loading; the harness injected `CLAUDE.md` plus its `@docs/PRD.md` and `@docs/ARCHITECTURE.md` imports only after Claude used the Write tool to create this file inside the nested repo. The resume worked anyway because the memory entry and the user's prompt both pointed to the nested repo. Lesson: open the Code tab on the repo folder itself, not its parent.

### How work resumed without the conversation

In order, in session 2:

1. Read the memory entry → found the repo path.
2. `git status`, `git branch -a`, `git log --oneline --graph --all`, `git remote -v`: clean tree, 18 commits ahead of `origin/hw4/idea-explorer-tdd`, and the list matched the "Commits so far" block in `WORKFLOW-STATE.md` plus the final docs commit `c52be99`.
3. Read `CLAUDE.md`, `docs/hw4/WORKFLOW-STATE.md`, `docs/hw4/IMPLEMENTATION-PLAN.md`, `README.md`, the runbook and the session-log template.
4. Read every `docs/hw4/evidence/*.md` and the small output files; grepped the large RED outputs for their failure lines.
5. Read the two transcript files for metadata only (slash-command entries, `compact_boundary`, `derived-from`, tool-call names and timestamps) to confirm the `/init`, Plan mode, `/compact` and `/clear` events.
6. Re-ran `npm.cmd test`, `typecheck`, `lint` and `build` ([06-final-verification.txt](06-final-verification.txt)): 17/17 tests, all exit 0.

The "Next steps (after `/clear`)" list in `WORKFLOW-STATE.md` was then followed directly.

## 3. `claude --continue`

Status at the time this file was written: **not yet run.** It must be run by the user in a terminal, because the `claude` command is not on PATH and the Desktop app has no `--continue` flag. Claude did not run it from inside this session: `--continue` resumes the most recent conversation in the folder, which is this live session, and writing to the same transcript from two processes could corrupt it.

See `docs/hw4/SUBMISSION-CHECKLIST.md` → "Manual steps" for the exact commands. When it has been run, its result is recorded in section 3 of `docs/hw4/ANNOTATED-SESSION-LOG.md`.

## 4. `/export`

Not run. It is optional in the runbook; the transcript metadata extracts above are used instead.
