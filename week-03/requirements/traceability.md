**Traceability — use cases → stories → criteria**  
| | | | |  
|-|-|-|-|  
| **Use case** | **Stories (US-nn)** | **Criteria (AC-nn)** | **Gap?** |   
| UC-01 View availability | US-01  | none  | No criteria written yet. |   
| UC-02 Book room | US-02 | AC-01, AC-02, AC-03, AC-04 |   |   
| UC-03 Cancel booking | US-04 | AC-05, AC-06, AC-07 |   |   
| UC-04 Block or unblock room | US-05 | AC-08, AC-09, AC-10 |   |   
| UC-05 Review usage | US-06 | none | No criteria written yet. |   
| UC-06 Send confirmation | US-07  | none | No criteria written yet. |   
   
**Stories that belong to no use case:** US-03  
**What the gaps tell you:** The existence of US-03 shows a missing feature in the system's design — students can book and cancel, but there is no official Use Case for them to view their active reservations to know *what* to cancel. Additionally, testing criteria are heavily concentrated on core actions, leaving monitoring (UC-05) and notifications (UC-06) untested.  
