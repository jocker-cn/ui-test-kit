# TodoMVC Smoke Test

Open the TodoMVC demo specified in `projects/todomvc-smoke/project.md` in a fresh browser context.

## TC-01 Add two todos

- Enter `Review test plan` and press Enter. Repeat with `Capture UI evidence`.
- Verify both titles are visible and the counter reads `2 items left`.

## TC-02 Complete and filter

- Complete `Review test plan`. Verify the counter reads `1 item left`.
- Select **Completed**. Verify the list shows `Review test plan` and hides `Capture UI evidence`.
- Capture a screenshot of the Completed view.
- Select **Active**. Verify the list shows `Capture UI evidence` and hides `Review test plan`.
- Capture a screenshot of the Active view.

Save the executed plan, report, and screenshots in a new run directory. Record a result for each check and link the screenshots from the report.
