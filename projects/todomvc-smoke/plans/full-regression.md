# TodoMVC Full Regression

Open the TodoMVC demo specified in `projects/todomvc-smoke/project.md` in a fresh browser context.
Use the same context for the entire run so edits and completion state carry across checks and reloads.
Run the checks in order. If an unexpected failure prevents a later check, record the dependency and continue with checks that can still be verified.

## Add and edit

### TC-01 Empty submission

- Verify that the list starts empty and the new-todo field is visible.
- Enter three spaces in the field and press Enter. Verify that no todo was created.

### TC-02 Add three todos

- Add `Plan release`, `Review changes`, and `Publish notes` in that order.
- Verify that all three appear in order, none is completed, and the counter reads `3 items left`.

### TC-03 Save an edit

- Double-click `Review changes`, replace its title with `Review final changes`, and press Enter.
- Verify that the new title replaces the old one, the other titles remain unchanged, and the counter still reads `3 items left`.

### TC-04 Cancel an edit

- Double-click `Publish notes`, type `Temporary title`, and press Escape.
- Verify that the editor closes, `Publish notes` is unchanged, and `Temporary title` does not appear in the list.

## Complete, filter, and reload

### TC-05 Complete two todos

- Complete `Plan release` and `Publish notes`.
- Verify that both are checked, `Review final changes` is unchecked, and the counter reads `1 item left`.

### TC-06 Verify each filter

- Select **Active**. Verify that only the unchecked `Review final changes` appears. Capture `TC-06-active.png`.
- Select **Completed**. Verify that only the checked `Plan release` and `Publish notes` appear. Capture `TC-06-completed.png`.
- Select **All**. Verify that all three appear again and the counter still reads `1 item left`.

### TC-07 Verify persistence after reload

- Reload the page on **All**, using the same browser context.
- Verify that all three titles remain, including `Review final changes`. Verify that only `Plan release` and `Publish notes` are checked and that the counter still reads `1 item left`.
- Capture `TC-07-after-reload.png`.

### TC-08 Report a deliberate counter mismatch

- Keep the state from TC-07. Compare the counter with the deliberate expectation `0 items left`.
- Capture the observed state as `TC-08-counter-mismatch.png`. With `1 item left` observed, record FAIL with both values.
- Continue to TC-09 and retain the TC-08 result in the final report.

## Bulk actions and cleanup

### TC-09 Toggle all twice

- Use the toggle-all control next to the new-todo field. Verify that all three todos are checked and the counter reads `0 items left`.
- Use the same control again. Verify that all three are unchecked and the counter reads `3 items left`.

### TC-10 Clear completed todos

- Complete `Plan release` and `Publish notes`, then select **Clear completed**.
- Verify that only `Review final changes` remains, it is unchecked, and the counter reads `1 item left`. Verify that **Clear completed** is gone.
- Capture `TC-10-after-clear.png`.

### TC-11 Delete the remaining todo

- Hover over `Review final changes` and use its delete control.
- Verify that no todo rows remain, the counter and filters are hidden, and the new-todo field is still visible.

### TC-12 Verify the empty state after reload

- Reload the page in the same context. Verify that the deleted todos do not reappear and the new-todo field is visible.
- Capture `TC-12-empty-after-reload.png`.

## Run artifacts

Save the executed plan, the report, and the requested screenshots in a new run directory.
Include all 12 checks in the report with expected and observed behavior, status, and relative links to the requested screenshots.
If the demo behaves as expected, the final tally is **11 PASS and 1 FAIL**, with the deliberate failure at TC-08 and results recorded through TC-12.
