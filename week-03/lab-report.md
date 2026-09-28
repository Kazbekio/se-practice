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
(paste here)  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AUBBAsUfyNTCi9VwgEA3sWGAjJK2CbjNzVGcAAPzFtapV7V9PAAB47X4AEW4ELQDBN+AAAAAASUVORK5CYII=)  
**5. Criteria review (Part 3)**  
| | | | |  
|-|-|-|-|  
| **Criterion (as generated)** | **Problem** | **What I changed it to** | **Final ID** |   
|   |   |   |   |   
   
**The two open questions.** Write your decision and the reason. Either answer is accepted.  
| | | |  
|-|-|-|  
| **Question** | **My decision** | **Why** |   
| A booking ending exactly when another begins — overlap under R3? | allowed / not-allowed |   |   
| Is exactly two hours allowed under R2? | allowed / not-allowed |   |   
   
**Which invalid or boundary case did the assistant leave out?**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhZscVjnidKEAGFtgISaugy8zs1RkAAH9xr9VWHV9PAAB47XoAor8EPg1yCpUAAAAASUVORK5CYII=)  
**6. Original AI output — use-case diagram (Part 4)**  
(paste the PlantUML source exactly as generated)  
   
Rendered diagram (image, or a link):  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsSfYxZo/kSGMYQLPJrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA4qrBdGuSdJuAAAAAElFTkSuQmCC)  
**7. Diagram review (Part 4)**  
| | | |  
|-|-|-|  
| **Element** | **Problem** | **What I changed** |   
|   |   |   |   
   
**Associations.** Which actor–use-case links did the assistant draw that a person does not actually  
   
 trigger? Name them.  
**Did any screen, database or internal component appear as a use case or an actor?**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSeYxKS/kJkED6bwYAVvImwJtszMVu0BAPAXx1rd1fn1BACA164HHDwF+DpPyKwAAAAASUVORK5CYII=)  
**8. Traceability (Part 5)**  
Summarise what the table in requirements/traceability.md shows:  
- Use cases with **no story** behind them:  
- Stories with **no use case** they belong to:  
- Criteria that test **no rule** from section 1:  
**What does the largest gap tell you about the generated requirements?**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AUBBAsUfyNTCi9VwgEA3sWGAjJK2CbjNzVGcAAPzFtapV7V9PAAB47X4AEW4ELQDBN+AAAAAASUVORK5CYII=)  
**9. Checker runs**  
Paste the **real terminal output** of both runs. A table with nothing behind it does not count.  
$ python tests/check_requirements.py  
 (paste)  
   
$ python tests/validate_submission.py  
 (paste)  
   
| | | | |  
|-|-|-|-|  
|   | **PASS** | **FAIL** | **ERROR** |   
| check_requirements.py |   |   |   |   
   
Commit these numbers were produced at (git rev-parse --short HEAD):  
**Every FAIL, one line each: what it is and what you decided to do about it.** A FAIL you report and  
   
 explain costs you nothing.  
**Did you run the checks by hand instead of with Python?** Say so here — it costs nothing, but it  
   
 has to be said.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsSeYxZw/lieLGMACBrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA6fGBdgoVMwYAAAAAElFTkSuQmCC)  
**10. Conclusion (150–200 words)**  
Answer all three:  
1. Which part of the generated requirements was most wrong, and how would you have caught it without  
   
 a checker?  
2. What did the assistant get right that would have taken you noticeably longer by hand?  
3. You are handing these requirements to someone who will implement them, and you will not be in the  
   
 room. Which single one would you rewrite first, and why?  
Be specific. "The AI was useful" is worth nothing; "UC-06 had no story behind it until I wrote  
   
 US-07, and the checker is what told me" is worth everything.  
