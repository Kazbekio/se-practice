# Delegated review decisions — 2026-11-20

The student asked Codex to complete this lab and GitHub work without extra participation. Codex performed the following review within that standing task scope. There was no separate human click for each line; AI-assisted drafting and review are disclosed in AI_USAGE.md.

1. Approve the ten proposed nonblank AGENTS.md line changes: they directly match C1-C6 and the existing package scripts. Keep all headings and all unrelated text.
2. Approve removing only the B-204 entry from src/App.tsx. This aligns the imported two-room demo with the one-room rule in R1. Keep A-101, its fixture, field labels and all controls.
3. Reject the supplied real-data, Supabase/login and external deployment directions. They conflict with the authorized assignment.
4. Reject adding CI, a linter or a formatter during these two focused mitigations. Record the missing checks in R3/R4 instead of claiming readiness.
5. Approve jsdom@26.1.0 as one development-only test dependency before the regression test. It is needed to test actual React input events; production dependencies stay unchanged. The later refactor adds no dependency.
6. For R2, approve a pure form-to-availability module and current-input-derived feedback. Keep the numeric canBook API and every original assertion. Reject Strategy/Adapter classes, a general room catalog, broad renaming and a UI redesign because one fixed policy does not need them.
7. Approve one short module-map line in AGENTS.md when src/availability.ts is added. The final policy diff must remain below 15 changed nonblank lines.

Initial ranking before changes: R1 (Agent operations) 3 x 3 = 9, R2 (Correctness) 3 x 2 = 6, R3 (Maintainability) 2 x 2 = 4, R4 (Reliability) 2 x 2 = 4, R5 (Maintainability) 2 x 2 = 4, R6 (Security) 1 x 2 = 2, plausible. R1 includes the inconsistent one-room scope in the imported demo; R2 has only static evidence until the red UI test runs. All other findings are confirmed missing files or commands, not proof of a particular defect.
