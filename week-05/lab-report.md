# Week 05 — Lab report

**Name:** Shynbulat Kazbek  
**Group:** Monday 4:00-7:00 pm  
**Date:** 2026-10-15

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant (tool) | ChatGPT |
| **Exact** model name | GPT-5.5 Instant |
| Language and version | Python 3.14.4 |
| Path | A |
| My Week 04 declaration for touching bookings | not-allowed |

<!-- If your Week 04 model said touching bookings are NOT allowed: AC4 now says they are.
     One sentence here on what that changes in your Week 04 diagrams. This is a finding, not a penalty. -->

In Week 04, my model treated touching bookings as an overlap and rejected them; AC4 now allows touching endpoints, so the overlap condition in my Week 04 diagrams has to change to one that lets `end == existing_start` and `start == existing_end` through.

---

## 2. Task 1 — the plan

**The assistant's plan, pasted unedited:**

```text
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
| Case | Example | Expected |
| Start at midnight | start=0, end=60, now=1439 | False |
| Start equals now | start=600, end=660, now=600 | False |
| Start is after now | start=601, end=660, now=600 | True, if otherwise valid |
| End at midnight boundary | start=1380, end=1440, now=1000 | True, if otherwise valid |
| End exceeds 1440 | start=1380, end=1441, now=1000 | False |
| Start equals end | start=600, end=600, now=500 | False |
| Duration exactly 120 min | start=600, end=720, now=500 | True, if otherwise valid |
| Duration 121 min | start=600, end=721, now=500 | False |
| Room blocked | Valid interval, blocked=True | False |
| Existing booking ends at requested start | Request [600,660), existing [540,600) | True |
| Existing booking starts at requested end | Request [600,660), existing [660,720) | True |
| Partial overlap | Request [600,660), existing [650,700) | False |
| Request contains existing booking | Request [600,720), existing [630,660) | False |
| Existing booking contains request | Request [620,640), existing [600,660) | False |
| No existing bookings | existing=[] | True, if otherwise valid |
| Multiple bookings, one overlaps | One non-overlapping interval and one overlapping interval | False |
| Input immutability | Record existing before and after the call | Contents unchanged |

Important: Test each acceptance criterion independently, then test combinations—for example, an invalid interval when the room is blocked. Every such case must return False.
```

**What the plan invented or changed.** One row for every rule in the plan that is not in the
contract or in AC1–AC5, or that says something different from them. If you found none, write one
row saying which lines of the plan you checked against which AC.

| # | What the plan said | What the contract or the AC says | What I did |
| --- | --- | --- | --- |
| 1 | Checks 1–5 of "Checks in order": AC1 bounds and `start > now`, AC2 duration `<= 120`, AC3 blocked, AC4 overlap `start < existing_end and existing_start < end`, AC5 return True only if all pass | AC1–AC5 say exactly this; the overlap condition lets touching endpoints through, as AC4 requires | Checked each of the five checks against its AC line by line. Found no invented rule: no sorting, no buffer between bookings, no type validation |
| 2 | Assumption: "Invalid requested intervals must return False, not raise an exception" | Not a separate line, but follows from AC5 ("Return False otherwise") and the contract ("Return True or False") | Kept. It is a consequence of AC5, not an extra rule |

**Boundary cases the assistant suggested that I kept as tests:**

I kept these in the same form as the handout's base input (`now=540`, `existing=[(600, 660)]`), so the numbers differ from the plan but the boundary is the same:

- Start equals now — test 6, `(540, 570)`, tests strict `start > now`.
- End at midnight boundary — test 9, `(1380, 1440)`, tests `end <= 1440`.
- Duration exactly 120 min — test 4, `(720, 840)`, tests `end - start <= 120`.
- Existing booking ends at requested start — test 1, `(660, 720)`, tests touching endpoints.
- Existing booking starts at requested end — test 17, `(570, 600)`, tests touching on the other side.
- Request contains existing booking — test 13, `(570, 690)`.
- Input immutability — tests 15, 18 and 19.

---

## 3. Task 2 — the first version (v1), read before it was run

v1 is saved as `code/original/booking_v1.py`, exactly as the assistant returned it: yes

**AC map.** One row per condition in v1. Quote the line.

| # | Line in v1 | AC it implements | Correct as written? If not, why |
| --- | --- | --- | --- |
| 1 | `if not (0 <= start < end <= 1440 and start > now):` | AC1 | yes |
| 2 | `if end - start > 120:` | AC2 | yes |
| 3 | `if blocked:` | AC3 | yes |
| 4 | `if start < existing_end and existing_start < end:` | AC4 | yes |
| 5 | `return True` | AC5 | yes |

**Anything in v1 that no AC asks for** (extra validation, a buffer between bookings, logging,
saving the booking, a different return type):

- None. The function follows AC1–AC5 without extra validation, buffer, logging, saving, or a different return type.

---

## 4. Task 3 — my tests

Base input for every row unless the row says otherwise: `now=540, blocked=False, existing=[(600, 660)]`.

| # | Test name | Request (start, end) | What differs from the base input | Expected | AC | Result on v1 | Result on final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | test_touching_end_is_allowed | (660, 720) | none | True | AC4 | pass | pass |
| 2 | test_overlap_rejected | (630, 690) | none | False | AC4 | pass | pass |
| 3 | test_blocked_room_rejected | (660, 720) | blocked=True | False | AC3 | pass | pass |
| 4 | test_exactly_two_hours_allowed | (720, 840) | none | True | AC2 | pass | pass |
| 5 | test_over_two_hours_rejected | (720, 841) | none | False | AC2 | pass | pass |
| 6 | test_starts_now_rejected | (540, 570) | none | False | AC1 | pass | pass |
| 7 | test_zero_length_rejected | (700, 700) | none | False | AC1 | pass | pass |
| 8 | test_reversed_times_rejected | (720, 700) | none | False | AC1 | pass | pass |
| 9 | test_day_bound_midnight_allowed | (1380, 1440) | none | True | AC1 | pass | pass |
| 10 | test_day_bound_exceeds_midnight_rejected | (1380, 1441) | none | False | AC1 | pass | pass |
| 11 | test_empty_existing_allowed | (600, 660) | existing=[] | True | AC4 | pass | pass |
| 12 | test_multiple_existing_overlap_rejected | (700, 760) | existing=[(600, 660), (740, 800)] | False | AC4 | pass | pass |
| 13 | test_contains_existing_rejected | (570, 690) | none | False | AC4 | pass | pass |
| 14 | test_inside_existing_rejected | (615, 645) | none | False | AC4 | pass | pass |
| 15 | test_input_unchanged | (660, 720) | checks list mutation | True | AC5 | pass | pass |
| 16 | test_strict_boolean_return_type | (660, 720) | none | True | AC5 | pass | pass |
| 17 | test_touching_start_is_allowed | (570, 600) | none | True | AC4 | pass | pass |
| 18 | test_input_unchanged_when_rejected | (610, 650) | none (rejected call; list checked afterwards) | False | AC5 | pass | pass |
| 19 | test_input_unchanged_unsorted | (780, 840) | existing=[(900, 960), (600, 660)] | True | AC5 | pass | pass |

---

## 5. Task 4 — debugging with evidence

One row per defect you found — in v1, in a later version, or in your own tests. If v1 passed
everything, the row is the **new edge case you added**, with expected and actual equal, and the
cause column says why no change was needed.

| # | Input (the full call) | Expected | Actual | Cause (quote the line) | Fix | Who proposed the fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `can_book(570, 600, 540, False, [(600, 660)])` | True | True | `if start < existing_end and existing_start < end:` — strict `<` on both sides, so a request that ends exactly where an existing booking starts is not an overlap | No change needed | - |

**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):

```text
```

---

## 6. Task 5 — the critique

**The assistant's critique, pasted unedited:**

```text
The implementation satisfies AC1–AC5 under the supplied input assumptions. I found no concrete issues against the stated contract.
1. AC1 — Valid interval and future start: if not (0 <= start < end <= 1440 and start > now): correctly rejects invalid intervals and starts that are not strictly after now.
2. AC2 — Maximum duration: if end - start > 120: correctly rejects durations over 120 minutes while allowing exactly 120 minutes.
3. AC3 — Room status: if blocked: correctly rejects bookings when the room is blocked.
4. AC4 — No overlap: if start < existing_end and existing_start < end: correctly detects overlapping intervals and permits touching endpoints.
5. AC5 and contract — Decision and immutability: return False on failed checks and return True otherwise implement the required decision. The function does not modify existing or other inputs.
```

| # | Suggestion | accept / reject | Reason — cite the AC or the contract line | Suite after the change |
| --- | --- | --- | --- | --- |
| 1 | AC1 line is correct: rejects invalid intervals and `start <= now` | accept | AC1 is `0 <= start < end <= 1440` and `start > now`; same as the quoted line. Tests 6–10 cover it | unchanged, 19 tests OK |
| 2 | AC2 line is correct: over 120 rejected, exactly 120 allowed | accept | AC2 "at most 120 minutes"; `> 120` rejects only longer. Tests 4 and 5 cover it | unchanged, 19 tests OK |
| 3 | AC3 line is correct: blocked room rejected | accept | AC3 "The room is not blocked". Test 3 covers it | unchanged, 19 tests OK |
| 4 | AC4 line is correct: overlaps rejected, touching endpoints allowed | accept | AC4 "Touching endpoints are allowed"; strict `<` on both sides. Tests 1, 2, 12–14 and 17 cover it | unchanged, 19 tests OK |
| 5 | AC5 lines are correct: False on failed checks, True otherwise, inputs not modified | accept | AC5 and the contract line "Keep all inputs unchanged". Tests 15, 16, 18 and 19 cover it | unchanged, 19 tests OK |

---

## 7. Change log — v1 to final

| # | What changed (the line, before → after) | Why | Evidence: the test or check that moved |
| --- | --- | --- | --- |
| 1 | `booking.py`: no change. Tests 16–19 added to `test_booking.py` | AC4 on the start side, AC5 return type and AC5 "never alter existing" (rejected call, unsorted list) were not covered by tests 1–15 | `python3 -m unittest -v`: Ran 19 tests, OK; checker M10 (AC5 fault) now PASS |

---

## 8. Evidence — real output

### 8.1 My suite, final run

Paste the **complete** terminal output. For Python: everything `python -m unittest -v` printed.

```text
nqmvl@Asus:~/se-practice/week-05/code$ python3 -m unittest -v
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
```

### 8.2 The checker, final run

Paste the **complete** output of `python tests/check_booking.py`. Paste it **last**: if you edit
this file afterwards, run the checker again and paste again.

```text
nqmvl@Asus:~/se-practice/week-05$ python3 tests/check_booking.py
Week 05 - can_book: the function, your tests, the evidence   (Path A)

PASS   F1   the six cases from the task table           6 of 6 cases
PASS   F2   AC1 time order and day bounds               5 of 5 cases
PASS   F3   AC1 the start is in the future              5 of 5 cases
PASS   F4   AC2 at most 120 minutes                     3 of 3 cases
PASS   F5   AC3 a blocked room accepts nothing          2 of 2 cases
PASS   F6   AC4 every kind of overlap is rejected       5 of 5 cases
PASS   F7   AC4 touching endpoints are allowed          3 of 3 cases
PASS   F8   AC4 every existing booking is checked       4 of 4 cases
PASS   F9   AC5 the result is a real Boolean            3 of 3 cases
PASS   F10  AC5 the inputs are left unchanged           2 of 2 cases
PASS   O1   the assistant's first version is kept       v1 kept (21 lines)
PASS   S1   your suite has at least 11 tests            19 tests
PASS   S2   your suite is green on your own code        19 tests, OK
PASS   M1   your tests catch a fault in AC1             caught by test_starts_now_rejected
PASS   M2   your tests catch a fault in AC1             caught by test_day_bound_exceeds_midnight_rejected
PASS   M3   your tests catch a fault in AC1             caught by test_zero_length_rejected
PASS   M4   your tests catch a fault in AC2             caught by test_exactly_two_hours_allowed
PASS   M5   your tests catch a fault in AC3             caught by test_blocked_room_rejected
PASS   M6   your tests catch a fault in AC4             caught by test_strict_boolean_return_type, test_touching_end_is_allowed, test_touching_start_is_allowed
PASS   M7   your tests catch a fault in AC4             caught by test_multiple_existing_overlap_rejected
PASS   M8   your tests catch a fault in AC4             caught by test_contains_existing_rejected
PASS   M9   your tests catch a fault in AC5             caught by test_input_unchanged, test_input_unchanged_unsorted
PASS   M10  your tests catch a fault in AC5             caught by test_input_unchanged_unsorted
PASS   L1   report 1: tool, model and language          tool, model and language recorded
PASS   L2   report 2: the plan, and what you corrected  plan pasted, 20 row(s) on what you corrected or verified
PASS   L3   report 3: v1 mapped to AC1-AC4              5 conditions mapped, AC1-AC4 all present
PASS   L4   report 4: at least 11 of your tests listed  19 tests listed
PASS   L5   report 5: debugging evidence                1 row(s) of input / expected / actual
PASS   L6   report 6: the critique, each point judged   critique pasted, 5 points judged
PASS   L7   report 7: change log                        1 change-log row(s)
PASS   L8   report 8.1: real output of your suite       suite output pasted
PASS   L9   report 10: conclusion of 120-180 words      165 words
------------------------------------------------------------------------------
v1 (code/original/booking_v1.py): passes F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 - fails nothing - identical to your final: yes
SUMMARY pass=32 fail=0 error=0   (32 checks)
Behaviour and shape are clean. This says nothing about the quality of your review.
```

### 8.3 Path B only — three faults I planted myself

Break your own function on purpose, one line at a time, run your suite, restore the line.

| # | Line I changed (before → after) | AC it breaks | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

The three failing runs (Path A students leave this block empty):

```text
```

---

## 9. What still fails, and what the contract does not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | All checks pass successfully. |

### 9.2 Outside the contract

The contract says times are integers. It does not say what `can_book` does when one is not —
`600.5`, or the string `"600"`. What does **your** function do, and why is that the right call?

- When passing a float like `600.5`, Python dynamically handles the numeric comparison, evaluating it correctly without errors. However, passing a string like `"600"` raises a `TypeError` because Python 3 prohibits `<` and `-` operations between strings and integers. I decided to leave this `not-handled`. The contract explicitly specifies "integer minutes", and adding manual type validation (e.g., `isinstance()`) would introduce defensive programming outside the requested scope. Relying on Python's native exceptions for invalid types is the correct call here.

### 9.3 A bound that never decides

One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one,
and why?

- The bound `0 <= start` in AC1 is mathematically redundant and can never be the only reason a request is rejected. AC1 also strictly requires `start > now`. Since the contract guarantees `now` is valid and falls within `0-1439`, the lowest possible value for `now` is `0`. Therefore, if `start > now` is satisfied, `start` must be at least `1`. A request will never fail exclusively because `start < 0` without simultaneously failing the `start > now` condition.

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Explain the overlap condition in your final code — why those two comparisons, and why
         they let touching bookings through.
     (b) Which fault did your tests miss the longest, and what did the missing test have in common
         with the ones you already had?
     (c) What did you have to decide that neither the contract nor the assistant decided for you?
     Worthless: "the AI made a mistake and I fixed it."
     Worth everything: "F7 failed on can_book(570, 600, ...): v1 compared with <= on the start
     side, so a booking that ends exactly when another begins was rejected." -->

<!-- Write your conclusion below this line -->

This week's lab demonstrated the importance of writing tests based strictly on requirements rather than assuming generated code is flawless. (a) My final implementation handles the overlap condition using strict inequalities: `start < existing_end` and `existing_start < end`. This logic perfectly satisfies AC4 because it identifies an overlap only if the new booking strictly occupies the same time space. Touching endpoints, like `end == existing_start`, safely evaluate to `False` in this comparison and are allowed through. (b) The fault my tests missed the longest was M10, which violated AC5 by mutating the `existing` list when a booking was rejected. My initial suite only checked list immutability for successful requests. The missing test needed to explicitly verify that the list remained strictly unchanged even when the function returned `False`. (c) Outside the contract, I had to decide how to handle non-integer times like floats or strings. I chose to leave them unhandled, relying on Python's native `TypeError` for strings, to avoid adding unrequested defensive validation logic.
