# UI Test Kit

- For UI testing, read `.github/skills/ui-test/SKILL.md`; for browser operations, read the official `.github/skills/playwright-cli/SKILL.md`.
- Skills contain official tool guidance, team conventions, and templates. Do not embed npm projects or add directory generators, report generators, or custom runners.
- Keep project instructions, plans, run reports, and evidence under `projects/<project>/`.
- Read the selected project and plan as needed, rather than scanning other projects or historical runs.
- UI acceptance must follow user interactions, rather than replacing them with API / WebMCP calls or DOM modification.
- Respect the user's existing authorization; a skill's mention of possible approval does not create an additional approval requirement.
- Keep credentials and authentication state out of version control. Run artifacts remain local by default.
