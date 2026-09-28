**AI Usage Disclosure — Week 03**  
Required by the course academic policy (Generative AI use level **D** — AI-integrated).  
   
 AI use is expected in this lab. You remain responsible for the accuracy, testing and integrity of  
   
 everything you submit, including everything an AI tool produced.  
| | | | |  
|-|-|-|-|  
| **Tool** | **Exact model + version** | **Used for** | **Which files it touched** |   
| ChatGpt | GPT-5.6 Luna — Instant. | You are a requirements analyst. For the Smart Campus study room booking system, identifyStudent and Administrator goals. Write 6 to 8 user stories using: As a [role], I want [goal],so that [reason]. Add a priority and one assumption to each story. Stay within the suppliedscenario. | requirements/user-stories.md |   
| ChatGpt | GPT-5.6 Luna — Instant. | For each selected story, write 3 to 5 acceptance criteria in Given, When, Then form. Include successful behavior, validation, and an error or alternative case. Apply these rules: bookings must be in the future, maximum duration is two hours, rooms cannot overlap, and blocked rooms cannot be booked. List assumptions before the criteria. Selected stories:US-02: As a Student, I want to book an available study room for a specific time, so that I can use the room when I need it.US-04: As a Student, I want to cancel my booking, so that the room becomes available when I no longer need it.US-05: As an Administrator, I want to block or unblock a study room, so that rooms under maintenance cannot be booked by students. | requirements/acceptance-criteria.md |   
| ChatGpt | GPT-5.6 Luna — Instant. | Create PlantUML code for a UML use-case diagram of the Smart Campus study room booking system. Place Student and Administrator outside the system boundary. Include View availability, Book room, Cancel booking, Block or unblock room, Review usage, and Send confirmation. Show only justified actor associations. Use include or extend only when the relationship is clear. Do not model screens, databases, or internal classes. | requirements/use-cases.puml |   
   
**One tool and one model for all three prompts:** yes  
**Did you use AI for anything beyond the three verbatim prompts** — Yes, I used Gemini as a thought partner to review generated stories for scope creep, adapt acceptance criteria to enforce strict business rules (exact 2-hour duration, no overlap), identify missing use cases for the traceability matrix, and structure the final lab report and YAML declaration.  
   
**Everything I submitted, I can explain and defend in class:** yes  
**Anything I accepted from the AI without fully understanding it:**none  
Signed:Shynbulat Kazbek  
 Date:28 September  
