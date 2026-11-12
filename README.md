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

## First-time setup

Use Node.js 20 or newer and pnpm. The project declares pnpm 10.30.3 and locks the Playwright CLI dependency.
Run setup from the repository root in the same environment where Copilot runs its terminal commands.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright-cli --version
```

Check that the CLI can launch your installed Chrome and inspect the demo page.

```sh
pnpm exec playwright-cli -s=ui-test-kit-check open https://demo.playwright.dev/todomvc/ --browser=chrome
pnpm exec playwright-cli -s=ui-test-kit-check snapshot
pnpm exec playwright-cli -s=ui-test-kit-check close
```

If Chrome is unavailable, run `pnpm exec playwright-cli install-browser chromium` and use `--browser=chromium` in the open command.
Once the snapshot shows the TodoMVC input, run a test plan from Copilot.

## Usage

For a quick end-to-end check, start with the [TodoMVC acceptance tasks](projects/todomvc-smoke/project.md).

Open the repository in Copilot and request, for example:

> Use ui-test to run the message-copy plan for my-chat in UAT.

> Test that stopping generation in my-chat prevents further text from appearing. Save the results and screenshots.

> Set up a project named my-chat with this test URL: ...

Project instructions provide background; the user's request and plan define what to do for a run.
Shared templates are optional outlines, without fixed browser, viewport, or timeout defaults.

- [UI testing skill](.github/skills/ui-test/SKILL.md)
- [Official Playwright skill](.github/skills/playwright-cli/SKILL.md)
- [Projects](projects/README.md)

Follow the official skill for browser operations.
Run artifacts are local by default under the repository's Git ignore rules; keep credentials out of version control.

The official skill and reference files are copied unchanged from the Playwright 1.64.1 release package.
Its directory contains provenance and licensing details.
