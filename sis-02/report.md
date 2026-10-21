**SIS #02 — AI-Assisted UML Modeling: University Course Registration**  
   
 **1. Scope and assumptions**  
   
 **Scope:** (write here)  
   
 **Assumptions:**  
1. (write here)  
(write here)  
   
   
 ## 2. User stories and acceptance criteria  
   
\### US-01 — Browse offerings  
   
\*\*US-01:\*\* As a student, I want to browse the electronic course catalog for a selected semester, so that I can view course details, offerings, and available places.  
   
\- \*\*AC-01\*\* (R1): Given a student is viewing the electronic course catalog, When they select a semester, Then the system displays the course code, course title, course offering, and available places.  
\- \*\*AC-02\*\* (R1, R2): Given a course offering has a fixed capacity and current enrollments, When the system displays the offering in the catalog, Then the available places shown equal the capacity minus the current enrollment count.  
   
\### US-02 — Register for an offering  
   
\*\*US-02:\*\* As a student, I want to register for a specific course offering, so that my enrollment is recorded and I receive a confirmation.  
   
\- \*\*AC-03\*\* (R2, R3, R4): Given a student is not already enrolled in the selected offering and at least one place is available, When the student requests registration for that offering, Then the system creates exactly one Enrollment linking the student to the offering, updates available places, and returns a confirmation.  
\- \*\*AC-04\*\* (R2, R5): Given the selected offering has reached its capacity, When the student requests registration, Then the system rejects the request with the explanation "course full", creates no Enrollment, and leaves the enrollment count unchanged.  
   
\### US-03 — Receive a clear rejection  
   
\*\*US-03:\*\* As a student, I want to receive a clear explanation when my registration fails, so that I understand why the request was rejected.  
   
\- \*\*AC-05\*\* (R3, R5): Given a student is already enrolled in the selected offering, When the student requests registration for the same offering again, Then the system rejects the request with the explanation "already enrolled", creates no Enrollment, and leaves the enrollment count unchanged.  
\- \*\*AC-06\*\* (R5): Given a registration request is rejected for any reason, When the system processes the rejection, Then the system ensures no state is changed and the offering's enrollment count remains strictly unchanged.  
   
**3. Sequence diagram**  
 ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAALklEQVR4nO3OMQEAAAjDsIF/z0MGT2qgmbb5bF/vAAAAAAAAAAAAAAAAAAAASQ5AtAM9yMAItAAAAABJRU5ErkJggg==)  
 **Participants:** (write here — each lifeline and what it stands for)  
 **Atomic operation:** (write here — which messages form the one atomic step: the final duplicate check, the capacity check and the creation of the Enrollment, and why a catalog view reserves nothing)  
 **Where the Enrollment is created:** (write here — which message, which lifeline, and which class in section 4 it produces)  
 **Technical lifelines:** (write here — every lifeline that is NOT a class in the class diagram, by name, and why the difference in abstraction is fine. "None" if there are none.)  
 **4. Class diagram**  
 ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAALklEQVR4nO3OMQEAAAjDsIF/z0MGT2qgmbb5bF/vAAAAAAAAAAAAAAAAAAAASQ5AtAM9yMAItAAAAABJRU5ErkJggg==)  
  
|  |  |  |  
| - | - | - |  
|   |    |    |  
| **Association** |  **Read left to right** |  **Read right to left** |  
| (write here) |  (write here) |  (write here) |  
| (write here) |  (write here) |  (write here) |  
| (write here) |  (write here) |  (write here) |  
  
   
   
   
 **How an Enrollment links a student to an offering:** (write here)  
   
 **Capacity constraint:** (write here — and why multiplicity alone cannot express it)  
   
 **Uniqueness constraint:** (write here — and why multiplicity alone cannot express it)  
   
 **5. Traceability**  
  
|  |  |  |  
| - | - | - |  
|   |    |    |  
| **Rule and criterion** |  **Model evidence** |  **Validation case** |  
| R1 + (write here) |  (write here) |  (write here) |  
| R2 + (write here) |  (write here) |  (write here) |  
| R3 + (write here) |  (write here) |  (write here) |  
| R4 + (write here) |  (write here) |  (write here) |  
| R5 + (write here) |  (write here) |  (write here) |  
  
   
   
   
 **6. Walkthroughs**  
  
|  |  |  |  
| - | - | - |  
|   |    |    |  
| **Case** |  **Observed path and state change** |  **Judgment and evidence** |  
| T1. Available |  (write here) |  (write here) |  
| T2. Last place |  (write here) |  (write here) |  
| T3. Full |  (write here) |  (write here) |  
| T4. Duplicate |  (write here) |  (write here) |  
  
   
   
   
 **7. Review decisions**  
  
|  |  |  |  |  
| - | - | - | - |  
|   |    |    |    |  
| **AI suggestion or model element** |  **Decision** |  **Reason** |  **Rule** |  
| (write here) |  (write here) |  (write here) |  (write here) |  
| (write here) |  (write here) |  (write here) |  (write here) |  
| (write here) |  (write here) |  (write here) |  (write here) |  
  
   
   
   
 **8. Modeling explanation**  
   
 (write here)  
   
 **9. Reflection**  
   
 (write here)  
   
 **10. Appendix A — Before AI**  
   
 **Scope:** The system allows authenticated students to browse an electronic course catalog, select a specific course offering for a semester, and register for it, while strictly enforcing capacity limits and preventing duplicate enrollments.  
   
 **Initial assumptions:**  
1. The student is already authenticated in the system before accessing the catalog.  
2. The capacity of a course offering is a fixed positive whole number that does not change during the registration process.  
   
   
   
**11. Appendix B — AI exchanges**  
 **B1 — Requirements (Prompt A)**  
- **Tool:** ChatGPT  
- **Model:** GPT-5.5 Instant  
- **Date:** (write here)  
**Purpose:** draft 3 user stories and 6 acceptance criteria  
 **Prompt:**  
```  
   
```  
Act as a requirements analyst. Use only this course registration scenario and rules R1–R5: A student browses an electronic course catalog, chooses a course offering and requests registration. Each offering has a limited number of places. A Course describes a subject. A CourseOffering is one scheduled section in one semester. Registration always targets a specific offering. Assume that the student is signed in, the selected offering exists, and its capacity is a positive whole number. Exclude payments, prerequisites, timetable clashes, waiting lists and cancellation. Use fictional students and courses. R1. Catalog: Show the course code, title, offering and available places for one semester. R2. Capacity: Recheck current availability when registering. Enrollment must never exceed the offering's capacity. R3. Duplicates: A student may have at most one enrollment in the same offering. Reject a repeat request. R4. Success: Create exactly one Enrollment linking the student and offering, update availability and return a confirmation. R5. Rejection: Explain "course full" or "already enrolled". Create no enrollment and leave the enrollment count unchanged. My initial assumptions are 1. The student is already authenticated in the system before accessing the catalog. 2. The capacity of a course offering is a fixed positive whole number that does not change during the registration process.  
Draft 3 user stories and 2 Given / When / Then acceptance criteria for each. Use IDs US-01 to US-03 and AC-01 to AC-06. Map each criterion to rule IDs.  
Cover normal and rejection behavior. List uncertainty separately. Do not add excluded features or invent university policies.  
   
**Response:**  
# ```  
   
```  
**User Stories and Acceptance Criteria: Course Registration System**  
## **1. User stories**  
US-01 — Browse course catalog  
As a student, I want to browse the electronic course catalog for a selected semester so that I can view course details, available offerings, and the number of available places.  
US-02 — Register for a course offering  
As a student, I want to register for a specific course offering so that my enrollment is recorded and I receive a confirmation if registration succeeds.  
US-03 — Handle rejected registration requests  
As a student, I want to receive a clear explanation when my registration is rejected because the offering is full or I am already enrolled, so that I understand why registration failed.  
## **2. Acceptance criteria**  
### **US-01 — Browse course catalog**  
AC-01 — Display course catalog Mapped rules: R1  
- Given a signed-in student is viewing the electronic course catalog and a semester is selected  
- When the student browses the catalog  
- Then the system displays the course code, course title, course offering, and available places for that semester.  
AC-02 — Display available places accurately Mapped rules: R1, R2  
- Given a course offering has a fixed capacity and a current enrollment count  
- When the system displays the offering in the catalog  
- Then the available places equal the offering's capacity minus its current enrollment count.  
### **US-02 — Register for a course offering**  
AC-03 — Successful registration Mapped rules: R2, R3, R4  
- Given a student is not already enrolled in the selected offering and at least one place is available  
- When the student requests registration for that offering  
- Then the system creates exactly one Enrollment linking the student to that specific offering, updates the available places, and returns a confirmation.  
AC-04 — Enforce capacity during registration Mapped rules: R2, R5  
- Given the selected offering has reached its capacity when registration is processed  
- When the student requests registration  
- Then the system rejects the request with the explanation "course full", creates no Enrollment, and leaves the enrollment count unchanged.  
### **US-03 — Handle rejected registration requests**  
AC-05 — Reject duplicate enrollment Mapped rules: R3, R5  
- Given a student is already enrolled in the selected offering  
- When the student requests registration for the same offering again  
- Then the system rejects the request with the explanation "already enrolled", creates no Enrollment, and leaves the enrollment count unchanged.  
AC-06 — Preserve enrollment count after rejection Mapped rules: R2, R5  
- Given a student requests registration for an offering that is full or in which the student is already enrolled  
- When the system rejects the request  
- Then no Enrollment is created and the enrollment count remains unchanged.  
## **3. Uncertainty and assumptions**  
### **Initial assumptions**  
1. The student is already authenticated before accessing the catalog.  
2. The capacity of a course offering is a fixed positive whole number that does not change during the registration process.  
### **Remaining uncertainty**  
- Semester selection: The scenario does not specify whether the semester is selected manually or supplied by default.  
- Offering display: The exact fields used to identify an offering, such as its section identifier or schedule, are not specified.  
- Availability updates: The scenario requires availability to be updated after successful registration but does not specify whether the catalog refreshes automatically.  
- Concurrent registration: Multiple students may attempt to register for the last available place simultaneously. The implementation must prevent over-enrollment, but the specific concurrency-control mechanism is unspecified.  
- Rejection priority: If an offering is full and the student is already enrolled, the scenario does not specify which rejection message takes priority.  
   
**B2 — UML drafts (Prompt B)**  
- **Tool:** ChatGPT  
- **Model:** GPT-5.5 Instant  
- **Date:** (write here)  
- **Purpose:** draft the sequence and class diagrams  
 **Prompt:**  
```  
(paste here)    
      
   
```  
**Response:**  
```  
(paste here)    
      
   
```  
**B3 — Model critique (Prompt C)**  
- **Tool:** GPT-5.5 Instant  
- **Model:** (GPT-5.5 Instant  
- **Date:** (write here)  
- **Purpose:** review both models against R1–R5 and T1–T4  
 **Prompt:**  
```  
(paste here)    
      
   
```  
**Response:**  
```  
(paste here)    
      
   
```  
**B4 — Focused revision (Prompt D)**  
- **Tool:** GPT-5.5 Instant  
- **Model:** GPT-5.5 Instant  
- **Date:** (write here)  
- **Purpose:** apply my accepted review decisions  
 **Prompt:**  
```  
(paste here)    
      
   
```  
**Response:**  
```  
(paste here)    
      
   
```  
**12. Appendix C — Original diagrams**  
   
 ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAALklEQVR4nO3OMQEAAAjDsIF/z0MGT2qgmbb5bF/vAAAAAAAAAAAAAAAAAAAASQ5AtAM9yMAItAAAAABJRU5ErkJggg==)  
   
 ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAALklEQVR4nO3OMQEAAAjDsIF/z0MGT2qgmbb5bF/vAAAAAAAAAAAAAAAAAAAASQ5AtAM9yMAItAAAAABJRU5ErkJggg==)  
   
 **13. Appendix D — References and source checks**  
   
 **References**  
- (write here)  
 **Source checks**  
  
|  |  |  |  |  
| - | - | - | - |  
|   |    |    |    |  
| **Modeling decision** |  **Source and locator** |  **What the source says** |  **How it supports or changed your model** |  
| (write here) |  (write here) |  (write here) |  (write here) |  
| (write here) |  (write here) |  (write here) |  (write here) |  
  
   
   
