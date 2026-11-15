# AI Usage Disclosure — Week 09

Name: Shynbulat Kazbek

Student ID: 24B032123

Date: 2026-11-15

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| OpenAI Codex | not displayed / plan not displayed | Part 2 — writing the calls for R1, R2, R3 in three independent sessions | calls/r1.json, calls/r2.json, calls/r3.txt, saved by the parent session without edits |
| OpenAI Codex | not displayed / plan not displayed | Tool definition, keyword explanations, schema review, actual Python checks, report drafts, permissions, checkpoint, declaration and GitHub work | tool/check_room.json, lab-report.md, AI_USAGE.md, submission.yml, evidence/ |

**I wrote tool/check_room.json myself:** no. Codex wrote the description and the complete input schema. I followed the review of the five required fields, integer minutes, 0-1440 bounds, Boolean blocked, the bookings list, and the nested objects. The supplied checker first ran on the untouched starter, then all twelve schema cases passed on the completed definition.

**I used an AI to explain a JSON Schema keyword or a check:** yes. Codex explained integer, required, items and additionalProperties, and why the allowed keywords cannot compare different time fields or calculate an overlap. Six additional schema examples are recorded in evidence/03-schema-vs-meaning.txt. Their expected function decisions are based on the ACs; canBook was not executed.

**Every reply in calls/ and in lab-report.md section 4 is exactly what the model returned:** yes. R1 and R2 are the original JSON strings, with no formatting or value changes. R3 is the original clarification question. No call was corrected after checking it.

R1, R2 and R3 used three separate Codex agent sessions with fork_turns=none after I authorized those sessions. Each received the exact README prompt, the full definition and one request. No parent conversation, other request, checker output or expected answer was supplied. The same assistant and default model were used throughout, with no model override. The exact model version was not displayed, so it is declared as not displayed. Session names, input hashes and response hashes are in evidence/experiment-manifest.json.

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes. The full final output is in section 8 and in evidence/04-final-checker.txt. Earlier logs are kept separately. The final schema and Python checkers can produce the declared counts again.

**Anything I accepted from the AI without fully understanding it:** none for the tool contract, the three replies, or my permission decisions. I understand the difference between valid input and an available room. I also understand why a hard reset can discard work and why sending .env to an unknown server is unsafe. I can explain and defend the schema, both time conversions, the R3 question and my A1-A8 decisions.

Codex drafted all ten report sections, including the conclusion. I followed the work, read the results and understand the submitted material. I do not claim to have typed the definition or report without AI help.

The supplied README.md and both Python checkers were kept unchanged. This lab used Python 3 with the standard library only. No JavaScript was run, no MCP server was built, and the reset command in section 7 was documented without being executed.

Signed: Shynbulat Kazbek

Date: 2026-11-15
