# AI Usage Disclosure — Week 07

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| OpenAI Codex | GPT-5 Codex | the first test suite (Task 3) | `suites/first/booking.test.ts`, first copy of `app/src/booking.test.ts` |
| OpenAI Codex | GPT-5 Codex | the improvement prompt and review (Task 5) | `app/src/booking.test.ts`, `lab-report.md` |
| OpenAI Codex | GPT-5 Codex | extraction, report text, test runs, mutants, UI checks, and declaration | `app/src/booking.ts`, `app/src/App.tsx`, `lab-report.md`, `evidence/`, `AI_USAGE.md`, `submission.yml` |

**I used an assistant to extract `canBook` (Task 1), or to fix a defect in it:** yes
<!-- If "yes": which change, in which file, and how you checked that the behaviour did not change. -->

Codex moved the existing decision conditions from `app/src/App.tsx` to `app/src/booking.ts` in the
same order. I checked it with a production build, the final 17-test run, and five page checks.

**I used another assistant as well (to explain a failure, to draft text in lab-report.md, …):** no
<!-- If "yes": which one, the exact model, and for which section. -->

**`suites/first/` holds the assistant's first test file exactly as it generated it:** yes

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**I can explain every test in my final suite — its input, its expected result and the AC behind
it — without the assistant:** yes

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the part. An honest entry here costs far less than a blank one that turns out to be untrue. -->

None. Each final test has a reviewed case ID, a fixed input, an exact result, and an AC reason.

Signed: Shynbulat Kazbek
Date: 2026-11-06
