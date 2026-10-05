# Week 04 — Lab report: Modeling the System with UML

> The single worksheet for this lab. Fill in every section. **Do not delete, rename or renumber
> the headings** — the checker and the grader find your work by them. Replace every placeholder;
> a row that still contains one counts as empty.

---

## 1. Setup

| Field | Value |
| --- | --- |
| Name | Shynbulat Kazbek |
| Group | Monday 16:00-19:00 |
| AI assistant | ChatGPT |
| Exact model | GPT-5.6 Luna - Instant |
| Renderer | plantuml.com |
| Behaviour diagram | sequence |
| Stories used | my week-03 stories, revised |

---

## 2. Prompts as sent

### 2.1 Task 1 — use-case prompt

```text
Using the supplied scenario and approved stories, generate PlantUML for a use-case diagram. Include Student and Administrator outside a named system boundary. Model their goals, show justified associations, and list assumptions. Use include or extend only with a clear reason.
```

### 2.2 Task 2 — class prompt

```text
Create a UML domain class diagram in PlantUML for Smart Campus. Start with Student, Room, and Booking. Add attributes, appropriate operations, and association multiplicities. Add other classes only when requirements justify them. Explain each relationship and list assumptions. Avoid unjustified inheritance or composition.
```

### 2.3 Task 3 — behaviour prompt (3A sequence or 3B activity)

```text
Generate PlantUML for Book room. Use Student, BookingService, and BookingRepository lifelines. Validate the supplied rules, then attempt the reservation. Show a successful confirmation and an unavailable-room alternative using alt. Label messages and replies. Explain new design components and all assumptions.
```

### 2.4 Focused correction prompts (if you sent any)

```text
none
```

### 2.5 Critique prompt

```text
Compare my diagrams with the requirements. Identify missing rules, inconsistent names, and unjustified elements. Cite each issue and propose a specific correction.
```

---

## 3. Task 1 — use-case review

**Assumptions the AI listed:** The AI listed 8 assumptions covering actor permissions, R1-R4 rule enforcement, confirmation outcomes, and a note on scope limits.

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | `Student --> Receive confirmation` | The actor is directly linked to a system confirmation. A confirmation is an outcome, not a goal a user sets out to do. | R4 / US-07 | Removed the direct association between Student and the confirmation use case. |
| 2 | include relationships | The include arrows for the confirmation use case are missing the mandatory justification comment above them. | PlantUML conventions | Added why comments directly above the include lines citing R4 and US-07. |

---

## 4. Task 2 — class diagram review

### 4.1 Relationships, read both ways

| Association | Read left → right | Read right → left | Multiplicities |
| --- | --- | --- | --- |
| Student — Booking | One Student makes 0..* bookings | Each Booking belongs to exactly 1 Student | 1 / 0..* |
| Room — Booking | One Room is reserved in 0..* bookings | Each Booking is for exactly 1 Room | 1 / 0..* |

### 4.2 Constraints the multiplicities cannot show

- R2: Active bookings for the same room cannot overlap. Shown as a note on the Booking class, because multiplicity only says "many", not "when".
- R1 (future start, duration greater than 0 and at most 2 hours) and R3 (a blocked room cannot accept a new booking) cannot be shown by multiplicities. They are supported by the attributes startTime, endTime and isBlocked and enforced by business logic.

### 4.3 Assumptions

- A1: overlap_touching_bookings = not-allowed. A booking ending exactly when another begins is treated as an overlap under R2.
- A2: blocking_a_booked_room = keep-bookings. Blocking a room stops new bookings under R3, but existing active bookings remain.

### 4.4 Findings

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | R2 constraint | R2 cannot be shown via multiplicities, and the AI only mentioned it in text, not on the diagram. | R2 | Added a note right of Booking stating R2. |
| 2 | Domain class operations | The AI added UI and system actions like sendConfirmation() and viewAvailableRooms() as methods on domain entities. | Domain modeling principles | Removed the methods to keep a pure domain model focused on state for R1-R3. |

---

## 5. Task 3 — behaviour diagram review

**Option chosen and why:** 3A sequence — it shows the interactions between the actor and the design components over time, which makes the validation flow easy to trace.

**Design components added beyond the domain model:**

- `BookingService`: a service-layer component that coordinates the booking process and executes the business rule validations (R1-R3).
- `BookingRepository`: a data-access component that fetches room state and active bookings and persists a new booking.

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | `alt Room is available` | The AI asks the repository whether the room is available, and only then checks whether it is blocked or overlapping. This is logically backward. | R2, R3 | Changed the flow so the service evaluates R2 and R3 itself before branching. |
| 2 | `checkRoomAvailability` | The repository was doing the validation work instead of the service layer. | R2, R3 | Replaced with getRoomAndActiveBookings so the service handles the business rules. |

---

## 6. AI critique

| # | Issue the AI raised | Element it cited | Verdict | Why |
| --- | --- | --- | --- | --- |
| 1 | R1 is missing from the class diagram and needs a note. | Booking class | Reject | R1 is a behavioural validation rule. It is enforced by BookingService in the sequence diagram. |
| 2 | `hide methods` is wrong; domain classes should have operations. | Class diagram | Reject | The class diagram is kept as a pure state model. Operations live in the design components. |
| 3 | The sequence diagram uses `else invalid` instead of an unavailable-room alternative. | Sequence diagram | Accept | The task prompt requested an unavailable-room alternative, so the guard was renamed. |

---

## 7. Consistency table

| Requirement / story | Use case | Classes | Behaviour element |
| --- | --- | --- | --- |
| R1 | Book room | Booking (startTime, endTime) | validate time range (R1) |
| R2 | Book room | Booking, note | check for overlapping bookings (R2) |
| R3 | Book room, Block or unblock room | Room (isBlocked) | check if room is blocked (R3) |
| R4 | Book room, Send confirmation | Booking | confirm booking (R4) |
| US-01 | View availability | Room, Booking | none |
| US-02 | Book room | Student, Room, Booking | bookRoom, saveBooking |
| US-03 | View my bookings | Student, Booking | none |
| US-04 | Cancel booking | Student, Booking | none |
| US-05 | Block or unblock room | Administrator, Room | none |
| US-06 | Review usage | Administrator, Room, Booking | none |
| US-07 | Send confirmation | Booking | confirm booking (R4) |

---

## 8. Change log

| # | Diagram | Before (AI's original) | After (your revision) | Reason |
| --- | --- | --- | --- | --- |
| 1 | use case | Connected Student directly to Send confirmation. | Removed the direct link, added include from Book room and Cancel booking with why comments. | Confirmation is an automatic system outcome, not a user goal (R4, US-07). |
| 2 | class | Included system operations and omitted the R2 constraint. | Removed operations to leave pure state, added a note for R2. | Keeps UI and system behaviour out of domain classes. |
| 3 | sequence | Checked R2 and R3 inside the success branch after querying the repository. | Moved the checks to the service layer before deciding the branch. | R2 and R3 are the rules that define whether a room is available. |

---

## 9. Checker output

```text
Run: python3 tests/check_models.py  and paste its real output here.
```

FAILs I am keeping, and why: none

---

## 10. Conclusion (120–180 words)

The AI struggled most with the order of business rules versus database operations in the behaviour diagram. In its original sequence diagram, it checked R2 (overlapping bookings) and R3 (blocked room) only inside the success branch, after asking the repository whether the room was available. This inversion is dangerous: R2 and R3 are exactly the constraints that define availability. If it reached production code, the system could trust a generic repository answer instead of enforcing the rules in the service layer, which could lead to double bookings. The use-case diagram also linked Student directly to a confirmation, which is a system outcome rather than a user goal, and the class diagram mixed operations into domain classes. The critique was mixed: it asked for R1 as a class-diagram note and for operations on domain classes, which I rejected with reasons, but it correctly caught the vague invalid label in the sequence diagram, so I accepted that correction.
