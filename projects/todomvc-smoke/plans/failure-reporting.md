# TodoMVC Failure Reporting

This plan includes a deliberate mismatch to check failure reporting. Open the TodoMVC demo specified in
`projects/todomvc-smoke/project.md` in a fresh browser context.

## TC-01 Check the counter before completion

- Add `Check failure reporting` and leave it unchecked.
- Compare the visible counter with the deliberate expectation `0 items left`.
- Capture the observed counter and todo in a screenshot. If the counter reads `1 item left`, record FAIL with both values and continue to TC-02.

## TC-02 Verify the counter after completion

- Complete `Check failure reporting`.
- Verify the todo is checked and the counter reads `0 items left`.
- Capture the result in a screenshot.

Save the executed plan, report, and screenshots in a new run directory. The overall report should retain TC-01's result alongside TC-02's result.
