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
Write Python code to analyze student marks.  
   
**Assumptions the AI made that I never gave it** —   
1.The default passing score is 50 (in the code: `mark >= 50`).  
2.The result should be printed to the screen rather than returned from the function.  
3.If the list is empty, the string "No marks provided." is returned instead of raising an error.  
4.Input data is assumed to be valid numbers by default (there is no check for text or range).  
**Questions it should have asked and did not:**  
1.What is the passing score threshold?  
2.In what format should the function return the result (data structure or console output)?  
3.How should empty lists or invalid data types be handled?  
**Is the function named ** **analyze_marks** ** with the required signature?** no — if no, what is it  
   
 called: The function name matches (analyze_marks), but the signature is incomplete—it accepts only (marks), whereas it should accept (marks, pass_mark=50).  
**First impression before testing** (one sentence — you will compare this with section 6 later): The code seems to work for basic numbers, but it will break on strings and doesn't return any data.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAABRAsad4EEtY9QcxnUms4E2ELcGWmTmrKwAA/uLeqrU6vp4AAPDa/gDzXgM37EF77AAAAABJRU5ErkJggg==)  
**3. Prompt B — structured context**  
**Prompt sent** (paste it in full, including any substitutions):  
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100; raise ValueError for an empty list, non-numeric values, or out-of-range values. Use no external libraries. Return code plus a short explanation.  
**What B fixed compared to A:**  
1.The function now accepts a `pass_mark=50` parameter (correct signature).   
2.Input validation has been added: a `ValueError` is raised for an empty list, non-numeric values, and numbers outside the 0–100 range.   
3.The function returns the results as a dictionary instead of simply printing them to the screen.  
**What B still leaves open:**  
1.Number formatting or rounding is undefined (e.g., `pass_rate` and `average` might return long decimal values ​​instead of being neatly rounded to two decimal places).  
2.It is not clearly specified how to handle a score that is exactly equal to the passing score (the code treats `mark >= pass_mark` as a pass, but this was not explicitly stated in the prompt).  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OYQ1AABSAwc8mi5wvkwZyCKCAACr4Z7a7BLfMzFYdAQDwF+da3dX+9QQAgNeuB6feBdUJcyS2AAAAAElFTkSuQmCC)  
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
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAUBBAwSf8GGLWDWFDY3ixgjcRZhLMNjNHdQYAwF9cq1rV/vUEAIDX7gcRXAQ2s/16gwAAAABJRU5ErkJggg==)  
**5. Prompt D — my combined prompt**  
**The complete prompt I wrote** (one message, sent to a fresh chat):  
   
**What I deliberately added that A, B and C did not have:**  
**The ambiguity I found in the specification, and how I resolved it inside Prompt D:**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd49m4tA8nPaQJjWMGbCFuCLTOzV2cAAPzFvVZbdXw9AQDgtesBorcEPwOKyvQAAAAASUVORK5CYII=)  
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
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsScYxpg/h5VMYARvRrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA224BcUMk6pDAAAAAElFTkSuQmCC)  
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
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNBCUpfD6ZYGZDAgAU2QtIq6DIzW7UHAMBfHGt1V+fXEwAAXrseHCoGAe/SKtAAAAAASUVORK5CYII=)  
**8. Conclusion — 150–200 words**  
Answer in this order: (1) which prompt scored best, and whether it is the one you would actually  
   
 use at work; (2) which single addition bought the most correctness, naming the exact case that  
   
 changed verdict; (3) what was pure noise; (4) the ambiguity and your resolution.  
Name test cases and real returned values. "More detailed prompts work better" scores zero.  
(150–200 words)  
   
   
   
   
**Word count:**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhwgJGkPcrHpnRgQU2QtIq6DIze3UGAMBf3Gu1VcfXEwAAXrseaJkELjbMzy0AAAAASUVORK5CYII=)  
**9. Two questions for the debrief**  
Written before class, answered in class.  
