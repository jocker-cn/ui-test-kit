---
name: ui-test
description: Run browser UI checks from a project's Markdown plan or a direct request, and record results with relevant evidence. Uses the official Playwright skill for browser operations.
---

# UI Testing

Use this skill to organize a test run and its results. Use the [official Playwright skill](../playwright-cli/SKILL.md)
for browser operations, installation, and troubleshooting; read its references as needed.

## Understand the task

Start with the user's request, the selected `projects/<project>/project.md`, and the relevant plan.
Read additional context when it helps complete or diagnose the task.

The project describes lasting context; the request and plan define this run's scope, steps, expectations,
evidence requirements, and any additional task instructions. Choose execution methods to satisfy those requirements.
If something essential is unclear, clarify that point while continuing checks that can be completed independently.

For a new project or an ad hoc request, organize the information directly as Markdown.
The [project](assets/templates/project.md), [plan](assets/templates/plan.md), and [report](assets/templates/report.md)
templates are optional outlines. Adapt them to the task; an unused field is not a prerequisite for starting.
No directory generator, report generator, or custom runner is needed.

## Execute and record

Use the official Playwright tools directly. Existing matching tests may be reused; generating scripts is not required.
Verify the expectations in the plan. Distinguish setup actions, simulated behavior, and observed test results.

Keep each run in a separate `projects/<project>/runs/<run-id>/` directory.
Record the plan actually executed, results, and relevant evidence without overwriting previous runs.
Use relative image links so reports and screenshots can be shared together.

## Report the outcome

For each check, record the expectation, actual observation, and outcome:
PASS (verified), FAIL (expectation not met), BLOCKED (cannot verify), or NOT_RUN (not executed).
Never report an unexecuted or unverified check as passed. Keep any summary consistent with the details.
Preserve failures, retest outcomes, and available evidence when a run is incomplete.

Return the report path, evidence locations, a short results summary, and any unresolved issues.
Keep credentials and authentication state out of reports and version control.
