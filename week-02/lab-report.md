**Lab report — Practice #02: The Prompt Is an Engineering Input**  
**Name: Shynbulat Kazbek**  
**Group: Monday 4:00-7:00 pm**  
**Date: September 20**  
*Fill in every section. * ***Do not delete or renumber the headings*** * — the grading pass reads them*  
 *  
 by number. If something did not happen, write "did not happen" and why; an empty section and a*  
 *  
 fabricated one are graded the same way.*  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OUQmAABBAsSdYxKbXxlpGEAOIFfwTYUuwZWa2ag8AgL841uquzq8nAAC8dj05VAYO3phhoQAAAABJRU5ErkJggg==)  
**1. The frozen experiment**  
| | |  
|-|-|  
|   |   |   
| AI assistant | ChatGpt |   
| Exact model name | GPT-5.6 Luna — Instant. |   
| Implementation language | Python |   
| Date of the runs | september 20 |   
   
**Non-Python students only** — paste your substituted Prompt B text here, so the substitution can  
   
 be checked:  
(paste here, or write "n/a — used Python")  
   
**Confirmations:**  
- Each prompt was sent in a **fresh chat**: yes  
- No follow-up questions were asked before Part 7: yes  
- Every output was saved **before** any editing: yes  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhZscVjnidKEAGFtgISaugy8zs1RkAAH9xr9VWHV9PAAB47XoAor8EPg1yCpUAAAAASUVORK5CYII=)  
**2. Prompt A — minimal**  
**Prompt sent** (should be exactly one sentence):  
   
**Assumptions the AI made that I never gave it** — list them, one per line. A data format, a pass  
   
 threshold, a rounding rule, an input method, an invented feature all count.  
**Questions it should have asked and did not:**  
**Is the function named ** **analyze_marks** ** with the required signature?** yes / no — if no, what is it  
   
 called:  
**First impression before testing** (one sentence — you will compare this with section 6 later):  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSPBCUZfE2IYmVDBhAU2QtIq6DIzW7UHAMBfnGt1V8fXEwAAXrse/xcF7U7sx4wAAAAASUVORK5CYII=)  
**3. Prompt B — structured context**  
**Prompt sent** (paste it in full, including any substitutions):  
   
**What B fixed compared to A:**  
**What B still leaves open:**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAABRAsad4EjtY9fewnUms4E2ELcGWmTmrKwAA/uLeqrU6vp4AAPDa/gDzWAM6QQXRdAAAAABJRU5ErkJggg==)  
**4. Prompt C — examples and tests**  
**What I appended to Prompt B:**  
   
**Tests the AI wrote for itself** — how many, and which situations do they cover?  
| | |  
|-|-|  
| **Situation** | **Covered by the AI's tests?** |   
| one mark |   |   
| decimals |   |   
| custom pass_mark |   |   
| empty list |   |   
| text value |   |   
| below 0 / above 100 |   |   
   
**Do the AI's own tests pass against the AI's own code?** yes / no  
**Do they agree with the harness in section 6?** yes / no — if no, where do they disagree:  
**Assumptions C stated explicitly before the code:**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsSfYxZo/jzlMYQLPJrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA4q7Bc870TqdAAAAAElFTkSuQmCC)  
**5. Prompt D — my combined prompt**  
**The complete prompt I wrote** (one message, sent to a fresh chat):  
   
**What I deliberately added that A, B and C did not have:**  
**The ambiguity I found in the specification, and how I resolved it inside Prompt D:**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSfYxKK/kJXEkyE8WcGbCFuCLTOzVXsAAPzFsVZ3dX4cAQDgvesB/vEF9H9odtUAAAAASUVORK5CYII=)  
**6. Test results — the evidence**  
Six cases × four prompts. Verdicts are **PASS**,  **FAIL** or  **ERROR** only.  
| | | | | | | |  
|-|-|-|-|-|-|-|  
| **#** | **Call** | **Required** | **A** | **B** | **C** | **D** |   
| 1 | analyze_marks([40, 60, 80], 50) | avg 60 · high 80 · low 40 · rate 66.67 |   |   |   |   |   
| 2 | analyze_marks([100], 50) | avg 100 · high 100 · low 100 · rate 100 |   |   |   |   |   
| 3 | analyze_marks([49.5, 50], 50) | avg 49.75 · high 50 · low 49.5 · rate 50 |   |   |   |   |   
| 4 | analyze_marks([], 50) | raises ValueError |   |   |   |   |   
| 5 | analyze_marks([40, "60"], 50) | raises ValueError |   |   |   |   |   
| 6 | analyze_marks([-1, 50, 101], 50) | raises ValueError |   |   |   |   |   
|   | **Totals** |   | /6 | /6 | /6 | /6 |   
   
**For every FAIL and ERROR above, one line: what was returned or raised instead.**  
| | | |  
|-|-|-|  
| **Prompt** | **Case** | **What actually happened** |   
|   |   |   |   
|   |   |   |   
|   |   |   |   
   
**Pasted terminal output — all four runs**  
*This is the part that makes the table above count. Paste the * ***whole*** * output, unedited,*  
 *  
 including the header lines. A table with nothing behind it is not accepted.*  
**Prompt A**  
   
**Prompt B**  
   
**Prompt C**  
   
**Prompt D**  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OMQ0AIAwAwZIgBKn1gjJsdGLBABMhuZt+/JaZIyJmAADwi9VP1NMNAABu1AaU4gUeBSGW2wAAAABJRU5ErkJggg==)  
**7. Scoring**  
0–2 per criterion, using the rubric in README.md Part 7.  
| | | | | |  
|-|-|-|-|-|  
| **Criterion** | **A** | **B** | **C** | **D** |   
| Correctness (cases passed) |   |   |   |   |   
| Requirement coverage |   |   |   |   |   
| Verifiability (tests) |   |   |   |   |   
| Assumptions stated |   |   |   |   |   
| Noise (2 = none) |   |   |   |   |   
| **Total / 10** |   |   |   |   |   
   
**Prompt length, in words:** A ____ · B ____ · C ____ · D ____  
**Words added per point gained** — B over A, C over B, D over C. One line on what that ratio says:  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd4NIGJjPWxpgGsYQVvImwJtszMXp0BAPAX91pt1fH1BACA164HhZwEOFrXVOsAAAAASUVORK5CYII=)  
**8. Conclusion — 150–200 words**  
Answer in this order: (1) which prompt scored best, and whether it is the one you would actually  
   
 use at work; (2) which single addition bought the most correctness, naming the exact case that  
   
 changed verdict; (3) what was pure noise; (4) the ambiguity and your resolution.  
Name test cases and real returned values. "More detailed prompts work better" scores zero.  
(150–200 words)  
   
   
   
   
**Word count:**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OMQ2AABAAsSNBCkLfFDZwwIgHRiywEZJWQZeZ2ao9AAD+4lyruzq+ngAA8Nr1AOH0BedHjjlfAAAAAElFTkSuQmCC)  
**9. Two questions for the debrief**  
Written before class, answered in class.  
