# Week 08 — Lab report

**Name:** Shynbulat Kazbek
**Student ID:** 24B032123
**Group:** not provided
**Date:** 2026-11-15

Repository: https://github.com/Kazbekio/se-practice

I followed the work and understand the two bugs and their fixes. Codex carried out the file edits, tests and GitHub steps. The disclosure explains which manual steps were automated.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I debugged with (tool) | OpenAI Codex |
| Exact model (with its version, or `not displayed`) | not displayed |
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) | prompt-only simulation in this Codex session |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | my computer, through the Codex terminal |
| Vitest version (the `RUN  v…` line of a run) | 4.1.12 |
| Language of my booking module (`ts` or `js`) — the file I copied from `buggy/` | ts |

---

The source is the committed Week 07 app at `9c43b5b`. Before setup, I saved the local untracked files in a stash and confirmed a clean `week-08` branch. The inherited lock file had incorrect platform metadata. I fixed that metadata before installing; all dependency versions and the 17 original tests stayed the same. Details are in `evidence/00-setup.txt`. A fresh install from the final lock file also succeeded (`evidence/00-clean-install.txt`). The first offline retry was blocked by sandbox permissions for the esbuild binary; its original error is kept in `evidence/00-clean-install-sandbox.txt`. It succeeded after the same command was allowed to run outside that sandbox.

## 2. Task 1 — baseline, buggy code, failing tests

### 2.1 My Week 07 suite on my own code

The **real** output of your Week 07 suite, run in `week-08/app/` **before** you replace
anything. It should be green. If it is not, say why under the block.

```text
8:25:36 AM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
8:25:36 AM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/week-08/app

 ✓ src/booking.test.ts > canBook > T01 AC4: touching after is allowed 1ms
 ✓ src/booking.test.ts > canBook > T02 AC1: starting at the current time is rejected 0ms
 ✓ src/booking.test.ts > canBook > T03 AC1: zero duration is rejected 0ms
 ✓ src/booking.test.ts > canBook > T04 AC1: a reversed interval is rejected 0ms
 ✓ src/booking.test.ts > canBook > T05 AC1: an end after 1440 is rejected 0ms
 ✓ src/booking.test.ts > canBook > T06 AC2: exactly 120 minutes is allowed 0ms
 ✓ src/booking.test.ts > canBook > T07 AC2: 121 minutes is rejected 0ms
 ✓ src/booking.test.ts > canBook > T08 AC4: touching before is allowed 0ms
 ✓ src/booking.test.ts > canBook > T09 AC4: partial overlap is rejected 1ms
 ✓ src/booking.test.ts > canBook > T10 AC4: an interval containing a booking is rejected 0ms
 ✓ src/booking.test.ts > canBook > T11 AC4: an interval inside a booking is rejected 0ms
 ✓ src/booking.test.ts > canBook > T12 AC4: an identical interval is rejected 0ms
 ✓ src/booking.test.ts > canBook > T13 AC3: a blocked room is rejected 0ms
 ✓ src/booking.test.ts > canBook > T14 AC4: an empty booking list has no overlap 0ms
 ✓ src/booking.test.ts > canBook > AC5: an available check does not change existing bookings 1ms
 ✓ src/booking.test.ts > canBook > X1 AC1 AC2: an interval may end exactly at 1440 0ms
 ✓ src/booking.test.ts > canBook > X2 AC1: a one-minute interval after now is allowed 0ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  08:25:36
   Duration  141ms (transform 20ms, setup 0ms, import 31ms, tests 7ms, environment 0ms)
```

### 2.2 The same suite on the provided canBook

You copied the whole `canBook` function from `buggy/booking.ts` (or `.js`) over yours and changed
nothing else. This is the real output:

```text
8:26:27 AM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
8:26:27 AM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/week-08/app

 × src/booking.test.ts > canBook > T01 AC4: touching after is allowed 6ms
   → expected false to be true // Object.is equality
 ✓ src/booking.test.ts > canBook > T02 AC1: starting at the current time is rejected 0ms
 ✓ src/booking.test.ts > canBook > T03 AC1: zero duration is rejected 0ms
 ✓ src/booking.test.ts > canBook > T04 AC1: a reversed interval is rejected 0ms
 ✓ src/booking.test.ts > canBook > T05 AC1: an end after 1440 is rejected 0ms
 ✓ src/booking.test.ts > canBook > T06 AC2: exactly 120 minutes is allowed 0ms
 ✓ src/booking.test.ts > canBook > T07 AC2: 121 minutes is rejected 0ms
 × src/booking.test.ts > canBook > T08 AC4: touching before is allowed 1ms
   → expected false to be true // Object.is equality
 ✓ src/booking.test.ts > canBook > T09 AC4: partial overlap is rejected 0ms
 ✓ src/booking.test.ts > canBook > T10 AC4: an interval containing a booking is rejected 0ms
 ✓ src/booking.test.ts > canBook > T11 AC4: an interval inside a booking is rejected 0ms
 ✓ src/booking.test.ts > canBook > T12 AC4: an identical interval is rejected 0ms
 ✓ src/booking.test.ts > canBook > T13 AC3: a blocked room is rejected 0ms
 ✓ src/booking.test.ts > canBook > T14 AC4: an empty booking list has no overlap 0ms
 × src/booking.test.ts > canBook > AC5: an available check does not change existing bookings 0ms
   → expected false to be true // Object.is equality
 ✓ src/booking.test.ts > canBook > X1 AC1 AC2: an interval may end exactly at 1440 0ms
 ✓ src/booking.test.ts > canBook > X2 AC1: a one-minute interval after now is allowed 0ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook > T01 AC4: touching after is allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:12:61
     10| describe('canBook', () => {
     11|   test('T01 AC4: touching after is allowed', () => {
     12|     expect(canBook({ start: 660, end: 720, ...fixture() })).toBe(true);
       |                                                             ^
     13|   });
     14|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/3]⎯

 FAIL  src/booking.test.ts > canBook > T08 AC4: touching before is allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:40:61
     38|
     39|   test('T08 AC4: touching before is allowed', () => {
     40|     expect(canBook({ start: 570, end: 600, ...fixture() })).toBe(true);
       |                                                             ^
     41|   });
     42|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/3]⎯

 FAIL  src/booking.test.ts > canBook > AC5: an available check does not change existing bookings
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:70:83
     68|     const bookings = [{ start: 600, end: 660 }];
     69|     const before = structuredClone(bookings);
     70|     expect(canBook({ start: 660, end: 720, now: 540, blocked: false, b…
       |                                                                                   ^
     71|     expect(bookings).toEqual(before);
     72|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/3]⎯


 Test Files  1 failed (1)
      Tests  3 failed | 14 passed (17)
   Start at  08:26:27
   Duration  142ms (transform 20ms, setup 0ms, import 30ms, tests 10ms, environment 0ms)
```

### 2.3 One failing test per bug

Add the two regression tests from README Part 1, step 5: one named `BUG-A` and one named `BUG-B`.
Run them **on the buggy code**. Both must fail here. That is the evidence that each test can see
its bug.

```text
8:26:57 AM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
8:26:57 AM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/week-08/app

 × src/booking.test.ts > canBook > T01 AC4: touching after is allowed 5ms
   → expected false to be true // Object.is equality
 ✓ src/booking.test.ts > canBook > T02 AC1: starting at the current time is rejected 0ms
 ✓ src/booking.test.ts > canBook > T03 AC1: zero duration is rejected 0ms
 ✓ src/booking.test.ts > canBook > T04 AC1: a reversed interval is rejected 0ms
 ✓ src/booking.test.ts > canBook > T05 AC1: an end after 1440 is rejected 0ms
 ✓ src/booking.test.ts > canBook > T06 AC2: exactly 120 minutes is allowed 0ms
 ✓ src/booking.test.ts > canBook > T07 AC2: 121 minutes is rejected 0ms
 × src/booking.test.ts > canBook > T08 AC4: touching before is allowed 0ms
   → expected false to be true // Object.is equality
 ✓ src/booking.test.ts > canBook > T09 AC4: partial overlap is rejected 0ms
 ✓ src/booking.test.ts > canBook > T10 AC4: an interval containing a booking is rejected 0ms
 ✓ src/booking.test.ts > canBook > T11 AC4: an interval inside a booking is rejected 0ms
 ✓ src/booking.test.ts > canBook > T12 AC4: an identical interval is rejected 0ms
 ✓ src/booking.test.ts > canBook > T13 AC3: a blocked room is rejected 0ms
 ✓ src/booking.test.ts > canBook > T14 AC4: an empty booking list has no overlap 0ms
 × src/booking.test.ts > canBook > AC5: an available check does not change existing bookings 0ms
   → expected false to be true // Object.is equality
 ✓ src/booking.test.ts > canBook > X1 AC1 AC2: an interval may end exactly at 1440 0ms
 ✓ src/booking.test.ts > canBook > X2 AC1: a one-minute interval after now is allowed 0ms
 × src/booking.test.ts > canBook > BUG-A AC4: the exact gap between two bookings is available 0ms
   → expected false to be true // Object.is equality
 × src/booking.test.ts > canBook > BUG-B AC5: a separate afternoon slot leaves bookings unchanged 3ms
   → expected [ { start: 600, end: 660 }, …(2) ] to deeply equal [ { start: 600, end: 660 }, …(1) ]

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook > T01 AC4: touching after is allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:12:61
     10| describe('canBook', () => {
     11|   test('T01 AC4: touching after is allowed', () => {
     12|     expect(canBook({ start: 660, end: 720, ...fixture() })).toBe(true);
       |                                                             ^
     13|   });
     14|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/5]⎯

 FAIL  src/booking.test.ts > canBook > T08 AC4: touching before is allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:40:61
     38|
     39|   test('T08 AC4: touching before is allowed', () => {
     40|     expect(canBook({ start: 570, end: 600, ...fixture() })).toBe(true);
       |                                                             ^
     41|   });
     42|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/5]⎯

 FAIL  src/booking.test.ts > canBook > AC5: an available check does not change existing bookings
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:70:83
     68|     const bookings = [{ start: 600, end: 660 }];
     69|     const before = structuredClone(bookings);
     70|     expect(canBook({ start: 660, end: 720, now: 540, blocked: false, b…
       |                                                                                   ^
     71|     expect(bookings).toEqual(before);
     72|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/5]⎯

 FAIL  src/booking.test.ts > canBook > BUG-A AC4: the exact gap between two bookings is available
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:84:83
     82|   test('BUG-A AC4: the exact gap between two bookings is available', (…
     83|     const bookings = [{ start: 600, end: 660 }, { start: 720, end: 780…
     84|     expect(canBook({ start: 660, end: 720, now: 540, blocked: false, b…
       |                                                                                   ^
     85|   });
     86|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/5]⎯

 FAIL  src/booking.test.ts > canBook > BUG-B AC5: a separate afternoon slot leaves bookings unchanged
AssertionError: expected [ { start: 600, end: 660 }, …(2) ] to deeply equal [ { start: 600, end: 660 }, …(1) ]

- Expected
+ Received

@@ -5,6 +5,10 @@
    },
    {
      "end": 900,
      "start": 840,
    },
+   {
+     "end": 810,
+     "start": 765,
+   },
  ]

 ❯ src/booking.test.ts:91:22
     89|     const before = structuredClone(bookings);
     90|     expect(canBook({ start: 765, end: 810, now: 540, blocked: false, b…
     91|     expect(bookings).toEqual(before);
       |                      ^
     92|   });
     93| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/5]⎯


 Test Files  1 failed (1)
      Tests  5 failed | 14 passed (19)
   Start at  08:26:57
   Duration  138ms (transform 19ms, setup 0ms, import 29ms, tests 12ms, environment 0ms)
```

---

## 3. Defect log

One row per defect. At least **BUG-A and BUG-B**. "Suspected cause" is your hypothesis
**before** you ask any assistant: the line and why.

| Defect | Test ID | Input | Expected | Actual | Suspected cause (line and why) |
| --- | --- | --- | --- | --- | --- |
| BUG-A | T01, T08, AC5; new BUG-A | now 540; bookings 600–660 and 720–780; request 660–720 | true: it touches both bookings | false | app/src/booking.ts:27 uses <= and >=. Equality means a shared endpoint is treated as an overlap. |
| BUG-B | new BUG-B; AC5 after the BUG-A fix | now 540; bookings 600–660 and 840–900; request 765–810 | true and the original two bookings unchanged | true, but a third booking is added | app/src/booking.ts:30 calls bookings.push on the caller's array. The new request touches nothing, so the loop cannot hide this line. |

---

I recorded these hypotheses before the paired diagnosis responses, with help from Codex. The Week 07 AC5 test fails at `.toBe(true)` on the buggy code, before its array comparison runs. This failure shows BUG-A, so it is not runtime proof of BUG-B. The separate afternoon request isolates BUG-B.

## 4. Tasks 2–3 — the skill

**The checks from the deck, before you zip it.** Answer each one yes / no:

| Check | yes / no |
| --- | --- |
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes |
| The first and the closing YAML delimiter are exactly three hyphens: `---` | yes |
| `name` is lowercase with hyphens, and `description` says WHEN to use it | yes |
| I read the whole file once: no passwords, API keys or private student data | yes |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):

```text
Archive:  week-08/skills/bug-detector.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
      570  2026-11-15 08:30   bug-detector/SKILL.md
---------                     -------
      570                     1 file
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->

I used a prompt-only simulation in the current OpenAI Codex session. This environment does not provide a skill upload screen or a way to create two independent chat sessions. Codex created the exact course SKILL.md, read its seven steps, and used them for the second response. No skill was uploaded or installed, and no invocation badge was shown. The four file checks above were checked with Codex. The real Chromium screenshot at `evidence/install.png` shows a clearly labelled local view of the saved simulation, not an upload confirmation. Its source is `evidence/install.html`.

The skill was copied by Codex, not typed by me. This differs from the manual writing step in the handout and is disclosed in AI_USAGE.md.

---

## 5. Task 4 — without the skill

This is the plain response in a paired demonstration by the current Codex assistant. No bug-detector instructions were applied for this response. It was not an independent fresh chat. The saved question and input are below:

```text
Find the root cause of the failed room-booking test. Propose minimal patch and regression test. Do not edit code.

Acceptance criteria:
AC1 Reject start >= end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Observed failure (from the Week 07 suite on the provided code):
 FAIL  src/booking.test.ts > canBook > T01 AC4: touching after is allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:12:61
     10| describe('canBook', () => {
     11|   test('T01 AC4: touching after is allowed', () => {
     12|     expect(canBook({ start: 660, end: 720, ...fixture() })).toBe(true);
       |                                                             ^
     13|   });
     14|


Provided code:
export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
T01 requests 660-720 after a booking at 600-660. AC4 says this must be Available because the times only touch. The overlap line uses start <= b.end and end >= b.start. Both comparisons are true here, so the function returns false at the shared endpoint.

The minimal BUG-A patch is one line:
- if (start <= b.end && end >= b.start) return false;
+ if (start < b.end && end > b.start) return false;

There is also a second problem in the code: bookings.push({ start, end }) adds a new item to the caller's array. This breaks AC5. Delete that one line for BUG-B. The T01 failure does not reach the push, so that failure alone does not prove the mutation happened.

For BUG-A, use now 540, blocked false, bookings 600-660 and 720-780, and request 660-720. Assert that the result is exactly true. This checks both touching sides in one request.

For BUG-B, use fresh bookings 600-660 and 840-900, copy them before the call, and request 765-810 with now 540 and blocked false. Assert true, then compare bookings with the copy. This request touches nothing, so BUG-A cannot stop the call before the push.

Run both tests on the broken function first. After each small fix, rerun its test and the full suite, including T09-T12 for real overlaps. I have not edited code or run tests for this diagnosis.
```

---

## 6. Task 5 — with the skill

This is a prompt-only simulation in the same Codex session. The instructions from `skills/bug-detector/SKILL.md` were read before the response. It was not a second independent fresh chat. The input after the question is byte-identical to section 5:

```text
Use the bug-detector skill to diagnose the failed room-booking test.

Acceptance criteria:
AC1 Reject start >= end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Observed failure (from the Week 07 suite on the provided code):
 FAIL  src/booking.test.ts > canBook > T01 AC4: touching after is allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:12:61
     10| describe('canBook', () => {
     11|   test('T01 AC4: touching after is allowed', () => {
     12|     expect(canBook({ start: 660, end: 720, ...fixture() })).toBe(true);
       |                                                             ^
     13|   });
     14|


Provided code:
export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
I am using the bug-detector procedure as a prompt-only simulation.

1. Read the criteria, code and failure. T01 expects true for 660-720 after 600-660. AC4 allows this endpoint contact. AC5 also requires the input array to stay unchanged.
2. Reproduce the decision by hand. With start 660 and b.end 660, start <= b.end is true. With end 720 and b.start 600, end >= b.start is true. The loop therefore returns false. I have not run code in this diagnosis.
3. Locate the relevant lines. The overlap condition includes equality. Later, bookings.push({ start, end }) changes the original array.
4. Separate the evidence. T01 confirms the wrong endpoint decision. The push is direct code evidence for a separate AC5 defect, but T01 returns before it. A separate non-touching test is needed to observe the array change.

Defect | Evidence | Root cause | Fix | Test
BUG-A | T01 returns false for endpoint contact | The overlap condition uses <= and >= | Replace that line with if (start < b.end && end > b.start) return false; | With now 540, blocked false, bookings 600-660 and 720-780, request 660-720; expect exactly true
BUG-B | The code calls push on bookings; this branch is not reached by T01 | The availability check also adds a booking | Delete only bookings.push({ start, end }); | Copy fresh bookings 600-660 and 840-900; request 765-810 with now 540 and blocked false; expect true, then compare bookings with the copy

5. These are two separate one-line patches. Do not rename variables or rewrite the function. I have not edited any file.
6. Run the two regression tests on the buggy code first. After fixing BUG-A, run its test and the full suite. BUG-B should still fail. After deleting the push, run its test and the full suite. T09-T12 should still reject actual overlaps. Passing status must come from the terminal, not this answer.
```

Did the environment show that the skill was invoked? **not shown**. There was no skill badge. The response states that it follows the prompt-only procedure.

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | Both bugs: inclusive comparisons break AC4, and push breaks AC5. The T01 trace supports BUG-A. | Both bugs, with the same correct causes. The answer separates the T01 observation from code evidence for BUG-B. |
| Reproducible test | Gives fixed inputs for the two-sided gap and a separate afternoon slot; asks for true and an array comparison. | Gives the same fixed inputs and exact checks. Both match the tests that failed in section 2.3. |
| Minimal proposed patch | Change the overlap line and delete the push line. These match the two small patches in section 8. | The same two one-line changes. It also says to keep the rest of the function unchanged. |
| Unsupported claims | None about passing tests. It says it did not run them in this diagnosis and explains that T01 does not prove mutation. | None about passing tests. The hand calculation is valid, and it asks for terminal evidence. |
| Clarity of explanation | Short paragraphs explain the cause and the two tests clearly. | The numbered steps and defect table are easier to scan, but add no new defect or test coverage. |

**Which bugs did each answer find?** Both answers found BUG-A and BUG-B. My verdict is `no-difference` for correctness and test quality. The skill made the answer more structured. Since both responses share one session and earlier context, this demonstration cannot measure the skill's independent effect.

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
diff --git a/week-08/app/src/booking.ts b/week-08/app/src/booking.ts
index 8d09cc2..eb25f4b 100644
--- a/week-08/app/src/booking.ts
+++ b/week-08/app/src/booking.ts
@@ -23,7 +23,7 @@ export function canBook({ start, end, now, blocked, bookings }: {
   if (end - start > 120) return false;
   if (blocked) return false;
   for (const b of bookings) {
-    if (start <= b.end && end >= b.start) return false;
+    if (start < b.end && end > b.start) return false;
   }
   // keep the room's list current with the slot that was just found free
   bookings.push({ start, end });
```

Codex applied the proposed one-line patch. I followed the comparison and understand that strict inequalities allow equal endpoints while rejecting real overlaps. The targeted run uses `-t BUG-A`, so the other tests are filtered out in that run:

```text
8:29:37 AM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
8:29:37 AM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/week-08/app

 ↓ src/booking.test.ts > canBook > T01 AC4: touching after is allowed
 ↓ src/booking.test.ts > canBook > T02 AC1: starting at the current time is rejected
 ↓ src/booking.test.ts > canBook > T03 AC1: zero duration is rejected
 ↓ src/booking.test.ts > canBook > T04 AC1: a reversed interval is rejected
 ↓ src/booking.test.ts > canBook > T05 AC1: an end after 1440 is rejected
 ↓ src/booking.test.ts > canBook > T06 AC2: exactly 120 minutes is allowed
 ↓ src/booking.test.ts > canBook > T07 AC2: 121 minutes is rejected
 ↓ src/booking.test.ts > canBook > T08 AC4: touching before is allowed
 ↓ src/booking.test.ts > canBook > T09 AC4: partial overlap is rejected
 ↓ src/booking.test.ts > canBook > T10 AC4: an interval containing a booking is rejected
 ↓ src/booking.test.ts > canBook > T11 AC4: an interval inside a booking is rejected
 ↓ src/booking.test.ts > canBook > T12 AC4: an identical interval is rejected
 ↓ src/booking.test.ts > canBook > T13 AC3: a blocked room is rejected
 ↓ src/booking.test.ts > canBook > T14 AC4: an empty booking list has no overlap
 ↓ src/booking.test.ts > canBook > AC5: an available check does not change existing bookings
 ↓ src/booking.test.ts > canBook > X1 AC1 AC2: an interval may end exactly at 1440
 ↓ src/booking.test.ts > canBook > X2 AC1: a one-minute interval after now is allowed
 ✓ src/booking.test.ts > canBook > BUG-A AC4: the exact gap between two bookings is available 1ms
 ↓ src/booking.test.ts > canBook > BUG-B AC5: a separate afternoon slot leaves bookings unchanged

 Test Files  1 passed (1)
      Tests  1 passed | 18 skipped (19)
   Start at  08:29:37
   Duration  136ms (transform 21ms, setup 0ms, import 32ms, tests 3ms, environment 0ms)
```

Full suite after only BUG-A was fixed:

```text
8:29:38 AM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
8:29:38 AM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/week-08/app

 ✓ src/booking.test.ts > canBook > T01 AC4: touching after is allowed 1ms
 ✓ src/booking.test.ts > canBook > T02 AC1: starting at the current time is rejected 0ms
 ✓ src/booking.test.ts > canBook > T03 AC1: zero duration is rejected 0ms
 ✓ src/booking.test.ts > canBook > T04 AC1: a reversed interval is rejected 0ms
 ✓ src/booking.test.ts > canBook > T05 AC1: an end after 1440 is rejected 0ms
 ✓ src/booking.test.ts > canBook > T06 AC2: exactly 120 minutes is allowed 0ms
 ✓ src/booking.test.ts > canBook > T07 AC2: 121 minutes is rejected 0ms
 ✓ src/booking.test.ts > canBook > T08 AC4: touching before is allowed 0ms
 ✓ src/booking.test.ts > canBook > T09 AC4: partial overlap is rejected 0ms
 ✓ src/booking.test.ts > canBook > T10 AC4: an interval containing a booking is rejected 0ms
 ✓ src/booking.test.ts > canBook > T11 AC4: an interval inside a booking is rejected 0ms
 ✓ src/booking.test.ts > canBook > T12 AC4: an identical interval is rejected 0ms
 ✓ src/booking.test.ts > canBook > T13 AC3: a blocked room is rejected 0ms
 ✓ src/booking.test.ts > canBook > T14 AC4: an empty booking list has no overlap 0ms
 × src/booking.test.ts > canBook > AC5: an available check does not change existing bookings 6ms
   → expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]
 ✓ src/booking.test.ts > canBook > X1 AC1 AC2: an interval may end exactly at 1440 0ms
 ✓ src/booking.test.ts > canBook > X2 AC1: a one-minute interval after now is allowed 0ms
 ✓ src/booking.test.ts > canBook > BUG-A AC4: the exact gap between two bookings is available 0ms
 × src/booking.test.ts > canBook > BUG-B AC5: a separate afternoon slot leaves bookings unchanged 1ms
   → expected [ { start: 600, end: 660 }, …(2) ] to deeply equal [ { start: 600, end: 660 }, …(1) ]

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook > AC5: an available check does not change existing bookings
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 720,
+     "start": 660,
+   },
  ]

 ❯ src/booking.test.ts:71:22
     69|     const before = structuredClone(bookings);
     70|     expect(canBook({ start: 660, end: 720, now: 540, blocked: false, b…
     71|     expect(bookings).toEqual(before);
       |                      ^
     72|   });
     73|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  src/booking.test.ts > canBook > BUG-B AC5: a separate afternoon slot leaves bookings unchanged
AssertionError: expected [ { start: 600, end: 660 }, …(2) ] to deeply equal [ { start: 600, end: 660 }, …(1) ]

- Expected
+ Received

@@ -5,6 +5,10 @@
    },
    {
      "end": 900,
      "start": 840,
    },
+   {
+     "end": 810,
+     "start": 765,
+   },
  ]

 ❯ src/booking.test.ts:91:22
     89|     const before = structuredClone(bookings);
     90|     expect(canBook({ start: 765, end: 810, now: 540, blocked: false, b…
     91|     expect(bookings).toEqual(before);
       |                      ^
     92|   });
     93| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯


 Test Files  1 failed (1)
      Tests  2 failed | 17 passed (19)
   Start at  08:29:38
   Duration  139ms (transform 20ms, setup 0ms, import 30ms, tests 12ms, environment 0ms)
```

BUG-A, T01 and T08 now pass. AC5 now reaches its array comparison and fails because of BUG-B. The dedicated BUG-B test also still fails. This is the expected intermediate state, not a final green run.

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
diff --git a/week-08/app/src/booking.ts b/week-08/app/src/booking.ts
index eb25f4b..503abbe 100644
--- a/week-08/app/src/booking.ts
+++ b/week-08/app/src/booking.ts
@@ -26,6 +26,5 @@ export function canBook({ start, end, now, blocked, bookings }: {
     if (start < b.end && end > b.start) return false;
   }
   // keep the room's list current with the slot that was just found free
-  bookings.push({ start, end });
   return true;
 }
```

---

Codex deleted the one line that changed the caller's array. I understand why an availability check should only return a result. The original comment was kept so that the repair changes only the two required code lines.

Targeted BUG-B run:

```text
8:29:58 AM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
8:29:58 AM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/week-08/app

 ↓ src/booking.test.ts > canBook > T01 AC4: touching after is allowed
 ↓ src/booking.test.ts > canBook > T02 AC1: starting at the current time is rejected
 ↓ src/booking.test.ts > canBook > T03 AC1: zero duration is rejected
 ↓ src/booking.test.ts > canBook > T04 AC1: a reversed interval is rejected
 ↓ src/booking.test.ts > canBook > T05 AC1: an end after 1440 is rejected
 ↓ src/booking.test.ts > canBook > T06 AC2: exactly 120 minutes is allowed
 ↓ src/booking.test.ts > canBook > T07 AC2: 121 minutes is rejected
 ↓ src/booking.test.ts > canBook > T08 AC4: touching before is allowed
 ↓ src/booking.test.ts > canBook > T09 AC4: partial overlap is rejected
 ↓ src/booking.test.ts > canBook > T10 AC4: an interval containing a booking is rejected
 ↓ src/booking.test.ts > canBook > T11 AC4: an interval inside a booking is rejected
 ↓ src/booking.test.ts > canBook > T12 AC4: an identical interval is rejected
 ↓ src/booking.test.ts > canBook > T13 AC3: a blocked room is rejected
 ↓ src/booking.test.ts > canBook > T14 AC4: an empty booking list has no overlap
 ↓ src/booking.test.ts > canBook > AC5: an available check does not change existing bookings
 ↓ src/booking.test.ts > canBook > X1 AC1 AC2: an interval may end exactly at 1440
 ↓ src/booking.test.ts > canBook > X2 AC1: a one-minute interval after now is allowed
 ↓ src/booking.test.ts > canBook > BUG-A AC4: the exact gap between two bookings is available
 ✓ src/booking.test.ts > canBook > BUG-B AC5: a separate afternoon slot leaves bookings unchanged 2ms

 Test Files  1 passed (1)
      Tests  1 passed | 18 skipped (19)
   Start at  08:29:58
   Duration  125ms (transform 20ms, setup 0ms, import 30ms, tests 3ms, environment 0ms)
```

Full suite after both fixes, with no test filter:

```text
8:29:58 AM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
8:29:58 AM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/week-08/app

 ✓ src/booking.test.ts > canBook > T01 AC4: touching after is allowed 1ms
 ✓ src/booking.test.ts > canBook > T02 AC1: starting at the current time is rejected 0ms
 ✓ src/booking.test.ts > canBook > T03 AC1: zero duration is rejected 0ms
 ✓ src/booking.test.ts > canBook > T04 AC1: a reversed interval is rejected 0ms
 ✓ src/booking.test.ts > canBook > T05 AC1: an end after 1440 is rejected 0ms
 ✓ src/booking.test.ts > canBook > T06 AC2: exactly 120 minutes is allowed 0ms
 ✓ src/booking.test.ts > canBook > T07 AC2: 121 minutes is rejected 0ms
 ✓ src/booking.test.ts > canBook > T08 AC4: touching before is allowed 0ms
 ✓ src/booking.test.ts > canBook > T09 AC4: partial overlap is rejected 0ms
 ✓ src/booking.test.ts > canBook > T10 AC4: an interval containing a booking is rejected 0ms
 ✓ src/booking.test.ts > canBook > T11 AC4: an interval inside a booking is rejected 0ms
 ✓ src/booking.test.ts > canBook > T12 AC4: an identical interval is rejected 0ms
 ✓ src/booking.test.ts > canBook > T13 AC3: a blocked room is rejected 0ms
 ✓ src/booking.test.ts > canBook > T14 AC4: an empty booking list has no overlap 0ms
 ✓ src/booking.test.ts > canBook > AC5: an available check does not change existing bookings 1ms
 ✓ src/booking.test.ts > canBook > X1 AC1 AC2: an interval may end exactly at 1440 0ms
 ✓ src/booking.test.ts > canBook > X2 AC1: a one-minute interval after now is allowed 0ms
 ✓ src/booking.test.ts > canBook > BUG-A AC4: the exact gap between two bookings is available 0ms
 ✓ src/booking.test.ts > canBook > BUG-B AC5: a separate afternoon slot leaves bookings unchanged 0ms

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  08:29:58
   Duration  143ms (transform 21ms, setup 0ms, import 32ms, tests 7ms, environment 0ms)
```

The full suite also passed after the fresh dependency install (`evidence/10-after-clean-install.txt`). All 19 tests pass. T01, T08 and BUG-A allow touching endpoints. T09-T12 still reject real overlaps. AC5 and BUG-B compare the array with its earlier copy. The Vitest startup warnings come from the inherited React/Vite setup; they are included in the raw output and did not fail the run.

I also checked the production build with `npm run build`:

```text

> smart-campus-availability@0.0.0 build
> tsc && vite build

vite v5.4.21 building for production...
transforming...
✓ 32 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.42 kB │ gzip:  0.28 kB
dist/assets/index-X8OGNIvT.css    0.66 kB │ gzip:  0.36 kB
dist/assets/index-S3CF_WEU.js   144.73 kB │ gzip: 46.62 kB
✓ built in 585ms
```

The following real browser checks used the built app:

```text
Date: 2026-11-15
Real Chromium checks on the production build.
PASS desktop: two checks of 11:00-12:00 stay Available and preserve the booking list (AC4, AC5).
PASS desktop: 10:30-11:30 overlaps the existing booking and returns Unavailable (AC4).
PASS desktop: 120 minutes is allowed and 121 minutes is rejected (AC2).
PASS desktop: a blocked room returns Unavailable (AC3).
PASS desktop: current-time and reversed requests are rejected; reversed time has clear feedback (AC1, AC6).
PASS desktop: an empty field shows the validation message (AC6).
PASS mobile 390x844: the endpoint request is Available, controls are visible and there is no horizontal overflow (AC4, AC6).
PASS browser: no JavaScript page errors.
```

Screenshots: `evidence/ui-desktop.png`, `evidence/ui-overlap.png` and `evidence/ui-mobile.png`.

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | The final checker has no FAIL or ERROR. |

Checker result: **31 PASS, 0 FAIL, 0 ERROR**.

The checker reads file content. Its green result does not prove that a skill was installed or that the two responses came from fresh chats. The manual skill step and independent-chat step were not completed as written; the same-session simulation and Codex authorship are disclosed in section 4 and AI_USAGE.md.

### 9.2 One limitation of AI-assisted debugging

The old AC5 test had a useful title, but its first assertion stopped at BUG-A and never checked the changed array. An AI could read the title and claim that mutation was already tested. I needed the separate BUG-B input and the real terminal failure to prove which defect each test could see. The two diagnosis responses also shared one session, so they cannot show that the skill improved independent reasoning.

---

## 10. Conclusion (80–150 words)

<!-- Answer both, in your own words, without the assistant (3-5 sentences, as the deck asks):
     (a) Did the skill help? Show it with one row of section 7.
     (b) What did your tests actually prove - and what did they not?
     Worthless: "The skill made the AI much better at debugging."
     Worth everything: "Both answers found BUG-A from the T01 failure. Only the skill answer
     separated BUG-B as a hypothesis instead of a fact, because step 4 told it to. BUG-B was only
     visible after the BUG-A patch: the AC5 test had been failing for the wrong reason." -->

<!-- Write your conclusion below this line -->

The skill made the explanation easier to read, as the clarity row shows, but both responses found the same two bugs and proposed the same small fixes, so my verdict is no difference in correctness. My tests showed that touching endpoints are allowed, real overlaps are rejected, and an available check keeps the original bookings unchanged for the tested inputs. I understand why the old AC5 test first failed for the wrong reason, and I can explain both faulty lines, both fixes, and their evidence in a defence. The green suite proves these fixed cases, but it does not prove every possible input or a benefit from the skill, because this comparison used one shared Codex session.
