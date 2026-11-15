# AI Usage Disclosure — Week 08

Name: Shynbulat Kazbek
Student ID: 24B032123
Date: 2026-11-15

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| OpenAI Codex | not displayed / plan not displayed | Plain diagnosis demonstration (Task 4), in this session | Evidence prompt and answer files; no app code during diagnosis |
| OpenAI Codex | not displayed / plan not displayed | Prompt-only bug-detector demonstration (Task 5), in the same session | Evidence prompt and answer files; no app code during diagnosis |
| OpenAI Codex | not displayed / plan not displayed | Setup, lock metadata repair, hypotheses, regression tests, the exact course skill, two minimal patches, real test and browser runs, report drafts, Git commits, push and PR | app/package-lock.json, app/src/booking.ts, app/src/booking.test.ts, skills/, evidence/, lab-report.md, AI_USAGE.md, submission.yml |

**skills/bug-detector/SKILL.md was typed by me from the deck's text, not generated:** no. Codex copied the exact supplied text and made the ZIP. I did not type the skill by hand.

**I applied the patches myself, one minimal change per bug, after reviewing what the assistant proposed:** no. Codex edited app/src/booking.ts directly. It changed the overlap condition for BUG-A, then deleted the push for BUG-B, in separate commits. I followed the line-by-line comparison and understand both changes.

**I used another assistant as well:** no. One Codex session completed the work. The two responses are a paired demonstration by that assistant, not independent fresh chats or separate model calls. No installed-skill badge was shown. This limits the comparison.

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes. The complete outputs are also saved under evidence/. The diagnosis uses one exact T01 failure excerpt from the real broken run. The short runs with -t select one regression test; the final full run has no filter and runs all 19 tests.

**I can explain both bugs and both fixes — which line, why it was wrong, which test proves the fix — without the assistant:** yes. I understand the difference between touching times and overlapping times. I also understand why checking availability must keep bookings unchanged, and why a failing early assertion can hide another defect. I can explain and defend this work.

**Anything I accepted from the AI without fully understanding it:** none for the two fixes and the 19 booking tests. The build tools were reused from Week 07; I did not inspect every line inside their dependencies.

The inherited package-lock.json contained incorrect platform metadata. Codex fixed only 27 entries that npm had marked extraneous. Package names, versions and integrity values stayed the same. The successful clean install and the real build are recorded in evidence/.

The screenshot evidence/install.png is a real Chromium capture of evidence/install.html, a clearly labelled local record of the prompt-only simulation. It is not a screenshot of an installed skill or a separate chat. The common input is byte-identical after the two questions. In submission.yml, same_input_both_chats is no because there were not two independent chats; the matching payloads alone do not satisfy that full step. The file evidence/diagnosis-manifest.json records the limits and the input hash.

Codex drafted all ten report sections, including the hypotheses and conclusion. I followed the work while it ran. The manual authorship and fresh-chat steps from the handout were automated or replaced, so I do not claim to have completed those steps exactly as written.

The supplied README.md, both buggy/ files and both Python checkers were kept unchanged. No optional second skill or MCP experiment was used.

Signed: Shynbulat Kazbek
Date: 2026-11-15
