# HW4 Reflection — Claude Code Workflow and TDD

**Project:** Idea Inbox, feature "Idea Explorer" · **Branch:** `hw4/idea-explorer-tdd` on `Dyllike3/idea-inbox-p3-starter`

## Before and after

Before this assignment, I usually described a feature to an AI assistant, let it write the code, and then reviewed and tested the result. Tests came last, so they mostly confirmed what the code already did, mistakes included. If the assistant misunderstood me, I found out only after the whole feature existed.

This time no code was written until the project had been explored and a plan approved. In Plan mode Claude ran two Globs, two Greps and five Reads first, and several findings changed the plan. A Grep showed that `user-event` was not installed, so the tests used `fireEvent` instead of a new dependency. Reading `App.test.tsx` showed that the starter test expects exactly four list items, so the empty state became a paragraph instead of an extra `<li>`. The plan also said that AC1 should not touch the count badge. Because of that, AC2 started with a real failing test. In my old workflow, search, count and empty state would probably have been built together, and there would have been nothing left to test first.

## TDD in practice

For each acceptance criterion the tests were committed first, and the failure message was checked before any code was written. All three RED runs failed for the right reason (missing searchbox, missing status element, missing category dropdown), not because of a typo or an import error. GREEN stayed small, even when that meant temporary code, like an `as` cast in AC3 that the refactor replaced with a type guard. The tests did not change during refactoring, which is why I trust them.

The most useful moment was in AC1. The first GREEN code was correct, but six tests still failed, and the searchbox's accessible name was "Search ideas Search ideas", growing with each test. Components from earlier tests were never unmounted, because Vitest ran without `globals: true`, so React Testing Library could not clean up automatically. The fix went into `src/test/setup.ts`, the tests were re-run against the old `App.tsx` to show the fix alone did not make AC1 pass, and then it was committed separately. No assertion was changed. If the tests had been written after the code, I would probably have blamed the search feature or loosened a test.

## Context management

I used `/compact` after AC1, when the context was about 154k tokens, mostly test output already saved to files. Claude then re-read the state file and continued with AC2. Earlier I had clicked "Compact is done" before actually sending the command; Claude checked the transcript, found no compaction, and asked again. I used `/clear` between coding and writing. Work resumed from `WORKFLOW-STATE.md`, the plan, the evidence files and `git log`. It also showed a setup mistake: I had opened the parent folder, so `CLAUDE.md` was not loaded at first. Finally, in the CLI I gave Claude a checkpoint phrase, exited, and restarted with `claude --continue`. It recalled the phrase without reading any files. That same CLI run warned that two `Write(...)` permission rules were invalid, something my schema check had missed.

## Limitations and lessons

Each TDD cycle took only a few minutes because Claude ran the phases on its own. The runbook says to review diffs between phases, but I mostly reviewed afterwards. All 17 tests go through `App` with a four-item dataset, and `filterIdeas()` has no unit tests of its own. The permission mode can still auto-approve "ask" rules, so the `deny` rules protecting Git history mattered most. Claude also drafted the documents, so I tied each claim to a commit, a saved output or a transcript record. Teammate work is still missing.

My main lesson is that the order of the work matters more than the tool. Exploring, planning, writing tests first and committing often made problems show up early and made them easy to explain. Next time I would open the session in the repository folder and actually read each diff before moving to the next phase.
