**SIS #02 — AI-Assisted UML Modeling: University Course Registration**  
   
 **1. Scope and assumptions**  
   
 **Scope:** (write here)  
   
 **Assumptions:**  
1. (write here)  
2. (write here)  
 **2. User stories and acceptance criteria**  
 **US-01 — Browse offerings**  
 **US-01:** (write here — As a student, I want …, so that …)  
- **AC-01** (R?): (write here — Given …, When …, Then …)  
- **AC-02** (R?): (write here)  
 **US-02 — Register for an offering**  
 **US-02:** (write here)  
- **AC-03** (R?): (write here)  
- **AC-04** (R?): (write here)  
 **US-03 — Receive a clear rejection**  
 **US-03:** (write here)  
- **AC-05** (R?): (write here)  
- **AC-06** (R?): (write here)  
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
- **Tool:** (write here)  
- **Model:** (write here)  
- **Date:** (write here)  
- **Purpose:** draft 3 user stories and 6 acceptance criteria  
 **Prompt:**  
```  
(paste here)    
      
   
```  
**Response:**  
```  
(paste here)    
      
   
```  
**B2 — UML drafts (Prompt B)**  
- **Tool:** (write here)  
- **Model:** (write here)  
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
- **Tool:** (write here)  
- **Model:** (write here)  
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
- **Tool:** (write here)  
- **Model:** (write here)  
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
  
   
   
