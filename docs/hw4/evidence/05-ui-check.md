# Evidence 05 — Manual UI check (browser pane)

Run on 2026-11-25 at HEAD `7bb4d74` with `npm.cmd run dev -- --port 5173 --strictPort`, page opened in the Claude desktop app's built-in browser at http://localhost:5173. Interactions were real typing/selection through the browser tools; results below are the page text read back after each step.

| Step | Action | Observed count badge | Observed cards | AC |
| --- | --- | --- | --- | --- |
| 1 | Load page | `4 ideas` | all 4 | starter |
| 2 | Type `plan` in "Search ideas" | `2 ideas` | Desk setup checklist, Reading sprint routine | AC1, AC2 |
| 3 | Category → Study (query still `plan`) | `1 idea` | Reading sprint routine | AC3 AND, AC2 singular |
| 4 | Category → All (query still `plan`) | `2 ideas` | Desk setup checklist, Reading sprint routine | AC3 "All" removes only category |
| 5 | Replace query with `xyz-no-match` | `0 ideas` | none; "No matching ideas." shown | AC2 empty state |
| 6 | Reload at 375×812 (mobile emulation) | `4 ideas` | one-column grid; controls stack | responsive layout |

Accessibility tree read by the browser tools: `textbox "Search ideas" type="search"`, `label "Category"`, `combobox` for the select.

Screenshots (captured by the browser tool, copied unchanged):
- [ui/01-desktop-initial.jpg](ui/01-desktop-initial.jpg)
- [ui/02-desktop-empty-state.jpg](ui/02-desktop-empty-state.jpg)
- [ui/03-mobile-375px.jpg](ui/03-mobile-375px.jpg)
