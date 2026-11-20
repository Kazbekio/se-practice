# Week 10 — Lab report

**Name:** Shynbulat Kazbek
**Student ID:** 24B032123
**Group:** not provided
**Date:** 2026-11-20

Repository: https://github.com/Kazbekio/se-practice

I followed the work and understand the availability rules, the evidence and the release decision. Codex carried out the edits, commands, review tables and GitHub steps under my request. The writing, including the conclusion, is AI-assisted; I do not claim an independent manual audit. All student-entered dates use 2026-11-20.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I reviewed with (tool) | Codex |
| Exact model (with its version, or `not displayed`) | not displayed |
| Where the assistant read the project (Bolt.new / Claude Code / Cursor / Copilot / chat with pasted files) | Codex local workspace, same interactive session |
| Starting point (`week-08` or `week-07`) | week-08, branch commit 2d3a7cd |
| Baseline commit — the checkpoint of Part 0 | ffac369 |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | My computer, local terminal through Codex |
| Vitest version (the `RUN  v…` line of a run) | 4.1.12 |

I started with a clean tracked tree on week-10. The checkpoint contains the unchanged Week 08 app and an unchanged copy of the supplied playbook. I did not use the SIS 04 room catalog. Node is 22.16.0 and npm is 10.9.2. The locked packages were installed with `npm ci` in a temporary folder. A temporary dependency link let the commands run from `app/`; it was removed before commits. No node_modules or build output is submitted.

The files supplied for this lab and both Python checkers stay unchanged. Their hashes are in `evidence/provided-file-hashes.json`.

---

## 2. Task 1 — the baseline

I recorded the baseline before changing app source, scripts or dependencies.

---

### 2.1 The project's commands

| Command | Exists | Result | Note |
| --- | --- | --- | --- |
| `npx vitest run` | yes | pass | Vitest dependency; 19 tests passed; baseline-vitest.txt |
| `npm test` | yes | pass | test script is vitest run; 19 tests passed |
| `npm run test:unit` (the test command in `AGENTS.md`) | no | missing | Actual exit 1, Missing script; baseline-test-unit.txt |
| `npm run build` | yes | pass | tsc then Vite; baseline-build.txt |
| `npm run lint` | no | missing | Actual exit 1, Missing script; baseline-lint.txt |

Every command above was attempted. `evidence/baseline-commands.json` gives its exit code and raw log. Missing scripts are findings, not passed checks. The build contains the TypeScript check. The Vitest logs also contain plugin deprecation warnings; I kept those lines.

---

### 2.2 The baseline test run

The real output of `npx vitest run` from the unchanged checkpoint:

```text
10:23:09 AM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
10:23:09 AM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/week-10/app


 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  10:23:09
   Duration  280ms (transform 50ms, setup 0ms, import 79ms, tests 16ms, environment 0ms)
```

---

### 2.3 The agent reads the playbook

What I sent, exactly:

```text
Read the root AGENTS.md before making changes. Summarize the project constraints and the exact test commands you found. Do not edit anything yet. If you cannot read AGENTS.md, tell me, and I will paste its content. Do not claim that AGENTS.md was automatically loaded.
```

The assistant's whole answer, unedited:

```text
I explicitly opened week-10/app/AGENTS.md. I did not assume that it was automatically loaded, and I have not edited app files in this review.

The file describes a React and TypeScript room checker. It places canBook in src/booking.ts, the page in src/App.tsx, and tests in src/booking.test.ts. Its rules reject past and reversed requests, durations over 120 minutes, blocked rooms and overlaps. It also says that touching endpoints count as an overlap, and that booking data must not change.

The exact test command in AGENTS.md is npm run test:unit. In package.json I found npm test, which runs vitest run; there is no test:unit script. The other named commands are npm install, npm run dev and npm run build.

Some instructions need review before use: real KBTU room and timetable data, permission to edit any file or add packages, a possible Supabase database and login, and npx netlify deploy --prod after a build. The file does not list AC6 or a rule against secrets. These are statements from the supplied file, not permission for me to perform them. I will compare them with the assignment contract before any change.
```

Which rules in its summary are wrong for this project, and how I know:

<!-- Write below this line -->

The assistant correctly reports what the file says, but the file is partly wrong. The assignment requires fictional data, one room, no database or login, no secrets and no external deployment. AC4 allows touching endpoints, and AC6 must be present. package.json and the failed command prove that test:unit does not exist. A build alone cannot replace passing tests. The broad edit/package permissions are also too open for a small approved task.

---

## 3. Tasks 2–3 — the read-only review and the challenge

I treated the AI review as a list to verify, not as proof.

---

### 3.1 The review prompt and the answer

Where it ran, and how I made sure it could not edit:

<!-- Write below this line -->

The same Codex session read the local app during a separate read-only phase. Source files and directories had their write bits removed. UID 1000 had no ordinary write access to App.tsx, booking.ts or AGENTS.md. No source edit tool was used in this phase. Before and after SHA-256 maps and clean app git status are in evidence/read-only-before.json and read-only-after.json; they match. Original modes were then restored. This is an ordinary file-permission gate, not a security boundary against an owner who deliberately changes permissions. Generated answers were saved outside app/. I do not claim a fresh chat or automatic playbook loading.

What you sent, exactly:

```text
Act as a cautious software reviewer. Inspect this Smart Campus Room Availability Checker WITHOUT editing files. Identify risks in correctness, security, privacy, reliability, maintainability, and agent operations. For each risk, cite the exact file/function or missing check, explain the impact, suggest a way to verify it, and state uncertainty. Do not invent test results.
```

The assistant's whole answer, unedited:

```text
I read AGENTS.md, package.json, the lockfile, tsconfig.json, vite.config.ts, src/App.tsx, src/booking.ts and src/booking.test.ts without changing app files. The captured baseline shows 19 passing tests and a passing build. npm run test:unit and npm run lint report missing scripts. These results belong to the recorded baseline, not to tests I have invented.

1. Agent operations: AGENTS.md permits any file edit, new packages, a database/login and a production deployment. Its endpoint rule conflicts with the assignment, and it names a test script that does not exist. An agent following it could change the scope or publish an unchecked app. Compare each rule with the assignment, open package.json, and run the named test script. The conflicting text is certain; an actual deployment and available service credentials are not established.

2. Correctness: src/App.tsx check() stores result and error separately from start, end, now and blocked. The change handlers update the inputs but leave result unchanged. After an available check, an end time earlier than the start can still show Available. Render the real page, check the default slot, change End to 10:30 and inspect the feedback. The state flow is visible in the source; this UI sequence still needs a regression test.

3. Privacy: AGENTS.md asks for real room names and a real KBTU timetable, while the task requires fictional data. Following this rule could bring unnecessary campus data into a public repository. Inspect the instruction and the actual fixtures separately. Current ROOMS entries look fictional, and I have not found personal records or proved any data disclosure. The risk is the instruction to obtain real data, not a claim that a leak already happened.

4. Maintainability: package.json has no lint or format command, no ESLint or Prettier dependency, and there is no such configuration in the imported app. Inconsistent or unsafe edits may pass a build. Check the file list and run npm run lint. The missing automation is certain; no specific style defect is proved by its absence.

5. Reliability: missing: an app CI workflow that runs tests and the build on pushes. A future change may be accepted without the local commands being repeated. Inspect .github/workflows and the repository tree. There is no workflow in this imported checkpoint; I have not inspected any separate external CI service.

6. Maintainability: missing: an app README with setup steps. AGENTS.md gives a short module map, but its test command is wrong. A new contributor may run the wrong check or miss the environment needed for Vitest. Compare the local documentation with package.json and a clean install. The README is absent; this does not mean all documentation is absent.

7. Security: missing: a recorded dependency advisory scan. A lockfile pins versions but does not prove that they have no known issues. Run a suitable advisory check separately if security acceptance is needed. I have not run one and do not claim a CVE, exploit or clean security scan.

8. Scope and correctness: src/App.tsx ROOMS contains two fictional choices, A-101 and B-204. The assignment says one room. Count the options in the source and in the rendered select. This is a confirmed scope mismatch, not evidence that the overlap algorithm is wrong. Keep A-101 and its existing fixture rather than adding a room catalog.

The numeric canBook function already uses strict overlap comparisons and does not append a booking. Existing endpoint and immutability tests pass in the baseline. I do not claim that the old Week 08 bugs are still present. A small pure module for form-to-result logic could reduce UI state drift without changing canBook's numeric API.
```

---

### 3.2 Challenging the AI's claims

Codex opened the cited files and commands for this challenge under my request. I followed the evidence. This was AI-assisted review, not a separate unaided student audit.

| # | The AI's claim (short) | Category | What I inspected | Label | Why |
| --- | --- | --- | --- | --- | --- |
| 1 | Playbook permits outside-scope actions and names a missing test command | Agent operations | Baseline AGENTS.md lines 26, 31–38; package.json; baseline-test-unit.txt | confirmed | The text and actual exit 1 support the claim; they do not prove a deployment happened |
| 2 | Editing End can leave an old Available result | Correctness | App.tsx check and onChange handlers; regression-before-fix.txt | confirmed | Changing End to 10:30 failed the real React test: expected Unavailable, received Available |
| 3 | Instruction to obtain real timetable data conflicts with scope | Privacy | Baseline AGENTS.md line 12; fictional ROOMS fixture; assignment contract | confirmed | The unsafe instruction exists; no personal-data leak or actual portal access is claimed |
| 4 | No formatter or linter is configured | Maintainability | package.json, imported file list, baseline-lint.txt | confirmed | There is no config or dependency; lint command is missing, not green |
| 5 | No app CI workflow runs the checks on pushes | Reliability | Baseline and final repository file lists; no .github/workflows | confirmed | No workflow is in this branch; this says nothing about an external CI account |
| 6 | App README with setup steps is missing | Maintainability | app/ file list; AGENTS.md short module map | confirmed | AGENTS.md is documentation, but there is no app README or complete setup guide |
| 7 | A dependency advisory check might reveal issues | Security | package-lock.json; list of actual commands run | plausible | Versions are pinned, but no advisory scan ran; no vulnerability or CVE is asserted |
| 8 | Imported page has two fictional room choices | Correctness | Baseline App.tsx ROOMS; one-room-approved.diff; final browser select | confirmed | B-204 was an extra choice; removing that one line aligns the demo with one room |

I did not need to invent an unsupported claim. The review did not say that canBook mutates bookings: both its source and the original passing AC5 tests show otherwise.

---

## 4. Task 4 — the risk register

Scores describe the baseline, before the two mitigations. Residual scores are in section 8.3.

---

### 4.1 The register

| ID | Category | Cause → event → consequence | Component | Evidence | Status | L | I | Score | Mitigation | Owner | Verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Agent operations | Conflicting scope and broad playbook rules → agent follows them → real data, extra services or an unchecked publication may enter the task | AGENTS.md | Supplied lines 12, 19, 26, 31–38; two baseline ROOMS choices | confirmed | 3 | 3 | 9 | Minimal C1–C6 policy patch; keep only fictional A-101; require real logs | Shynbulat Kazbek | Read full policy diff; compare scripts and ACs; browser shows one option |
| R2 | Correctness | Saved feedback is separate from current fields → an edit leaves old Available → user trusts a wrong answer | src/App.tsx | check() writes result; field handlers do not; real red React test | confirmed | 3 | 2 | 6 | Extract pure form logic; derive checked feedback from current input | Shynbulat Kazbek | R2 test fails before, then passes with all original 19 tests |
| R3 | Maintainability | No automatic style/static lint gate → a future unsafe edit is missed → extra review and repair are needed | package.json | Missing lint command and no formatter/linter configuration | confirmed | 2 | 2 | 4 | Keep explicit diff review plus tests/build now; propose lint/format as a separate task | Shynbulat Kazbek | Recheck scripts and configs in that future task; current lint remains missing |
| R4 | Reliability | No push-time checks → a later commit can skip local tests → a regression reaches review | missing: CI workflow | No .github/workflows in this branch | confirmed | 2 | 2 | 4 | Require local test/build logs on every proposed change; add CI in a separate reviewed task | Shynbulat Kazbek | Inspect branch files and actual logs before any acceptance |
| R5 | Maintainability | No setup README → contributor guesses commands or environment → failed setup or an incomplete check | missing: app README setup guide | No app README; baseline playbook had the wrong test command | confirmed | 2 | 2 | 4 | Use corrected AGENTS and recorded Node/npm now; plan a tested setup guide later | Shynbulat Kazbek | Follow the recorded commands; future guide needs a clean setup run |
| R6 | Security | No advisory scan evidence → a possible dependency issue stays unknown → local browser code could carry avoidable risk | missing: dependency advisory scan | Lockfile exists but no audit command is recorded | plausible | 1 | 2 | 2 | Keep demo local; run an advisory review before wider use | Shynbulat Kazbek | A real scan and review are still needed; no clean-security claim |

Likelihood uses 1 unlikely, 2 possible, 3 likely; impact uses 1 minor, 2 moderate, 3 serious. A confirmed finding can support a future risk without proving that the bad event already happened. R1 includes the extra-room mismatch as evidence of scope drift, not as a separate high-impact incident.

---

### 4.2 The top two for action

1. **R1** — 3 × 3 = 9. Several explicit instructions invite forbidden actions if an agent follows the file literally. Public publication or real-data use could have a serious cost. This is the lab's instruction-following scenario; I did not prove access to deployment credentials or run such an action.
2. **R2** — 3 × 2 = 6. The same simple edit can reproduce stale feedback every time. A wrong availability answer has a moderate cost in this fictional demo. Static state flow and the failing real UI test support this score. No confirmed risk left out has a score above 6.

---

## 5. Task 5 — the agent-readiness audit

The table describes the final files. At baseline, 3c and 3d were no; the real page regression and the new output requirement make them yes. This does not change the level because Level 1 is still below 80%.

---

### 5.1 The rows

| Row | What | yes / no | Evidence |
| --- | --- | --- | --- |
| 1a | Formatter | no | No Prettier dependency or configuration in app/ |
| 1b | Linter | no | No ESLint dependency/configuration; npm run lint was missing |
| 1c | Type checks | yes | tsconfig.json, typescript dependency; npm run build runs tsc successfully |
| 1d | Unit tests | yes | Vitest and src/booking.test.ts; original 19 numeric-rule tests |
| 1e | Pinned dependencies (lockfile) | yes | Committed package-lock.json; locked install used |
| 2a | .env.example | no | Missing; this local app has no environment settings or external services |
| 2b | Architecture notes | yes | AGENTS.md Project maps booking.ts, availability.ts, App.tsx and booking.test.ts |
| 2c | AGENTS.md | yes | app/AGENTS.md exists and has the approved minimal patch |
| 3a | CI | no | No .github/workflows job in this branch |
| 3b | Pre-commit hooks | no | No .husky, lint-staged, simple-git-hooks or pre-commit configuration |
| 3c | Integration checks | yes | R2 test renders the real App, dispatches DOM events and calls the real booking module |
| 3d | Reviewable evidence | yes | AGENTS.md requires real output before acceptance; final-tests.txt and final-build.txt are attached to this branch and PR |

3d is a documented manual gate backed by this change's real logs. It is not an enforced CI or PR-template gate. I would check a future change's logs again.

---

### 5.2 The level and the gaps

**Level:** 0

**Missing evidence for the next level:**

Level 1 has 3/5 rows, 60%. At least one real formatter or linter setup is needed for 4/5 and Level 1; adding an empty file would not be useful. Level 2 has 2/3, about 67%, because .env.example is missing. Level 3 has 2/4, 50%, because CI and hooks are missing. Higher levels cannot be reached before every lower level is reached.

There is no app README, so I cannot call its setup guide accurate. The task README is unchanged and matches this lab; the module map in AGENTS is accurate after the refactor. The layout is small and clear: App.tsx renders the form, availability.ts maps form values to feedback, booking.ts owns numeric rules, and booking.test.ts tests both. Missing readiness files remain findings; I did not create unused configuration to raise the score.

---

## 6. Task 6 — the agent playbook

The full-task instruction authorized implementation and review decisions. Codex made the decision table under that scope; there was no separate human per-line confirmation. The original provided/AGENTS.md was never changed.

---

### 6.1 The playbook prompt and the answer

What I sent, exactly:

```text
Review AGENTS.md and project documentation only. Compare them with these constraints: one fictional room; no login/database; preserve AC1–AC6; no secrets; no external deployments; run tests before proposing acceptance. Report missing or conflicting rules. Draft a minimal patch to AGENTS.md, but wait for my approval before applying it.
```

The assistant's whole draft answer, unedited:

```text
I reviewed AGENTS.md and the assignment documentation. The app has no README. I have not applied this draft.

The real-timetable instruction conflicts with the single fictional room. AC4 wrongly rejects endpoint contact, AC6 is missing, and the test command is not the one in the recorded package scripts. Broad file and package permissions do not limit an agent to a reviewed task. The Supabase/login line conflicts with scope. There is no explicit secrets rule. The final deployment line conflicts with the ban on external deployments, and a successful build alone is not enough for acceptance.

My minimal draft keeps every heading and the existing module map. Replace the realism sentence with: Use one fictional room and fictional bookings; never use real names or timetables.
Replace AC4 with: Reject overlaps; allow bookings that only touch at endpoints.
Add AC6: Preserve clear UI feedback on desktop and mobile.
Replace the test command with npm test.
Replace the three permission lines with: Edit only files covered by the approved task; preserve AC1–AC6 and show the diff. Do not add packages without approval; keep production dependencies unchanged. Do not add a login, database or persistence.
Add: Never read, store or transmit secrets, passwords, API keys or personal data.
Replace the page-load-only finish rule with: Run npm test and npm run build; both must pass before acceptance, and their real output must be attached.
Replace the deployment rule with: Never deploy or publish externally; do not run deployment commands.

Do not add CI, a backend or a new architecture in this policy patch. Review these ten changed nonblank lines before applying them. The module map can gain one short line later if a reviewed pure form module is added. I am waiting for the delegated review decision; this is only a draft.
```

---

### 6.2 Findings and my decisions

| # | Rule or line in AGENTS.md | Missing / conflicting | Decision | Why |
| --- | --- | --- | --- | --- |
| 1 | Real room names and timetable | Conflicts with fictional one-room scope | approve | Replace it with one fictional room and no real names/timetables |
| 2 | AC4 counts endpoint contact as overlap | Conflicts with the real AC4 | approve | Endpoint contact must remain allowed, as the tests already show |
| 3 | No AC6 line | Missing clear-feedback rule | approve | Add AC6 without changing the other acceptance rules |
| 4 | npm run test:unit | Script does not exist | approve | Use npm test, verified in package.json and the baseline |
| 5 | Edit any file | No task boundary | approve | Limit edits to the approved task and require a diff |
| 6 | Add any package when needed | No review gate | modify | Require approval and keep production dependencies unchanged; approve only jsdom for the earlier test setup |
| 7 | Supabase and login suggestion | Conflicts with no database/login | approve | Forbid login, database and persistence |
| 8 | No secrets rule | Missing explicit prohibition | approve | Add a rule against reading, storing or sending secrets/personal data |
| 9 | Page loads and build succeeds | Missing test-before-acceptance gate | approve | Require passing npm test/build and their real output |
| 10 | Netlify production deployment | Conflicts with no external publication | approve | Forbid deployment commands instead of changing the provider |
| 11 | Existing module map | New pure module must be documented | approve | Add one short line only when availability.ts is created |
| 12 | CI/linter/formatter expansion | Outside these two focused mitigations | reject | Keep the gaps visible in the readiness audit; do not rewrite the playbook |

The first policy commit changes ten nonblank lines. The later approved module-map line makes eleven in total, below the fourteen-line limit. All original headings remain.

---

### 6.3 The approved patch

The actual initial approved diff, committed as 9c41c93:

```diff
diff --git a/week-10/app/AGENTS.md b/week-10/app/AGENTS.md
index b786d88..2935d36 100644
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ -9,30 +9,32 @@ A React + TypeScript page (Vite) that tells a student whether a campus room is f
 requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
 the tests are in `src/booking.test.ts`.
 
-For realism, use real room names and the real timetable from the KBTU portal.
+Use one fictional room and fictional bookings; never use real names or timetables.
 
 ## Acceptance contract
 
 - AC1 Reject start ≥ end and requests in the past.
 - AC2 Enforce the maximum allowed duration (120 minutes).
 - AC3 Reject a blocked room.
-- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
+- AC4 Reject overlaps; allow bookings that only touch at endpoints.
 - AC5 Return Available / Unavailable without changing booking data.
+- AC6 Preserve clear UI feedback on desktop and mobile.
 
 ## Commands
 
 - Install: `npm install`
 - Dev server: `npm run dev`
-- Tests: `npm run test:unit`
+- Tests: `npm test`
 - Build: `npm run build`
 
 ## You may
 
-- Edit any file in the project.
-- Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
+- Edit only files covered by the approved task; preserve AC1–AC6 and show the diff.
+- Do not add packages without approval; keep production dependencies unchanged.
+- Do not add a login, database or persistence.
+- Never read, store or transmit secrets, passwords, API keys or personal data.
 
 ## Before you finish
 
-- Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Run `npm test` and `npm run build`; both must pass before acceptance, and their real output must be attached.
+- Never deploy or publish externally; do not run deployment commands.
```

The one-line architecture follow-up is shown in the R2 diff in section 8.2. Final total: 11 changed nonblank lines.

---

## 7. Task 7 — verify safely

Verification distinguishes a genuine red test, a green final suite and browser evidence.

---

### 7.1 The regression test fails before the mitigation

The risk it covers: **R2**. The original 19 tests stayed intact. One approved development-only dependency, jsdom 26.1.0, lets the new test render App.tsx with real React events. It does not mock canBook. The refactor itself adds no dependencies. The real run was made before the R2 code change and committed as 87270fb:

```text

> smart-campus-availability@0.0.0 test
> vitest run

10:26:05 AM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
10:26:05 AM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/week-10/app

 ❯ src/booking.test.ts (20 tests | 1 failed) 72ms
   × R2 AC6: editing form inputs must not keep stale Available feedback 62ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > R2 AC6: editing form inputs must not keep stale Available feedback
AssertionError: expected 'Available' to be 'Unavailable' // Object.is equality

Expected: "Unavailable"
Received: "Available"

 ❯ src/booking.test.ts:122:24
    120|     const times = host.querySelectorAll<HTMLInputElement>('input[type=…
    121|     await setTime(times[2], '10:30');
    122|     expect(feedback()).toBe('Unavailable');
       |                        ^
    123|     expect(host.querySelector('.error')?.textContent).toBe('The end ti…
    124|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 19 passed (20)
   Start at  10:26:05
   Duration  879ms (transform 85ms, setup 0ms, import 174ms, tests 72ms, environment 464ms)
```

---

### 7.2 The manual UI check

| View | Width | What I checked | Result | Screenshot |
| --- | --- | --- | --- | --- |
| Desktop | 1280 px | Default available slot; blocked toggle; changed End; empty End; 24:00; labels and horizontal bounds | pass in automated Chromium; screenshot visually inspected by Codex | `evidence/ui-desktop.png` |
| Mobile | 390 px | Same input sequences; reversed End message; stacked controls; no clipped text or horizontal overflow | pass in automated Chromium; screenshot visually inspected by Codex | `evidence/ui-mobile.png` |

The screenshots are real local browser captures, not generated images. There were nine checks at each width and no page JavaScript errors. ui-check.json contains the measured control bounds and results. This replaces the requested by-hand UI step with automation and AI visual inspection, as I requested no manual participation. I do not claim a human manual check or a physical phone test.

---

### 7.3 Tests and checks I did not run

- A human by-hand UI check and a physical-phone check were not run. I used automated Chromium at two sizes and Codex inspected the screenshots.
- npm audit or another dependency security scan was not run. R6 stays plausible; I do not claim a clean security review.
- A working linter, formatter, CI pipeline and pre-commit hook were not run because they do not exist. The attempted missing lint command is recorded.
- Firefox, WebKit, screen-reader and full accessibility checks were not run. These two Chromium widths are a limited UI check.
- No real KBTU timetable, login/database integration, external preview or deployment was tested. Those are outside scope and the patched playbook forbids them.
- The optional fresh-chat refactor comparison and optional checklist prompt were not run. No background agent was launched for this lab.

---

## 8. Task 8 — mitigate two risks

Both confirmed risks are handled separately. The log preserves the failing R2 test before its production fix.

---

### 8.1 The first mitigation

**Risk:** R1

This is the playbook and scope mitigation, not the pure-module refactor. Its refactor-prompt field is intentionally empty.

**Problem → pattern → benefit:**

**What I rejected from the agent's patch, and why:**

I rejected the original directions to obtain real data, add services and deploy because they conflict with the task. I also rejected a full playbook rewrite and unrelated tool setup; a small reviewed patch can state the required boundaries. The only source scope correction removes the second fictional room option and keeps the same form controls.

The diff I approved (`git diff`), saved before the corresponding commits:

```diff
diff --git a/week-10/app/AGENTS.md b/week-10/app/AGENTS.md
index b786d88..2935d36 100644
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ -9,30 +9,32 @@ A React + TypeScript page (Vite) that tells a student whether a campus room is f
 requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
 the tests are in `src/booking.test.ts`.
 
-For realism, use real room names and the real timetable from the KBTU portal.
+Use one fictional room and fictional bookings; never use real names or timetables.
 
 ## Acceptance contract
 
 - AC1 Reject start ≥ end and requests in the past.
 - AC2 Enforce the maximum allowed duration (120 minutes).
 - AC3 Reject a blocked room.
-- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
+- AC4 Reject overlaps; allow bookings that only touch at endpoints.
 - AC5 Return Available / Unavailable without changing booking data.
+- AC6 Preserve clear UI feedback on desktop and mobile.
 
 ## Commands
 
 - Install: `npm install`
 - Dev server: `npm run dev`
-- Tests: `npm run test:unit`
+- Tests: `npm test`
 - Build: `npm run build`
 
 ## You may
 
-- Edit any file in the project.
-- Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
+- Edit only files covered by the approved task; preserve AC1–AC6 and show the diff.
+- Do not add packages without approval; keep production dependencies unchanged.
+- Do not add a login, database or persistence.
+- Never read, store or transmit secrets, passwords, API keys or personal data.
 
 ## Before you finish
 
-- Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Run `npm test` and `npm run build`; both must pass before acceptance, and their real output must be attached.
+- Never deploy or publish externally; do not run deployment commands.
diff --git a/week-10/app/src/App.tsx b/week-10/app/src/App.tsx
index 2bb53e7..324efb5 100644
--- a/week-10/app/src/App.tsx
+++ b/week-10/app/src/App.tsx
@@ -10,7 +10,6 @@ type Room = { id: string; name: string; blocked: boolean; bookings: Interval[] }
 
 const ROOMS: Room[] = [
   { id: 'a101', name: 'Room A-101', blocked: false, bookings: [{ start: 600, end: 660 }] },
-  { id: 'b204', name: 'Room B-204', blocked: false, bookings: [] },
 ];
 
 const toMinutes = (value: string) => {
```

Policy commit: 9c41c93. One-room alignment commit: f1f3c0c. The playbook is a rule, not a technical barrier against all future misuse.

---

### 8.2 The second mitigation

**Risk:** R2

The exact refactor prompt:

```text
Refactor the availability logic into a small, pure module, keeping the existing function inputs, outputs, and UI behavior. Use a pattern only if the identified design problem justifies it. Do not add new features or dependencies. Show the files you plan to edit before making changes.
```

The complete planning answer before source edits:

```text
Planned files, before applying changes: src/availability.ts (new pure form-to-result module), src/App.tsx (use that module and derive feedback from current inputs), and one module-map line in AGENTS.md. I will not change src/booking.ts, its numeric canBook API, existing assertions, package.json or the lockfile in this refactor.

The design problem is independently stored result/error state that drifts from the current form. Extract a pure function for conversion and feedback, and keep only hasChecked in React state. The visible labels, default values, booking fixture and numeric availability rules remain the same. Correcting stale feedback after edits is the intended R2 bug fix. No Strategy or Adapter is justified by one input shape and one fixed policy.

The proposed diff is saved for review before application. The test-only DOM dependency was approved and committed earlier; this production refactor adds no dependency. The existing 19 contract tests must remain green and the red R2 UI test must turn green.
```

**Problem → pattern → benefit:** The form stored result and error separately from the current inputs, so an edit could leave a false available answer. I used Extract Function into a pure module and derived feedback from current inputs after the first check, which removes that state drift while keeping canBook's inputs, outputs and rules unchanged.

**What I rejected from the agent's patch, and why:**

I rejected Strategy/Adapter classes, broad renaming, a room catalog, a UI redesign and package upgrades because one input shape and one fixed policy do not need them. The approved patch changes only App.tsx, adds availability.ts and adds its map line in AGENTS.md. Existing labels, initial values and button results stay the same. Feedback after an edit is intentionally corrected; I do not claim that the old stale behaviour is preserved.

The diff I approved (`git diff`), including the actual new-file diff:

```diff
diff --git a/week-10/app/AGENTS.md b/week-10/app/AGENTS.md
index 2935d36..9558333 100644
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ -8,6 +8,7 @@ anything, and follow it over any general habit of yours.
 A React + TypeScript page (Vite) that tells a student whether a campus room is free for a
 requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
 the tests are in `src/booking.test.ts`.
+Form conversion and feedback live in the pure `src/availability.ts` module.
 
 Use one fictional room and fictional bookings; never use real names or timetables.
 
diff --git a/week-10/app/src/App.tsx b/week-10/app/src/App.tsx
index 324efb5..61fe60b 100644
--- a/week-10/app/src/App.tsx
+++ b/week-10/app/src/App.tsx
@@ -1,9 +1,5 @@
 import { useState } from 'react';
-import { canBook } from './booking';
-
-// Starter for students with no Week 06 project. The availability decision lives INSIDE this
-// component on purpose: Task 1 of Practice #07 is to extract it into src/booking.ts as
-// canBook({ start, end, now, blocked, bookings }) without changing what the page does.
+import { evaluateAvailability } from './availability';
 
 type Interval = { start: number; end: number };
 type Room = { id: string; name: string; blocked: boolean; bookings: Interval[] };
@@ -12,10 +8,6 @@ const ROOMS: Room[] = [
   { id: 'a101', name: 'Room A-101', blocked: false, bookings: [{ start: 600, end: 660 }] },
 ];
 
-const toMinutes = (value: string) => {
-  const [h, m] = value.split(':').map(Number);
-  return h * 60 + m;
-};
 const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
 
 export default function App() {
@@ -25,28 +17,16 @@ export default function App() {
   const [start, setStart] = useState('11:00');
   const [end, setEnd] = useState('12:00');
   const [endOfDay, setEndOfDay] = useState(false);
-  const [result, setResult] = useState<boolean | null>(null);
-  const [error, setError] = useState('');
+  const [hasChecked, setHasChecked] = useState(false);
 
   const room = ROOMS.find(r => r.id === roomId)!;
 
-  function check() {
-    setResult(null);
-    if (!start || !now || (!end && !endOfDay)) {
-      setError('Fill in the current time, the start and the end.');
-      return;
-    }
-    const s = toMinutes(start);
-    const e = endOfDay ? 1440 : toMinutes(end);
-    const n = toMinutes(now);
-    if (!(s < e)) {
-      setError('The end time must be after the start time.');
-    } else {
-      setError('');
-    }
+  const { available: result, error } = hasChecked
+    ? evaluateAvailability({ start, end, now, endOfDay, blocked, bookings: room.bookings })
+    : { available: null, error: '' };
 
-    const ok = canBook({ start: s, end: e, now: n, blocked, bookings: room.bookings });
-    setResult(ok);
+  function check() {
+    setHasChecked(true);
   }
 
   return (
diff --git a/week-10/app/src/availability.ts b/week-10/app/src/availability.ts
new file mode 100644
index 0000000..f840195
--- /dev/null
+++ b/week-10/app/src/availability.ts
@@ -0,0 +1,30 @@
+import { canBook, type Booking } from './booking';
+
+type AvailabilityInput = {
+  start: string;
+  end: string;
+  now: string;
+  endOfDay: boolean;
+  blocked: boolean;
+  bookings: Booking[];
+};
+
+type AvailabilityFeedback = { available: boolean | null; error: string };
+
+const toMinutes = (value: string) => {
+  const [h, m] = value.split(':').map(Number);
+  return h * 60 + m;
+};
+
+export function evaluateAvailability({ start, end, now, endOfDay, blocked, bookings }: AvailabilityInput): AvailabilityFeedback {
+  if (!start || !now || (!end && !endOfDay)) {
+    return { available: null, error: 'Fill in the current time, the start and the end.' };
+  }
+  const s = toMinutes(start);
+  const e = endOfDay ? 1440 : toMinutes(end);
+  const n = toMinutes(now);
+  return {
+    available: canBook({ start: s, end: e, now: n, blocked, bookings }),
+    error: s < e ? '' : 'The end time must be after the start time.',
+  };
+}
```

Commit f297dac contains this fix and its green verification. src/booking.ts is byte-for-byte unchanged from the checkpoint, and all original test bodies remain intact. source-invariants.json records those comparisons. The only added package is the earlier, explicitly approved jsdom test environment; production dependencies and this refactor's package files are unchanged.

---

### 8.3 The residual risk

| ID | L before | I before | Score before | L after | I after | Score after | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | 3 | 3 | 9 | 1 | 3 | 3 | Policy matches C1–C6, commands exist and browser shows one fictional room; rules still need review and are not a deployment sandbox |
| R2 | 3 | 2 | 6 | 1 | 2 | 2 | Real R2 test changes from failure to pass; full suite 20/20; both browser widths also update feedback after edits |

I reduced likelihood because the direct causes were removed and verified. Impact stays the same if a similar mistake returns. R3, R4 and R5 remain at 4; R6 is still plausible at 2. There is no remaining confirmed score of 6 or more, but that alone does not make the repository agent-ready.

---

### 8.4 The final run

The real output of the full final suite, after both mitigations:

```text

> smart-campus-availability@0.0.0 test
> vitest run

10:27:25 AM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
10:27:25 AM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/week-10/app


 Test Files  1 passed (1)
      Tests  20 passed (20)
   Start at  10:27:25
   Duration  886ms (transform 91ms, setup 0ms, import 183ms, tests 87ms, environment 458ms)
```

The full build and TypeScript check also passed:

```text

> smart-campus-availability@0.0.0 build
> tsc && vite build

vite v5.4.21 building for production...
transforming...
✓ 33 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.42 kB │ gzip:  0.28 kB
dist/assets/index-X8OGNIvT.css    0.66 kB │ gzip:  0.36 kB
dist/assets/index-BduALIhM.js   144.85 kB │ gzip: 46.64 kB
✓ built in 796ms
```

The plugin warnings remain visible. They are not failed tests and are not a clean-toolchain claim.

---

## 9. Task 9, and what still fails

The following rules describe a future background agent. No such agent was executed for this task.

---

### 9.1 A background agent on this project

| Rule | What I require |
| --- | --- |
| Isolation | Use a separate branch and worktree based on an agreed commit; never work in my active week-10 tree |
| Permitted files | Read app/AGENTS.md first; edit only the approved src/App.tsx, src/availability.ts, src/booking.ts or src/booking.test.ts paths and risk evidence |
| Commands | Use the lockfile for installation; run npm test and npm run build inside week-10/app; run both provided Python checkers inside week-10 |
| Prohibited actions | No credentials, real timetable, login, database, external deployment, unrelated package changes, other branches, deleted assertions or edited provided checkers |
| Required evidence | Attach the approved diff, risk IDs, real full test output, build result, failed-before evidence when fixing a defect, and a list of unrun checks |
| Before merging or deploying | Stop after reviewable commits or an open PR; require explicit human review before any merge; deployment remains forbidden by this assignment |

A background agent must report a command it could not run as missing or not run. It must never replace a failed log with a success claim.

---

### 9.2 Optional — the deck's checklist prompt (not graded)

Not run. I wrote the project-specific rules above with AI assistance. I did not send the optional checklist prompt, run a background agent or claim an unattended trial.

---

### 9.3 Checks I am keeping as FAIL or ERROR

| Check | Why it stays |
| --- | --- |
| none | The final audit checker has no FAIL or ERROR; submission.yml known_fails is empty |

Missing baseline scripts, Level 0 readiness, unrun security checks and the automated replacement for the manual UI step remain disclosed. A clean worksheet checker checks evidence and structure; it does not erase these limits.

---

## 10. Release decision and conclusion

**Decision:** CONDITIONAL

<!-- Write your conclusion below this line -->

I choose CONDITIONAL for a local fictional demo. R1 falls from 9 to 3 because the playbook now keeps one room, rejects outside services and requires real test output. R2 falls from 6 to 2 because feedback now follows the form; the new test first failed and then passed with all 19 original tests. The build also passes. I understand why touching bookings are allowed and why checking must not change booking data. I can explain this refactor and the risk scores. R3, R4 and R5 still need owners and review: there is no linter, CI or setup README. R6 is unverified. I require fresh test/build logs and human review before acceptance. These results do not approve automatic merging or external deployment.
