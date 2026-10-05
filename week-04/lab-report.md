**Week 04 — Lab report: Modeling the System with UML**  
*The single worksheet for this lab. Fill in every section. * ***Do not delete, rename or renumber***  
 ***  
 the headings*** * — the checker and the grader find your work by them. Replace every * *<...>*  
 *  
 placeholder; a row that still contains * *<...>* * counts as empty.*  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSPBCUbfEm6YmFDBhAU2QtIq6DIzW7UHAMBfnGt1V8fXEwAAXrse/w8F7pbTa1oAAAAASUVORK5CYII=)  
**1. Setup**  
| | |  
|-|-|  
| **Field** | **Value** |   
| Name | Shynbulat Kazbek |   
| Group | Monday 16:00-19:00 |   
| AI assistant | ChatGPT |   
| Exact model | GPT-5.5 Instant |   
| Renderer | <PlantUML web server / VS Code extension / IntelliJ plugin / local jar> |   
| Behaviour diagram | <sequence / activity / both> |   
| Stories used | <my week-03 stories, revised / the reference set from README §3> |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAABRAsad4FCtY9ecwnkms4E2ELcGWmTmrKwAA/uLeqrU6vp4AAPDa/gDzUgM9+S8z3AAAAABJRU5ErkJggg==)  
**2. Prompts as sent**  
Paste every prompt **exactly as you sent it**, in the order you sent it, one code block each. The  
   
 AI's first replies are saved as files in models/original/ — do not paste them here.  
**2.1 Task 1 — use-case prompt**  
Using the supplied scenario and approved stories, generate PlantUML for a use-case diagram. Include Student and Administrator outside a named system boundary. Model their goals, show justified associations, and list assumptions. Use include or extend only with a clear reason.  
**2.2 Task 2 — class prompt**  
Create a UML domain class diagram in PlantUML for Smart Campus. Start with Student, Room, and Booking. Add attributes, appropriate operations, and association multiplicities. Add other classes only when requirements justify them. Explain each relationship and list assumptions. Avoid unjustified inheritance or composition.  
   
**2.3 Task 3 — behaviour prompt (3A sequence or 3B activity)**  
Generate PlantUML for Book room. Use Student, BookingService, and BookingRepository lifelines. Validate the supplied rules, then attempt the reservation. Show a successful confirmation and an unavailable-room alternative using alt. Label messages and replies. Explain new design components and all assumptions.  
**2.4 Focused correction prompts (if you sent any)**  
<paste, or write "none">  
   
**2.5 Critique prompt**  
<paste>  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OUQmAABBAsSdYxKbXxlpGEAOIFfwTYUuwZWa2ag8AgL841uquzq8nAAC8dj05VAYO3phhoQAAAABJRU5ErkJggg==)  
**3. Task 1 — use-case review**  
**Assumptions the AI listed:** The AI listed 8 assumptions covering actor permissions, R1-R4 rule enforcement, confirmation outcomes, and a note on scope limits (no screens/databases).  
   
| # | Element | Problem | Rule or story | Fix |  
| --- | --- | --- | --- | --- |  
| 1 | `Student --> Receive confirmation` | The actor is directly linked to a system confirmation. A confirmation is an outcome, not a goal a user sets out to do. | R4 / US-07 | Removed the direct association between Student and the confirmation use case. |  
| 2 | `<<include>>` relationships | The include arrows for the confirmation use case are missing the mandatory justification comment above them. | PlantUML conventions (README §4) | Added `' why:` comments directly above the `<<include>>` lines citing R4. |  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OMQ2AABAAsSNhRAF6EPYDLhGADSywEZJWQZeZ2aszAAD+4l6rrTq+ngAA8Nr1AIWsBDYDm5cLAAAAAElFTkSuQmCC)  
**4. Task 2 — class diagram review**  
### 4.1 Relationships, read both ways  
   
One row per association in your **revised** class diagram.  
   
| Association | Read left → right | Read right → left | Multiplicities |  
| --- | --- | --- | --- |  
| Student — Booking | One Student makes 0..* bookings | Each Booking belongs to exactly 1 Student | 1 / 0..* |  
| Room — Booking | One Room is reserved in 0..* bookings | Each Booking is for exactly 1 Room | 1 / 0..* |  
   
### 4.2 Constraints the multiplicities cannot show  
   
- R2: Active bookings cannot overlap. Displayed as a note directly on the Booking class because multiplicity (0..*) only says "many", not "when".  
- R1 (future start, exactly 2 hours) and R3 (blocked room) cannot be shown via multiplicities. They are implied by attributes (`startTime`, `isBlocked`) and enforced by business logic.  
   
### 4.3 Assumptions  
   
- A1: overlap_touching_bookings = not-allowed (a booking ending exactly when another begins is considered an overlap under R2).  
- A2: blocking_a_booked_room = keep-bookings (blocking a room stops new bookings under R3, but existing active bookings remain).  
   
### 4.4 Findings  
   
| # | Element | Problem | Rule or story | Fix |  
| --- | --- | --- | --- | --- |  
| 1 | R2 constraint | R2 cannot be shown via multiplicities, but the AI just mentioned it in text, not on the diagram. | PlantUML conventions (README §4) | Added a `note right of Booking` stating R2. |  
| 2 | Domain Class Operations | The AI added UI/system actions like `sendConfirmation()` and `viewAvailableRooms()` as methods on domain entities. | Domain modeling principles | Removed methods to keep it a pure domain model focused on state (attributes) for R1-R3. |  
   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OYQ1AABSAwc8mi5wvkwZyCKCAACr4Z7a7BLfMzFYdAQDwF+da3dX+9QQAgNeuB6feBdUJcyS2AAAAAElFTkSuQmCC)  
**5. Task 3 — behaviour diagram review**  
**Option chosen and why:** 3A sequence — it clearly shows the interactions between the actor and the design components over time, which makes validation flow easier to trace.  
   
**Design components added beyond the domain model:**  
- `BookingService`: A service layer component that coordinates the booking process and executes business rule validations (R1, R2, R3).  
- `BookingRepository`: A data access component responsible for fetching room state and persisting new bookings to the database.  
   
| # | Element | Problem | Rule or story | Fix |  
| --- | --- | --- | --- | --- |  
| 1 | `alt Room is available` followed by `validate R2 / R3` | The AI asks the DB if the room is available, and if yes, *then* it checks if it's blocked (R3) or has overlaps (R2). This is logically backward, as R2 and R3 define availability. | Logical Flow / R2, R3 | Changed the flow: the Service now fetches raw room data from the Repository, evaluates R2 and R3 itself, and then branches (`alt valid` vs `else invalid`). |  
| 2 | `checkRoomAvailability` message | The repository was doing the validation work instead of the service layer. | Domain Logic | Replaced with `getRoomAndActiveBookings(roomId)` so the Service handles the business rules. |  
   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhwgJOUPcjIpnRgQU2QtIq6DIze3UGAMBf3Gu1VcfXEwAAXrseaJEEL8XMiYMAAAAASUVORK5CYII=)  
**6. AI critique**  
| # | Issue the AI raised | Element it cited | Verdict | Why |   
| --- | --- | --- | --- | --- |   
| 1 | R1 is missing from the class diagram and needs a note. | `Booking` class | Reject | R1 is a behavioral validation rule (time range). It is properly enforced by the `BookingService` in the sequence diagram. Adding it as a static note clutters the domain model, and the instructions only mandated a note for R2. |   
| 2 | `hide methods` is wrong; domain classes should have operations like `cancelBooking()`. | Class diagram (`hide methods`) | Reject | We are using an anemic domain model focused purely on state (attributes). The operations are delegated to design components like `BookingService`, as shown in the sequence diagram. |   
| 3 | The sequence diagram uses `else invalid`, but the prompt specifically asked for an "unavailable-room" alternative. | Sequence diagram `alt valid / else invalid` | Accept | The task prompt specifically requested an "unavailable-room alternative". I changed the branch guard from `else invalid` to `else unavailable` to accurately reflect the prompt and requirements. |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNBCkJfE1pYGfHAiAU2QtIq6DIzW7UHAMBfnGt1V8fXEwAAXrse4dwF6o2O55YAAAAASUVORK5CYII=)  
**7. Consistency table**  
| Requirement / story | Use case | Classes | Behaviour element |   
| --- | --- | --- | --- |   
| R1 | Book room | Booking (startTime, endTime) | `validate time range (R1)` |   
| R2 | Book room, Cancel booking | Booking, note | `check for overlapping bookings (R2)` |  
| R3 | Book room, Block or unblock room | Room (isBlocked) | `check if room is blocked (R3)` |   
| R4 | Book room, Send confirmation | Booking (status) | `confirm booking (R4)` |   
| US-01 | View availability | Room, Booking | none |   
| US-02 | Book room | Student, Room, Booking | `bookRoom(...)`, `saveBooking(...)` |   
| US-03 | View my bookings | Student, Booking | none |   
| US-04 | Cancel booking | Student, Booking | none |   
| US-05 | Block or unblock room | Administrator, Room | none |   
| US-06 | Review usage | Administrator, Room, Booking | none |   
| US-07 | Send confirmation | Booking | `confirm booking (R4)` |  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhZscZXlheJwqQgQU2QtIq6DIze3UGAMBf3Gu1VcfXEwAAXrseop8EQrmJduIAAAAASUVORK5CYII=)  
**8. Change log**  
| # | Diagram | Before (AI's original) | After (your revision) | Reason |   
| --- | --- | --- | --- | --- |   
| 1 | use case | Connected `Student` directly to `Send confirmation`. | Removed direct link, added `<<include>>` from booking/cancellation with a `' why:` comment. | R4 and US-07 state confirmation is an automated system outcome of an action, not an independent user goal. |   
| 2 | class | Included UI/system operations like `viewAvailability()` and omitted the R2 constraint. | Removed operations to leave pure data state, added `note right of Booking` for R2. | Domain modeling principles dictate keeping UI out of domain classes. PlantUML conventions required R2 in a note. |   
| 3 | sequence | Checked R2 and R3 *inside* the "Room is available" branch after querying the DB. | Moved R2 and R3 validation checks to the `BookingService` layer *before* deciding if the room is available. | Logical error: R2 (overlaps) and R3 (blocked) are the very business rules that define whether a room is "available" or not. |  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNBCUrfDqrYGVDAgAU2QtIq6DIzW7UHAMBfHGt1V+fXEwAAXrseHCQGBEuErVgAAAAASUVORK5CYII=)  
**9. Checker output**  
Paste the complete output of python tests/check_models.py, then explain **every FAIL you are**  
 **  
 keeping**. The same IDs go in submission.yml under checker.kept_fails. A FAIL you report and explain costs you nothing. One you hide costs the whole criterion.  
<paste the full output>  
   
**FAILs I am keeping, and why:** <one line per check ID, or "none">  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAABRAsaeILbwZ9Fewo0Gs4E2ELcGWmTmqKwAA/uLeqr06v54AAPDa+gAthwNEfGhnhAAAAABJRU5ErkJggg==)  
**10. Conclusion (120–180 words)**  
<Which diagram did the AI get most wrong, and what exactly was wrong? Which error would have  
   
 reached the code if nobody had reviewed it? What did the critique find that you missed — and what  
   
 did it claim that was false? Be specific: "the AI got the multiplicities wrong" is worth nothing;  
   
 "the AI put 1..* on the Booking end, which says every room must already have a booking" is worth  
   
 everything.>  
