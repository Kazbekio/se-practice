# AI Usage Disclosure — Week 10

Student: Shynbulat Kazbek

Student ID: 24B032123

Date: 2026-11-20

AI-use level: D — AI-integrated. I asked Codex to carry out this lab and the GitHub work while I followed the process. I understand the availability rules, the risk scores and the release decision, and I can explain them. The exact model/version was not displayed. No other assistant or background agent was used for Week 10.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Codex | not displayed | Read-only risk review and explicit playbook read | No app file changed in that phase; whole answers saved in evidence/ai and the report |
| Codex | not displayed | Playbook audit, patch draft and delegated diff review | app/AGENTS.md; evidence/agents-approved.diff |
| Codex | not displayed | R1 one-room alignment and R2 failing regression | app/src/App.tsx, app/src/booking.test.ts, package.json and lockfile for the test-only jsdom environment |
| Codex | not displayed | R2 pure-module refactor and verification | app/src/availability.ts, app/src/App.tsx, one module-map line in app/AGENTS.md; no package change in the refactor |
| Codex | not displayed | Challenge table, scores, readiness audit, report, conclusion and declaration | lab-report.md, AI_USAGE.md, submission.yml, evidence/ |
| Codex with Chromium, git and GitHub CLI | not displayed | Actual browser interactions, screenshots, commands, commits, branch push and open PR | evidence/; only the authorized week-10 branch on GitHub |

**The review in Task 2 ran in a mode where the assistant could not edit, and git status showed no change afterwards:** yes — app source and directory write bits were removed for ordinary file operations. Before/after source hashes and clean app status match. Original modes were restored after the phase. This is a local permission gate, not protection against an owner deliberately restoring write permission. The same session was used; no fresh chat or automatic AGENTS loading is claimed.

**I labelled every claim in lab-report.md §3.2 after opening the cited file myself:** no — Codex opened the files, ran the checks and drafted the labels under my request. I followed and read the evidence in this session; I did not perform a separate unaided file-opening exercise.

**Every change to app/ was reviewed by me as a diff before I accepted it:** no separate human review step — Codex carried out the formal diff review under my instruction to complete the task. The proposed and approved diffs and decisions are saved. I followed the work. I did not give an extra human approval click for each patch. The declaration's playbook approval means delegated approval within my full-task instruction, not a later per-line human confirmation.

**I used another assistant as well:** no. All model answers came from this one Codex session. The exact prompts and complete generated answers are saved, not reconstructed as separate external chat calls.

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes. Code fences come from saved raw logs and actual diffs. Warnings and the red R2 failure are retained. Missing baseline commands are reported as missing, not passing. Browser results are real automated runs, not terminal text invented by the model.

**I can explain every score in my register, and why my release decision follows from it, without the assistant:** yes. I understand the difference between a confirmed finding and an unproved bad event. R1 concerns misleading agent instructions; R2 concerns stale form feedback. I understand why their residual likelihood is lower but their possible impact stays the same.

**Anything I accepted from the AI without fully understanding it:** none in the submitted availability rules and risk decisions, based on my understanding while following this work. I do not claim to know every internal detail of React, jsdom or Chromium. jsdom 26.1.0 was the only approved test dependency added before the regression; production dependencies stayed unchanged. The refactor added no package.

The by-hand UI step was replaced with automated Chromium interactions at 1280 and 390 pixels and Codex visual inspection of the genuine screenshots. No human manual UI test or physical phone test is claimed. The release conclusion was drafted with AI assistance; it is not claimed as unaided writing. R6 has no dependency advisory scan, and the app remains at readiness Level 0. No real timetable, external deployment, login or database was used.

Signed: Shynbulat Kazbek

Date: 2026-11-20
