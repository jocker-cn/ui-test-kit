# UI Test Kit

A shared workspace for Copilot to test browser UIs from project plans or direct requests,
and record results with relevant evidence.

## Structure

```text
.github/skills/
  playwright-cli/          Official Playwright skill, preserved unchanged
  ui-test/                 Test organization and reporting conventions
projects/
  <project>/
    project.md             Lasting project context
    plans/                 Reusable task-specific plans
    runs/<run-id>/         Executed plans, results, and evidence
```

The Agent works directly from these documents using the official Playwright tools.
There are no custom generators or execution services.

## Usage

Open the repository in Copilot and request, for example:

> Use ui-test to run the message-copy plan for my-chat in UAT.

> Test that stopping generation in my-chat prevents further text from appearing. Save the results and screenshots.

> Set up a project named my-chat with this test URL: ...

Project instructions provide background; the user's request and plan define what to do for a run.
Shared templates are optional outlines, without fixed browser, viewport, or timeout defaults.

- [UI testing skill](.github/skills/ui-test/SKILL.md)
- [Official Playwright skill](.github/skills/playwright-cli/SKILL.md)
- [Projects](projects/README.md)

Follow the official skill for tool installation and browser operations.
Run artifacts are local by default under the repository's Git ignore rules; keep credentials out of version control.

The official skill and reference files are copied unchanged from the Playwright 1.64.1 release package.
Its directory contains provenance and licensing details.
