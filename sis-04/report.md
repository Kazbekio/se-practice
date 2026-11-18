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

The implementation adds the catalog and connects it through the imported rules. The red and green runs are kept in evidence/02-filter-red.txt through 05-checkroom-green.txt. The first red filter run failed to load the missing module; it did not execute the new assertions. The second red run had nine failing calls to the missing checkRoom export. After implementation, all 34 tests passed.

### 4.1 What I added

I added five fictional rooms: Cedar (8 seats), Orion (14), Comet (24), Delta (12) and Nova (32). Their equipment uses projector, whiteboard, camera and power outlets. Comet is blocked for maintenance and stays visible with a label.

The user enters attendees and selects equipment checkboxes. filterRooms requires enough seats and every selected item. If nothing matches, the page says No rooms match your needs and disables the check form. A missing selected ID falls back to the first match, or to no selection for an empty list.

The page stores the checked numeric request. Changing the selected room computes the result again through checkRoom with that room's own data. Changing a time or filter clears the checked request. Native required fields handle missing clock inputs. canBook remains the only place that decides time order, maximum duration, blocking and overlaps.

### 4.2 Demonstration

| Screenshot | What it shows |
| --- | --- |
| evidence/filter-match.png | 12 attendees, projector and whiteboard: only Orion and Nova remain. Orion is selected; the form shows 09:00 now and 10:30-11:00, with the old result cleared by filtering. |
| evidence/filter-empty.png | 40 attendees with projector and whiteboard: no room matches. The empty message is visible, no room is selected, and Check availability is disabled. |
| evidence/switch-a.png | Cedar is selected with now 09:00 and request 10:30-11:00. The result is Unavailable because Cedar has a 10:00-11:00 booking. |
| evidence/switch-b.png | The same 09:00 clock and 10:30-11:00 request, with Orion selected. The result becomes Available without another Check click; Orion's booking is 13:00-14:00. |
| evidence/narrow.png | A real 390x844 portrait viewport, captured as a full page. Cedar at 11:00-12:00 is Available, controls remain visible and there is no horizontal overflow. |

The reproducible browser script is evidence/browser-checks.cjs. Its real log is evidence/08-browser-checks.txt. The screenshots have five different file hashes, recorded in evidence/image-manifest.json.

## 5. Refactoring (Task 3)

The before diagram shows the baseline imports. The after diagram was generated from the final local imports, including type imports. Each non-test source file has one box.

Both diagrams were rendered locally with the official PlantUML JAR and Smetana. Automatic approval review rejected sending the source-derived graph to an external PlantUML server, so no diagram data was uploaded. The local renderer succeeded; the PNG files were inspected. The command and result are in evidence/09-diagram-render.txt. The Smetana syntax is documented in [PlantUML](https://plantuml.com/deployment-diagram).

### 5.1 Module responsibilities after

| Module or component | Responsibility |
| --- | --- |
| src/rooms.ts | Room type, five fictional rooms and equipment labels; data only. |
| src/booking.ts | Pure canBook and checkRoom using the selected room. Executable canBook statements are unchanged; only its obsolete saving comment was removed. |
| src/filter.ts | Pure capacity and ALL-equipment filtering. |
| src/App.tsx | Controlled state, safe selection, checked request and calls to imported rules. |
| src/components/RoomFilters.tsx | Attendee and equipment controls. |
| src/components/RoomCatalog.tsx | Room cards, maintenance labels and the empty state. |
| src/components/AvailabilityPanel.tsx | Time form, result and selected-room bookings. |
| src/components/TimeField.tsx | Shared labelled time input, used three times. |
| src/time.ts | Clock-string conversion and display formatting; no availability rule. |
| src/main.tsx and src/index.css | Mounting and responsive presentation. |

### 5.2 Design decisions

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| Keep maintenance rooms visible and labelled. | Hide every blocked room in the filter. | F1 and F2 describe matching needs. F3 is enforced by checkRoom; a label explains why a matching room is unavailable. |
| Derive the result from the checked request and selected room. | Store an independent result Boolean, or clear it on every room switch. | This removes the stale-result risk from 3.1 and gives immediate F5 feedback for the same times. Time and filter edits clear the checked request. |
| Keep booking decisions inside canBook. | Repeat time-order checks in the UI or add capacity checks to canBook. | AC1-AC5 already have regression tests. The filter owns F1-F2, and native required fields handle missing form inputs. |
| Keep Vitest integration tests and separate real-browser verification. | Add jsdom and a rendering library to the app. | INT can exercise the pure functions, while the actual Chromium flow checks F4, F5 and AC6 on the built page. The browser checks are reported separately. |

### 5.3 Duplication removed

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| src/App.tsx, check(): a second start < end decision repeated the booking guard. | Only canBook decides time order. The UI calls checkRoom and shows its Boolean result. |
| src/App.tsx, Start input: repeated labelled time-input rendering from the current-time field. | Shared components/TimeField.tsx, with label, value and handler props. |
| src/App.tsx, End input: another time-input rendering copy, with a disabled variation. | The same TimeField component, using its disabled prop. |

I count one duplicate rule and two extra rendering copies: three removed locations. These are specific code locations, not a percentage of maintainability. The old misleading booking-saving comment was also removed, but is not counted as duplicated logic.

## 6. Automated tests (Task 4)



### 6.1 Test plan

The original 19-test file is unchanged. Fifteen additional tests use a fresh four-room fixture inside catalog.test.ts. They never import the demo ROOMS. Fixture c stays in filter matches but is always unavailable. Expected values come from the requirements, not from observed function output.

| ID | Test title (as in the file) | Input -> expected |
| --- | --- | --- |
| AC1 | T02 AC1: starting at the current time is rejected | 540-570 with now 540 -> false |
| AC2 | T06 AC2: exactly 120 minutes is allowed | 720-840 with now 540 -> true |
| AC3 | AC3 F3: a blocked room is unavailable | blocked fixture c, 630-660 -> false |
| AC4 | AC4 B3: endpoint contact is allowed | fixture d booking 660-720, request 630-660 -> true |
| AC5 | AC5 F5: repeated checks preserve every room | available and blocked checks leave the full catalog equal to its deep copy |
| F1 | F1 B5: equal capacity is included | 8 attendees -> IDs a, b, c |
| F2 | F2: all selected equipment is required | 6 attendees plus projector and whiteboard -> IDs a, c |
| F3 | AC3 F3: a blocked room is unavailable | valid slot in blocked room c -> false |
| F4 | F4: no room has enough seats | 21 attendees -> empty list |
| F5 | F5: the same request uses each room own bookings | same 630-660 request -> a false, b true |
| B1 | AC2 B1: exactly 120 minutes is allowed | room b, 600-720 -> true |
| B2 | AC2 B2: 121 minutes is rejected | room b, 600-721 -> false |
| B3 | AC4 B3: endpoint contact is allowed | room d, 630-660 -> true |
| B4 | AC4 B4: overlap is rejected | room a, 630-660 -> false |
| B5 | F1 B5: equal capacity is included | capacity 8 and attendees 8 -> included |
| B6 | F1 B6: capacity one below is excluded | capacity 8 and attendees 9 -> excluded; IDs b, c remain |
| INT | INT F1 F2 F3: filter matches are checked for availability | filter gives a, c; check the returned rooms at 660-720 -> true, false; data unchanged |

### 6.2 Commands

The actual test/build commands ran with app/ as their working directory:

```text
npx --no-install vitest run --reporter=verbose
npm run build
```

The repository root used a capture helper, for example python3 /tmp/sis04_run.py 10-final-suite.txt npx --no-install vitest run --reporter=verbose. It installed no app dependency into the submission: the unchanged lock file was used in /tmp/sis04-deps, and a temporary node_modules symlink was removed after each command. Normal setup and local run commands are in app/README.md.

The first filter red run failed on the missing module, with the original 19 tests still passing. Adding filterRooms made 25 tests pass. The selected-room red run then had nine failing calls because checkRoom was not exported yet; implementation made all 34 pass. After UI refactoring, all 34 remained green. The complete intermediate runs are preserved in evidence/.

### 6.3 Final run

```text
7:09:54 PM [vite] warning: `esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `oxc` instead.
7:09:54 PM [vite] warning: `optimizeDeps.esbuildOptions` option was specified by "vite:react-babel" plugin. This option is deprecated, please use `optimizeDeps.rolldownOptions` instead.
Both esbuild and oxc options were set. oxc options will be used and esbuild options will be ignored. The following esbuild options were set: `{ jsx: 'automatic', jsxImportSource: undefined }`

 RUN  v4.1.12 /home/nqmvl/se-practice/sis-04/app

 ✓ src/catalog.test.ts > F1 B5: equal capacity is included 2ms
 ✓ src/catalog.test.ts > F1 B6: capacity one below is excluded 0ms
 ✓ src/catalog.test.ts > F2: all selected equipment is required 0ms
 ✓ src/catalog.test.ts > F2: no equipment requirement allows every capacity match 0ms
 ✓ src/catalog.test.ts > F4: no room has enough seats 0ms
 ✓ src/catalog.test.ts > AC5 F1 F2: filtering preserves the catalog and criteria 0ms
 ✓ src/catalog.test.ts > AC3 F3: a blocked room is unavailable 0ms
 ✓ src/catalog.test.ts > F5: the same request uses each room own bookings 0ms
 ✓ src/catalog.test.ts > F5: an unknown room is unavailable 0ms
 ✓ src/catalog.test.ts > AC5 F5: repeated checks preserve every room 0ms
 ✓ src/catalog.test.ts > AC2 B1: exactly 120 minutes is allowed 0ms
 ✓ src/catalog.test.ts > AC2 B2: 121 minutes is rejected 0ms
 ✓ src/catalog.test.ts > AC4 B3: endpoint contact is allowed 0ms
 ✓ src/catalog.test.ts > AC4 B4: overlap is rejected 0ms
 ✓ src/catalog.test.ts > INT F1 F2 F3: filter matches are checked for availability 0ms
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

 Test Files  2 passed (2)
      Tests  34 passed (34)
   Start at  19:09:54
   Duration  148ms (transform 63ms, setup 0ms, import 90ms, tests 11ms, environment 0ms)

```

The inherited Vitest/React plugin prints startup deprecation warnings. They were also present in the baseline; the full outputs are preserved. The final production build succeeded in evidence/11-final-build.txt. Browser verification is a separate ten-check demo flow, not part of the 34 Vitest test count.

## 7. Quality evaluation (Task 5)

| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | 19/19 | 34/34 | The real Tests summary lines in 1.1 and 6.3. |
| Duplicated logic locations removed | 0 removed | 3 removed | Counted the three specific rows in 5.3 against the baseline-to-final diff. |
| Code structure: modules and their responsibilities | 5 source files: 4 non-test files and 1 test file; room data and UI shared App. | 13 source files: 11 non-test files and 2 test files; rooms, booking, filter, state and presentation have distinct roles. | git ls-tree at 6cc1665 and git ls-files app/src after the UI commit; the exact lists are in evidence/source-files-before.txt and source-files-after.txt. Read roles against 5.1. |
| Remaining limitation | The stored result could remain after selecting a different room. | Unavailable is still a Boolean result with a general message, rather than a precise rejection reason. The browser proof is a separate command and does not run with npm test. | Read the baseline onChange handler and compared it with the live browser flow; inspected the final status message and package test script. |

The browser checks also covered the 24:00 boundary, empty native form validation, filter fallback and zero page errors. They are additional observations, not extra Vitest tests or invented quality scores.

## 8. AI evidence appendix

The analysis used one independent Codex session with no parent history. The next two exchanges continued that session. The reviewer did not edit files. The parent Codex session implemented the code and recorded the verification. Model version: not displayed. The first two answers are saved in full; the third is an output-used excerpt with omissions marked […].

### 8.1 Exchange 1

**Tool and model:** OpenAI Codex — not displayed
**Date:** 2026-11-18
**Purpose:** Find located maintainability risks before changing source.

**Prompt:**

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

**Output used:**

```text
The main risks are in `App.tsx`. The pure `canBook` function already supports AC1–AC5, so keep its behaviour and all 19 existing tests.

| Priority | Location | Evidence and risk |
|---|---|---|
| High | [App.tsx:25](/home/nqmvl/se-practice/sis-04/app/src/App.tsx:25), line 49 | The check uses a separate `blocked` checkbox. It ignores `room.blocked`. A blocked room could therefore return Available when more rooms are added. This breaks F3. |
| High | [App.tsx:58](/home/nqmvl/se-practice/sis-04/app/src/App.tsx:58) | Changing rooms updates only `roomId`. The stored result remains. For example, check A-101 at 10:00–11:00, then select B-204: the old Unavailable result remains, although B-204 has no bookings. This breaks F5. |
| Medium | [App.tsx:9](/home/nqmvl/se-practice/sis-04/app/src/App.tsx:9) | Room types and data live inside the page. There are only two rooms, without capacity or equipment. Adding F1 and F2 here would mix room data, rules and display code. |
| Medium | [App.tsx:32](/home/nqmvl/se-practice/sis-04/app/src/App.tsx:32) | The `!` assumes the selected room always exists. Filtering can remove that room or return no rooms. Later access to `room.bookings` could then crash the page instead of showing F4 feedback. |
| Low | [booking.ts:6](/home/nqmvl/se-practice/sis-04/app/src/booking.ts:6), line 14 | `BookingRequest` exists, but `canBook` repeats its fields in another type. These definitions could become different later. The comment at line 28 also suggests saving a booking, although AC5 forbids that. |

For blocked rooms, there are two reasonable choices:

- **Show them with a “Blocked” label.** Users can understand why a room is unavailable. This is my recommendation. Capacity and equipment still control matching; `checkRoom` always rejects blocked rooms.
- **Hide them.** This gives users fewer choices, but hides useful information. Explain this choice in the report and keep the blocked check inside `checkRoom`.

For room changes, there are also two choices:

- **Clear the result and ask the user to check again.** This prevents an old result, but adds another click.
- **Refresh automatically after the first check.** This fits F5 better. Use the new room’s ID and bookings with the same times. Do not update `roomId` and then immediately read the old state. If a time input changes, clear or refresh the result too.

I recommend this small plan:

1. Record the real baseline test output. Move room data into `rooms.ts`, with `Room` and at least four fictional rooms containing every required field. Run the original tests.
2. Add fixed-fixture tests for F1, F2, F4, B5 and B6. Implement `filterRooms`: capacity must be at least attendees, and every selected equipment item must exist.
3. Add `checkRoom` in `booking.ts`. It must find the selected room and call unchanged `canBook` with that room’s blocked status and bookings. Return false for unknown IDs. Add F3, F5, B1–B4 and INT tests, plus a non-mutation check.
4. Connect the page to the imported data and rules. Add attendee and equipment controls, a safe room selection, and a clear no-match message.
5. Add automatic room-result refresh and the chosen blocked-room display. Check feedback and layout on desktop and mobile, then run the full tests and build.

For each code change, write the new test first where appropriate, run all tests, review the diff, and record the real result. Keep fixtures local to tests; use no mocks, skipped tests, `.only`, or `test.each`. Leave the supplied checker files unchanged.

No files were changed or tests run during this review.
```

**Problems found:** The baseline uses a global blocked checkbox, stores stale results and assumes a selected room exists. The reviewer also noted an obsolete saving comment.
**Changes made:** Confirmed four risks in the baseline and added the numbered plan; left app/src unchanged in the analysis commit.
**Verified by:** Baseline App.tsx, canBook source, integrity-checks.json and commit a009bea before the first source change.

### 8.2 Exchange 2

**Tool and model:** OpenAI Codex — not displayed
**Date:** 2026-11-18
**Purpose:** Compare safe module boundaries and UI result policies.

**Prompt:**

```text
Choose a small test-first plan for this application, still with no file edits. I will keep canBook unchanged and retain the 19 tests. Please compare clearing a result on room change with computing it again from the selected room and the current checked request. Also give the tradeoff between hiding blocked rooms and keeping them visible with a label. Suggest exact boundaries for a rooms module, filter module, booking module and presentation components. Include one alternative worth rejecting and explain why. Use English B1.
```

**Output used:**

```text
I recommend keeping blocked rooms visible with a “Blocked” label and computing the result again when the selected room changes. Keep `canBook` and its 19 tests unchanged.

| Room-change option | Benefit | Cost |
|---|---|---|
| Clear the result | Simple; removes the old result | The user must click Check again |
| Compute it again | Shows the new room’s result immediately, using the same checked times | Needs a clear rule for handling time edits |

Store the checked request, with numeric `start`, `end` and `now`. After a successful form check, calculate the result from that request and the selected room through `checkRoom`. Avoid storing a separate result boolean. Clear the checked request when a time field changes, so the result always matches the displayed times.

| Blocked-room option | Benefit | Cost |
|---|---|---|
| Hide blocked rooms | Shorter list | Users cannot see why a known room is missing |
| Show them with a label | Users can see the room and its blocked status | The list contains choices that cannot be booked |

Keeping them visible also makes F3 easy to demonstrate. The blocked label comes from room data. `checkRoom` must reject blocked rooms even if the UI changes later.

Use these file boundaries:

- **`rooms.ts`:** Export `Room` and `ROOMS`. Hold at least four fictional rooms with all required fields. No filtering or availability decisions.
- **`filter.ts`:** Export pure `filterRooms`. Check capacity ≥ attendees and ALL selected equipment. Return matching rooms without changing the input. Under the chosen policy, blocked rooms remain in this list.
- **`booking.ts`:** Keep `canBook` unchanged. Add `checkRoom(rooms, roomId, request)`. Find the room, return false for an unknown ID, and call `canBook` with that room’s blocked status and bookings. No data changes.
- **`App.tsx`:** Own form state, filters, selected room and checked request. Call the imported rules. Keep the selection when it still matches; otherwise select the first match. Handle an empty list safely. Allow tests to supply a fixed catalog.
- **`RoomFilters.tsx`:** Show controlled attendee and equipment inputs. Receive values and change handlers through props.
- **`AvailabilityPanel.tsx`:** Show the room selector, time fields, Check button, bookings and feedback. Receive data and handlers through props; contain no booking or filtering rules.

A small test-first plan is:

1. Record the baseline test output. Extract the catalog into `rooms.ts`, then run the unchanged 19 tests and build.
2. Write fixed-fixture tests for F1, F2, F4, B5 and B6. See them fail, implement `filterRooms`, then run all tests.
3. Write tests for F3, F5, unknown IDs and no mutation. Add B1–B4 and INT coverage using the real modules. Implement `checkRoom`, then run all tests.
4. Connect filtering to the page. Add a UI test for the empty message and safe selection when a filter removes the current room.
5. Add a UI test that checks one room, switches rooms and gets a different result for the same request. Implement the derived result, then check desktop and mobile feedback.

Review and record each change before starting the next. Use fixed fixtures and clocks, without mocks, skipped tests, `.only` or `test.each`.

Reject adding capacity and equipment checks inside `canBook`. That would change the protected function and mix room search with time availability. `filterRooms` and `checkRoom` keep those jobs clear.

No files were changed.
```

**Problems found:** Clearing the result on every room switch is safe but adds a click. Rendered Vitest tests would also add extra dependencies.
**Changes made:** Kept blocked rooms visible, derived results from the checked request, and chose real Chromium verification plus pure INT tests.
**Verified by:** F3, F5 and INT tests, switch-a.png, switch-b.png and 08-browser-checks.txt.

### 8.3 Exchange 3

**Tool and model:** OpenAI Codex — not displayed
**Date:** 2026-11-18
**Purpose:** Review fixed fixture values and boundary expectations before implementation.

**Prompt:**

```text
Review this proposed fixed test catalog and give concrete tests from AC1-AC5 and F1-F5. No file edits. Rooms: a has 8 seats, projector and whiteboard, is not blocked, booking 600-660; b has 12 seats and whiteboard, is not blocked, booking 780-840; c has 20 seats, projector and whiteboard, is blocked, no bookings; d has 6 seats and projector, is not blocked, booking 660-720. All use now 540. filterRooms keeps blocked rooms if capacity and all equipment match. Propose B5 equality, B6 one below, F2 ALL equipment, F4 no matches, F3 blocked, F5 the same request 630-660 on a and b, INT filtering then checking, and a non-mutation check. State expected values from the requirements. Explain why UI code should not repeat start < end. Keep canBook's guard unchanged. Use English B1.
```

**Output used:**

```text
This catalog is suitable. Give each room a fictional `name` and create a fresh catalog for each test. Room **c stays in filter results**, but its availability must always be false.

For filtering, use these exact expectations:

| Test title | Attendees | Required equipment | Expected room IDs | Reason |
|---|---:|---|---|---|
| `F1 B5: equal capacity is included` | 8 | none | `[a, b, c]` | Room a has exactly 8 seats |
| `F1 B6: capacity one below is excluded` | 9 | none | `[b, c]` | Room a has 8 seats, one too few |
| `F2: all selected equipment is required` | 6 | projector, whiteboard | `[a, c]` | b and d each lack one required item |
| `F2: no equipment requirement allows every capacity match` | 6 | none | `[a, b, c, d]` | No equipment items are required |
| `F4: no room has enough seats` | 21 | none | `[]` | The largest room has 20 seats |

[…]

The F5 helper test proves that `checkRoom` uses the correct bookings. A separate page test should prove that switching the selector refreshes the displayed result. Likewise, the F4 filter test proves an empty list; a page test should check the empty-state message.

The UI should not repeat `start < end`. That rule already belongs to `canBook`. Two copies could change differently and produce confusing feedback. The UI should check missing inputs, convert times to numbers, and call `checkRoom`.

[…]

Retain all 19 existing tests and add these as separate tests. No files were changed.
```

**Problems found:** A passing helper test cannot prove the actual page refreshes. The first red run only proved that the filter module was missing, not a business-rule defect.
**Changes made:** Added the fifteen fixture-based cases, retained the original nineteen tests and used browser checks for the displayed empty state and room switch.
**Verified by:** 02-filter-red.txt, 03-filter-green.txt, 04-checkroom-red.txt, 05-checkroom-green.txt and the final 34/34 run.

## 9. Checker results and known fails

| Check | Why it still fails |
| --- | --- |
| none | The final run has no FAIL or ERROR. |

The exact checker counts go into submission.yml and are rerun at the PR head. The external diagram upload was rejected by automatic approval review; local rendering completed both diagrams, so no diagram check remains blocked.

Final checker result: **33 PASS, 0 FAIL, 0 ERROR**. The full output is saved in evidence/12-checker.txt, with its JSON measurements beside it.

## 10. AI reflection (Task 6)

I gave the assistant a map of the Week 08 files, the original booking rules, the five new requirements and the scope limits. I also included the baseline source, so its advice could name real functions instead of describing a different application. The baseline had 19 passing tests, which gave me a clear starting point.

The most useful suggestion was to store the checked request and calculate its result again for the selected room. The old page kept a Boolean result even after the room changed. I also used the suggestion to keep blocked rooms visible with a label. I modified the proposal for rendered tests: pure Vitest tests cover the rules, while a separate Chromium flow checks the real page.

I followed the review of the capacity comparison, the ALL-equipment condition and the selected room's blocked status and bookings. I compared the preserved source and tests with the baseline, read the real terminal output, and inspected the five screenshots. The two switch screenshots use the same times and show different results.

Tests guided the small changes. The first red run could not find the filter module, and the next red stage exposed the missing checkRoom function. The final 34 tests include equality, one-below capacity, 120 and 121 minutes, endpoint contact, overlap and non-mutation. I understand these cases and can explain and defend the modules and decisions.

Next, I would return a clear reason for Unavailable and make the browser check part of one test command. I would keep the same fixed fixtures and honest measurements.
