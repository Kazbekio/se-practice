**Lab report — Practice #03, Requirements Engineering with AI**  
Fill in every section. **Do not delete or renumber the headings** — the README points at them and a  
   
 missing heading reads as a missing section.  
Name: Shynbulat Kazbek  
 Student ID:24B032123  
 GitHub username: Kazbekio  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OMQ2AABAAsSNBCkJfFSqwwIgHRiywEZJWQZeZ2ao9AAD+4lyruzq+ngAA8Nr1AOH8BeZxN/IIAAAAAElFTkSuQmCC)  
**1. Setup**  
| | |  
|-|-|  
|   |   |   
| AI assistant (tool) | ChatGpt |   
| Exact model name and version | GPT-5.6 Luna — Instant. |   
| Date of the session | 27.09.2026 |   
| Diagram renderer used | no |   
   
One tool and one model for all three prompts. If you switched, say why here — it changes what your  
   
 findings mean.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAABRAsad4EjtY9fewnUms4E2ELcGWmTmrKwAA/uLeqrU6vp4AAPDa/gDzWAM6QQXRdAAAAABJRU5ErkJggg==)  
**2. Original AI output — user stories (Part 1)**  
Paste the **unedited** response to Prompt 1. Do not tidy it. If it is long, paste all of it anyway;  
   
 this is the baseline everything else is measured against.  
## **Smart Campus Study Room Booking System**  
### **Student Goals**  
- Find available study rooms quickly.  
- Book a room for a specific time.  
- See and manage personal bookings.  
- Cancel a booking when it is no longer needed.  
### **Administrator Goals**  
- Manage study rooms and their availability.  
- Monitor and manage student bookings.  
- Prevent booking conflicts and maintain accurate room information.  
### **User Stories**  
| | | | |  
|-|-|-|-|  
| **#** | **User Story** | **Priority** | **Assumption** |   
| 1 | **As a Student, I want to view available study rooms, so that I can choose a suitable room for studying.** | High | Room availability information is updated in the system. |   
| 2 | **As a Student, I want to book an available study room for a specific time, so that I can use the room when I need it.** | High | Students can only book rooms that are available for the selected time. |   
| 3 | **As a Student, I want to view my bookings, so that I can check my upcoming study room reservations.** | Medium | Each student can see only their own bookings. |   
| 4 | **As a Student, I want to cancel my booking, so that the room becomes available when I no longer need it.** | Medium | Students can cancel their own future bookings. |   
| 5 | **As an Administrator, I want to add and update study room information, so that students see accurate room details and availability.** | High | Administrators have permission to manage room information. |   
| 6 | **As an Administrator, I want to view student bookings, so that I can monitor room usage and reservations.** | High | Administrators can access all bookings in the system. |   
| 7 | **As an Administrator, I want to prevent double bookings, so that the same room cannot be reserved by two students at the same time.** | High | The system checks room availability before confirming a booking. |   
| 8 | **As an Administrator, I want to cancel or manage bookings when necessary, so that room schedules remain accurate.** | Medium | Administrators are authorized to modify existing bookings. |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OYQ1AABSAwY9JoICqL4Z8Ikiggn9mu0twy8wc1RkAAH9xbdVa7V9PAAB47X4A9CgEJQFjJ/EAAAAASUVORK5CYII=)  
**3. Story review (Part 2)**  
One row per change you made. "Kept unchanged" is a valid row and needs a reason too.  
| | | | |  
|-|-|-|-|  
| **Story (as generated)** | **What I did** | **Why** | **Final ID** |   
| 1 (Student view available) | Kept unchanged | Matches UC-01 and has clear value. | US-01 |   
| 2 (Student book room) | Kept unchanged | Matches UC-02 exactly. | US-02 |   
| 3 (Student view my bookings) | Kept unchanged | A logical prerequisite for cancelling a booking. | US-03 |   
| 4 (Student cancel booking) | Kept unchanged | Matches UC-03. | US-04 |   
| 5 (Admin add/update room info) | Rewrote | "Add/update info" is out of scope. Changed to blocking/unblocking rooms (UC-04). | US-05 |   
| 6 (Admin view bookings) | Rewrote slightly | Adjusted wording to match UC-05 "Review usage". | US-06 |   
| 7 (Admin prevent double bookings) | Deleted | This is a business rule (R3 No overlap), not a user goal. | - |   
| 8 (Admin cancel/manage bookings) | Deleted | Admin cancelling bookings is out of scope (only UC-03 Student cancels). | - |   
| None (missed by AI) | Added new story | AI completely missed UC-06 (Send confirmation). | US-07 |   
   
**Did the assistant invent anything outside the scenario?** Yes. In original Story 5, it invented "adding and updating study room information", which is out of scope (Admins can only block/unblock). In Story 8, it invented Admins cancelling student bookings, which is also out of scope.  
   
**How many stories did you end with, and why that number? **I ended with 7 stories. I kept 4 original student stories, rewrote 1 for admins to fix scope creep, kept 1 admin story for reviewing usage, deleted 2 invalid ones, and added 1 for the missing confirmation feature to cover all use cases.  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAABRAsSdYxKa/i8WMIR7ECt5E2BJsmZmt2gMA4C+Otbqr8+sJAACvXQ85PAYartXEogAAAABJRU5ErkJggg==)  
**4. Original AI output — acceptance criteria (Part 3)**  
## **Assumptions**  
- A student can book a room only for a **future date and time**.  
- A booking must be **no longer than 2 hours**.  
- A room can have only **one booking at a time**; overlapping bookings are not allowed.  
- A **blocked room cannot be booked** by a student.  
- Only the student who created a booking can cancel it.  
- Administrators can block and unblock study rooms.  
### **US-02 — Book an available study room**  
**AC-02.1 — Successful booking  
 Given** a study room is available and unblocked  
 **When** a student selects a future start time and an end time within 2 hours  
 **Then** the system creates the booking and confirms the room, date, and time.  
**AC-02.2 — Maximum duration validation  
 Given** a student selects a future booking time  
 **When** the selected duration is more than 2 hours  
 **Then** the system rejects the booking and displays an appropriate validation message.  
**AC-02.3 — Future-time validation  
 Given** a student wants to book a study room  
 **When** the selected start time is in the past or at the current time  
 **Then** the system rejects the booking and requires a future start time.  
**AC-02.4 — Overlapping booking  
 Given** a room already has a booking for the selected time  
 **When** a student tries to book the same room for an overlapping period  
 **Then** the system rejects the booking and indicates that the room is unavailable.  
**AC-02.5 — Blocked room  
 Given** a study room is blocked by an administrator  
 **When** a student tries to book that room  
 **Then** the system rejects the booking and indicates that the room is currently unavailable.  
### **US-04 — Cancel a booking**  
**AC-04.1 — Successful cancellation  
 Given** a student has an existing booking  
 **When** the student cancels the booking  
 **Then** the system cancels it and makes the room available for other future bookings.  
**AC-04.2 — Unauthorized cancellation  
 Given** a booking belongs to another student  
 **When** a student tries to cancel that booking  
 **Then** the system rejects the action and keeps the original booking unchanged.  
**AC-04.3 — Invalid booking  
 Given** the selected booking does not exist  
 **When** the student tries to cancel it  
 **Then** the system displays an error and does not change any booking.  
**AC-04.4 — Cancellation confirmation  
 Given** a student has selected an existing booking to cancel  
 **When** the student confirms the cancellation  
 **Then** the system marks the booking as cancelled and shows a confirmation message.  
### **US-05 — Block or unblock a study room**  
**AC-05.1 — Successfully block a room  
 Given** an administrator selects an available study room  
 **When** the administrator blocks the room  
 **Then** the system changes the room status to blocked and prevents students from making new bookings for it.  
**AC-05.2 — Successfully unblock a room  
 Given** a study room is blocked  
 **When** an administrator unblocks the room  
 **Then** the system changes the room status to available and allows students to make future bookings, subject to normal booking rules.  
**AC-05.3 — Student cannot book blocked room  
 Given** a room is blocked  
 **When** a student attempts to book the room  
 **Then** the system rejects the booking and informs the student that the room is blocked.  
**AC-05.4 — Invalid room  
 Given** the selected room does not exist  
 **When** an administrator tries to block or unblock it  
 **Then** the system rejects the action and displays an error message.  
**AC-05.5 — Existing booking when blocking  
 Given** a room has an existing booking  
 **When** an administrator blocks the room  
 **Then** the system prevents new bookings for that room while keeping the existing booking unchanged.  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSPBCj7fFjsymJHAjAU2QtIq6DIzW7UHAMBfnGt1V8fXEwAAXrsexNkF4H1/HJoAAAAASUVORK5CYII=)  
**5. Criteria review (Part 3)**  
| | | | |  
|-|-|-|-|  
| **Criterion (as generated)** | **Problem** | **What I changed it to** | **Final ID** |   
| AC-02.1 & 02.2 (duration) | Allowed bookings < 2 hours | Enforced the strict "exactly 2 hours" assumption. | AC-01, AC-02 |   
| AC-02.4 (overlapping) | Ignored the exact touch boundary case | Explicitly tested booking starting at the exact minute another ends. | AC-03 |   
| AC-02.5 (blocked room) | Good | Kept and renumbered. | AC-04 |   
| AC-04.1 to 04.3 | Good logic | Kept and renumbered. | AC-05 to AC-07 |   
| AC-04.4 (cancel confirm) | Redundant | Deleted (confirmation is handled by US-07 now). | - |   
| AC-05.1, 05.2, 05.5 | Good logic | Kept and renumbered. | AC-08, AC-09, AC-10 |   
   
**The two open questions.** Write your decision and the reason. Either answer is accepted.  
| | | |  
|-|-|-|  
| **Question** | **My decision** | **Why** |   
| A booking ending exactly when another begins — overlap under R3? | not-allowed | A new booking shouldn't start at the exact same minute to prevent physical clashes. |   
| Is exactly two hours allowed under R2? | allowed | I chose to enforce a strict rule where bookings MUST be exactly two hours long. |   
   
**Which invalid or boundary case did the assistant leave out?** The AI completely left out the boundary case of bookings touching exactly (e.g., one ending at 14:00, another starting at 14:00). It only covered general "overlapping periods".  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd49m4v6wg/pwmMYQVvImwJtszMXp0BAPAX91pt1fH1BACA164Hoq8EQMMPmF8AAAAASUVORK5CYII=)  
**6. Original AI output — use-case diagram (Part 4)**  
@startuml  
left to right direction  
   
actor Student  
actor Administrator  
   
rectangle "Smart Campus Study Room Booking System" {  
   
  usecase "View availability" as UC1  
  usecase "Book room" as UC2  
  usecase "Cancel booking" as UC3  
  usecase "Block or unblock room" as UC4  
  usecase "Review usage" as UC5  
  usecase "Send confirmation" as UC6  
}  
   
Student --> UC1  
Student --> UC2  
Student --> UC3  
   
Administrator --> UC4  
Administrator --> UC5  
   
UC2 ..> UC1 : <<include>>  
UC2 ..> UC6 : <<include>>  
   
@enduml  
This keeps the associations minimal: **Student** handles availability/booking/cancellation, while  **Administrator** manages rooms and reviews usage. Book room includes View availability and Send confirmation because both are required parts of a successful booking flow.  
   
Rendered diagram (image, or a link):  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM0lEQVR4nO3OUQmAQBBAwSdcjsu6HYxoDsEK/okwk2COmdnVGQAAf3GtalX76wkAAK/dDxFWBDkFf6+SAAAAAElFTkSuQmCC)  
**7. Diagram review (Part 4)**  
| | | |  
|-|-|-|  
| **Element** | **Problem** | **What I changed** |   
| UC6 (Send confirmation) | AI correctly used <<include>> instead of linking an actor directly | Kept unchanged |   
   
**Associations.** Which actor–use-case links did the assistant draw that a person does not actually  
   
 trigger? Name them.  
None. The assistant correctly avoided drawing a direct link between an actor and "Send confirmation", using an <<include>> from "Book room" instead. It also correctly assigned "Review usage" and "Block/unblock" exclusively to the Administrator.  
   
**Did any screen, database or internal component appear as a use case or an actor?**  
No, the AI strictly adhered to the instruction not to model databases or screens.  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsSfYxZo/jVEMYQLPJrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA4rLBc059ysnAAAAAElFTkSuQmCC)  
**8. Traceability (Part 5)**  
Summarise what the table in requirements/traceability.md shows:  
- Use cases with **no story** behind them: None (we added US-07 for UC-06 during our review).  
- Stories with **no use case** they belong to: US-03 (Student viewing their own bookings is not in the official 6 Use Cases).  
- Criteria that test **no rule** from section 1:None, all criteria map to rules (R1-R4) or basic functional logic.  
**What does the largest gap tell you about the generated requirements?**  
The biggest gap is US-03 having no corresponding Use Case. It reveals an architectural flaw in the provided scenario: the system expects students to cancel bookings (UC-03) but doesn't officially provide them a way to see a list of their current bookings.  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OMQ0AIAwAwZIgBKnVgjN8dGDBABMhuZt+/JaZIyJmAADwi9VP1NMNAABu1AaU3AUhiyfJeAAAAABJRU5ErkJggg==)  
**9. Checker runs**  
Paste the **real terminal output** of both runs. A table with nothing behind it does not count.  
$ python tests/check_requirements.py  
 PASS   US-1  user-stories.md         no placeholders left  
PASS   US-2  user-stories.md         7 stories, IDs US-01…US-07  
PASS   US-3  user-stories.md         every story has the required sentence shape  
PASS   US-4  user-stories.md         every story has a priority  
PASS   US-5  user-stories.md         every story declares an assumption  
PASS   US-6  user-stories.md         only Student and Administrator appear as roles  
FAIL   US-7  user-stories.md         out-of-scope vocabulary: maintenance — either the assistant widened the scenario, or say why in lab-report.md  
PASS   AC-1  acceptance-criteria.md  no placeholders left  
PASS   AC-2  acceptance-criteria.md  three sections, all naming real stories: US-02, US-04, US-05  
PASS   AC-3  acceptance-criteria.md  every section has 3 to 5 uniquely numbered criteria  
PASS   AC-4  acceptance-criteria.md  all 10 criteria are complete Given/When/Then  
PASS   AC-5  acceptance-criteria.md  every section covers an invalid or boundary case  
PASS   AC-6  acceptance-criteria.md  2 assumptions listed before the criteria  
PASS   AC-7  acceptance-criteria.md  both open questions are settled in the assumptions  
PASS   PU-1  use-cases.puml          valid PlantUML block, no placeholders  
PASS   PU-2  use-cases.puml          exactly two actors: Student, Administrator  
PASS   PU-3  use-cases.puml          all six use cases present  
PASS   PU-4  use-cases.puml          system boundary present  
PASS   PU-5  use-cases.puml          no screens, databases or internal components  
PASS   PU-6  use-cases.puml          no unjustified actor associations found  
PASS   TR-1  traceability.md         all six use cases have a row  
PASS   TR-2  traceability.md         every ID in the table resolves  
PASS   TR-3  traceability.md         every story appears in the table  
------------------------------------------------------------------------  
22 PASS · 1 FAIL · 0 ERROR   (23 checks)  
Every FAIL goes in lab-report.md section 9 with what you decided about it.  
A FAIL you report and explain costs you nothing. One you hide costs the criterion.  
$ python tests/validate_submission.py  
 submission.yml — submission.yml  
------------------------------------------------------------------------  
PASS   schema                                    1  
PASS   week                                      03  
PASS   student.name                              Shynbulat Kazbek  
PASS   student.student_id                        24B032123  
PASS   student.github                            Kazbekio  
PASS   assistant.tool                            ChatGPT  
PASS   assistant.model                           GPT-5.6 Luna — Instant  
PASS   counts.user_stories                       7  
PASS   counts.acceptance_criteria_sets           3  
PASS   checker                                   22 PASS · 1 FAIL · 0 ERROR  
PASS   checker.commit                            bbb75db  
PASS   assumptions.overlap_touching_bookings     not-allowed  
PASS   assumptions.exactly_two_hours             allowed  
PASS   traceability.use_cases_not_covered        []  
PASS   traceability.stories_not_traced           US-03  
PASS   review_findings                           3 findings  
PASS   review_findings[1]                        US-05 initially included out-of-scope features (adding rooms…  
PASS   review_findings[2]                        UC-06 Send confirmation had no story behind it at all until …  
PASS   review_findings[3]                        AC-03 was added to explicitly test the boundary condition of…  
PASS   honesty.can_explain_everything_submitted  yes  
PASS   honesty.ai_usage_disclosed                yes  
------------------------------------------------------------------------  
21 PASS · 0 FAIL · 0 ERROR · 0 note  
Shape is fine. This says nothing about whether the work is good.  
   
| | | | |  
|-|-|-|-|  
|   | **PASS** | **FAIL** | **ERROR** |   
| check_requirements.py | 22 | 1 | 0 |   
   
Commit these numbers were produced at (git rev-parse --short HEAD):  
**Every FAIL, one line each: what it is and what you decided to do about it.**   
- US-7 (out-of-scope vocabulary): The checker flagged the word "maintenance" in US-05. I decided to keep it because it is used purely as the *reason* (the "so that" clause) for blocking a room, not to introduce a new maintenance request feature.   
**Did you run the checks by hand instead of with Python?**No, I used the provided Python scripts.  
   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSPBCUbfEm6YmFDBhAU2QtIq6DIzW7UHAMBfnGt1V8fXEwAAXrse/w8F7pbTa1oAAAAASUVORK5CYII=)  
**10. Conclusion (150–200 words)**  
Answer all three:  
1. Which part of the generated requirements was most wrong, and how would you have caught it withouta checker?  
The most incorrect part of the generated requirements was the out-of-scope creeping in the Admin stories. The AI initially generated stories for adding/updating room details (which is not allowed) and completely missed the "Send confirmation" use case. Without a checker, mapping stories to a strict traceability matrix is the best way to catch these gaps visually.  
2. What did the assistant get right that would have taken you noticeably longer by hand?  
The AI excelled at generating the initial Given/When/Then structure for the acceptance criteria. Writing 10 criteria manually with correct boundary logic would have taken significantly longer. It also correctly applied standard PlantUML syntax for the use-case diagram without hallucinating unneeded dependencies.  
3. You are handing these requirements to someone who will implement them, and you will not be in the room. Which single one would you rewrite first, and why?  
If handing these over to a developer, I would rewrite US-03 (Student views their own bookings) first. Currently, it exists as a story but has no official Use Case tied to it, meaning a developer might implement it as an undocumented endpoint. It needs to be officially added to the system boundaries or merged into UC-01.  
   
   
Be specific. "The AI was useful" is worth nothing; "UC-06 had no story behind it until I wrote  
   
 US-07, and the checker is what told me" is worth everything.  
