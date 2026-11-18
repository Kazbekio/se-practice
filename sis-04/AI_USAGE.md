# AI Usage Disclosure — SIS #04

Name: Shynbulat Kazbek

Student ID: 24B032123

Group/session: Monday 16:00 - 19:00, as recorded in the Week 07 report

Date: 2026-11-18

| Tool | Exact model / plan | Date | Used for | Which files it touched |
| --- | --- | --- | --- | --- |
| OpenAI Codex | not displayed / plan not displayed | 2026-11-18 | codebase analysis (Task 1) | report.md, evidence/ai/; the independent reviewer made no file edits |
| OpenAI Codex | not displayed / plan not displayed | 2026-11-18 | improvement plan | report.md sections 2-3, committed before app/src changes |
| OpenAI Codex | not displayed / plan not displayed | 2026-11-18 | feature extension (Task 2) | app/src/rooms.ts, filter.ts, booking.ts, App.tsx and components/ |
| OpenAI Codex | not displayed / plan not displayed | 2026-11-18 | refactoring (Task 3) | app/src/components/, time.ts, index.css, diagrams/ and app/README.md |
| OpenAI Codex | not displayed / plan not displayed | 2026-11-18 | tests (Task 4) | app/src/catalog.test.ts, evidence/browser-checks.cjs and real-run logs |
| OpenAI Codex | not displayed / plan not displayed | 2026-11-18 | evidence, report drafts, reflection, checker, declaration and GitHub workflow | report.md, AI_USAGE.md, submission.yml and evidence/ |

The analysis began in one independent Codex session with no parent conversation. It received the recorded map, requirements and baseline source. The plan and test-review exchanges continued that same session. The parent Codex session implemented the code. Prompts, outputs or clearly marked excerpts, and session metadata are saved in evidence/ai/. The exact model version was not displayed; no model override was used.

**The assistant wrote, or helped write, tests in app/:** yes. Codex added fifteen tests in catalog.test.ts. Their fixture is inside the test file and does not import demo ROOMS. I followed the review of expected capacity equality, one-below capacity, ALL equipment, blocked rooms and selected-room bookings against the ACs and F-rules. The original nineteen-test booking file is unchanged. The real Chromium proof is separate from the 34 Vitest tests.

**Every run pasted in report.md was produced by my code on my machine (or Codespace), unedited:** yes. All baseline, intermediate red/green, final test, build and browser outputs came from actual commands in this workspace. The first filter red stage was a missing-module failure, not a measured business-rule failure. The next red stage had nine calls fail because checkRoom did not exist yet.

**Every number in report.md section 7 was measured the way its row says:** yes. Tests come from Vitest summaries. The three removed duplication locations are listed in section 5.3. Source file lists are recorded before and after. No percentage score for maintainability or complexity was invented.

**I shared no credentials, keys or private data with any tool:** yes for credentials and private project files. Only the course identity supplied for this submission and fictional room data were included. GitHub CLI used the existing authenticated system keyring; no token or .env content was pasted into AI messages or committed. Automatic approval review rejected an external PlantUML upload, so both diagrams were rendered locally with the official JAR instead. No source graph was uploaded.

**Everything I submitted, I can explain and defend in class — including filterRooms, checkRoom and why each module exists:** yes. I understand the capacity comparison, ALL equipment, room-specific bookings, checked-request state, non-mutation and the test boundaries. I can explain why 120 is allowed and 121 is rejected, and why endpoint contact differs from overlap.

**Anything I accepted from the AI without fully understanding it:** none in the submitted business rules and feature tests. I did not inspect every internal line of React, Vite, Vitest, Chromium or PlantUML.

Codex drafted every report section, including the 256-word reflection, and carried out the commands and GitHub work while I followed the process. I do not claim independent manual authorship of the reflection or source code. The first-person understanding statements reflect my review of the work.

The baseline app was copied unchanged from week-08 and saved in 6cc1665. Analysis and plan were committed in a009bea before the first app/src change. The supplied README, starter and Python checkers stayed unchanged. No new SKILL.md was created, and no optional skill or MCP navigation experiment was used.

Signed: Shynbulat Kazbek

Date: 2026-11-18
