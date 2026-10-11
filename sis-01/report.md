**SIS #01 — Software Engineering Fundamentals, With an AI in the Loop**  
   
 **Topic:** 1. Software-controlled drones  
   
 ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsSfYxZq/lGeDGMACBrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA7GXBdccwx8KAAAAAElFTkSuQmCC)  
   
 **1. Scenario**  
   
 **Question:** How can a system control 100 drones for a light show without crashing or hurting people?  
   
    
   
 **Users:** Show operators, programmers, and people watching the show (audience).  
   
    
   
 **Problem:** The operators must make 100 drones fly together in the sky to show pictures. The software must not let the drones hit each other or fall on the audience.  
   
    
   
 **Constraints:** The drones can only fly for 15 minutes because of the battery. They must not fly higher than 100 meters.  
   
    
   
 **Risk:** If the Wi-Fi or GPS stops working, the drones can crash into each other and fall on the people below.  
   
    
   
 **Assumptions:** The drones have special sensors to stop crashes (fictional). The software checks the weather and stops the show if there is strong wind (fictional). The audience stays 50 meters away from the flying zone (fictional).  
   
    
   
    
   
 **2. Analysis**  
   
 I think a drone show can be safe if the software does not trust one safety tool only. My answer to the question is simple: use several safety layers, and test them before the show. The scenario has 100 drones, 15 minutes of battery, a 100 meter height limit, and a risk that Wi-Fi or GPS stops working.  
My first engineering decision is to use a geofence, but only as one layer. A geofence is a virtual border, not a wall. The ArduPilot Copter page says the fence will "attempt" to stop the drone, so I cannot be sure it works every time. Also, if the GPS position is lost, the page says the fence can be disabled. For this reason I keep the audience far from the flying zone (50 meters in my fictional assumption) and I test the fence before the show. The size of an extra safety space around the border is not known. I would decide it with tests, not with a guess.  
My second decision is to use different failsafes for different problems. Lost communication and lost GPS are not the same failure. In the ArduPilot Copter documents, lost contact with the ground station can start a configured action, for example land or return home. If the GPS position is not usable, the drone can land instead. So I would choose the action for each failure and test it. This fits my scenario because 100 drones doing the same action at the same time can be dangerous, for example if all of them return to one point.  
There are trade-offs. A central controller makes it easier to plan 100 drones, but if it fails, many drones are affected. Drones that decide more by themselves are less dependent on one computer, but the system is more complex. A bigger distance between drones is safer, but it limits the pictures. Using all 15 minutes of battery for the show gives a longer show, but it leaves no extra energy for wind or an emergency landing. I prefer a shorter show with a battery reserve.  
There is also a social side. People below the show trust the operators. The operators need a clear stop button, and the team must know who is responsible when something goes wrong. Software can reduce risk, but it cannot promise zero accidents.  
   
 **3. Review**  
   
 Prompt B gave me eight main concerns and some extra gaps. I judged each one.  
I accepted that the draft was too sure about safety (concern 1), because software cannot remove all physical risk. I accepted concern 4 about the geofence, but I qualified it: the critique said a geofence depends on how the drone can move, and I found no sentence about this in the page I read. I also accepted concerns 5 and 6, that communication loss and GPS loss need different actions. I qualified concern 2: it suggests a hybrid design, which is a good idea, but I do not have evidence about the drones in my scenario, so I only mention it as a trade-off. I accepted concerns 7 and 8 about battery reserve and simulation. I rejected the advice to check Kazakhstan aviation law, because my scenario is fictional and the assignment is about engineering decisions.  
Source check 1 (verification row 1): I read the ArduPilot "Cylindrical Fence" page. It supports the idea that the fence depends on GPS and only attempts to stop the drone. It does not mention drone momentum, so I qualified the claim.  
Source check 2 (row 2): I read the ArduPilot "GCS Failsafe" page. It supports the difference between lost communication and unusable GPS, and it shows that the action is a setting. I kept the claim but wrote that the action must be chosen and tested.  
Revision 1 (change-log row 1): I changed "prevent drones from leaving" to "one safety layer", with the audience kept far away. Revision 2 (row 2): I changed one general emergency plan to two failsafes.  
One older version of my notes had a 15 meter buffer. I found no source for this number, so I removed it.  
   
 **4. Conclusion**  
   
 I recommend a drone light show with several safety layers: a geofence, an audience area that stays far from the flying zone, different failsafes for lost communication and lost GPS, and a battery reserve for a safe landing. The operators must have a clear way to stop the show.  
The main limitation is that my evidence comes from ArduPilot Copter documents only. They show examples, not the drones in my fictional scenario. I did not test anything myself, so I cannot say what size of safety space around the fence is right, how much battery reserve is needed, or if the failsafe actions are safe for 100 drones at once. These points need simulation and real tests before the show.  
   
 **5. Reflection**  
   
 (write here)  
   
 **6. References**  
- ArduPilot Development Team. "Cylindrical Fence". ArduPilot Copter Documentation. [https://ardupilot.org/copter/docs/common-ac2_simple_geofence.html](https://ardupilot.org/copter/docs/common-ac2_simple_geofence.html "https://ardupilot.org/copter/docs/common-ac2_simple_geofence.html") (accessed 2026-10-10).  
- ArduPilot Development Team. "GCS Failsafe". ArduPilot Copter Documentation. [https://ardupilot.org/copter/docs/gcs-failsafe.html](https://ardupilot.org/copter/docs/gcs-failsafe.html "https://ardupilot.org/copter/docs/gcs-failsafe.html") (accessed 2026-10-10).  
   
   
 **7. Appendix A — Initial outline**  
1. Write a computer program to make the drones fly together.  
2. Set a safe flying zone so drones do not fly away.  
3. Test the drones on a computer before the real show.  
4. Make drones land safely if they lose the GPS signal.  
5. Start the show and check battery levels all the time.  
   
    
 **8. Appendix B — AI exchanges**  
 **B1 — Draft (Prompt A)**  
- **Tool:** ChatGPT  
- **Model:** GPT-5.5 Instant  
- **Date:** 10.10.2026  
**Purpose:** contextual draft  
 **Prompt:**  
   
 Act as a software engineering tutor. Help me analyze topic 1.10: How can a system control 100 drones for a light show without crashing or hurting people? for a first-year-level university assignment.  
   
My scenario is Users: Show operators, programmers, and people watching the show. Problem: The operators must make 100 drones fly together in the sky to show pictures. The software must not let the drones hit each other or fall on the audience. Constraints: The drones can only fly for 15 minutes because of the battery. They must not fly higher than 100 meters. Risk: If the Wi-Fi or GPS stops working, the drones can crash into each other and fall on the people below. My initial ideas are 1. Write a computer program to make the drones fly together. 2. Set a safe flying zone so drones do not fly away. 3. Test the drones on a computer before the real show. 4. Make drones land safely if they lose the GPS signal. 5. Start the show and check battery levels all the time. Draft a 400–500 word explanation using these details.  
   
Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.  
   
    
 **Response:**  
   
 Below is a first-year university-level draft in simple academic English. It uses your scenario and ideas, explains the main software engineering decisions, and separates known facts from assumptions that need verification.  
## **Draft: How Can a System Control 100 Drones for a Light Show Without Crashing or Hurting People?**  
Introduction  
### **Introduction**  
A drone light show uses many drones to create pictures and patterns in the sky. Controlling 100 drones at the same time is a difficult software engineering problem because every drone must follow its planned route while avoiding collisions. The main goal is to create a successful show without putting the audience in danger. The system must also consider battery life, flight height, and communication problems.  
### **System Users and Requirements**  
The main users are show operators, programmers, and people watching the show. Programmers create the software and flight plans. Operators start, monitor, and stop the show. The audience needs a safe viewing area.  
The system has several important requirements. First, the drones must work together to create the planned pictures. Second, they must stay inside a safe flying zone and never exceed the maximum height of 100 meters. Third, each drone must have enough battery power to finish its flight and land safely. Finally, the system must respond to problems such as losing Wi-Fi or GPS signals.  
### **Proposed Software Solutions**  
First, I would develop a central control system that sends flight plans to all 100 drones. Each drone would have a planned position, speed, and flight path. The software should check that the paths do not cross dangerously and maintain a safe distance between drones.  
Second, I would define a virtual flight boundary, also called a geofence. It would prevent drones from leaving the permitted area or flying above 100 meters. The audience area should also be treated as a restricted zone.  
Third, I would test the complete show in a computer simulation before using real drones. Simulation can help programmers identify overlapping routes, timing problems, and possible failures. After simulation, the team should conduct controlled physical tests in a secure area.  
Fourth, the system needs emergency procedures. If GPS or communication fails, a drone should follow a predefined safety procedure. However, automatically landing immediately may not always be safe because the drone could be above people or another drone. The correct action must depend on the drone's position and the type of failure.  
Finally, the operator should monitor battery levels, communication status, and drone positions throughout the show. The system should begin returning or landing drones before their batteries become critically low.  
### **Trade-offs and Risks**  
A central control system makes coordination easier, but a failure in the central controller could affect many drones. Distributed control can reduce dependence on one controller, but it may make coordination more complex. Similarly, strict safety distances reduce collision risks but can limit the number of possible formations. Additional testing and safety equipment increase costs and preparation time, but they can reduce the chance of accidents.  
### **Conclusion**  
A safe drone light show requires more than a program that makes drones fly together. It needs flight planning, safety boundaries, simulation, continuous monitoring, and reliable emergency procedures. The system should be tested under different failure conditions before the public show begins. Safety must be more important than completing the performance.  
## **1. Facts vs. assumptions**  
This distinction is important because a software engineering assignment should not present an untested idea as a proven fact.  
| | |  
|-|-|  
| **Type** | **Statement** |   
| Fact from your scenario | The show uses 100 drones. |   
| Fact from your scenario | Battery life is limited to 15 minutes. |   
| Fact from your scenario | The maximum flight height is 100 meters. |   
| Fact from your scenario | Loss of Wi-Fi or GPS is a possible risk. |   
| Assumption | A central controller can coordinate all 100 drones reliably. |   
| Assumption | Each drone supports geofencing and emergency flight procedures. |   
| Assumption | Computer simulation accurately represents real flight conditions. |   
| Assumption | The drones can maintain safe separation if GPS becomes unavailable. |   
The last assumption is especially important: losing GPS does not automatically mean that a drone can maintain its position accurately. The available backup sensors and control capabilities must be checked.  
## **2. Trade-offs you should explain**  
- Centralized vs. distributed control: A central controller simplifies coordination, but it can become a single point of failure. Distributed control can improve resilience, but coordination is more complex.  
- Safety vs. visual quality: Larger distances between drones improve separation but restrict the shapes and movements that the show can produce.  
- Battery life vs. safety margin: Using most of the 15-minute battery capacity may allow a longer show, but leaves less energy for unexpected delays or emergency landing.  
- Automatic landing vs. holding position: Landing may be unsafe over people, while holding position may be unsafe if positioning data is unreliable. The appropriate response depends on the failure and surroundings.  
## **3. Claims to verify before submitting**  
1. Whether the 15-minute limit includes takeoff, positioning, the performance, and landing.  
2. Whether the 100-meter limit is measured above ground level or from another reference point.  
3. Which backup navigation sensors are available when GPS fails.  
4. How the drones communicate and what happens if the central controller or communication network fails.  
5. What local aviation rules and safety distances apply to public drone shows in Kazakhstan.  
For technical evidence, you can consult the official ArduPilot documentation on geofencing and failsafe behavior: [ArduPilot documentation](https://ardupilot.org/ "https://ardupilot.org/"). Check that the specific guidance applies to the flight controller and hardware used in your scenario.  
Tutor's recommendation: Your strongest point is the combination of simulation, flight boundaries, battery monitoring, and emergency procedures. To make the assignment more convincing, emphasize that a safety system must handle failures, not merely prevent them under normal conditions.  
-   
   
    
 **B2 — Critique (Prompt B)**  
- **Tool:** ChatGPT  
- **Model:** GPT-5.5 Instant  
- **Date:** 10.10.2026  
**Purpose:** critical review of the draft  
 **Prompt:**  
   
 Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.  
For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.  
Question: How can a system control 100 drones for a light show without crashing or hurting people?  
Scenario: Users: Show operators, programmers, and people watching the show (audience). Problem: The operators must make 100 drones fly together in the sky to show pictures. The software must not let the drones hit each other or fall on the audience. Constraints: The drones can only fly for 15 minutes because of the battery. They must not fly higher than 100 meters. Risk: If the Wi-Fi or GPS stops working, the drones can crash into each other and fall on the people below.  
Draft: Below is a first-year university-level draft in simple academic English. It uses your scenario and ideas, explains the main software engineering decisions, and separates known facts from assumptions that need verification.  
Draft: How Can a System Control 100 Drones for a Light Show Without Crashing or Hurting People?  
Introduction  
A drone light show uses many drones to create pictures and patterns in the sky. Controlling 100 drones at the same time is a difficult software engineering problem because every drone must follow its planned route while avoiding collisions. The main goal is to create a successful show without putting the audience in danger. The system must also consider battery life, flight height, and communication problems.  
System Users and Requirements  
The main users are show operators, programmers, and people watching the show. Programmers create the software and flight plans. Operators start, monitor, and stop the show. The audience needs a safe viewing area.  
The system has several important requirements. First, the drones must work together to create the planned pictures. Second, they must stay inside a safe flying zone and never exceed the maximum height of 100 meters. Third, each drone must have enough battery power to finish its flight and land safely. Finally, the system must respond to problems such as losing Wi-Fi or GPS signals.  
Proposed Software Solutions  
First, I would develop a central control system that sends flight plans to all 100 drones. Each drone would have a planned position, speed, and flight path. The software should check that the paths do not cross dangerously and maintain a safe distance between drones.  
Second, I would define a virtual flight boundary, also called a geofence. It would prevent drones from leaving the permitted area or flying above 100 meters. The audience area should also be treated as a restricted zone.  
Third, I would test the complete show in a computer simulation before using real drones. Simulation can help programmers identify overlapping routes, timing problems, and possible failures. After simulation, the team should conduct controlled physical tests in a secure area.  
Fourth, the system needs emergency procedures. If GPS or communication fails, a drone should follow a predefined safety procedure. However, automatically landing immediately may not always be safe because the drone could be above people or another drone. The correct action must depend on the drone's position and the type of failure.  
Finally, the operator should monitor battery levels, communication status, and drone positions throughout the show. The system should begin returning or landing drones before their batteries become critically low.  
Trade-offs and Risks  
A central control system makes coordination easier, but a failure in the central controller could affect many drones. Distributed control can reduce dependence on one controller, but it may make coordination more complex. Similarly, strict safety distances reduce collision risks but can limit the number of possible formations. Additional testing and safety equipment increase costs and preparation time, but they can reduce the chance of accidents.  
Conclusion  
A safe drone light show requires more than a program that makes drones fly together. It needs flight planning, safety boundaries, simulation, continuous monitoring, and reliable emergency procedures. The system should be tested under different failure conditions before the public show begins. Safety must be more important than completing the performance.  
1. Facts vs. assumptions  
This distinction is important because a software engineering assignment should not present an untested idea as a proven fact.  
TypeStatementFact from your scenarioThe show uses 100 drones.Fact from your scenarioBattery life is limited to 15 minutes.Fact from your scenarioThe maximum flight height is 100 meters.Fact from your scenarioLoss of Wi-Fi or GPS is a possible risk.AssumptionA central controller can coordinate all 100 drones reliably.AssumptionEach drone supports geofencing and emergency flight procedures.AssumptionComputer simulation accurately represents real flight conditions.AssumptionThe drones can maintain safe separation if GPS becomes unavailable.  
The last assumption is especially important: losing GPS does not automatically mean that a drone can maintain its position accurately. The available backup sensors and control capabilities must be checked.  
2. Trade-offs you should explain  
- Centralized vs. distributed control: A central controller simplifies coordination, but it can become a single point of failure. Distributed control can improve resilience, but coordination is more complex.  
- Safety vs. visual quality: Larger distances between drones improve separation but restrict the shapes and movements that the show can produce.  
- Battery life vs. safety margin: Using most of the 15-minute battery capacity may allow a longer show, but leaves less energy for unexpected delays or emergency landing.  
- Automatic landing vs. holding position: Landing may be unsafe over people, while holding position may be unsafe if positioning data is unreliable. The appropriate response depends on the failure and surroundings.  
3. Claims to verify before submitting  
1. Whether the 15-minute limit includes takeoff, positioning, the performance, and landing.  
2. Whether the 100-meter limit is measured above ground level or from another reference point.  
3. Which backup navigation sensors are available when GPS fails.  
4. How the drones communicate and what happens if the central controller or communication network fails.  
5. What local aviation rules and safety distances apply to public drone shows in Kazakhstan.  
For technical evidence, you can consult the official ArduPilot documentation on geofencing and failsafe behavior: ArduPilot documentation. Check that the specific guidance applies to the flight controller and hardware used in your scenario.  
Tutor's recommendation: Your strongest point is the combination of simulation, flight boundaries, battery monitoring, and emergency procedures. To make the assignment more convincing, emphasize that a safety system must handle failures, not merely prevent them under normal conditions.  
   
    
 **Response:**  
   
 **Critical review of the drone light show draft**  
## **Overall assessment**  
The draft is a good starting point for a first-year software engineering assignment. It addresses the main users, constraints, risks, proposed solutions, and trade-offs. However, its main weakness is that it lists safety measures without always explaining how they work together or what happens when they fail.  
The most important improvement is to move from “the system should be safe” to specific, testable requirements: how separation is maintained, when a show must stop, how battery reserves are protected, and what happens when GPS or communication is lost.  
I would review it across five areas: correctness, missing reasoning, vague requirements, unsupported assumptions, and alignment with the assignment.  
## **1. Detailed concerns**  
Each item includes the problem, why it matters, how to verify it, and a counterexample or alternative interpretation.  
Concern 1 — The draft may imply that software can guarantee zero accidents  
Accuracy  
Draft: “The software must not let the drones hit each other” and “Safety must be more important than completing the performance.”  
Why it matters: The first statement describes the desired outcome, not something software can guarantee. Sensors can be inaccurate, motors can fail, and unexpected wind can affect flight. Even correctly designed software cannot eliminate every physical risk.  
How to check: Look for the system's safety requirements, known failure modes, test results, and acceptable risk criteria. Ask whether the system is designed to prevent all foreseeable collisions, detect dangerous conditions, and reduce harm when prevention fails.  
Counterexample: Two drones may follow their programmed routes correctly, but a sudden gust pushes one off its expected path. Collision avoidance must account for deviations, not just the planned routes.  
Recommended improvement: Describe the objective as minimizing collision and injury risks through prevention, detection, and emergency response.  
Concern 2 — Centralized control is proposed without explaining its failure behavior  
Architecture  
Draft: “I would develop a central control system that sends flight plans to all 100 drones.”  
Why it matters: This explains how the show can be coordinated, but not whether the system continues safely if the controller stops working. It also does not explain whether drones can execute their plans independently after takeoff.  
How to check: Establish whether flight plans are stored onboard, whether the controller sends continuous commands or occasional updates, and whether there is a backup controller. Test the loss of the controller during a simulated show.  
Counterexample: If the controller fails halfway through the show, all 100 drones might stop receiving updates. Alternatively, if each drone stores its full plan and has onboard navigation, some may continue flying safely. Neither behavior should be assumed without testing.  
Alternative interpretation: Centralized coordination and onboard autonomous control can work together. The draft presents centralized and distributed control as alternatives, but a hybrid design may be more appropriate.  
Concern 3 — Collision avoidance is described too vaguely  
Missing reasoning  
Draft: “The software should check that the paths do not cross dangerously and maintain a safe distance between drones.”  
Why it matters: Two paths can cross at different times without a collision, while two paths that appear separate on a map may become dangerous if a drone moves unexpectedly. The draft does not define how the software checks separation or reacts to a deviation.  
How to check: Find out whether the planner checks the drones' three-dimensional positions over time, their speeds, and their expected position errors. Determine how minimum separation is selected and what happens when a drone deviates from its assigned path.  
Counterexample: Drone A crosses a point at 10:00:05 and drone B crosses the same point at 10:00:08. Their paths intersect geometrically, but they may not collide. However, if drone A slows down unexpectedly, the timing may become unsafe.  
Alternative interpretation: Preplanned routes may be enough under normal conditions, but dynamic collision detection or coordinated replanning may be needed when actual flight differs from the plan. The appropriate method depends on the drone hardware and system design.  
Concern 4 — The geofence is treated as if it can prevent every boundary violation  
Unsupported assumption  
Draft: “It would prevent drones from leaving the permitted area or flying above 100 meters.”  
Why it matters: A geofence is a virtual boundary enforced by a flight-control system. Its effectiveness depends on positioning accuracy, configuration, available flight-control functions, and the drone's ability to maneuver. It is not a physical barrier.  
ArduPilot's documentation describes configurable fence boundaries and breach actions, and notes that a moving aircraft needs room to respond. Those details illustrate why a boundary alone is not a guarantee.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE/ElEQVR4nK2Xb0yVZRjGf88RPQeO4zCBBRwUtMCQFCSVWmYuNWlCBkqERZgHhCBJmh/60NZqa3Mu8j8KCDVEicSmS0VNQ2ergboCW+iWCMjhsJ2DCZuc9wzY0wcGeHxf/qhcn97d1/Pc1/Xee97nvl8hpZSMAyklLpeL2stXOHf+As137tDd04PdbgfA398fk7c3c2bPJm71KpYvW4reYECMlxgQYxmQgMPu4Juduzlz9jyKokwgJRgMBhLXJrAlJxt/f78nM6AoCkUlZRQdKqWvr39CwlpGsjdbyMrYhIeHx8QN3L/fTUZ2Lg2NN55I+FHELlnMvl0F+PiYxjfw7+1mLFk5dHTYJkV8CKGhsygvLSEwMGB0A3a7g4SkZLq67k2q+IiJEI4dPexWCd3Qg6IoWLJy3MSjoxaQlWlhXsTzCDGRMz0IIQRzw8PIyrQQu2TxcLylpZWM7FxcLpe7ASklBTv30HTzlluStPdS2Zafx8njVZQWFxIaGoIQAiEERqMXc8PDiI5agNHoNRw3m4MoLS7k1IlqtuXnkbEp3c1cQ+MNikrKRnSklLK17S5vJrztdtqFEJyormReRMRwzOVycbu5GXOQGZPJ2y1xd3cP1g6rimttu8vKuHi3tUajFxdqTuHn54tOSsme/Qcm9Knp9XrmRUSoxAFMJm9Nrq+vT7X2wYNeig8NVkHncrmoOXtOU/B2c8u4psZDu9WqGf/x+E8MDAygq718RfPtfX1nsGzpK09t4KUlizEHBanivb1OGm/8je5i7SUVKYTgk49zNEv9uDAYDHy6dYsqLqXkYu1ldC0trSpy6lQPEtcmPLX4EN5Y+ToGg0EVv3nrFjq7w6EivL290ev1k2ZAr9cza2awKm6zdaK7d+8/FTF9+vRJEx+Cp6enKtZutY7chA9jqM9PJrQqDaDznTFDFeztddLd3TNp4i6XS/OlfHx80Pn5+Wpu+qOuftIM1F+7rvmpzwwORhcTHaUipJRUHP1hUsSllBQf+k6Ti45agC4mZqEmWVd/le/Ljzy1eGXVMerqr6o4IQSLXlyIcDqdMnbpcnp7nSMkg/MgwNa83DFHqtHQ39/PwZJSdu8t1OT9/Hy59EsNOoPBQMr6dcNEakoyX37xOWbz4PW5a89+VsTFs/9gMXa7g7GGaCklNlsn+w4UsSIuflRxgPVJiej1+sF2bLN1siJuDX19/RiNXuwq2EFkRATJqWlYOzrcNi5/7VVKDuzTFM/f9hmna86OWRkYvBN+PXd6sB0DBAYGkJ2ZAQy2yty8fJyKQuHebzEavYY3CiH44P0NmkmFEGRa0jW5R9dlb7Yw9PUNz4SKopCQlExLSxsA6xLXsv3rr/jzrwau/PY7ACaTiXffWTfqNa0oCvNjYsc0MDc8jONVR4ZzuA2lNlsnSSkbcDi6mDZtKgU7trN61Yph5+NBSklk9KJRhxuzOYjqygoevnvUY3nzHdI2WnA4ugAID3uO+S9EEhQYCEDuR5uZMmXKqAbCI6NHFS8vK1E1Jc0fk9a2dtItmVit7gdQCEFT4/XHMiCAkNAQDpeVEBDwjGqPZjMKmRXMyeoqUlOSH2scHxgYUBn+MD2N6soKTXEY5+cU4J+mJsorKvn59BmEgIZrdWNWIGrRywwM9PNW/BoyNm3k2TmzxzQ9roEhOBxd9DqdmoPFw2i7246XpyejNblH8T/nXAAi1QR7AQAAAABJRU5ErkJggg==)  
GitHub  
+1  
How to check: Verify that the selected autopilot supports the required horizontal and altitude limits, that the fence is enabled, and that the chosen response works on the actual drone. Test boundary breaches under controlled conditions.  
Counterexample: A drone detects that it has crossed a boundary but has enough momentum to continue beyond it before turning back.  
Alternative interpretation: A geofence is one safety layer. A restricted audience area, a buffer zone, route planning, and an appropriate breach response are additional layers. The draft should distinguish the 100-meter ceiling from the horizontal flight boundary.  
Concern 5 — Wi-Fi and GPS failures are treated too similarly  
Technical accuracy  
Draft: “If GPS or communication fails, a drone should follow a predefined safety procedure.”  
Why it matters: These are different failures. GPS loss affects positioning and navigation, while communication loss affects the drone's ability to receive commands or exchange status information. A drone may lose one while retaining the other.  
How to check: Read the flight controller's documentation for communication-loss and GPS-loss behavior separately. Identify which sensors remain available, how quickly a failure is detected, and whether the aircraft can maintain stable flight without GPS.  
Counterexample: If Wi-Fi is lost but the drone has a complete flight plan stored onboard, it might continue safely. If GPS becomes unreliable while communication remains available, the controller may still receive updates but lack trustworthy position data.  
Alternative interpretation: Wi-Fi may be the assumed communication method in the assignment, but a real show may use another radio link or network architecture. The exact communication technology should be verified rather than treated as universal.  
Concern 6 — The emergency landing procedure is not specific enough  
Missing reasoning  
Draft: “The correct action must depend on the drone's position and the type of failure.”  
Why it matters: This is a sensible principle, but it leaves the most important design question unanswered: what should the drone actually do? Landing immediately, holding position, returning home, and continuing a stored route each have different risks.  
How to check: Review the possible emergency states and define the conditions for each response. Check whether the drone can determine a safe landing location and whether that location remains safe if several drones need to land at once.  
Counterexample: A drone loses GPS directly above the audience. An immediate descent could create an injury risk. But returning to a home point using unreliable position data could be dangerous too.  
Alternative interpretation: The system may need different procedures for loss of GPS, loss of communication, low battery, and motor failure, rather than a single universal failsafe.  
ArduPilot's documentation illustrates that failsafe actions depend on the vehicle and its configuration; it should not be assumed to describe the hardware in this scenario.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADPElEQVR4nO2WTUwcZRiAn4Fl2YW6i20pP4kHa7KlJUDEPzhoGoOhWjfE2qRKS22oiSYSrx5cSxO5Gg+mDWkTNrrEGONVQoi9eUYxJtra1u1W27L8zLcLOzv/nwfcoVMWtUjCZd/T/LzzPs+8eWe+T4kdaJPsYFTtJLwiUBGoCAAEtvqgbhgsLCwC0Ni4l1BtLQBF3eZuzvLydgUhUlfl3d8WAZET9Pf18d7ICAATE0mmZ2bIay5vvtrNu4NPerm37tp8PX2Dr779nv1N4f8vIITg8AvPMz4+jmlaBIM1NEQj3L5T4OyJZ7l4rhkKU15+ZwvED7fzSm8/gx/OEGsO+eo91AyU4MlkEk3TsO31Vg8OdHL548dwxSz5lTD5lTCWUYtrSdyln3kjLhjoaaCo21sTuB9umhaBQA0AUkqyqkHq/KNQ+IFb93YR7blJ9KXb7H9tnoJRB4CymuFITz2u9Df9PwmoD8AXF7N8OZnyJAAcM+sr2xyx+DOT5/c7Qe9qOKhsqP2vM6AKwXPPPO2DH40PcPzYMYLBGqR8YDFVoLd3LwPxozQ9otMRu4G0BFLC3HWTKsX2Yf9RoARPfZFC0zSEUOnrf5lMOo2iKJim5RNwLYkCdD/u8MHrU7hFBfn3mPxyNcSn3/xBrNWP3FTgfrhtWwihcvrMEFdmpmlpaQVA0zRKfFk0cahCLzhICeZi9ZqUG+DKrMM7n9zbAN9UIL9apLuri+TEhAcfGXmf1OeTRKMNaJoGQC4niEQaAKhxXABCrsvFqWW+m1373OaXi6ya8ETzxn9AWYH8apGu9jYmJ1PkcgIpJUNvnaKzo5tLly57eW0dTxE/8uLGGQBw18s27Q7TVBZdRkA3DB9cVQUnh07z27VrzP30K7pW8HJPnRyktXHt7ZeWF/hxLg8ozOeLKMYKS0vld3p79uz2nSulPaFuGByMxbhw4TMAVFWQSHzE8NnhTe0LhqS+VvGOS1G6Vi7ODL/tWzuU2IE2qRsGHe2HOD86iu04AIyNjZFIJAhUV29abCthOw6j50ZJZzLrArDWgUw6DUCorp59+xrJZhd8bd+OKNX2dWBbCQ8ZO74hqQhUBCoCOy7wFzNHed0WELW1AAAAAElFTkSuQmCC)  
Plane documentation  
+1  
Concern 7 — Battery monitoring has no measurable safety margin  
Incomplete requirement  
Draft: “The system should begin returning or landing drones before their batteries become critically low.”  
Why it matters: The 15-minute limit is a hard constraint from your scenario, but “before critically low” is vague. The system needs to reserve sufficient energy for the planned flight, return or diversion, and landing. Battery percentages alone may not predict the remaining flight time accurately.  
How to check: Establish the expected energy consumption for takeoff, the show, and landing. Check manufacturer guidance and test results under representative flight conditions. Determine what reserve is required and what action occurs when the reserve threshold is reached.  
Counterexample: A drone starts landing at minute 14, but the battery cannot sustain the remaining flight and descent. Another drone may use more power because of wind or repeated position corrections and reach its threshold earlier.  
Alternative interpretation: Fifteen minutes might be the maximum advertised flight time rather than a guaranteed safe operating duration. The assignment must clarify whether the limit includes takeoff and landing.  
Concern 8 — Simulation and physical testing are mentioned without defining their coverage  
Verification  
Draft: “Simulation can help programmers identify overlapping routes, timing problems, and possible failures.”  
Why it matters: This is reasonable, but it may imply that a successful simulation demonstrates that the show is safe. A simulation only tests the conditions and models included in it. It may not represent real sensor errors, wind, battery variation, or hardware faults accurately.  
How to check: Review the test plan. Does it include GPS loss, communication loss, delayed messages, low battery, controller failure, and unexpected deviations? Are the simulation assumptions validated against physical tests?  
Counterexample: The simulated drones fly perfectly because the model assumes exact position measurements. In the real show, small positioning errors accumulate and reduce the distance between two drones.  
Alternative interpretation: Simulation is a useful early verification step, not a replacement for hardware testing, controlled flight tests, and operational safety checks.  
## **2. Additional gaps in the reasoning**  
These concerns are less about technical errors and more about what a strong software engineering explanation should include.  
| | | |  
|-|-|-|  
| **Concern** | **Why it matters** | **How to check it / counterexample** |   
| Audience protection is underspecified | Calling the audience area “restricted” does not explain how the system prevents drones from entering it or what happens if a drone falls. | Define the audience exclusion zone, separation buffer, and safe landing or recovery areas. Counterexample: a drone stays inside the flight boundary but loses power directly above spectators. |   
| The 100-meter limit is ambiguous | The altitude reference is not specified. Height above ground is different from altitude above sea level. | Check the assignment or applicable flight rules for the intended reference. Specify the measurement method. |   
| The operator's role is vague | “Monitor” does not explain what information the operator sees or which decisions they can make. | Identify the alerts, emergency-stop or abort capability, and procedures for responding to failures. Counterexample: the system detects a dangerous condition but only displays a small warning that the operator misses. |   
| The system's behavior when several drones fail is missing | A response suitable for one drone might become dangerous when many drones execute it at once. | Simulate simultaneous failures. Counterexample: all 100 drones attempt to return to the same home point, creating congestion. |   
| The trade-off section is not tied to a decision | The draft describes competing options but does not explain which approach it recommends or under what conditions. | Compare alternatives against safety, reliability, complexity, and cost. A hybrid architecture may offer better resilience than relying entirely on one controller or fully independent drones. |   
| There is no explicit acceptance test | The draft says the system must be safe but does not say what evidence would demonstrate that it meets its requirements. | Define measurable tests, such as verifying the configured altitude ceiling, checking planned separation, and confirming the required response to simulated communication loss. Avoid claiming that passing a finite set of tests proves zero risk. |   
## **3. Claims and assumptions that need verification**  
The draft's final checklist is useful, but these are the highest-priority questions to resolve before presenting the design as technically sound.  
Priority 1: Confirm the flight constraints  
Establish how the 15-minute battery limit is defined, how altitude is measured, and whether the flight plan includes time for takeoff and landing.  
Priority 2: Confirm emergency capabilities  
Determine what the actual flight controller can do when GPS, communication, or battery power becomes unreliable. Do not assume that every drone supports the same failsafe behavior.  
Priority 3: Verify collision and audience protection  
Check how the system calculates separation, handles position errors, excludes spectators from the flight area, and responds to a drone that cannot follow its planned route.  
Priority 4: Verify the applicable rules  
Check current Kazakhstan aviation requirements and any applicable local restrictions for unmanned aircraft, flight altitude, and public events. The scenario's 100-meter limit should not be assumed to represent the complete legal requirements.  
## **4. Is the draft appropriate for a first-year assignment?**  
Yes, with several qualifications.  
- Strength: It is organized logically and uses accessible English.  
- Strength: It covers both functional goals (creating pictures) and safety-related requirements.  
- Weakness: Several requirements are expressed as intentions rather than measurable conditions.  
- Weakness: The proposed control architecture is not justified by comparing its alternatives.  
- Weakness: Emergency behavior is discussed, but the draft does not define the decision logic behind it.  
- Presentation issue: The introductory sentence about the draft, the facts-versus-assumptions table, and the tutor's recommendation are explanatory notes, not part of the 400–500-word essay. They should be kept separate if that word limit applies to the submitted answer.  
One additional point: the ArduPilot documentation is a useful technical starting point, but it describes particular autopilot software and vehicle configurations. It is not, by itself, evidence that the proposed 100-drone system would work as described.  
## **5. Final verdict**  
The draft is conceptually sound, but its safety argument needs stronger reasoning. The three most important changes to make in a later revision are:  
1. Explain how the drones maintain separation, rather than merely stating that they should.  
2. Specify what happens during each major failure, especially when GPS or communication is lost.  
3. Turn broad safety goals into testable requirements, including battery reserves, altitude limits, audience exclusion, and emergency behavior.  
The central engineering lesson is that safe coordination requires more than 100 correct flight plans. The system must also cope with uncertainty, unexpected failures, and the possibility that its normal control mechanisms stop working.  
   
    
 **B3 — Revision (Prompt C)**  
- **Tool:** ChatGPT  
- **Model:** GPT-5.5 Instant  
- **Date:** 10.10.2026  
**Purpose:** revision using my decisions and verified evidence  
 **Prompt:**  
   
 Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.  
My decisions: I accepted the critique that geofences are not physical barriers and need a buffer zone. I also accepted that GPS loss and Wi-Fi loss are distinct failures requiring different emergency responses.  
 Verified evidence: 1. ArduPilot Copter Docs (Cylindrical Fence) states a geofence relies on GPS and drones carry momentum, so they will temporarily cross the boundary before stopping. 2. ArduPilot Copter Docs (Failsafe) explicitly separates communication loss (triggers Return-to-Launch) from GPS loss (forces altitude-hold or landing).  
 Draft: Below is a first-year university-level draft in simple academic English. It uses your scenario and ideas, explains the main software engineering decisions, and separates known facts from assumptions that need verification.  
## **Draft: How Can a System Control 100 Drones for a Light Show Without Crashing or Hurting People?**  
Introduction  
### **Introduction**  
A drone light show uses many drones to create pictures and patterns in the sky. Controlling 100 drones at the same time is a difficult software engineering problem because every drone must follow its planned route while avoiding collisions. The main goal is to create a successful show without putting the audience in danger. The system must also consider battery life, flight height, and communication problems.  
### **System Users and Requirements**  
The main users are show operators, programmers, and people watching the show. Programmers create the software and flight plans. Operators start, monitor, and stop the show. The audience needs a safe viewing area.  
The system has several important requirements. First, the drones must work together to create the planned pictures. Second, they must stay inside a safe flying zone and never exceed the maximum height of 100 meters. Third, each drone must have enough battery power to finish its flight and land safely. Finally, the system must respond to problems such as losing Wi-Fi or GPS signals.  
### **Proposed Software Solutions**  
First, I would develop a central control system that sends flight plans to all 100 drones. Each drone would have a planned position, speed, and flight path. The software should check that the paths do not cross dangerously and maintain a safe distance between drones.  
Second, I would define a virtual flight boundary, also called a geofence. It would prevent drones from leaving the permitted area or flying above 100 meters. The audience area should also be treated as a restricted zone.  
Third, I would test the complete show in a computer simulation before using real drones. Simulation can help programmers identify overlapping routes, timing problems, and possible failures. After simulation, the team should conduct controlled physical tests in a secure area.  
Fourth, the system needs emergency procedures. If GPS or communication fails, a drone should follow a predefined safety procedure. However, automatically landing immediately may not always be safe because the drone could be above people or another drone. The correct action must depend on the drone's position and the type of failure.  
Finally, the operator should monitor battery levels, communication status, and drone positions throughout the show. The system should begin returning or landing drones before their batteries become critically low.  
### **Trade-offs and Risks**  
A central control system makes coordination easier, but a failure in the central controller could affect many drones. Distributed control can reduce dependence on one controller, but it may make coordination more complex. Similarly, strict safety distances reduce collision risks but can limit the number of possible formations. Additional testing and safety equipment increase costs and preparation time, but they can reduce the chance of accidents.  
### **Conclusion**  
A safe drone light show requires more than a program that makes drones fly together. It needs flight planning, safety boundaries, simulation, continuous monitoring, and reliable emergency procedures. The system should be tested under different failure conditions before the public show begins. Safety must be more important than completing the performance.  
## **1. Facts vs. assumptions**  
This distinction is important because a software engineering assignment should not present an untested idea as a proven fact.  
| | |  
|-|-|  
| **Type** | **Statement** |   
| Fact from your scenario | The show uses 100 drones. |   
| Fact from your scenario | Battery life is limited to 15 minutes. |   
| Fact from your scenario | The maximum flight height is 100 meters. |   
| Fact from your scenario | Loss of Wi-Fi or GPS is a possible risk. |   
| Assumption | A central controller can coordinate all 100 drones reliably. |   
| Assumption | Each drone supports geofencing and emergency flight procedures. |   
| Assumption | Computer simulation accurately represents real flight conditions. |   
| Assumption | The drones can maintain safe separation if GPS becomes unavailable. |   
The last assumption is especially important: losing GPS does not automatically mean that a drone can maintain its position accurately. The available backup sensors and control capabilities must be checked.  
## **2. Trade-offs you should explain**  
- Centralized vs. distributed control: A central controller simplifies coordination, but it can become a single point of failure. Distributed control can improve resilience, but coordination is more complex.  
- Safety vs. visual quality: Larger distances between drones improve separation but restrict the shapes and movements that the show can produce.  
- Battery life vs. safety margin: Using most of the 15-minute battery capacity may allow a longer show, but leaves less energy for unexpected delays or emergency landing.  
- Automatic landing vs. holding position: Landing may be unsafe over people, while holding position may be unsafe if positioning data is unreliable. The appropriate response depends on the failure and surroundings.  
## **3. Claims to verify before submitting**  
1. Whether the 15-minute limit includes takeoff, positioning, the performance, and landing.  
2. Whether the 100-meter limit is measured above ground level or from another reference point.  
3. Which backup navigation sensors are available when GPS fails.  
4. How the drones communicate and what happens if the central controller or communication network fails.  
5. What local aviation rules and safety distances apply to public drone shows in Kazakhstan.  
For technical evidence, you can consult the official ArduPilot documentation on geofencing and failsafe behavior: [ArduPilot documentation](https://ardupilot.org/ "https://ardupilot.org/"). Check that the specific guidance applies to the flight controller and hardware used in your scenario.  
Tutor's recommendation: Your strongest point is the combination of simulation, flight boundaries, battery monitoring, and emergency procedures. To make the assignment more convincing, emphasize that a safety system must handle failures, not merely prevent them under normal conditions.  
Show what you changed and why. Use only the sources I supplied. Flag remaining gaps instead of inventing details.  
   
    
 **Response:**  
   
 I’ll keep the main essay at a first-year university level and separate it from the supporting analysis. The revision will incorporate your two decisions: a geofence needs a buffer because drones have momentum, and GPS loss must be handled differently from communication loss. I’ll use only the ArduPilot evidence you supplied and will not treat its documented behavior as a guarantee for every drone system.  
## **Revised draft (approximately 470 words)**  
How Can a System Control 100 Drones for a Light Show Without Crashing or Hurting People?  
# **How Can a System Control 100 Drones for a Light Show Without Crashing or Hurting People?**  
### **Introduction**  
A drone light show uses many drones to create pictures and patterns in the sky. Controlling 100 drones at the same time is a challenging software engineering problem because the drones must follow planned routes without colliding or endangering the audience. The system must consider three main constraints: a maximum flight time of 15 minutes, a maximum height of 100 meters, and possible GPS or communication failures.  
### **System Users and Requirements**  
The main users are show operators, programmers, and the audience. Programmers prepare the software and flight plans. Operators start, monitor, and stop the show. The audience needs a safe viewing area.  
The system must coordinate all 100 drones, maintain safe distances between them, stay within the permitted flight area, and manage battery power. It must also respond safely when navigation or communication systems fail.  
### **Proposed Software Solutions**  
First, I would use a central control system to coordinate the flight plans. Each drone would have a planned position, speed, and route. The software should check the drones' positions over time to reduce collision risks. However, the system must also consider unexpected movement and controller failure.  
Second, I would use a geofence, which is a virtual boundary around the permitted flight area. The system should include a buffer zone around the boundary and keep the audience outside the flight area. According to the ArduPilot Copter documentation on Cylindrical Fence, geofencing relies on GPS, and a moving drone may cross the boundary temporarily because it has momentum. Therefore, a geofence cannot guarantee that a drone will stop exactly at the boundary.  
Third, I would test the flight plans in a computer simulation before conducting controlled physical tests in a secure area. Testing should include overlapping routes, communication failures, GPS loss, and low battery conditions. Simulation can reveal problems, but it cannot prove that every real flight will be safe.  
Fourth, the system needs different emergency procedures for different failures. The ArduPilot Copter Failsafe documentation distinguishes communication loss from GPS loss. Its documented behavior includes Return-to-Launch for communication loss and altitude-hold or landing responses for GPS loss. These responses depend on the relevant flight-controller configuration and may not apply to every drone. The actual system must be tested to confirm that its emergency actions are suitable and safe.  
Finally, the operator should monitor battery levels, drone positions, and communication status throughout the show. The system should reserve enough battery power for safe recovery and landing rather than using the entire 15-minute limit for the performance.  
### **Trade-offs and Conclusion**  
Centralized control simplifies coordination but creates a possible single point of failure. Distributed control may improve resilience but increases complexity. Larger separation distances improve safety but limit some formations. Additional testing also costs time and money.  
In conclusion, a safe drone light show needs coordinated flight planning, geofencing with a buffer zone, battery monitoring, testing, and failure-specific emergency procedures. The goal is not to promise zero accidents, but to reduce risks and protect the audience even when problems occur.  
## **What I changed and why**  
| | |  
|-|-|  
| **Change** | **Reason** |   
| Replaced “the geofence would prevent drones from leaving” with an explanation of its limitations. | Your supplied Cylindrical Fence evidence says GPS dependence and momentum can cause temporary boundary crossings. |   
| Added a buffer zone and a restricted audience area. | The drone needs space to respond before reaching the boundary; the virtual boundary alone is insufficient. |   
| Separated GPS loss from communication loss. | Your supplied Failsafe documentation describes different responses to these failures. |   
| Qualified the ArduPilot failsafe behavior. | The documented behavior should not be assumed to apply identically to every drone or configuration. |   
| Added unexpected movement and controller failure to the discussion. | Following a planned route does not guarantee safe separation if a drone deviates or control is lost. |   
| Clarified that simulation cannot prove complete real-world safety. | A simulation only tests the conditions represented in its model. |   
| Changed the battery requirement to include recovery and landing reserves. | The 15-minute limit should not automatically be treated as 15 minutes available for the show itself. |   
| Replaced the promise of safety with the goal of reducing risk. | Software can reduce hazards, but an absolute guarantee of zero accidents is unsupported. |   
## **Remaining gaps to flag**  
These points still require evidence or design decisions. I have deliberately not invented answers.  
1. Buffer-zone size: The source supports the need for a buffer but does not establish a suitable distance for this particular drone fleet.  
2. GPS-loss behavior: If the geofence relies on GPS, its effectiveness may be reduced when GPS is lost. The system's alternative positioning capabilities remain unknown.  
3. Return-to-Launch safety: Returning to a launch point is not automatically safe if the route passes near other drones or over the audience.  
4. Altitude measurement: The scenario specifies 100 meters but does not state the reference used to measure that height.  
5. Battery reserve: The necessary reserve cannot be determined from the 15-minute limit alone.  
6. Controller failure: The draft identifies the risk but does not establish whether the drones can continue safely if the central controller fails.  
7. Collision avoidance: The minimum safe distance, detection method, and response to unexpected movement still need to be defined.  
Final recommendation: Keep the revised essay as the main submission if your assignment requires only a 400–500-word explanation. Keep the change log and remaining gaps as your preparation notes unless your instructor also requests a critical evaluation. The most important technical distinction is that a geofence, a communication failsafe, and a GPS-loss response solve different problems; none should be presented as a complete safety solution on its own.  
-   
   
    
 **9. Appendix C — Evidence tables**  
 **Verification table**  
   
   
| | | | |  
|-|-|-|-|  
| **AI claim** | **Source and locator** | **Evidence found** | **Decision** |   
| A geofence is a virtual boundary enforced by a flight-control system. Its effectiveness depends on positioning accuracy, configuration, available flight-control functions, and the drone's ability to maneuver. (Prompt B, concern 4) | ArduPilot Copter docs, "Cylindrical Fence", bullet list at the end of the page, [https://ardupilot.org/copter/docs/common-ac2_simple_geofence.html](https://ardupilot.org/copter/docs/common-ac2_simple_geofence.html "https://ardupilot.org/copter/docs/common-ac2_simple_geofence.html") (accessed 2026-10-10) | The page says the fence will attempt to stop the vehicle, and that the maximum distance, height and the action at the fence are settings. With the fence on, the drone needs a GPS lock before arming. If the EKF failsafe happens and GPS lock is lost, the fence is disabled. The page does not mention drone momentum or maneuvering. | qualify |   
| GPS loss affects positioning and navigation, while communication loss affects the drone's ability to receive commands or exchange status information. (Prompt B, concern 5) | ArduPilot Copter docs, "GCS Failsafe", first sections of the page, [https://ardupilot.org/copter/docs/gcs-failsafe.html](https://ardupilot.org/copter/docs/gcs-failsafe.html "https://ardupilot.org/copter/docs/gcs-failsafe.html") (accessed 2026-10-10) | The page says the GCS failsafe starts when the heartbeat from the ground station is lost. The action can be set to nothing, land, RTL or SmartRTL. If the GPS position is not usable, the copter changes to Land mode instead. So the two failures are treated differently, but the action is a setting. |   |   
    
 **Change log**  
   
| | | |  
|-|-|-|  
| **AI wording / suggestion** | **Your final version** | **Reason for change** |   
| It would prevent drones from leaving the permitted area or flying above 100 meters. (Prompt A draft) | I use a geofence only as one safety layer, because the fence only attempts to stop the drone. I also keep the audience far from the flying zone and test the fence before the show. | Verification row 1: the page says "attempt" and the fence can be disabled if GPS is lost, so a fence alone is not a guarantee for the audience. |   
| If GPS or communication fails, a drone should follow a predefined safety procedure. (Prompt A draft) | The system needs two different failsafes, one for lost communication and one for lost GPS. The action is a setting in ArduPilot, so I would choose it for each failure and test it. | Verification row 2: the page separates lost contact from unusable GPS and shows the action can be configured. Also 100 drones doing one action at once can be dangerous. |   
   
