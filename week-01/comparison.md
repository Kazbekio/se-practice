**Week 01 — Manual vs AI: Comparison**  
**Name:** Shynbulat Kazbek  
   
 **Group:** Monday 16:00 - 19:00  
   
 **Date: **14.09.2026  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVR4nO3WAQkAIBAEsBPMYs4PZhMDWMAA5njYUmxU1UqyAwBAF2cmeZE4AIBO7gentgXapSWpbgAAAABJRU5ErkJggg==)  
**LINK to Rocket: **[https://marksprocessor-sr9s20.public.builtwithrocket.new/](https://marksprocessor-sr9s20.public.builtwithrocket.new/ "https://marksprocessor-sr9s20.public.builtwithrocket.new/")  
**1. Facts**  
| | | |  
|-|-|-|  
|   | **Manual (Part 1)** | **Rocket (Part 2)** |   
| Language / stack used | Python | Next.js and TypeScript |   
| Time to first version that ran | 10 min | 30-40 sec |   
| Time to all 4 test cases passing | 13 min | 5 sec |   
| Number of attempts / prompts needed | 5 | 2 |   
| Lines of code you actually wrote | 37 | 0 |   
| Did it handle invalid marks (case B)? | yes | yes |   
| Did it handle an empty list (case D)? | yes | yes |   
| Did it use the ≥ 50 pass threshold? | yes | yes |   
| Output format matches the spec? | yes | yes |   
| Can you explain every line of it? | yes | no |   
   
**2. Test results**  
| | | | | | |  
|-|-|-|-|-|-|  
| **Case** | **Input** | **Manual output** | **Rocket output** | **Spec says** | **Match?** |   
| A | 85, 23, 45, 90, 92 | Valid marks: 5Average:     67.00Highest:     92Lowest:      23Pass rate:   60.0% | avg 67.00high 92low 23pass 60.0%  | avg 67.00 · high 92 · low 23 · pass 60.0% | yes |   
| B | 88, 47, -5, 101, abc, 73, 50, , 100 | Valid marks: 5Average:     71.60Highest:     100Lowest:      47Pass rate:   80.0% | avg 71.60high 100low 47pass 80.0%  | avg 71.60 · high 100 · low 47 · pass 80.0% | yes |   
| C | 10, 20, 30 | Valid marks: 3Average:     20.00Highest:     30Lowest:      10Pass rate:   0.0% | avg 20.00high 30low 10pass 0.0%  | avg 20.00 · high 30 · low 10 · pass 0.0% | yes |   
| D | abc, , xyz | No valid marks | No valid marks found / invalid entries | clear message, no crash | yes |   
   
**3. What the AI added that I never asked for**  
A complete graphical user interface and justable slider for the Pass Threshold instead of hardcoding the ≥ 50 rule.  
Visual tags highlighting exactly which entries were invalid (highlighting `abc` in yellow).  
**4. What the AI got wrong or silently skipped**  
It completely ignored the "print" format requirement from the specification, opting to build a dashboard instead of a console outpu and initially, it might not strictly format the average to exactly 2 decimal places without explicit instructions.  
**5. The defect I asked Rocket to fix**  
**Prompt I used:**Fix the average display so that it always shows exactly two decimal places, for example 67.00 instead of 67.0. Do not change the other calculations or features.  
**Result:** fixed  
**What this tells me: **  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhZscaUpheJwqQgQU2QtIq6DIze3UGAMBf3Gu1VcfXEwAAXrseopcEQ2uoYnwAAAAASUVORK5CYII=)  
**6. Reflection (200–300 words)**  
Answer all four, in your own words:  
1. Which parts of the work did the AI genuinely speed up?  
   
The AI helped me build a nice user interface very quickly. Creating a website with HTML and CSS usually takes a long time, but Rocket made a full design in just two minutes. It saved me time on formatting and visual layout.  
   
2. Where did the AI cost you time, or give you something that looked right but was not?  
   
The AI cost me extra time because it did not follow the simple text format from the assignment rules. Instead of printing a simple text output, it made a complex web app. I had to spend time checking if edge cases like Case D (invalid text) would crash the site.  
   
   
3. Which of these two artefacts would you be willing to put your name on, and why?  
   
I prefer to put my name on my manual Python script. It is very simple and has no UI, but I wrote every line of code myself. I understand how it works and I can easily fix bugs. The AI code is too big and hard to understand.  
   
4. What must a human engineer still be responsible for after this experiment?  
   
A human engineer must check if the program is correct and safe. AI can make a pretty design, but only a human can test all rules, find hidden bugs, and make sure the math is right.  
