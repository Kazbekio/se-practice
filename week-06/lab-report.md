# Week 06 — Lab report

**Name:** Shynbulat Kazbek
**Group:** Monday 4:00-7:00 pm
**Date:** 2026-10-18

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Tool | Bolt.new |
| Exact model (as Bolt shows it, or `not displayed`) | GLM 5.3 Flash: free this weekend |
| Bolt project link (or `not shared`, and why) | https://bolt.new/~/sb1-ykg88ykq (private project link) |
| Browser and version | Integrated Chromium browser; exact version not displayed |
| If you could not use Bolt.new: the tool you used instead, and why | none |

---

## 2. Task 1 — define before generating

**Two predictions, written BEFORE you send the first prompt.** Where do you expect v1 to go wrong?
Fill the first three columns now; fill the last one after Task 3.

| # | What I expect to go wrong | AC it concerns | Was I right? (after Task 3) |
| --- | --- | --- | --- |
| 1 | Not recorded before generation. After generation I observed that no room had only the required 10:00-11:00 booking. | AC3, AC4 | Cannot assess; this was not a pre-generation prediction. |
| 2 | Not recorded before generation. After generation I observed that missing-time feedback was unreachable because Check was disabled. | AC6 | Cannot assess; this was not a pre-generation prediction. |

**The initial prompt exactly as I sent it** — the deck's prompt with AC1–AC6 pasted in place of
`[paste AC1–AC6]`, nothing else changed:

```text
Build a small responsive Smart Campus Room Availability Checker. Requirements: AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time. AC2: Reject a booking longer than 120 minutes. AC3: Reject the request when the selected room is blocked. AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed. AC5: Show a clear Available / Unavailable decision without changing the existing booking data. AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback. Intervals include the start and exclude the end. Other rules still apply. Use fictional sample data only. Keep the implementation simple and within one-page scope. Do not add authentication, backend services, analytics, or unrelated features. After building, briefly list the main files/components you created.
```

---

## 3. Task 2 — prototype v1

v1 export saved in `original/` and screenshot saved as `evidence/v1.png` **before** any cleanup
prompt: yes

**Bolt's list of the files/components it created, pasted unedited:**

```text
src/data/rooms.ts — fictional sample room + booking data
src/lib/availability.ts — the availability logic (AC1–AC5) and time helpers
src/App.tsx — the full UI: form, decision panel, and room detail view (using lucide-react icons and Tailwind)
```

**What v1 does — one line per thing that works, or visibly does not:**

- The page lets the user set the current time, choose a room, enter an interval, and see an Available / Unavailable result with reasons.
- The initial current time comes from the local clock, and the user can change it.
- No room had exactly one 10:00-11:00 booking, so the fixed baseline for T1-T9 could not be set up on v1.
- With either interval field empty, Check availability was disabled; the existing missing-time feedback could not be reached.

**Repair prompt** (only if the first build did not run — the deck allows one, then the result is
v1). Leave empty if you did not need it:

```text
```

---

## 4. Task 3 — the nine cases

Base for every case unless the row says otherwise: **current time 09:00**, room **not blocked**,
the room's **only booking 10:00–11:00**. The Expected column comes from AC1–AC6 — do not change it.
Write each result exactly as **Available**, **Unavailable** or **Not testable** (the page gives you
no way to set up the case). Save each final run as `evidence/final-T<n>.png`.

| # | Case | What you set up and request | Expected | AC | Result on v1 | Result on final | Final screenshot |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 11:00–12:00 | Available | AC4 | Not testable | Available | final-T1.png |
| T2 | Overlap | 10:30–11:30 | Unavailable | AC4 | Not testable | Unavailable | final-T2.png |
| T3 | Blocked | 11:00–12:00, room blocked | Unavailable | AC3 | Not testable | Unavailable | final-T3.png |
| T4 | Exactly 2 hours | 12:00–14:00 | Available | AC2 | Not testable | Available | final-T4.png |
| T5 | Over 2 hours | 12:00–14:01 | Unavailable | AC2 | Not testable | Unavailable | final-T5.png |
| T6 | Starts now | 09:00–09:30 (current time 09:00) | Unavailable | AC1 | Not testable | Unavailable | final-T6.png |
| T7 | Reversed times | 12:00–11:00, and the page says why | Unavailable | AC1, AC6 | Not testable | Unavailable | final-T7.png |
| T8 | Same check twice | T1, then T1 again without reloading | Available | AC5 | Not testable | Available | final-T8.png |
| T9 | Narrow screen | T1 at about 375 px wide | Available | AC6 | Not testable | Available | final-T9.png |

---

## 5. Issue log — cleanup targets

One row per issue you chose to act on (or deliberately not act on). At least **two**: one
functional and one usability or code-quality issue when you have them. If v1 passed every case,
log a justified cleanup that preserves behaviour. Save a screenshot of each as
`evidence/issue-<n>.png`.

| # | Issue | Evidence: steps → expected → observed | Priority | Decision |
| --- | --- | --- | --- | --- |
| 1 | Test fixture: no room has only the required 10:00-11:00 booking. | Select each room and inspect its bookings; expected one 10:00-11:00 booking; observed other intervals or no booking, so the prescribed cases could not be set up. | High | Fix |
| 2 | Missing-time feedback is unreachable. | Leave both times empty or enter only a start time; expected understandable validation feedback; observed the disabled Check button, so no message could be triggered (AC6). | Medium | Fix |
| 3 | Unused Supabase package in v1. | Inspect `original/project/package.json`; expected no backend/database dependency; observed `@supabase/supabase-js`, which was not imported in application source. | Medium | Fix |

---

## 6. Task 4 — cleanup with focused prompts

One issue per prompt. Paste every prompt **as sent** (every `[bracketed field]` and `AC#` filled
in) and Bolt's answer, unedited.

**Functional fix prompt, as sent, and Bolt's answer:**

```text
In the current prototype, selecting Engineering Lab A shows 09:00–10:30 and 14:00–15:00, Design Studio 2 shows 11:00–12:00 and 13:00–14:30, and the blocked room has no bookings; I cannot set up the fixed base of one 10:00–11:00 booking for T1–T9, but AC3–AC4 require these blocked-room and overlap checks. Make the smallest change that fixes this behavior. Preserve the other acceptance criteria. Explain which file/component you changed and why.
```

**Bolt's first answer:**

```text
The issue is that the blocked room (Lecture Hall 3) has an empty bookings list, so there's no fixed 10:00–11:00 base booking present across all rooms to exercise the overlap check. The smallest fix is to add the 10:00–11:00 base booking to every room in the sample data, including the blocked one.

Build passes. I changed only src/data/rooms.ts.

The problem was that the blocked room (Lecture Hall 3) had an empty bookings list, so there was no common base booking to exercise the overlap check (AC4) across all rooms — the blocked-room check (AC3) worked, but the overlap check couldn't be tested against a fixed slot. I added a shared 10:00–11:00 base booking to every room (including the blocked one) via a single BASE_BOOKING constant. Existing per-room bookings are unchanged, so AC1, AC2, and AC5 still hold, and the blocked room now also carries the base booking so AC3 and AC4 can both be verified.
```

**Functional follow-up prompt, as sent, and Bolt's answer:**

```text
In the current prototype, selecting Engineering Lab A now shows 09:00–10:30, 10:00–11:00, and 14:00–15:00; the required setup with the room's only booking at 10:00–11:00 is still impossible, but T1–T9 use that fixed base. Make the smallest change that fixes this behavior. Preserve the other acceptance criteria. Explain which file/component you changed and why.
```

```text
The issue is that Engineering Lab A (and the other rooms) have extra bookings beyond the fixed 10:00–11:00 base, so the "only booking at 10:00–11:00" setup T1–T9 rely on isn't achievable. The smallest fix is to reduce each room's bookings to just the base booking.

Build passes. I changed only src/data/rooms.ts.

The problem was that each room had extra bookings (e.g. Engineering Lab A showed 09:00–10:30 and 14:00–15:00 alongside the 10:00–11:00 base), so the required "room's only booking is 10:00–11:00" baseline that T1–T9 rely on was unreachable. I removed all the extra per-room bookings, leaving each room with just the fixed 10:00–11:00 base booking. AC1, AC2, AC4, and AC5 are unaffected, and AC3 (blocked room) still applies to Lecture Hall 3, which also now carries only the base booking.
```

**Cleanup prompt, as sent, and Bolt's answer:**

```text
Review only the Check availability button and its validation feedback for missing start/end times. It is disabled until both times parse, so a user cannot trigger the existing "Enter valid times first" message; this makes missing-time validation unclear (AC6). Suggest one small cleanup. Do not add features or redesign the whole application. Implement it only if it preserves AC1–AC6.
```

```text
You're right — the button is disabled until both times parse, so the "Enter valid times first" amber message is unreachable dead code, making missing-time feedback unclear (AC6).

The smallest cleanup: enable the button whenever a room is selected, and let the decision panel show a clear missing/invalid-time message instead of relying on the disabled state. This preserves AC1–AC6 since checkAvailability still gates everything.

Build passes. I changed only the "Check availability" button in src/App.tsx.

The cleanup: the button used to disable itself until both start and end parsed, which made the amber "Enter valid times first" message unreachable and left missing-time validation unclear (AC6). I relaxed the button's disabled condition to only require a selected room, so pressing Check with missing/invalid times now surfaces the existing amber validation panel instead of a dead disabled state. All acceptance criteria are preserved — checkAvailability still enforces AC1–AC5, and the decision panel continues to show Available/Unavailable without touching booking data (AC5).
```

**Scope cleanup prompt, as sent, and Bolt's answer:**

```text
Review only package.json and its lockfile for an unused dependency outside scope. @supabase/supabase-js is listed but not imported anywhere in the application, and backend/database dependencies violate the one-page no-backend scope. Suggest one small cleanup. Do not add features or redesign the whole application. Implement it only if it preserves AC1–AC6.
```

```text
Confirmed — @supabase/Bolt Database-js isn't imported anywhere in the app. Since the scope is one-page, no-backend with in-memory sample data, it's an unused dependency. I'll remove it from package.json and refresh the lockfile.

Build passes. I changed only package.json (and refreshed package-lock.json via npm install).

The cleanup: I removed the unused @supabase/Bolt Database-js dependency. It wasn't imported anywhere in the app, and the project's scope is one-page, no-backend with in-memory sample data, so a database client was out of scope. AC1–AC6 are unaffected since none of the availability logic or UI depends on it.
```

**Initial Bolt suggestion rejected:**

```text
Note: since you asked for fictional sample data only, I kept everything in React state rather than using the available database — data resets on reload. If you'd like bookings to persist across reloads, I can wire it up to Bolt Database.
```

Add further blocks for further prompts.

**Every change or suggestion Bolt made, judged.** Accepting is a decision; so is rejecting. Cite
the AC (or the scope) that justifies it.

| # | What Bolt changed or suggested | accept / reject | Reason — cite the AC or the scope | Retest: which cases, result |
| --- | --- | --- | --- | --- |
| 1 | Suggested wiring bookings to Bolt Database so they persist across reloads. | reject | The task forbids a backend/database, and AC5 requires checks not to change booking data. | T8 twice without reloading; both checks Available and the booking list stayed unchanged. |
| 2 | Added a shared 10:00-11:00 booking to every room but kept the other bookings. | reject | T1-T9 require the room's only booking to be 10:00-11:00; the original additional bookings still blocked that setup. | Inspected Engineering Lab A after the change; still showed three bookings, so the issue remained. |
| 3 | Removed all other bookings, leaving only the fixed 10:00-11:00 booking in each room. | accept | This enables the specified AC3/AC4 test setup without changing availability logic or scope. | T1-T9 rerun on final; all nine matched expected results. |
| 4 | Enabled Check with a selected room so missing-time validation can be shown. | accept | AC6 requires understandable validation feedback; the existing panel now becomes reachable. | Empty-time check showed "Enter valid times first"; T1-T9 still matched expected results. |
| 5 | Removed the unused Supabase package and refreshed the lockfile. | accept | The one-page scope excludes backend/database dependencies; the package was unused by the app. | Bolt reported a passing build; T1-T9 rerun and matched expected results. |

---

## 7. Change log — v1 to final

Two to four concrete changes, each one retested.

| # | Issue | Decision | Change (file or component) | Result after retest |
| --- | --- | --- | --- | --- |
| 1 | T1-T9 fixture unavailable on v1 | Reject first attempt | `src/data/rooms.ts`: added a shared base booking but left extra bookings in each room. | Retested the room list; the required only-booking setup was still impossible, so a follow-up was needed. |
| 2 | T1-T9 fixture unavailable on v1 | Accept follow-up | `src/data/rooms.ts`: left each room with only the fixed 10:00-11:00 booking. | Reran T1-T9; all nine matched expected results. |
| 3 | AC6 missing-time feedback | Accept | `src/App.tsx`: enabled Check whenever a room is selected, allowing the existing missing-time panel to display. | Empty-time check showed a clear message; all nine acceptance cases passed. |
| 4 | Out-of-scope unused dependency | Accept | `package.json` and `package-lock.json`: removed unused Supabase client. | Bolt reported build passes; all nine UI cases passed again. |

---

## 8. One generated component, in my own words

Pick one file or component Bolt generated that matters for AC1–AC5 — the one that decides
availability is the best choice. Name its path in backticks, then explain in your own words, without
the assistant, what it does and how it decides. 60 words or more.

**File:** `src/lib/availability.ts`

<!-- Write your explanation below this line -->

`src/lib/availability.ts` отвечает за проверку всех критериев приемки (AC1-AC5). Он принимает введенные пользователем данные и проверяет базовые условия валидации: заблокирована ли комната (AC3), находится ли время начала после текущего времени (AC1) и не превышает ли длительность брони 120 минут (AC2). Затем алгоритм перебирает список существующих бронирований выбранной комнаты, проверяя их на наличие пересечений с запрошенным интервалом, при этом корректно обрабатывая и разрешая соприкосновение границ (AC4). Если все проверки пройдены успешно, возвращается статус «Available», при этом сами исходные данные бронирований остаются неизменными (AC5).

---

## 9. What still fails, and what the criteria do not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | All checker results are PASS. |

### 9.2 The end of the day

AC1 allows `end ≤ 1440` — a booking may end at 24:00. Can a user of your final page ask for
23:00–24:00? How — and if not, why is that acceptable or not? (This is the value you declare in
`submission.yml` under `assumptions.end_of_day`.)

The final page uses native `type="time"` inputs, whose maximum selectable time is 23:59. `parseTime` accepts only hours 00-23, so 24:00 cannot be entered; the chosen declaration is `not-expressible`.

### 9.3 Which "now"?

AC1 says "after the supplied current time". What did **v1** use as the current time, and what did
that mean for testing case T6?

v1 initialized its current time from the browser's local clock using `new Date()` and allowed the user to edit the supplied time. T6 on v1 was Not testable because none of its rooms had the fixed only-booking-at-10:00-11:00 baseline.

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Which of your two predictions in section 2 was right, and what did v1 actually get wrong?
     (b) Which AI suggestion did you reject, or would have been wrong to accept, and why?
     (c) What is the difference between "the prototype looks finished" and "the prototype meets
         AC1-AC6" - shown with one case from section 4?
     Worthless: "Bolt made some mistakes and I fixed them."
     Worth everything: "T8 failed on v1: the Check button also added the booking to the list, so
     checking 11:00-12:00 a second time said Unavailable. AC5 says the check must not change the
     booking data." -->

В разделе 2 я не успел записать предсказания до генерации, однако при тестировании выяснилось, что v1 сгенерировалась с непригодными тестовыми данными. Ни одна из комнат не имела единственной требуемой брони с 10:00 до 11:00, из-за чего ни один из базовых кейсов T1-T9 нельзя было даже запустить («Not testable»).

В процессе доработки я категорически отклонил предложение Bolt подключить базу данных Supabase для сохранения бронирований. Это нарушало бы строгое ограничение на отсутствие бэкенда, а также критерий AC5, требующий только безопасной проверки без изменения существующих данных.

Разница между «выглядит готовым» и «соответствует AC1-AC6» отлично видна на примере проверки T2 (Overlap). Хотя первая версия имела красивый и рабочий с виду интерфейс, провести проверку пересечения времени (10:30-11:30) было технически невозможно из-за мусорных бронирований в системе. Прототип может выглядеть завершенным внешне, но пока он не позволяет корректно и однозначно валидировать бизнес-правила (например, выдавать ошибку при перевернутом времени как в T7 или превышении лимита как в T5), он не соответствует требованиям.
