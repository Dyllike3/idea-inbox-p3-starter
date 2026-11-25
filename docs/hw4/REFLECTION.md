# HW4 Reflection — Claude Code Workflow and TDD

**Project:** Idea Inbox (P3 starter), feature "Idea Explorer" (keyword search, result count and empty state, category filter)
**Branch:** `hw4/idea-explorer-tdd` on `Dyllike3/idea-inbox-p3-starter`

## How I used to work

Before this assignment, my usual way of using an AI coding assistant was simple: I described the feature I wanted, let the assistant write the code, and then reviewed and tested what came back. Testing happened at the end, and mostly by clicking around or by asking the assistant to add tests for code that already existed. This is fast when it works. The weak point is that the tests are written to match the code, so they tend to confirm whatever the code already does, including its mistakes. And if the assistant misunderstood the request, I usually found out only after the whole feature was written.

## Explore → Plan → Implement → Commit

The biggest change this time was that no code was written until the project had been explored and a plan was approved. Claude entered Plan mode and ran two Globs, two Greps and five Reads before proposing anything. A few of these findings directly changed the plan. A Grep showed that `@testing-library/user-event` was not installed, so the tests used `fireEvent.change` instead of adding a new dependency. Reading `App.test.tsx` showed that the starter test expects exactly four list items, so the empty state had to be a paragraph shown instead of the list, not an extra `<li>`. Reading the data file gave real test values (`quiz`, `JSON`, `plan`) instead of made-up ones.

The plan also made one decision that I would not have thought of myself: AC1 GREEN should not touch the count badge, even though changing it would be easy. Because of that, AC2 started with a real failing test (no element with `role="status"`) instead of tests that were already passing. In my old workflow, the assistant would probably have built search, count and empty state together, and there would have been nothing left to test first.

Committing after each phase was useful in a way I did not expect. The commit history became the proof of what happened, and later it was also the main way a fresh session could find out where the work stood.

## What TDD was actually like

For each acceptance criterion, the tests were written and committed first, and the failure message was checked before writing any code. All three RED runs failed for the right reason: the missing searchbox, the missing status element, and the missing "Category" combobox. None failed because of a typo or import error. GREEN was kept small, even when that meant code I would not keep, like an `as` cast in AC3 GREEN that the REFACTOR step replaced with a type guard. The REFACTOR steps were small too: extracting `filterIdeas()` and `formatIdeaCount()`, moving the category rule into the filter function, and adding CSS. The tests stayed the same through each refactor, which is what made me trust them.

## The AC1 cleanup problem

The most interesting moment was in AC1. The first GREEN implementation was correct, but six tests still failed. The error message said the searchbox's accessible name was "Search ideas Search ideas", and in later tests the name was repeated three and four times. That meant components from earlier tests were never unmounted. The cause was in the starter setup: Vitest was not running with `globals: true`, so React Testing Library could not register its automatic cleanup. With only one starter test, nobody had noticed.

What I liked about the fix was the order. The cleanup fix was added to `src/test/setup.ts`, then the tests were run again with the old `App.tsx` to show that the fix alone did not make AC1 pass. Only then was the fix committed on its own, followed by the GREEN commit. No test assertion was changed. In my old workflow, tests would have been added after the feature, and this failure would probably have looked like a bug in the new search code. I might have "fixed" the feature or loosened a test instead of finding a broken test setup.

## Context management

I used `/compact` once, after AC1, when the context was about 154k tokens. Most of that was long test failure output that was already saved in evidence files. After compaction Claude re-read the state file and the code and continued with AC2 without asking me anything. There was also a small mistake on my side: I clicked a "Compact is done" reply before I had actually sent `/compact`. Claude checked the transcript, saw no compaction record, and asked me to type it. That was a good habit to see: checking the record instead of trusting what it was told.

I used `/clear` between implementation and writing the documents. Work resumed from files only: an auto-memory note with the repo path, `docs/hw4/WORKFLOW-STATE.md`, the plan, the evidence folder and `git log`. The resume worked, but it revealed a setup mistake. I had opened the Code tab on the parent folder, not the repository folder, so `CLAUDE.md` was not loaded at the start of the new session. It only got loaded later, when Claude wrote a file inside the repo. Next time I would open the session directly in the repository.

At the time of writing, `claude --continue` has not been demonstrated yet, because the `claude` command is not on my PATH and the Desktop app does not have that flag. I still need to run it from a terminal.

## Challenges, limitations and lessons

- **Speed versus review.** The commit timestamps show that each TDD cycle took only one to three minutes because Claude ran the phases on its own. The runbook says to stop and review the diff between phases. In practice I reviewed the work afterwards, through the diffs and evidence files, not between every phase. The process was strict, but my own checking was less step-by-step than it should have been.
- **Small test surface.** All 17 tests go through `App` with a four-item dataset. That fits the ACs, but `filterIdeas()` has no unit tests of its own, and the tiny dataset can hide edge cases.
- **Permissions.** I wrote conservative rules in `.claude/settings.json`, but the session's permission mode can still auto-approve actions in the "ask" list. The `deny` list (no force push, no rebase, no `reset --hard`) was the part I relied on most, because the Git history is the graded evidence.
- **Documents written with AI.** Claude drafted the evidence files and this log. I tried to keep them honest by tying every claim to a commit, a saved output or a transcript field, and by marking what is not done, like `--continue` and teammate work.

The main lesson for me is that the order of the work matters more than the tool. Exploring first, planning, writing the test first and committing often made problems show up early and made them easy to explain. I will keep the habit of writing tests before code and of keeping a state file that a fresh session can read. What I would change is to slow down between phases and actually read each diff before moving on.
