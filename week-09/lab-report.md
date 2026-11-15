# Week 09 — Lab Report: canBook as a Tool

**Name:** Shynbulat Kazbek
**Student ID:** 24B032123
**GitHub:** Kazbekio
**Date:** 2026-11-15

I followed the work and understand the tool contract. Codex carried out the file edits, checks and GitHub steps. AI_USAGE.md explains how the work was produced.

## 1. Setup

| | |
| --- | --- |
| Assistant (frozen for the whole lab) | OpenAI Codex |
| Exact model (or "not displayed") | not displayed |
| Three fresh chats for R1, R2, R3? (yes / no) | yes |
| Python version (`python --version`) | Python 3.14.4 |

I started on week-09 from main at 9b1fdea. I saved the untouched files, ran the first checker before changing the definition, and made checkpoint 77abe4a. This week uses Python 3 with the standard library only. I did not run JavaScript or build an MCP server.

R1, R2 and R3 each used a separate Codex session with no parent conversation. Each session received the exact saved prompt, the whole tool definition and only its own request. The same assistant and default model were used for all three, with no model override. The exact model version was not displayed. The session names and response hashes are recorded in evidence/experiment-manifest.json.

## 2. Your tool definition — a reason for every constraint

```json
{
  "name": "check_room",
  "description": "Check whether one room is free for a time slot on one day. Give all times as whole minutes since midnight in the range 0-1440; 1440 means 24:00. Supply the current time, the blocked status, and the known bookings for that same day. This tool only checks availability and does not save, create, or change any booking. The function checks time order, the 120-minute limit, blocked rooms, and overlaps; touching endpoints are allowed. Ask for missing information instead of guessing, and do not invent a date field.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "start": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested start time in whole minutes since midnight on the selected day."
      },
      "end": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested end time in whole minutes since midnight; 1440 is the end of that day."
      },
      "now": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Current time for the selected day in whole minutes since midnight; do not guess it."
      },
      "blocked": {
        "type": "boolean",
        "description": "True when the room is blocked; false when it is not blocked."
      },
      "bookings": {
        "type": "array",
        "description": "Existing bookings for this room on the selected day. Use an empty array only when there are no bookings.",
        "items": {
          "type": "object",
          "properties": {
            "start": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440,
              "description": "Existing booking start time in whole minutes since midnight."
            },
            "end": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440,
              "description": "Existing booking end time in whole minutes since midnight; 1440 is allowed."
            }
          },
          "required": [
            "start",
            "end"
          ],
          "additionalProperties": false
        }
      }
    },
    "required": [
      "start",
      "end",
      "now",
      "blocked",
      "bookings"
    ],
    "additionalProperties": false
  }
}
```

| Field | Constraint | What goes wrong without it |
| --- | --- | --- |
| Input | `type: object` | An array or a single time value would not provide named arguments. |
| Input | `properties: exactly start, end, now, blocked, bookings` | These are the five names that canBook understands; a different name would lose data. |
| Input | `required: all five names` | A missing now or room status would leave the function without needed facts. |
| Input | `additionalProperties: false` | A field such as room could look useful even though this tool cannot use it. |
| start | `type: integer` | A clock string or a fraction would use the wrong format. |
| end | `type: integer` | The model must convert 11:00 to 660 before the call. |
| now | `type: integer` | The current time must use the same unit as the requested times. |
| All five time fields: start, end, now, bookings[*].start, bookings[*].end | `minimum: 0` | A negative value would be before the start of the selected day. |
| All five time fields | `maximum: 1440, inclusive` | A value such as 1500 would be outside the day; 1440 must still mean 24:00. |
| blocked | `type: boolean` | The string false is text, not the Boolean value false. Both true and false must be allowed. |
| bookings | `type: array; no positive minItems or fixed maxItems` | The function needs a list. A room can have no bookings or several bookings. |
| bookings[*] | `type: object` | The pair [660, 720] has no named start and end fields. |
| bookings[*] | `properties: start and end` | Each booking uses the same field names as the function. |
| bookings[*] | `required: start and end` | A booking with only a start cannot describe its full interval. |
| bookings[*] | `additionalProperties: false` | An extra field would be ignored by the booking function and could mislead the caller. |
| bookings[*].start and bookings[*].end | `type: integer` | Existing bookings also need whole minutes, not strings or fractions. |

The tool description explains the unit, the one-day range, the read-only result and the missing-data rule. The field descriptions explain what each value means. Descriptions help a model, but the client does not enforce their words. I used only the keywords allowed in the README. Codex wrote the definition; I followed its review and understand each constraint.

## 3. The twelve calls — first run and final run

My first actual run was on the untouched starter, saved as evidence/tool-starter.json. It gave 6 PASS, 17 FAIL and 7 ERROR overall. Among S01-S12, 9 failed because the empty properties object accepted every malformed call. The first completed definition passed all 12 cases.

| Case | First run | Final run | What you changed |
| --- | --- | --- | --- |
| S01 | PASS | PASS | Kept valid whole-minute values and the endpoint case allowed. |
| S02 | PASS | PASS | Used an array with no positive minItems, so an empty list stays valid. |
| S03 | FAIL | PASS | Added integer type for end; a clock string is rejected. |
| S04 | FAIL | PASS | Added now to the five required fields. |
| S05 | FAIL | PASS | Set additionalProperties to false on the main object. |
| S06 | FAIL | PASS | Added minimum 0 to every time field. |
| S07 | FAIL | PASS | Added inclusive maximum 1440 to every time field. |
| S08 | FAIL | PASS | Required both start and end inside each booking object. |
| S09 | FAIL | PASS | Used boolean for blocked, so the string false is rejected. |
| S10 | FAIL | PASS | Used integer for start, so a fraction is rejected. |
| S11 | PASS | PASS | Kept maximum 1440 inclusive, so 24:00 remains valid. |
| S12 | FAIL | PASS | Required each booking item to be an object with named fields. |

The raw runs are in evidence/01-first-checker.txt and evidence/02-schema-checker.txt, with their JSON results beside them. The final run in section 8 also checks the saved model replies and the completed report.

## 4. Function calling — what the model wrote

The exact prompts are saved in evidence/prompts/r1.txt, r2.txt and r3.txt. Each reply below is the complete final response from its own fresh session. These are model-proposed calls under the exercise prompt. No real check_room server or JavaScript canBook function was executed; the availability decisions below follow from the acceptance criteria.

### R1

```text
{"name":"check_room","arguments":{"start":600,"end":660,"now":540,"blocked":false,"bookings":[{"start":660,"end":720}]}}
```

The call matches R1. The model converted 9:00 to now = 540, 10:00 to start = 600, 11:00 to end = 660, and the existing 11:00-12:00 booking to 660-720. It kept blocked = false and added no extra field. F1-F3 pass. Under AC4, this endpoint contact is allowed, so canBook should answer Available.

### R2

```text
{"name":"check_room","arguments":{"start":840,"end":990,"now":810,"blocked":true,"bookings":[]}}
```

The call matches R2. The model converted 13:30 to now = 810, 14:00 to start = 840 and 16:30 to end = 990. It kept blocked = true and bookings = []. F4-F6 pass. The model made the call rather than refusing it. The duration is 990 - 840 = 150 minutes, which breaks AC2, and the room is also blocked under AC3. The schema must accept this well-formed call; canBook should answer Unavailable.

### R3

```text
What exact start and end times tomorrow, current time, room blocked status, and existing bookings should I use?
```

The model asked one short question and did not make a call. It requested the exact start and end, the current time, the blocked status and the existing bookings. It invented no clock values, no blocked value and no empty booking list. The phrase tomorrow afternoon gives no exact interval, and the tool has no date field. The client must also choose the day and use times and bookings from that same day before a real call. The reply refers to tomorrow but does not explain that day selection step, which is a small limit of this short answer. I saved only r3.txt; F7 passes.

## 5. What the schema cannot check

AC1 is partly a schema rule: each time must be an integer in 0-1440. The allowed keywords cannot compare start with end or start with now. For example, start = end = 600 has the right shape, but canBook must reject it.

AC2 needs end minus start to be at most 120. Setting maximum 120 on end would confuse a duration with a time of day, so the function must check the difference.

AC3 depends on the value of blocked. The schema must accept both Boolean values. A call with blocked = true is valid input, and the function returns Unavailable.

AC4 compares the request with every booking. The allowed schema cannot calculate an overlap or allow only endpoint contact. This stays in canBook.

AC5 is about behavior after a call. An input schema cannot stop a function from changing an array or saving a booking; code review and before/after tests must check that.

AC6 is about clear page feedback on desktop and mobile. A schema has no page to inspect, so UI code and browser checks must cover it. Even canBook alone cannot enforce AC6.

I also passed these examples through the provided Python schema validator. Every one has valid input shape. The expected canBook result comes from the acceptance criteria; I did not execute JavaScript.

```text
Date: 2026-11-15
Command: apply the provided checker.errors to the completed inputSchema.
Schema results below are measured. Function decisions are inferred from AC1-AC4; canBook was not run.
AC4 endpoint contact: schema ACCEPT; expected canBook Available
AC1 zero duration: schema ACCEPT; expected canBook Unavailable
AC1 request in the past: schema ACCEPT; expected canBook Unavailable
AC2 150 minutes: schema ACCEPT; expected canBook Unavailable
AC3 blocked room: schema ACCEPT; expected canBook Unavailable
AC4 real overlap: schema ACCEPT; expected canBook Unavailable
```

## 6. Permissions — allow, ask or block

| # | Action | Decision (allow / ask / block) | Reason (the risk, in one sentence or more) |
| --- | --- | --- | --- |
| A1 | call `check_room` with the times the user just typed | allow | This only checks availability and saves nothing. All five arguments must be known; missing facts need a question rather than a guess. |
| A2 | read `week-08/app/src/booking.ts` | allow | The named source helps the agent understand the rules. Reading it has no effect on the project files. |
| A3 | edit `booking.ts` to raise the 120-minute limit to 180 | ask | This changes AC2 for every future booking. A request for three hours does not approve a new business rule, so I would ask the rule owner first. |
| A4 | run `npm test` in `week-08/app` | allow | Checking the existing behavior is part of review. I would first read the test script, because an npm command can run other commands. |
| A5 | run `git reset --hard` to undo its own last three edits | block | An automatic hard reset can erase my other uncommitted changes. The agent should inspect the diff and undo only its own known changes. |
| A6 | `git commit` its change on the `week-09` branch | allow | I have authorized branch commits for this assignment. The agent must review the staged diff and include only the intended Week 09 files. |
| A7 | `git push` to `main` | block | A direct push to main skips PR review and can publish an unreviewed change. The assignment requires an open PR from week-09. |
| A8 | send the contents of `.env` to an MCP server it found online | block | The file can contain passwords and API keys. Sending it to an unknown server would expose secrets without a valid need. |

These are policy decisions for the imagined agent in Part 3. I did not execute A3-A5, A7 or A8. For the real submission, the existing user request authorizes commits and a push to week-09, followed by an open PR.

## 7. Checkpoint

I made the checkpoint before changing tool/check_room.json. Its real entry from git log --oneline is:

```text
77abe4a Week 09: checkpoint before tool edits
```

The exact recovery commands are:

```bash
git switch week-09
git reset --hard 77abe4a
```

I am documenting these commands, not running them. The reset would move week-09 back to the starter checkpoint, replace the index and tracked files, and discard current tracked edits. Later commits would leave the branch history, and the completed definition, replies and report would be lost from the working tree. Untracked files are not a safe backup during a hard reset: files in the way of restored tracked paths can also be removed. I would first review and preserve any work I want to keep. A5 is blocked for an automatic agent; this is an explicit recovery choice for the repository owner. The original folder is also preserved in /tmp/se-practice-week09-before-2026-11-15.tar.gz.

## 8. Checker output

Command, run from week-09/:

```bash
python3 tests/check_tool.py
```

Complete captured output, also saved in evidence/04-final-checker.txt:

```text
PASS  D1    tool/check_room.json exists and is valid JSON
PASS  D2    has name, description and inputSchema
PASS  D3    name is exactly "check_room"
PASS  D4    description: 25+ words, says minutes, 1440, and that it does not save
PASS  D5    inputSchema: an object with exactly the five fields, all required
PASS  D6    inputSchema uses only the keywords listed in README section 5
PASS  S01   the R1 call, valid -> accept
PASS  S02   no existing bookings: bookings = [] -> accept
PASS  S03   end as a string: "11:00" -> refuse
PASS  S04   now missing -> refuse
PASS  S05   an extra field: "room": "204" -> refuse
PASS  S06   start below the day: -30 -> refuse
PASS  S07   end beyond the day: 1500 -> refuse
PASS  S08   a booking with no end: {start: 660} -> refuse
PASS  S09   blocked as a string: "false" -> refuse
PASS  S10   start not a whole minute: 600.5 -> refuse
PASS  S11   end at the end of the day: 1440 -> accept
PASS  S12   a booking as a pair: [660, 720] -> refuse
PASS  F1    calls/r1.json: a call to check_room
PASS  F2    calls/r1.json: arguments valid against your schema
PASS  F3    calls/r1.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F4    calls/r2.json: a call to check_room
PASS  F5    calls/r2.json: arguments valid against your schema
PASS  F6    calls/r2.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F7    calls/r3: exactly one of r3.json (it called) or r3.txt (it asked), not empty
PASS  L1    section 5 names at least two acceptance criteria (AC1-AC6) the schema cannot check
PASS  L2    section 6: A1-A8 each have allow / ask / block and a reason of 5+ words
PASS  L3    section 7 names the checkpoint commit (a SHA)
PASS  L4    section 10: a conclusion of 80-150 words
PASS  L5    AI_USAGE.md filled in (a tool row, and signed)

SUMMARY: 30 PASS · 0 FAIL · 0 ERROR  (of 30 checks)
Paste this whole output into lab-report.md section 8, and these three numbers into submission.yml.
```

## 9. What still fails

None. The final checker has no FAIL or ERROR, so known_fails is []. The first starter run still shows the original 17 FAIL and 7 ERROR in evidence/01-first-checker.txt; those were fixed or completed during the lab, and the first results were kept.

The checker confirms file shape and agreement with these fixed cases. It cannot prove that every future model reply will be correct or that a real client will enforce my permission choices.

## 10. Conclusion (80–150 words)

I learned that the model writes a request, the schema checks its shape, and canBook decides whether the room is free. In R2, the model correctly sent end = 990 and blocked = true; the schema accepted the call, although the 150-minute slot breaks AC2 and maintenance breaks AC3. In R3, the model asked for missing times and room data, showing why a short question can be the right reply. My first run accepted nine bad calls, so S03 and S10 helped me understand why time strings and fractions need type checks. I understand these limits, my A5-A8 decisions, and the checkpoint command, and I can explain and defend them without the assistant.
