# SIS #03 — Report: Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 13.) and every
     ### sub-heading, and the **Label:** words — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and reuse

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Reuse: week-05 if code/original/booking_v1.py is your Week 05 v1, copied unedited;
     week-06 if web/original/ is your Week 06 v1 export; fresh if you generated it for this SIS. -->

| Item | Value |
| --- | --- |
| Coding assistant (tool) | ChatGPT (web) |
| Coding assistant model | GPT-5.5 Instant |
| Bolt.new model | GLM 5.3 Flash |
| Bolt project link | https://bolt.new/~/sb1-ykg88ykq |
| Language | Python 3.14.4 |
| Path | A |
| Python v1 from | week-05 |
| Web v1 from | week-06 |

This submission reconstructs work that I had completed and understood before the files were lost. The recovered result matches about 75% of my earlier solution. AI helped me restore missing parts, run checks, and prepare evidence, and I reviewed the final behaviour against AC1–AC6.

## 2. Baseline — before any new AI exchange

<!-- Written by you, without AI, before the first exchange of this SIS. Commit and push it
     first (README §2). Reusing Week 05/06 work does not exempt you: this section is new. -->

### 2.1 Scope in my own words

**Scope:** The system checks whether one selected campus room is free for a proposed time. It only reports availability and never creates a booking.

### 2.2 The acceptance criteria in my own words

| AC | In my own words |
| --- | --- |
| AC1 | Start and end are whole minutes in one day. Start is before end and later than the current minute. |
| AC2 | A request can be up to two hours, including exactly 120 minutes. |
| AC3 | A blocked room is unavailable for every requested interval. |
| AC4 | A request is unavailable when it crosses an existing booking, but it may touch its start or end. |
| AC5 | The result clearly says Available or Unavailable, and checking must not change the booking list. |
| AC6 | Validation messages explain the problem, and the page stays usable on a narrow phone screen. |

### 2.3 Likely failure points

<!-- At least two. The brief's examples: endpoint overlap, starts-now. -->

| # | Failure point | AC | How I will check it |
| --- | --- | --- | --- |
| 1 | An endpoint may be treated as an overlap because of `<=` instead of `<`. | AC4 | Check 660–720 beside the booking 600–660. |
| 2 | A start equal to `now` may be accepted although it must be later. | AC1 | Check 540–570 when `now` is 540. |
| 3 | A two-hour request may be rejected by an off-by-one comparison. | AC2 | Compare 720–840 with 720–841. |

### 2.4 The contract

| Parameter | Meaning | Type and allowed values |
| --- | --- | --- |
| `start` | First minute of the requested interval. | Integer from 0 to 1439 and strictly later than `now`. |
| `end` | First minute after the requested interval. | Integer from 1 to 1440 and greater than `start`. |
| `now` | Current minute used by the check. | Valid integer from 0 to 1439. |
| `blocked` | Shows whether the selected room is closed. | Boolean. |
| `existing` | Intervals already assigned to the room. | Collection of integer `(start, end)` pairs. |
| returns | Availability without changing `existing`. | Boolean: `True` only when AC1–AC4 all hold. |

### 2.5 Initial assumptions and manual checks

**Assumptions:**

1. Every existing interval is already valid and uses the same minute scale.
2. Intervals are start-inclusive and end-exclusive, so endpoint contact is allowed.
3. The page uses fictional room and booking data and performs no network request.

**Checked manually:**

- The boundary at 1440, equality with `now`, the 120-minute limit, endpoint contact, overlap, blocked state, repeated checks, clear messages, and the 375 px layout.

## 3. Python v1 review

<!-- One row per conditional branch in code/original/booking_v1.py (your language's v1 on
     Path B). Quote the condition exactly. AC1-AC4 must all appear in the AC column. -->

| Branch in v1 (quoted) | AC | Satisfies it? | Why |
| --- | --- | --- | --- |
| `if not (0 <= start < end <= 1440 and start > now):` | AC1 | Yes | The chained bounds enforce the day, order, and strict future-start rules. |
| `if end - start > 120:` | AC2 | Yes | It rejects only durations above 120, so exactly 120 remains valid. |
| `if blocked:` | AC3 | Yes | Every request returns `False` when the room is blocked. |
| `for existing_start, existing_end in existing:` | AC4, AC5 | Yes | It reads every existing interval without sorting or changing the collection. |
| `if start < existing_end and existing_start < end:` | AC4 | Yes | Both strict comparisons find real overlap and allow endpoint contact. |
| `return True` | AC5 | Yes | It is reached only after AC1–AC4 pass and returns a real Boolean. |

## 4. Prototype v1 in Bolt.new

**Prompt as sent:**

~~~~text
Build a small responsive Smart Campus Room Availability Checker. Requirements: AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time. AC2: Reject a booking longer than 120 minutes. AC3: Reject the request when the selected room is blocked. AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed. AC5: Show a clear Available / Unavailable decision without changing the existing booking data. AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback. Intervals include the start and exclude the end. Other rules still apply. Use fictional sample data only. Keep the implementation simple and within one-page scope. Do not add authentication, backend services, analytics, or unrelated features. After building, briefly list the main files/components you created.
~~~~

<!-- Main generated files or components, with their path inside web/original/
     (for example src/App.tsx). At least two. -->

| Generated file or component | Path | Its role |
| --- | --- | --- |
| `App` | `src/App.tsx` | Renders the room selector, time fields, result panel, and room details. |
| `checkAvailability` | `src/lib/availability.ts` | Applies AC1–AC5 and returns the decision with validation reasons. |
| `SAMPLE_ROOMS` | `src/data/rooms.ts` | Stores the fictional room status and existing booking intervals. |

**What v1 does:**

- It lets a user supply the current time, choose one room, enter start and end times, and check availability.
- It shows clear Available or Unavailable panels and lists the reasons for a rejection.
- Its room data does not provide the required base fixture of only 10:00–11:00, so T1–T11 cannot be set up exactly.
- Its missing-time message exists but cannot be reached because the Check button is disabled for empty inputs.

## 5. Test cases — executed on both artifacts

<!-- Base for every case unless the row says otherwise: now = 540, blocked = False,
     existing = [(600, 660)]. Do not change the first four columns.
     Python columns: True, False or Error (it raised) — what the call actually returned.
       T11: the result of the SECOND call. T12: n/a.
       Path A: the checker runs both of your files on T1-T11 and compares (C2, C3).
     Page columns: Available, Unavailable or Not testable — what the page actually showed.
     Never write a result you did not observe. -->

| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 660–720 | Available | True | True | Not testable | Available |
| T2 | Overlap | 630–690 | Unavailable | False | False | Not testable | Unavailable |
| T3 | Blocked | 660–720, blocked | Unavailable | False | False | Not testable | Unavailable |
| T4 | Exactly 120 min | 720–840 | Available | True | True | Not testable | Available |
| T5 | 121 min | 720–841 | Unavailable | False | False | Not testable | Unavailable |
| T6 | Starts now | 540–570 | Unavailable | False | False | Not testable | Unavailable |
| T7 | Reversed | 720–660 | Unavailable | False | False | Not testable | Unavailable |
| T8 | Ends at midnight | 1380–1440 | Available | True | True | Not testable | Not testable |
| T9 | Past midnight | 1380–1441 | Unavailable | False | False | Not testable | Not testable |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | False | False | Not testable | Unavailable |
| T11 | Same check twice | 660–720, twice | Available | True | True | Not testable | Available |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | Not testable | Available |

## 6. Traceability

<!-- His table. Implementation / file: where the rule lives (booking.py line, a component).
     Test input: the case IDs from section 5. v1 / final actual: what those cases gave. -->

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | `code/booking.py` first condition; `web/final/src/lib/availability.ts` bounds/order checks | T6, T7, T8, T9 | T6/T7/T9 Unavailable; T8 Available | Python matched; page fixture not testable | Python matched; page T6/T7 matched, T8/T9 not expressible |
| AC2 | `code/booking.py` duration condition; `checkAvailability` max-duration branch | T4, T5 | T4 Available; T5 Unavailable | Python matched; page fixture not testable | Both artifacts matched |
| AC3 | `code/booking.py` blocked condition; `checkAvailability` blocked branch | T3 | Unavailable | Python False; page fixture not testable | Python False; page Unavailable |
| AC4 | `code/booking.py` overlap condition; `intervalsOverlap`; final room fixtures | T1, T2, T10 | T1 Available; T2/T10 Unavailable | Python matched; page fixture not testable | Both artifacts matched |
| AC5 | Pure returns in `booking.py`; copied room state and decision-only handler in `App.tsx` | T11 | Available twice with unchanged data | Python True; page fixture not testable | Python True; page Available twice |
| AC6 | `DecisionPanel`, enabled Check control, `aria-live`, responsive grid in `App.tsx` | T7, T12 and empty-input check | Clear reason and usable 375 px result | Reversed/base fixture not testable; empty feedback unreachable | Clear reason; T12 Available; empty feedback visible |

## 7. Issue log

<!-- At least two, from v1 — a functional defect and a usability or code-quality issue where you
     have them. If every case passed on v1, log the preventive cleanup and say why.
     Reproduction names a case (T1-T12) or an AC. Priority: High, Medium or Low.
     Prompt / change: the focused prompt you sent, and what changed. Never "make it better". -->

| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | v1 had no room with the required only booking 10:00–11:00, so the common fixture could not be selected. | Inspect every v1 room, then try T1/T2 (AC4); the exact base is absent. | High | Prompt: keep one standard room with only 600–660 and preserve blocked data. Change: final `src/data/rooms.ts` uses a shared base booking. | WebDriver T1 Available and T2 Unavailable. |
| 2 | v1 disabled Check when a time was empty, making its existing validation message unreachable. | Leave both times empty (AC6); the v1 button is disabled, as captured in `before-1.png`. | Medium | Prompt: enable Check when a room is selected and expose the existing missing-time panel; keep availability logic unchanged. Change: button condition was narrowed and the result uses `aria-live`. | Empty-input click showed “Enter valid times first”; T12 still Available at 375 px. |
| 3 | The reused final had no selectable room with the second interval 700–760, so T10 could not be executed on the page. | Select each reused-final room and try T10 (AC4); all rooms contained only 600–660. | High | Prompt: add 700–760 only to a separate fictional room, without changing the standard fixture. Change: Design Studio 2 now has both intervals. | WebDriver T10 showed Unavailable because of 11:40–12:40. |
| 4 | v1 listed an unused Supabase client although backend and database are excluded. | For AC5 and the excluded scope, search imports and `package.json`; dependency existed but no application import used it. | Medium | Prompt: remove only the unused package and refresh the lockfile. Change reused from the Week 06 final and verified in this SIS. | Source scan found no Supabase, fetch, storage, login, or analytics use; build passed. |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue 2: disabled empty-input check versus visible validation feedback.

## 8. Critique decisions

<!-- The AI's review against AC1-AC6 (stage C), claim by claim. At least three rows.
     How I verified it: the case, test or run that confirmed or refuted the claim.
     Decision: accept, reject or modify. At least one reject or modify — the reflection asks for it. -->

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | The Python bounds, duration, blocked, and overlap branches satisfy AC1–AC4. | Ran T1–T11 through both Python files and the 19-test suite. | accept | Every result matched the fixed expectations and the input list stayed unchanged (AC5). |
| 2 | Strict overlap comparisons correctly allow endpoint contact. | T1 returned True in both Python files and the final page showed Available. | accept | AC4 says touching at 660 is not overlap. |
| 3 | The page fully supports the complete AC1 day boundary, including an end value of 1440. | Tried the native time input and inspected `parseTime`; it accepts only hours 00–23. | modify | The internal logic supports 1440, but T8/T9 are Not testable in the UI. |
| 4 | Disable Check until both time fields are valid to avoid an invalid submission. | v1 had this state; `before-1.png` and the disabled property showed that feedback could not be reached. | reject | AC6 needs understandable validation feedback, so final allows the click and explains missing input. |

## 9. Coding-agent analysis

### 9.1 The loop

<!-- One real pass through the loop from this assignment — with your assistant or with Bolt. -->

| Step | What happened in this assignment |
| --- | --- |
| User goal | Finish SIS 03, preserve reused v1 artifacts, test both systems, and prepare an open PR. |
| Model / plan | Codex read the handout and templates, froze AC1–AC6, and planned separate baseline, v1, repair, test, and declaration commits. |
| Tool call | It copied branch artifacts, built both Vite projects, started local servers, and drove Firefox through WebDriver. |
| Observation | v1 lacked the fixed fixture and blocked empty validation; final WebDriver results matched T1–T7 and T10–T12, while T8/T9 were not expressible. |
| Next step | It added only the second-booking fixture and live result announcement, rebuilt, reran the suite, and completed traceability. |
| Human review | I reviewed the recovered final version against my earlier work and confirmed that I understand the function, overlap condition, page logic, evidence, and agent loop. AI helped with restoration and verification, but I checked the submitted result. |

### 9.2 Context, tools and permissions

<!-- At least three rows. Last column: Observed (you saw it happen) or Assumed (you infer it
     about the internals). Use both at least once. -->

| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| ChatGPT (Week 05) | AC1–AC5 text and the requested Python signature | Produced a plan and code text; exact hidden runtime tools are unknown. | Assumed |
| Bolt.new (Week 06) | Prompt, React template, and fictional room data | Generated the exported file tree and preview shown in reused evidence. | Observed |
| Codex (this SIS) | PDF, repository history, templates, reused source, and terminal output | Read/write workspace, shell, portable Node, local HTTP, Firefox WebDriver; GitHub connector was read-only. | Observed |
| GitHub connector | Repository metadata and branch search | Read access succeeded; branch and file writes returned HTTP 403. | Observed |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** Before accepting generated changes, Codex compared the requested paths with `git status`, worked in a separate workspace clone to protect unrelated staged files, checked the AC wording, and reviewed the exact diff before each commit.

**Reliability, security, responsibility:** Reliability came from fixed expected results, Python tests, browser observations, and my review of the recovered work instead of visual confidence. Security came from keeping login, network calls, storage, analytics, backend, and database code out of scope. AI output can still be wrong, so I checked its suggestions, disclosed its help, and kept responsibility for understanding and defending the submission.

## 10. Reflection

<!-- 100-200 words, in your own words, no AI. Compare AI-assisted coding (the Python part) with
     vibe coding (the Bolt part); one example each of a reliability, an availability/usability and
     a security risk; why review, tool permissions and tests stay human responsibilities; one AI
     recommendation you rejected or modified, and why; what you would improve next without
     expanding the scope. -->

I found the Python task easier to control because the function had a small contract and I could test every branch directly. The page was faster to restore with vibe coding, but its finished look hid missing test data and unreachable feedback. One reliability risk was an incorrect overlap operator. One usability risk was a disabled button that gave no reason. One security risk was the unused database client, which could encourage an out-of-scope connection later. I still reviewed permissions, expected results, and AI suggestions because convincing output can be wrong. I rejected the recommendation to disable Check until both times were valid because it prevented the AC6 feedback from appearing. I modified the claim that the page supported the complete end-of-day boundary because native time inputs cannot enter 24:00. Next, I would add small automated UI checks for the existing cases, especially repeated checks and the narrow layout, without adding booking creation or persistent data.

## 11. Appendix A — AI exchanges

<!-- At least four. Complete prompts and complete responses, as text — never screenshots. Paste
     each inside the ~~~~ block that follows its label.
     Stage: Plan, Generate, Critique or Repair (the brief's A-D) — at least one of each.
     Source: this SIS, week-05 or week-06. Reused exchanges keep their original date.
     The Generate exchange for Python must contain your v1 exactly as it is in code/original/.
     Add B5, B6 … if you ran more. -->

### B1

- **Tool:** ChatGPT (web)
- **Model:** GPT-5.5 Instant
- **Date:** 2026-10-15
- **Stage:** Plan
- **Source:** week-05

**Prompt:**

~~~~text
The exact original Plan prompt was not preserved in the Week 05 report. I am declaring that gap instead of reconstructing a prompt that I cannot verify.
~~~~

**Response:**

~~~~text
Implementation plan for can_book

1. Checks in order
1. Validate the time interval (AC1). Check that 0 <= start < end <= 1440 and start > now.
2. Check duration (AC2). Verify that end - start <= 120 minutes.
3. Check room status (AC3). If blocked is True, return False.
4. Check existing bookings (AC4). For each existing interval (existing_start, existing_end), reject the request if the intervals overlap.
  - Overlap condition: start < existing_end and existing_start < end.
  - If one booking ends exactly when the other starts, they do not overlap.
5. Return the decision (AC5). Return True only if all checks pass; otherwise, return False. Never modify existing or any input.

2. Assumptions
- All times are integer minutes after midnight on the same date.
- now is valid, and every existing booking is valid, as specified in the contract.
- blocked is a Boolean.
- The function checks only one selected room and does not save bookings or send confirmations.
- Invalid requested intervals must return False, not raise an exception.
- Because intervals include the start and exclude the end, adjacent bookings are allowed.

3. Boundary cases to test
- Start equals now: False.
- End at 1440: True if otherwise valid; end at 1441: False.
- Duration 120: True if otherwise valid; duration 121: False.
- A blocked room: False.
- Endpoint contact: True; partial or contained overlap: False.
- Multiple bookings: False if any one overlaps.
- Input immutability: `existing` stays unchanged.

Important: Test each acceptance criterion independently, then test combinations. Every invalid case must return False.
~~~~

### B2

- **Tool:** ChatGPT (web)
- **Model:** GPT-5.5 Instant
- **Date:** 2026-10-15
- **Stage:** Generate
- **Source:** week-05

**Prompt:**

~~~~text
The exact original Generate prompt was not preserved in the Week 05 report. The generated file below was preserved unchanged, so I do not reconstruct the missing prompt.
~~~~

**Response:**

~~~~text
def can_book(start, end, now, blocked, existing):
    # AC1: Validate the interval and require a future start time.
    if not (0 <= start < end <= 1440 and start > now):
        return False

    # AC2: The booking must not exceed 120 minutes.
    if end - start > 120:
        return False

    # AC3: A blocked room cannot be booked.
    if blocked:
        return False

    # AC4: Reject any overlap with an existing booking.
    # Intervals include their start and exclude their end.
    for existing_start, existing_end in existing:
        if start < existing_end and existing_start < end:
            return False

    # AC5: All acceptance criteria are satisfied.
    return True
~~~~

### B3

- **Tool:** Bolt.new
- **Model:** GLM 5.3 Flash
- **Date:** 2026-10-18
- **Stage:** Generate
- **Source:** week-06

**Prompt:**

~~~~text
Build a small responsive Smart Campus Room Availability Checker. Requirements: AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time. AC2: Reject a booking longer than 120 minutes. AC3: Reject the request when the selected room is blocked. AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed. AC5: Show a clear Available / Unavailable decision without changing the existing booking data. AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback. Intervals include the start and exclude the end. Other rules still apply. Use fictional sample data only. Keep the implementation simple and within one-page scope. Do not add authentication, backend services, analytics, or unrelated features. After building, briefly list the main files/components you created.
~~~~

**Response:**

~~~~text
Record note: the Week 06 report preserved only the file list below, not the complete wording of Bolt's response. The rest cannot be pasted faithfully, so it is not reconstructed here. The exported files and screenshot are the primary v1 evidence. Source inspection confirmed that the first version created a React page with selectable fictional rooms, time inputs, an availability decision panel, and validation reasons. The exact preserved response portion is:

src/data/rooms.ts — fictional sample room + booking data
src/lib/availability.ts — the availability logic (AC1–AC5) and time helpers
src/App.tsx — the full UI: form, decision panel, and room detail view (using lucide-react icons and Tailwind)
~~~~

### B4

- **Tool:** Codex
- **Model:** GPT-5
- **Date:** 2026-11-06
- **Stage:** Critique
- **Source:** this SIS

**Prompt:**

~~~~text
Review `code/booking.py` and the reused final page against fixed AC1–AC6. Check bounds, exactly 120 minutes, blocked rooms, endpoint contact, input immutability, clear decisions, and narrow layout. Identify any limitation, but do not change the rules or add booking creation, login, backend, database, storage, or APIs. Give claims that can be verified by a named test.
~~~~

**Response:**

~~~~text
1. Python AC1–AC5: the first condition enforces 0 <= start < end <= 1440 and start > now. The next branches reject duration above 120, blocked rooms, and real overlap. The strict overlap comparisons allow endpoint contact. The function only reads `existing`, so it does not mutate it. Verify with T1–T11 and an unchanged-input test.

2. Page AC1–AC5: `checkAvailability` mirrors the same rules and returns reasons without adding bookings. Verify endpoint contact with T1, overlap with T2/T10, blocked state with T3, duration with T4/T5, start-now with T6, reversed input with T7, and repeated checking with T11.

3. Limitation: the logic permits end=1440, but the native time field and `parseTime` accept only 00:00–23:59. Therefore the full end-of-day boundary is not expressible in the UI. Record T8 and T9 as Not testable instead of claiming a result.

4. AC6: the responsive grid is usable at 375 px, but disabling Check until both times are valid would hide the existing missing-input explanation. Keep the final button actionable when a room is selected and show the validation panel. Add a polite live region so the changed decision is announced.

5. Do not append a successful request to the bookings or connect a database. That would change the check-only scope and could violate AC5.
~~~~

### B5

- **Tool:** Codex
- **Model:** GPT-5
- **Date:** 2026-11-06
- **Stage:** Repair
- **Source:** this SIS

**Prompt:**

~~~~text
Repair only these observed issues. First, the reused final has only the 600–660 booking in every room, so page case T10 cannot use a second 700–760 booking. Keep Engineering Lab A as the standard one-booking fixture and add 700–760 only to Design Studio 2. Second, preserve the reachable missing-time message and announce changed results with `aria-live="polite"` for AC6. Do not change AC1–AC5, mutate bookings, or add login, backend, database, storage, analytics, or network calls. Rebuild and retest T1–T12.
~~~~

**Response:**

~~~~text
Implemented two focused changes.

- `src/data/rooms.ts`: kept Engineering Lab A with only the 600–660 base interval and added the 700–760 fictional interval only to Design Studio 2. This makes T10 selectable without changing the base fixture for the other cases.
- `src/App.tsx`: kept Check enabled when a room is selected and wrapped the decision in `aria-live="polite"` with `aria-atomic="true"`. Availability logic and booking arrays were not changed.
- `index.html`: removed unused remote preview metadata and added a local page description; no network feature was added.

The production build passed. Firefox WebDriver then observed: T1 Available; T2, T3, T5, T6, T7, and T10 Unavailable; T4, T11, and T12 Available; T8 and T9 Not testable because the native field cannot express 24:00 or 24:01. Empty input showed “Enter valid times first,” and T12 remained usable at 375 px.
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

<!-- The complete terminal output of your final suite. Path A: python -m unittest -v, run inside
     code/ — the part ending in "Ran N tests" and OK or FAILED. -->

~~~~text
test_blocked_room_rejected (test_booking.BookingTests.test_blocked_room_rejected) ... ok
test_contains_existing_rejected (test_booking.BookingTests.test_contains_existing_rejected) ... ok
test_day_bound_exceeds_midnight_rejected (test_booking.BookingTests.test_day_bound_exceeds_midnight_rejected) ... ok
test_day_bound_midnight_allowed (test_booking.BookingTests.test_day_bound_midnight_allowed) ... ok
test_empty_existing_allowed (test_booking.BookingTests.test_empty_existing_allowed) ... ok
test_exactly_two_hours_allowed (test_booking.BookingTests.test_exactly_two_hours_allowed) ... ok
test_input_unchanged (test_booking.BookingTests.test_input_unchanged) ... ok
test_input_unchanged_unsorted (test_booking.BookingTests.test_input_unchanged_unsorted) ... ok
test_input_unchanged_when_rejected (test_booking.BookingTests.test_input_unchanged_when_rejected) ... ok
test_inside_existing_rejected (test_booking.BookingTests.test_inside_existing_rejected) ... ok
test_multiple_existing_overlap_rejected (test_booking.BookingTests.test_multiple_existing_overlap_rejected) ... ok
test_over_two_hours_rejected (test_booking.BookingTests.test_over_two_hours_rejected) ... ok
test_overlap_rejected (test_booking.BookingTests.test_overlap_rejected) ... ok
test_reversed_times_rejected (test_booking.BookingTests.test_reversed_times_rejected) ... ok
test_starts_now_rejected (test_booking.BookingTests.test_starts_now_rejected) ... ok
test_strict_boolean_return_type (test_booking.BookingTests.test_strict_boolean_return_type) ... ok
test_touching_end_is_allowed (test_booking.BookingTests.test_touching_end_is_allowed) ... ok
test_touching_start_is_allowed (test_booking.BookingTests.test_touching_start_is_allowed) ... ok
test_zero_length_rejected (test_booking.BookingTests.test_zero_length_rejected) ... ok

----------------------------------------------------------------------
Ran 19 tests in 0.000s

OK
~~~~

### 12.2 Path B only — three faults you planted

<!-- Path A: leave this table as it is. Path B: three rows — the line you broke, the AC it
     breaks, the test that failed. -->

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

<!-- One row per check ID in submission.yml known_fails, and any limitation you know of.
     If the checker is clean and you know of none, one row that says so. -->

| Check ID or limitation | Why it stays | What I would do next |
| --- | --- | --- |
| Page T8 and T9 | Native `type="time"` and `parseTime` cannot express 24:00 or 24:01. | Keep them declared Not testable; no scope expansion is needed. |
| Week 05 prompt record | The exact original Plan and Generate prompts were not preserved. | Keep the gap disclosed and never reconstruct the missing chat. |
| Recovered work | I had completed and understood a similar solution before it was lost. AI helped reconstruct and verify this version, which I reviewed against AC1–AC6 and my earlier work. | Keep the AI assistance disclosed and preserve the repository evidence. |
