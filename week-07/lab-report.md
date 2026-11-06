# Week 07 — Lab report

**Name:** Shynbulat Kazbek
**Group:** Monday 16:00 - 19:00
**Date:** 2026-11-06

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Project I continue (`week-06` = my Week 06 Bolt project, `starter` = the provided starter) | starter |
| Bolt project link (or `not shared`, and why) | not shared, because I used the provided starter |
| Assistant that generated the tests (tool) | OpenAI Codex |
| Exact model (with its version, or `not displayed`) | GPT-5 Codex |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | my computer |
| Vitest version (the `RUN  v…` line of a run) | 4.1.12 |
| Test command | `npm test` |

---

## 2. Task 1 — baseline and the booking function

**Before editing:** where did the booking decision live in the project you started from?

| | |
| --- | --- |
| File and function (or "inside the page component") | `src/App.tsx`, inside the `check` function in the page component |
| Its inputs | Converted start, end and current time, the blocked checkbox, and the selected room bookings |
| What it returned | It did not return a value; it made the local boolean `ok` |
| How the page used it | The page passed `ok` to `setResult` and showed Available or Unavailable |

**What I changed to extract `canBook`.** Say which file it now lives in, what you moved, and why
the behaviour did not change. Also say which file of the page now calls it. 40 words or more.

<!-- Write below this line -->

I created `src/booking.ts` and moved the interval, current-time, duration, blocked-room, and
overlap checks into `canBook`. I kept the conditions and their order the same, so the decision did
not change. `src/App.tsx` still converts the time fields to minutes, but now it imports and calls
`canBook` before it displays Available or Unavailable.

---

## 3. Task 2 — the test plan

Default fixture: `now = 540`, `blocked = false`, `bookings = [{ start: 600, end: 660 }]`, fresh
for every test. **The Expected column comes from AC1–AC4, never from the code.** Write the
**reason** for each expected result **before** you send the generation prompt.

| ID | Candidate / changed input | Expected | AC | Reason (in your words) |
| --- | --- | --- | --- | --- |
| T01 | 660–720 (touching after) | true | AC4 | The new interval starts when the old one ends, so they do not overlap. |
| T02 | 540–570 (starts now) | false | AC1 | The start must be later than 540, not equal to it. |
| T03 | 720–720 (zero duration) | false | AC1 | Start and end are equal, but AC1 requires start to be before end. |
| T04 | 750–720 (reversed) | false | AC1 | The start is later than the end, so the interval is invalid. |
| T05 | 1380–1441 (past day end) | false | AC1 | The end is one minute after 1440, outside the same day. |
| T06 | 720–840 (120 minutes) | true | AC2 | The duration is exactly 120 minutes, and AC2 rejects only a longer booking. |
| T07 | 720–841 (121 minutes) | false | AC2 | The duration is 121 minutes, which is over the limit. |
| T08 | 570–600 (touching before) | true | AC4 | The request ends exactly when the old booking starts, so there is no overlap. |
| T09 | 630–690 (partial overlap) | false | AC4 | The first 30 minutes are inside the existing 600–660 booking. |
| T10 | 570–690 (contains booking) | false | AC4 | The request covers the complete existing booking. |
| T11 | 615–645 (inside booking) | false | AC4 | The complete request is inside the existing booking. |
| T12 | 600–660 (identical interval) | false | AC4 | The request has the same start and end as the existing booking. |
| T13 | 660–720, blocked = true | false | AC3 | A blocked room must reject even a time interval that is otherwise valid. |
| T14 | 630–690, bookings = [] | true | AC4 | With an empty booking list there is nothing to overlap. |
| AC5 | an Available request — the bookings after the call equal the bookings before | true, data unchanged | AC5 | Checking availability must read the bookings but must not add, remove, or edit them. |
| X1 | 1320–1440, bookings = [] (ends at day boundary) | true | AC1, AC2 | End 1440 is allowed, the start is after now, and the duration is exactly 120 minutes. |
| X2 | 541–542, bookings = [] (one-minute request) | true | AC1 | A one-minute interval is after now and has start before end, so it is valid. |

X1 and X2 are **your own two cases**: a boundary or a state that T01–T14 do not reach. Fill all
five columns.

---

## 4. Task 3 — the generation prompt and the first suite

**The prompt exactly as I sent it.** Use the deck's prompt with `[our test framework]` replaced by
`Vitest`, followed by the case table from section 3:

```text
Generate tests for the existing booking function using Vitest. Use AC1–AC6 and the reviewed case table below.

Import the real function used by the page. Keep its code unchanged. Use fixed time and fresh fixtures. Assert exact decisions and unchanged booking data.

Return the test file, run command, and AC mapping. Flag unclear requirements. We will run the tests ourselves.

Case table:
T01 660–720 touching after, true, AC4.
T02 540–570 starts now, false, AC1.
T03 720–720 zero duration, false, AC1.
T04 750–720 reversed, false, AC1.
T05 1380–1441 past day end, false, AC1.
T06 720–840 exactly 120 minutes, true, AC2.
T07 720–841 is 121 minutes, false, AC2.
T08 570–600 touching before, true, AC4.
T09 630–690 partial overlap, false, AC4.
T10 570–690 contains booking, false, AC4.
T11 615–645 inside booking, false, AC4.
T12 600–660 identical interval, false, AC4.
T13 660–720 with blocked true, false, AC3.
T14 630–690 with empty bookings, true, AC4.
AC5 available 660–720 request leaves bookings unchanged, true and data unchanged, AC5.
X1 1320–1440 with empty bookings, true, AC1 and AC2.
X2 541–542 with empty bookings, true, AC1.
```

**The assistant's answer: run command, AC mapping and any unclear requirements it flagged,
pasted unedited.** Its test file goes to `suites/first/` and is not pasted here:

```text
Test file: booking.test.ts

Run command:
npx vitest run

AC mapping:
- AC1: T02, T03, T04, T05
- AC2: T06, T07
- AC3: T13
- AC4: T01, T08, T09, T10, T11, T12, T14
- AC5: AC5
- AC6: not covered by this unit suite; check the page by hand

Unclear requirement:
AC1–AC6 do not define what to do when an existing booking is invalid, such as an end before its start.
```

The first suite was saved to `suites/first/` **before** I changed anything in it: yes

---

## 5. Task 4 — review of the first suite

Review it **before** you run it. Look at the imports, the expected values, isolation, duplicates
and skipped tests. Make one row per decision. At least **two** rows, and each one names the kind of
weakness (the deck's table: *no exception occurred* · *expected = current output* · *only valid
requests* · *mocked booking function*, or your own) and the AC that decides it.

| # | Test or part of the suite | What is weak or wrong | Decision: accept / revise / reject | AC or reason |
| --- | --- | --- | --- | --- |
| 1 | Import and test target | It imports the real `canBook` from `./booking` and does not mock it. | accept | The tests exercise the same function that `App.tsx` calls. |
| 2 | T01–T14 | The inputs and exact `toBe(true/false)` results match the reviewed plan. | accept | AC1–AC4 decide these results, and each test gets a fresh booking array. |
| 3 | AC5 test | It checks only the decision and never compares bookings before and after the call. | revise | AC5 says an availability check must not change existing data. |
| 4 | X1 and X2 | Both planned boundary cases are missing from the generated file. | reject | AC1 boundaries at 1440 and a one-minute interval need direct tests. |

---

## 6. Task 5 — running, diagnosing, improving

### 6.1 The first run

The **real** terminal output of the first run of the first suite, pasted unedited. Include the
`RUN  v…` line and the `Tests` summary line. A build message or the assistant saying "tests pass"
is not a run.

```text
RUN  v4.1.12 /home/nqmvl/se-practice/week-07/app

Test Files  1 passed (1)
     Tests  15 passed (15)
```

**Each failure, diagnosed** (the deck's table: import/runner error · assertion mismatch · result
changing per run · no tests discovered). Write `none` in the first row if nothing failed.

| Failing test | Observed failure | First check | Test repair or implementation fix? | Action taken |
| --- | --- | --- | --- | --- |
| none | No failure; all 15 generated tests passed. | I still compared the suite with the plan and ACs. | Test repair | I kept correct expectations, added the missing cases, and strengthened AC5. |

### 6.2 The improvement prompt

The deck's improvement prompt exactly as sent, followed by the actual output from 6.1. Then
paste the assistant's answer, unedited:

```text
Review this test suite against AC1–AC6 and our case table. Identify incorrect expectations, weak assertions, duplicated cases, and missing boundaries.

For each proposed change, explain the requirement and the defect it could detect. Improve the tests without changing correct expectations to match buggy behavior.

Use the actual failure output below. Separate test repairs from implementation fixes.

RUN  v4.1.12 /home/nqmvl/se-practice/week-07/app

Test Files  1 passed (1)
     Tests  15 passed (15)

Assistant answer:

Test repairs:
1. Keep the T01–T14 expectations. They match the case table and use exact boolean assertions.
2. Revise AC5. Copy the bookings before an Available call and compare the array after the call. This can detect code that changes existing data while checking availability.
3. Add X1 for 1320–1440 with no bookings. AC1 allows end = 1440 and AC2 allows exactly 120 minutes. This can detect an incorrect end-of-day boundary.
4. Add X2 for 541–542 with no bookings. AC1 allows a positive one-minute interval after now. This can detect a rule that requires a longer minimum duration.

Incorrect expectations: none found.
Duplicated cases: none found.

Implementation fixes:
None. The actual output is green and no correct test shows a defect in canBook.
```

### 6.3 The final run

The **real** output of the final suite (`booking.test.*` beside your module), after every
change and after restoring the correct code from section 7. Every test must pass. If a real defect
is still open, leave its test failing and explain it in 9.1.

```text
RUN  v4.1.12 /home/nqmvl/se-practice/week-07/app

Test Files  1 passed (1)
     Tests  17 passed (17)
```

---

## 7. Task 6 — deliberate defects

You need a reviewed, passing suite first. Then introduce **one** defect at a time in your booking
module, leave the tests unchanged, run, record, and **restore** the code. A syntax or import
error does not count as detection.

| Trial | Intentional change | Detected / Survived | Failing test ID(s) | If it survived: why, and what you added |
| --- | --- | --- | --- | --- |
| M1 | Reject duration >= 120 instead of > 120 | Detected | T06, X1 | Not applicable; both exact 120-minute cases failed. |
| M2 | Treat touching endpoints as an overlap | Detected | T01, T08, AC5 | Not applicable; both endpoint directions failed. |
| M3 | Remove the blocked-room rejection | Detected | T13 | Not applicable; the blocked-room test failed. |

**The run of each mutant, pasted unedited.** Paste the `Tests` summary line and the failing test
names at least:

```text
M1
RUN  v4.1.12 /home/nqmvl/se-practice/week-07/app
❯ src/booking.test.ts (17 tests | 2 failed) 9ms
    × T06 AC2: exactly 120 minutes is allowed 4ms
    × X1 AC1 AC2: an interval may end exactly at 1440 0ms
Test Files  1 failed (1)
     Tests  2 failed | 15 passed (17)

M2
RUN  v4.1.12 /home/nqmvl/se-practice/week-07/app
❯ src/booking.test.ts (17 tests | 3 failed) 9ms
    × T01 AC4: touching after is allowed 5ms
    × T08 AC4: touching before is allowed 1ms
    × AC5: an available check does not change existing bookings 0ms
Test Files  1 failed (1)
     Tests  3 failed | 14 passed (17)

M3
RUN  v4.1.12 /home/nqmvl/se-practice/week-07/app
❯ src/booking.test.ts (17 tests | 1 failed) 8ms
    × T13 AC3: a blocked room is rejected 4ms
Test Files  1 failed (1)
     Tests  1 failed | 16 passed (17)
```

All three changes reverted, and the full suite run again (section 6.3): yes

---

## 8. Task 7 — manual UI checks

Use `now = 09:00` and an existing `10:00–11:00` booking. Do them in the page in a browser. Save a
screenshot of each as `evidence/ui-1.png` … `evidence/ui-5.png`. Take **ui-4 at phone width**
(about 375 px, portrait).

| # | Action | Expected observation | AC | What I observed | Pass / Fail / Not testable |
| --- | --- | --- | --- | --- | --- |
| U1 | Check 11:00–12:00, unblocked | Available, with the fixed sample booking | AC5 | The green Available result appeared and 10:00–11:00 stayed in the list. | Pass |
| U2 | Enable blocked, then check again | Unavailable replaces the earlier result | AC3, AC5 | The earlier result changed to the red Unavailable result. | Pass |
| U3 | Clear a required input and submit | Understandable validation feedback | AC6 | The page said: “Fill in the current time, the start and the end.” | Pass |
| U4 | Use a narrow (phone) width | Controls and result remain usable | AC6 | At 375 px, controls formed one readable column and the button and result worked. | Pass |
| U5 | Repeat the checks on the same data | Existing bookings remain unchanged | AC5 | After two more checks, the list still showed only 10:00–11:00. | Pass |

---

## 9. Comparison and what still fails

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | The final checker run has no FAIL or ERROR. |

### 9.2 Original and improved suites

| Measure | First suite | Improved suite |
| --- | --- | --- |
| Executed / passed / failed | 15 / 15 / 0 | 17 / 17 / 0 |
| Requirements with meaningful tests (AC IDs and gaps) | AC1–AC4; AC5 checked only the decision, AC6 was outside the unit suite, and X1/X2 were missing. | AC1–AC5 plus X1/X2; AC6 was checked in the browser. |
| Selected mutants detected | Not run on this copy; T06, T01/T08, and T13 suggest it could detect M1–M3. | 3/3 actually detected: M1, M2, and M3. |
| Accepted / revised / rejected tests | The generated file was frozen before decisions. | 2 parts accepted, AC5 revised, and the omission of X1/X2 rejected. |
| Remaining limitations | No data-preservation assertion and no two own boundaries. | Invalid existing bookings are not defined; unit tests do not prove every UI or accessibility detail. |

### 9.3 What no AC decides

Call your function with `bookings = [{ start: 700, end: 650 }]` (a reversed existing booking)
and a request of 660–720. What does it return? Does any AC say what it should return? (This is
the value you declare in `submission.yml` under `assumptions.invalid_existing_booking`.)

- With `bookings = [{ start: 700, end: 650 }]` and request 660–720, `canBook` returned `true`.
  The overlap condition sees no overlap because 660 is not below 650. No AC says whether existing
  data must first be validated. Returning false or throwing could also be a reasonable product
  choice, but the current behavior is `returns-true`.

---

## 10. Conclusion (120–180 words)

<!-- Answer all three in your own words, without the assistant:
     (a) Which mistake in the FIRST suite would have let a wrong canBook pass, and how did you find it?
     (b) What does your final green run prove, and what does it NOT prove? Use a mutant or a UI check.
     (c) One testing limitation that remains.
     Worthless: "The AI wrote good tests and they all passed."
     Worth everything: "The first suite expected T06 (exactly 120 minutes) to be rejected. That
     contradicts AC2, and it failed on a correct canBook. If I had changed the code to make it
     pass, M1 would have become the real behaviour." -->

<!-- Write your conclusion below this line -->

The first suite had a green run, but it did not really test AC5 data preservation. Its AC5 test
only checked that `canBook` returned true. A version that changed bookings and still returned true
could pass. I found this by reading the assertion against AC5 before running it. The suite also
omitted X1 and X2, including the 1440 boundary. I revised AC5 to copy and compare bookings and
added both cases.

The final 17-test green run proves the listed inputs follow AC1–AC5 and that the real function is
imported. The mutant runs give stronger evidence: M1 failed T06 and X1, M2 failed the touching
tests, and M3 failed T13. The green run does not prove the page layout or messages, so I checked
them in the browser, including 375 px width. One limitation remains: no AC defines invalid existing
bookings. The current function returns true for a reversed 700–650 booking, but another valid
design could reject it or throw.
