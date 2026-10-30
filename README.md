# UI Test Kit

Execute browser UI tests with Copilot from a project plan or a direct request, and produce reports with screenshot evidence.

## Structure

```text
.github/skills/
  playwright-cli/          Official Playwright skill, preserved unchanged
  ui-test/                 Team conventions and templates
projects/
  <project>/
    project.md             URL, environment, account role, and data conventions
    plans/                 Reusable Markdown test plans
    runs/<run-id>/         Plan snapshots, reports, and screenshots (local by default)
    .local/                Local authentication state (not committed)
```

The repository root contains entry-point documentation and basic Git configuration.
The Agent creates projects, organizes plans, operates the browser, and writes reports directly using the skills.

## Usage

Open the repository in Copilot and request, for example:

> Use ui-test to execute the message-copy plan for my-chat in UAT. Save the report and screenshots.

> Use ui-test to check that stopping generation in my-chat prevents further text from appearing.

> Set up a project named my-chat with this test URL: ...

Provide acceptance criteria or describe the checks directly.
Project plans hold task-specific instructions.

- [UI testing conventions](.github/skills/ui-test/SKILL.md)
- [Official Playwright skill](.github/skills/playwright-cli/SKILL.md)
- [Projects](projects/README.md)

Follow the official skill for Playwright installation and usage.
This repository does not bundle an npm project or default browser configuration.
Specify the browser, viewport, and wait limits in each project's `project.md`.

The official skill and reference files are copied unchanged from the Playwright 1.64.1 release package.
Its directory contains provenance and licensing details. The team skill adds project and artifact conventions.
