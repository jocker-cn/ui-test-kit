# TodoMVC Smoke Tests

These tasks check whether Copilot can follow a UI test plan, operate a browser through the official Playwright skill, and produce a report with evidence.

- Target: [Playwright's TodoMVC demo](https://demo.playwright.dev/todomvc/)
- Access: No account required. Start each plan in a fresh browser context because the demo saves todos in browser storage.
- Test data: Use the sample todo titles in each plan.

Open the repository in Copilot and start with:

> Use ui-test to run the smoke plan for todomvc-smoke. Save the executed plan, report, and screenshots.

| Plan | What it checks | Expected result on the demo |
| --- | --- | --- |
| [Smoke](plans/smoke.md) | Adding todos, completing a todo, filtering, and capturing evidence | 2 PASS |
| [Failure reporting](plans/failure-reporting.md) | Reporting a mismatch with evidence and continuing to the next check | 1 FAIL, then 1 PASS |
| [Full regression](plans/full-regression.md) | A single run through the todo lifecycle, persistence, and failure reporting | 11 PASS, 1 deliberate FAIL |

To run the longer plan, ask Copilot:

> Use ui-test to run the full-regression plan for todomvc-smoke. Save the executed plan, report, and screenshots.

After each run, open the report under `projects/todomvc-smoke/runs/<run-id>/`.
Check that it records expected and observed behavior per check and that the screenshot links open.
Rerun the smoke plan to confirm the next report goes into a new run directory and the first report stays available.
