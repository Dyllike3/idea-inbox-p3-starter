# Evidence 07 — Context management (`/compact`, `/clear`, `claude --continue`)

`/compact` and `/clear` were typed by the user in the Claude desktop app's Code tab; `claude --continue` was run by the user in a PowerShell terminal (all Claude Code 2.1.330). Times are PST on 2026-11-24 (UTC 2026-11-25 in the transcripts).

Transcripts live in `~/.claude/projects/E--idea-inbox-p3-starter/` (the Desktop session's working folder is the outer `E:\idea-inbox-p3-starter`, so that is the project key). They are not committed: they contain the full conversation, local paths and account metadata. Only extracted metadata fields are saved here.

| Session file | Role |
| --- | --- |
| `b411dd84-2136-4693-bd2d-e7a60a7ebd97.jsonl` | Session 1: setup, Plan mode, AC1–AC3, `/compact` |
| `c7ea7f75-c2e5-4398-a76c-5fbdb5c70eb2.jsonl` | Session 2: started by `/clear`; documentation, final verification, push |
| `875e0e15-3320-4e4e-8779-868828c02008.jsonl` (under `E--idea-inbox-p3-starter-idea-inbox-p3-starter`) | CLI demo session for `claude --continue` |

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

## 3. `claude --continue` (23:24 – 23:31)

Raw fields: [continue-transcript-evidence.txt](continue-transcript-evidence.txt). Screenshot taken by the user: [ui/continue-demo.webp](ui/continue-demo.webp).

The user ran the Claude Code 2.1.330 CLI (the bundled `claude.exe`, since `claude` is not on PATH) in PowerShell, in the repo folder `E:\idea-inbox-p3-starter\idea-inbox-p3-starter`. This was a small, separate CLI session made for the demo. It did not continue the Desktop sessions above.

| Step | Time (PST) | Record |
| --- | --- | --- |
| 1. Start `claude`, type "remember this phrase: HW4-CONTINUE-VERIFIED. Do not modify files." | 23:29:37 | transcript `875e0e15-….jsonl` line 6, `entrypoint: cli`. The process started at 23:23:55 (`startTime`). |
| 2. Claude acknowledges and says it did not save the phrase to memory or files | 23:29:42 | line 32 |
| 3. Exit the CLI | ~23:30:01 | `cost-state` entries (lines 41, 43), written on exit: start + 366 s |
| 4. Start a **new process** with `--continue` | 23:30:14 | `~/.claude/sessions/84892.json`: new pid 84892, same `sessionId` `875e0e15-…`, `entrypoint: cli` |
| 5. Ask "without reading any files, what checkpoint phrase did I give you earlier in our conversation?" | 23:30:54 | line 45 |
| 6. Claude answers "HW4-CONTINUE-VERIFIED" | 23:30:57 | line 56; the whole transcript has **0** tool calls, so no file was read |

What this shows: the second process had no files or memory to read the phrase from (step 2 says it was not saved, step 6 used no tools), yet it knew the phrase. So `--continue` reloaded the previous conversation from the transcript in that folder.

Limits of the evidence: the transcript does not store the command-line flags, so `--continue` itself is not written anywhere. What is recorded is a new process (pid 84892) resuming the same session id after the first process exited, together with the screenshot. Because the CLI keys sessions by folder, running it in the repo folder found only this demo session, not the Desktop sessions, which are stored under the parent folder.

The same CLI run also flagged `Write(./.env)` and `Write(./.env.*)` in `.claude/settings.json` as invalid permission rules. They were replaced by the existing `Edit(...)` rules (see `settings-validation.txt`).

## 4. `/export`

Not run. It is optional in the runbook; the transcript metadata extracts above are used instead.
