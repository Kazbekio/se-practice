# SIS #04 — Report: Evolving the Smart Campus Room Availability Checker

**Name:** Shynbulat Kazbek

**Student ID:** 24B032123

**Group/session:** Monday 16:00 - 19:00 (from Week 07 report)

**Date:** 2026-11-18

## 1. Setup and starting point

| Item | Value |
| --- | --- |
| Assistant (tool) | OpenAI Codex |
| Assistant model | not displayed |
| Starting point | week-08 |
| Baseline commit | 6cc1665 |
| Language (ts or js) | ts |
| Vitest version | 4.1.12 |
| Where I ran the tests | my computer, through the Codex terminal |

The baseline comes from week-08 at 2d3a7cd. All ten app files were compared byte-for-byte before the first commit. The group/session value comes from the earlier Week 07 report. Codex carried out the edits and tests while I followed the work.

### 1.1 Baseline run

```text
6:43:50 PM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
6:43:50 PM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/sis-04/app

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
   Start at  18:43:50
   Duration  131ms (transform 21ms, setup 0ms, import 31ms, tests 6ms, environment 0ms)

```

## 2. Context for the assistant



### 2.1 Repository map

```text
app/src/App.tsx — page, two inline rooms, form state, check(), toMinutes(), fmt(), room selector and status.
app/src/booking.ts — pure canBook plus Booking and BookingRequest types; AC1-AC5 already repaired in Week 08.
app/src/booking.test.ts — 19 fixed-clock Vitest tests, including endpoint contact and non-mutation regressions.
app/src/index.css — responsive baseline page styling.
app/src/main.tsx — mounts App and imports CSS.
app/package.json + package-lock.json — React, TypeScript, Vite and Vitest; build and test commands.
sis-04/tests/ — supplied structural checker and declaration validator; do not edit.
```

### 2.2 The context message as sent

This was sent as the first message of a new, independent Codex session, with no parent conversation. The booking source is formatted compactly in this message; the baseline app files were kept unchanged.

```text
SIS 04 codebase analysis. Use clear English at B1 level. Inspect the baseline through this map and the source below. Give at least three located maintainability risks with evidence and priority, and a small numbered improvement plan. Discuss alternatives for blocked-room visibility and for refreshing results when the room changes. Analysis and plan only: no code yet, no full rewrite, no file edits.

Repository map:
app/src/App.tsx — page, two inline rooms, form state, check(), toMinutes(), fmt(), room selector and status.
app/src/booking.ts — pure canBook plus Booking and BookingRequest types; AC1-AC5 already repaired in Week 08.
app/src/booking.test.ts — 19 fixed-clock Vitest tests, including endpoint contact and non-mutation regressions.
app/src/index.css — responsive baseline page styling.
app/src/main.tsx — mounts App and imports CSS.
app/package.json + package-lock.json — React, TypeScript, Vite and Vitest; build and test commands.
sis-04/tests/ — supplied structural checker and declaration validator; do not edit.

Baseline source: week-08 commit 2d3a7cd, copied unchanged into sis-04/app/.

Preserve:
AC1 Reject start >= end and requests in the past.
AC2 Maximum duration 120 minutes.
AC3 Reject a blocked room.
AC4 Reject overlap; allow endpoint contact.
AC5 Return Available / Unavailable without changing or saving booking data.
AC6 Clear responsive feedback on desktop and mobile.

New requirements:
F1 Room capacity >= attendees.
F2 A room must contain ALL selected equipment.
F3 A blocked room is never Available.
F4 Clear empty state for no matches.
F5 Switching rooms refreshes the result and uses that room's own bookings.

Constraints: at least four fictional rooms with id, name, capacity, equipment, blocked and bookings. No login, payments, live APIs, database, network calls or browser storage. Keep TypeScript. Data in src/rooms.ts (Room, ROOMS), filtering in src/filter.ts (filterRooms), booking in src/booking.ts (canBook, checkRoom), UI imports these rules. Preserve canBook and the 19 existing tests. Add fixed-fixture tests with AC1-AC5, F1-F5, B1-B6 and INT titles. No mocks, skip, only or test.each. Record one change at a time and test after it.

Baseline App.tsx:
import { useState } from 'react';
import { canBook } from './booking';

// Starter for students with no Week 06 project. The availability decision lives INSIDE this
// component on purpose: Task 1 of Practice #07 is to extract it into src/booking.ts as
// canBook({ start, end, now, blocked, bookings }) without changing what the page does.

type Interval = { start: number; end: number };
type Room = { id: string; name: string; blocked: boolean; bookings: Interval[] };

const ROOMS: Room[] = [
  { id: 'a101', name: 'Room A-101', blocked: false, bookings: [{ start: 600, end: 660 }] },
  { id: 'b204', name: 'Room B-204', blocked: false, bookings: [] },
];

const toMinutes = (value: string) => {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
};
const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2,'0')}`;

export default function App() {
  const [roomId, setRoomId] = useState('a101');
  const [now, setNow] = useState('09:00');
  const [blocked, setBlocked] = useState(false);
  const [start, setStart] = useState('11:00');
  const [end, setEnd] = useState('12:00');
  const [endOfDay, setEndOfDay] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const room = ROOMS.find(r => r.id === roomId)!;

  function check() {
    setResult(null);
    if (!start || !now || (!end && !endOfDay)) {
      setError('Fill in the current time, the start and the end.');
      return;
    }
    const s = toMinutes(start);
    const e = endOfDay ? 1440 : toMinutes(end);
    const n = toMinutes(now);
    if (!(s < e)) {
      setError('The end time must be after the start time.');
    } else {
      setError('');
    }

    const ok = canBook({ start: s, end: e, now: n, blocked, bookings: room.bookings });
    setResult(ok);
  }

  return (
    <main className="page">
      <h1>Smart Campus Room Availability</h1>
      <div className="row">
        <label>Room
          <select value={roomId} onChange={e => setRoomId(e.target.value)}>
            {ROOMS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </label>
        <label>Current time<input type="time" value={now} onChange={e => setNow(e.target.value)} /></label>
        <label>Start<input type="time" value={start} onChange={e => setStart(e.target.value)} /></label>
        <label>End<input type="time" value={end} disabled={endOfDay} onChange={e => setEnd(e.target.value)} /></label>
        <label className="inline"><input type="checkbox" checked={endOfDay} onChange={e => setEndOfDay(e.target.checked)} /> Ends at 24:00</label>
        <label className="inline"><input type="checkbox" checked={blocked} onChange={e => setBlocked(e.target.checked)} /> Room blocked</label>
      </div>
      <button onClick={check}>Check availability</button>
      {error && <p className="error">{error}</p>}
      {result !== null && (
        <p className={`result ${result ? 'available' : 'unavailable'}`}>{result ? 'Available' : 'Unavailable'}</p>
      )}
      <h2>Existing bookings</h2>
      <ul>{room.bookings.length ? room.bookings.map((b, i) => <li key={i}>{fmt(b.start)}–{fmt(b.end)}</li>) : <li>none</li>}</ul>
    </main>
  );
}

Baseline booking.ts:
export type Booking = { start: number; end: number; };
export type BookingRequest = { start: number; end: number; now: number; blocked: boolean; bookings: Booking[]; };
export function canBook({ start, end, now, blocked, bookings }: {start: number; end: number; now: number; blocked: boolean; bookings: { start: number; end: number }[];}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start < b.end && end > b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  return true;
}
```

## 3. Codebase analysis (Task 1)



### 3.1 Maintainability risks

| # | Risk | Where (file / function) | Evidence | Priority |
| --- | --- | --- | --- | --- |
| 1 | Room block status can be bypassed | src/App.tsx, check() | blocked is a separate checkbox state; the call uses it rather than room.blocked. | High |
| 2 | A room change leaves the old result visible | src/App.tsx, room select onChange | The handler sets only roomId, while result remains a stored Boolean from the previous room. | High |
| 3 | Data and presentation grow together | src/App.tsx, ROOMS and local Room type | Two inline rooms lack capacity and equipment; filtering here would mix data, rules and UI. | Medium |
| 4 | An empty filtered list can crash selection | src/App.tsx, ROOMS.find(...)! | The non-null assertion is followed by room.bookings; there is no path for no matching room. | High |

I confirmed these statements in the baseline file. They are risks in the working prototype when the new requirements are added, not planted defects. The analysis answer is preserved in evidence/ai/01-analysis-answer.txt.

### 3.2 Improvement plan — before editing

1. Preserve the baseline and its 19 passing tests. Move complete fictional room data into rooms.ts.
2. Add fixed-fixture filter tests first, record the missing-module failure, then implement filterRooms for capacity and ALL equipment. Run the full suite.
3. Add selected-room tests first, then implement checkRoom using the chosen room's blocked status and bookings. Keep canBook unchanged and run the full suite.
4. Connect the catalog and filters to controlled UI components. Use a safe fallback selection and a clear no-match state.
5. Store the checked request and derive its result for the current room. Clear it when times or filters change. Share time-field rendering and remove the UI's repeated time-order rule.
6. Run the full suite and build after refactoring. Verify desktop/mobile flows in Chromium, capture all five screenshots, render both diagrams and measure the quality table.

This plan is committed before the first change to app/src.

### 3.3 One AI suggestion I rejected or modified

| Suggestion (as the assistant made it) | Decision | Why — with the AC, F-rule, test or file behind it |
| --- | --- | --- |
| Add a UI test for the empty message and for switching rooms with the same request. | Modified | I will use real Chromium browser automation for F4, F5 and AC6, plus a pure Vitest INT test, rather than adding jsdom and a rendering library to app dependencies. The browser checks must be recorded separately from the Vitest test count. |
| Clear the result and ask the user to check again after a room change, offered as one option. | Rejected | I chose a derived result for the checked request, so F5 updates immediately with the new room's own data and no old Boolean remains. |

## 4. Feature extension (Task 2)



### 4.1 What I added

<!-- Short: the catalog (how many rooms, which equipment), how the filter is chosen on the page,
     what the empty state says, what happens to an old result when the room changes. -->

(write here)

### 4.2 Demonstration

<!-- One row per screenshot in evidence/. Say what is on it: the filter values, the rooms shown,
     the room selected, the times entered and the result. -->

| Screenshot | What it shows |
| --- | --- |
| `evidence/filter-match.png` | (write here) |
| `evidence/filter-empty.png` | (write here) |
| `evidence/switch-a.png` | (write here) |
| `evidence/switch-b.png` | (write here) |
| `evidence/narrow.png` | (write here) |

## 5. Refactoring (Task 3)

<!-- The diagrams are diagrams/before.puml and diagrams/after.puml (README section 8). -->

### 5.1 Module responsibilities after

| Module or component | Responsibility |
| --- | --- |
| `src/rooms.ts` | (write here) |
| `src/booking.ts` | (write here) |
| `src/filter.ts` | (write here) |
| (write here) | (write here) |

### 5.2 Design decisions

<!-- At least two. The alternative is what you could have done instead (often what the assistant
     proposed). The why names an AC, an F-rule, a test or a risk from 3.1. -->

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

### 5.3 Duplication removed

<!-- One row per duplicated location that is gone. Count what you can point at, nothing else. -->

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| (write here) | (write here) |

## 6. Automated tests (Task 4)



### 6.1 Test plan

<!-- One row per required ID. A test may carry several IDs in its title,
     e.g. test('T06 B1 AC2: exactly 120 minutes is available', …) covers B1 and AC2. -->

| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | (write here) | (write here) |
| AC2 | (write here) | (write here) |
| AC3 | (write here) | (write here) |
| AC4 | (write here) | (write here) |
| AC5 | (write here) | (write here) |
| F1 | (write here) | (write here) |
| F2 | (write here) | (write here) |
| F3 | (write here) | (write here) |
| F4 | (write here) | (write here) |
| F5 | (write here) | (write here) |
| B1 | (write here) | (write here) |
| B2 | (write here) | (write here) |
| B3 | (write here) | (write here) |
| B4 | (write here) | (write here) |
| B5 | (write here) | (write here) |
| B6 | (write here) | (write here) |
| INT | (write here) | (write here) |

### 6.2 Commands

<!-- The commands exactly as you typed them, from app/. -->

```text
(paste here)
```

### 6.3 Final run

<!-- The REAL output of the full run on your final code. Every test passes, and the number of
     tests equals what your test files hold (R2). -->

```text
(paste here)
```

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->

| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | (write here) | (write here) | (write here) |
| Duplicated logic locations removed | (write here) | (write here) | (write here) |
| Code structure: modules and their responsibilities | (write here) | (write here) | (write here) |
| Remaining limitation | (write here) | (write here) | (write here) |

## 8. AI evidence appendix

<!-- At least three exchanges, one ### 8.N block each: the analysis (Task 1), the plan, and at
     least one implementation, refactoring or test exchange. Copy the block for more.
     The prompt as you sent it; the output may be cut to the part you used, with "[…]" where
     you cut. Verified by: the test, run, file or check that confirmed it — not "it looked right". -->

### 8.1 Exchange 1

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.2 Exchange 2

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.3 Exchange 3

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

## 9. Checker results and known fails

<!-- Every check still FAIL or ERROR in your last run of python tests/check_sis.py, and why.
     The same IDs go in submission.yml known_fails. None left? Write: none. -->

| Check | Why it still fails |
| --- | --- |
| (write here) | (write here) |

## 10. AI reflection (Task 6)

<!-- 200–300 words, your own words, no assistant. Answer all five:
     What context did you provide the AI assistant? Which generated suggestions were useful or
     incorrect? What did you personally verify? How did tests influence your engineering
     decisions? What would you improve next? -->

(write here)
