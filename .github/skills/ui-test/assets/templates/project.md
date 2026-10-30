# {{project}}

## Environment

- Target URL: To be provided before execution
- Environment name: To be provided
- Version source: Page version or supplied version; record "unknown" if unavailable
- Default browser: Chromium, 1440 × 900
- Page language: To be provided; match locators to the actual language

## Authentication and data

- Account role and login method: To be provided; do not include passwords
- Local authentication state: `projects/{{project}}/.local/` (excluded from version control)
- Test data, creation, and cleanup: To be provided
- External side effects or actions outside the test scope: To be provided

## Page conventions

- Key pages, control semantics, or stable test IDs: Add as needed; do not pre-scan the entire site
- Default waits: 10 seconds for actions, 30 seconds for navigation, 120 seconds for generated replies
- Special dialogs, feature flags, and state reset: Add as needed

## Tests

Plans live in `plans/`. Optional stable Playwright tests may live in `tests/`.
The first run does not require generating a test script.
