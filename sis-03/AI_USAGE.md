# AI Usage Disclosure — SIS #03

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched | Reused from |
| --- | --- | --- | --- | --- |
| ChatGPT (web) | GPT-5.5 Instant | the plan (stage A) | recorded in `report.md`; original prompt was not preserved | week-05 |
| ChatGPT (web) | GPT-5.5 Instant | Python v1 (stage B) | `code/original/booking_v1.py` | week-05 |
| Bolt.new | GLM 5.3 Flash | web prototype v1 (stage B) | `web/original/` | week-06 |
| Codex | GPT-5 | critique (stage C) and report drafting | `report.md`, `AI_USAGE.md` | this SIS |
| Codex | GPT-5 | repair, tests, build, browser runs, evidence (stage D) | `code/`, `web/final/`, `evidence/`, `submission.yml` | this SIS |

**The assistant wrote, or helped write, my tests in `code/`:** yes. The Week 05 assistant helped with the test suite. For this SIS, Codex checked every expected result directly against AC1–AC5 before running the implementation and mutation checker.
<!-- Either answer is allowed. If "yes": say which tests, and how you checked that their EXPECTED
     values come from AC1–AC5 and not from what the generated code happens to return. -->

**`code/original/` and `web/original/` hold the AI's first versions exactly as returned:** yes. They were copied byte-for-byte from the Week 05 and Week 06 branches and compared before the reuse commit.

**Every result in report.md section 5 was actually run or seen, not assumed:** yes. Python results came from executable calls; final page results came from Firefox WebDriver. The v1 page fixture limitation was observed in Week 06 and checked again in its exported room data and UI.

**Everything I submitted, I can explain and defend in class — including the overlap condition
and what the agent did in section 9:** not yet. The owner did not independently review the completed work in this session, so a defence still requires owner review.

**Anything I accepted from the AI without fully understanding it:**
The owner has not confirmed independent understanding of `web/final/src/App.tsx` and `web/final/src/lib/availability.ts`. Codex verified the lines with the build, source review, Python suite, and browser cases, but that is not a substitute for owner understanding.

Signed: Shynbulat Kazbek
Date: 2026-11-06
