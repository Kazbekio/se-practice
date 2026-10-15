**Week 05 — Lab report**  
**Name:** Shynbulat Kazbek  
 **Group:** Monday 4:00-7:00 pm  
   
 **Date: **  
Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the  
   
 grader find your answers by them. Add rows to any table; never remove its header.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OMQ2AABAAsSPBCj7fFRYQwYwEZiywEZJWQZeZ2ao9AAD+4lyruzq+ngAA8Nr1AMTJBeJDClAyAAAAAElFTkSuQmCC)  
**1. Setup**  
| | |  
|-|-|  
|   |   |   
| Assistant (tool) | ChatGPT |   
| **Exact** model name | GPT-5.5 Instant |   
| Language and version | Python |   
| Path | A |   
| My Week 04 declaration for touching bookings | Not allowed |   
   
In Week 04, my models assumed touching bookings were an invalid overlap and rejected them; AC4 now explicitly allows touching endpoints, so the validation logic in my previous diagrams would need to change from strict overlap to accepting end == existing_start and start == existing_end.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM0lEQVR4nO3OUQmAABBAsaeI2MKqV8RyJrGCfyJsCbbMzFldAQDwF/dWrdXx9QQAgNf2B/NkAzRb7P0YAAAAAElFTkSuQmCC)  
   
**2. Task 1 — the plan**  
**The assistant's plan, pasted unedited:**  
## **Implementation plan for ** **can_book**  
### **1. Checks in order**  
1. Validate the time interval (AC1). Check that 0 <= start < end <= 1440 and start > now.  
2. Check duration (AC2). Verify that end - start <= 120 minutes.  
3. Check room status (AC3). If blocked is True, return False.  
4. Check existing bookings (AC4). For each existing interval (existing_start, existing_end), reject the request if the intervals overlap.  
  - Overlap condition: start < existing_end and existing_start < end.  
  - If one booking ends exactly when the other starts, they do not overlap.  
5. Return the decision (AC5). Return True only if all checks pass; otherwise, return False. Never modify existing or any input.  
### **2. Assumptions**  
- All times are integer minutes after midnight on the same date.  
- now is valid, and every existing booking is valid, as specified in the contract.  
- blocked is a Boolean.  
- The function checks only one selected room and does not save bookings or send confirmations.  
- Invalid requested intervals must return False, not raise an exception.  
- Because intervals include the start and exclude the end, adjacent bookings are allowed.  
### **3. Boundary cases to test**  
| | | |  
|-|-|-|  
| **Case** | **Example** | **Expected** |   
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
   
****What the plan invented or changed.****  
   
**| # | What the plan said | What the contract or the AC says | What I did |**  
**| --- | --- | --- | --- |**  
**|** ** 1 | Steps 2-6 mapping directly to AC1-AC5 (time bounds, duration, block status, overlap). | AC1-AC5 define the exact conditions. | Checked every step against the corresponding AC. Found no invented rules, no sorting, and no type validation. The inequaliti** **es correctly permit touching endpoints (AC4). |**  
   
****Boundary cases the assistant suggested that I kept as tests:****  
   
**- Start equals now (`start=600, end=660, now=600`) — tests strict `start > now`.**  
**- End at midnight boundary (`start=1380, end=1440`) — tests `end <= 1440`.**  
**- Duration exactly 120 min (`start=600, end=720`) — tests `end - start <= 120`.**  
**- Existing booking ends at requested start (`Request [600,660), existing [540,600)`) — tests touching endpoints.**  
**- Request contains existing booking (`Request [600,720), existing [630,660)`).**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM0lEQVR4nO3OQQmAUBBAwSeILbyYdDP8jAaxgjcRZhLMNjNntQIA4C/uvTqq6+sJAADvPS2NA0FrXqf/AAAAAElFTkSuQmCC)  
**3. Task 2 — the first version (v1), read before it was run**  
**v1 is saved as `code/original/booking_v1.py`, exactly as the assistant returned it: yes**  
   
****AC map.****  
   
**| # | Line in v1 | AC it implements | Correct as written? If not, why |**  
**| --- | --- | --- | --- |**  
**| 1 | `if not (0 <= start < end <= 1440 and start > now):` | AC1 | yes |**  
**| 2 | `if end - start > 120:` | AC2 | yes |**  
**| 3 | `if blocked:` | AC3 | yes |**  
**| 4 | `if start < existing_end and existing_start < end:` | AC4 | yes |**  
**| 5 | `return True` | AC5 | yes |**  
   
****Anything in v1 that no AC asks for** (extra validation, a buffer between bookings, logging, saving the booking, a different return type):**  
**- None. The function strictly follows AC1-AC5 without inventing any additional features or validations.**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSeYxKS/kJkED6bwYAVvImwJtszMVu0BAPAXx1rd1fn1BACA164HHDwF+DpPyKwAAAAASUVORK5CYII=)  
**4. Task 3 — my tests**  
Base input for every row unless the row says otherwise: now=540, blocked=False, existing=[(600, 660)].  
| | | | | | | | |  
|-|-|-|-|-|-|-|-|  
| **#** | **Test name** | **Request (start, end)** | **What differs from the base input** | **Expected** | **AC** | **Result on v1** | **Result on final** |   
| 1 |   |   |   |   |   |   |   |   
| 2 |   |   |   |   |   |   |   |   
| 3 |   |   |   |   |   |   |   |   
| 4 |   |   |   |   |   |   |   |   
| 5 |   |   |   |   |   |   |   |   
| 6 |   |   |   |   |   |   |   |   
| 7 |   |   |   |   |   |   |   |   
| 8 |   |   |   |   |   |   |   |   
| 9 |   |   |   |   |   |   |   |   
| 10 |   |   |   |   |   |   |   |   
| 11 |   |   |   |   |   |   |   |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhwgJmkPYLLpnRgQU2QtIq6DIze3UGAMBf3Gu1VcfHEQAA3rseaHkEMn1wK7sAAAAASUVORK5CYII=)  
**5. Task 4 — debugging with evidence**  
One row per defect you found — in v1, in a later version, or in your own tests. If v1 passed  
   
 everything, the row is the **new edge case you added**, with expected and actual equal, and the  
   
 cause column says why no change was needed.  
| | | | | | | |  
|-|-|-|-|-|-|-|  
| **#** | **Input (the full call)** | **Expected** | **Actual** | **Cause (quote the line)** | **Fix** | **Who proposed the fix** |   
| 1 |   |   |   |   |   |   |   
   
**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsSfYxZo/kC1sYQLPJrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA4qzBdC53Vr8AAAAAElFTkSuQmCC)  
**6. Task 5 — the critique**  
**The assistant's critique, pasted unedited:**  
(paste here)  
   
| | | | | |  
|-|-|-|-|-|  
| **#** | **Suggestion** | **accept / reject** | **Reason — cite the AC or the contract line** | **Suite after the change** |   
| 1 |   | accept / reject |   |   |   
| 2 |   | accept / reject |   |   |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSeYxKS/kJkED6bwYAVvImwJtszMVu0BAPAXx1rd1fn1BACA164HHDwF+DpPyKwAAAAASUVORK5CYII=)  
**7. Change log — v1 to final**  
| | | | |  
|-|-|-|-|  
| **#** | **What changed (the line, before → after)** | **Why** | **Evidence: the test or check that moved** |   
| 1 |   |   |   |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM0lEQVR4nO3OMQ0AIAwAwZIgBKm1gjSMNCwYYCIkd9OP3zJzRMQMAAB+sfqJeroBAMCN2pTWBSSZVtjzAAAAAElFTkSuQmCC)  
**8. Evidence — real output**  
**8.1 My suite, final run**  
Paste the **complete** terminal output. For Python: everything python -m unittest -v printed.  
(paste here)  
   
**8.2 The checker, final run**  
Paste the **complete** output of python tests/check_booking.py. Paste it  **last**: if you edit  
   
 this file afterwards, run the checker again and paste again.  
(paste here)  
   
**8.3 Path B only — three faults I planted myself**  
Break your own function on purpose, one line at a time, run your suite, restore the line.  
| | | | |  
|-|-|-|-|  
| **#** | **Line I changed (before → after)** | **AC it breaks** | **Test that failed** |   
| 1 |   |   |   |   
| 2 |   |   |   |   
| 3 |   |   |   |   
   
The three failing runs (Path A students leave this block empty):  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsSeYxZw/lVeDGMACBrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA6fOBdd+dKAKAAAAAElFTkSuQmCC)  
**9. What still fails, and what the contract does not say**  
**9.1 Checks I am keeping as FAIL or ERROR**  
The same IDs as known_fails in submission.yml. Write none if the run is clean.  
| | |  
|-|-|  
| **Check** | **Why it stays** |   
|   |   |   
   
**9.2 Outside the contract**  
The contract says times are integers. It does not say what can_book does when one is not —  
   
 600.5, or the string "600". What does **your** function do, and why is that the right call?  
**9.3 A bound that never decides**  
One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one,  
   
 and why?  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AUBBAsUfyVTCg9UygEBVsWGAjJK2CbjNzVGcAAPzFtapV7V9PAAB47X4AEWIEM8iQs0EAAAAASUVORK5CYII=)  
**10. Conclusion (120–180 words)**  
