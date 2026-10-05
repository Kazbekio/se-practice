# Approved stories — Smart Campus study room booking  
   
**Source of this set:** my week-03 stories, revised  
   
## Scenario (from the Lesson 04 practice deck, slide 7)  
   
Students view room availability, book a room, and cancel their own bookings. Administrators block  
or unblock rooms and review usage.  
   
- **R1** Future start, with duration greater than 0 and at most 2 hours.  
- **R2** Active bookings for the same room cannot overlap.  
- **R3** A blocked room cannot accept a new booking.  
- **R4** A successful booking produces a confirmation.  
   
## My stories  
   
| ID | Story | Rules |  
| --- | --- | --- |  
| US-01 | As a Student, I want to view available study rooms, so that I can choose a suitable room for studying. | — |  
| US-02 | As a Student, I want to book an available study room for a specific time, so that I can use the room when I need it. | R1, R2, R3, R4 |  
| US-03 | As a Student, I want to view my bookings, so that I can check my upcoming study room reservations. | — |  
| US-04 | As a Student, I want to cancel my booking, so that the room becomes available when I no longer need it. | R2 |  
| US-05 | As an Administrator, I want to block or unblock a study room, so that rooms under maintenance cannot be booked by students. | R3 |  
| US-06 | As an Administrator, I want to review room usage, so that I can monitor how study rooms are being utilized over a period. | — |  
| US-07 | As a Student, I want to receive a confirmation when I book or cancel a room, so that I know my action was successful. | R4 |  
