# Week 08 — Lab report

**Name:** Shynbulat Kazbek
**Student ID:** 24B032123
**Group:** not provided
**Date:** 2026-11-15

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

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

The source is the committed Week 07 app at `9c43b5b`. Before setup, I saved the local untracked files in a stash and confirmed a clean `week-08` branch. The inherited lock file had incorrect platform metadata. I fixed that metadata before installing; all dependency versions and the 17 original tests stayed the same. Details are in `evidence/00-setup.txt`.

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

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

Did the environment show that the skill was invoked? yes / no / not shown

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | | |
| Reproducible test | | |
| Minimal proposed patch | | |
| Unsupported claims | | |
| Clarity of explanation | | |

**Which bugs did each answer find?** (BUG-A, BUG-B, both, neither)

-

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
(paste here)
```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
(paste here)
```

---

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 One limitation of AI-assisted debugging

<!-- Use something that actually happened in sections 5-8. 20 words or more. -->
-

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
