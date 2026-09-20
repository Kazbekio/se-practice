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
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100; raise ValueError for an empty list, non-numeric values, or out-of-range values. Use no external libraries. Return code plus a short explanation. Example: analyze_marks([40, 60, 80], 50) → average 60, highest 80, lowest 40, pass_rate 66.67. Include tests for: one mark, decimals, custom pass_mark, empty list, text value, and marks below 0 or above 100. State any remaining assumptions before the code.  
**Tests the AI wrote for itself** — how many, and which situations do they cover?  
| | |  
|-|-|  
| **Situation** | **Covered by the AI's tests?** |   
| one mark | yes |   
| decimals | yes |   
| custom pass_mark | yes |   
| empty list | yes |   
| text value | yes |   
| below 0 / above 100 | yes |   
   
**Do the AI's own tests pass against the AI's own code?** yes  
**Do they agree with the harness in section 6?** yes  
**Assumptions C stated explicitly before the code:**  
Assumptions  
- marks is expected to be a list or other iterable of marks.   
-  Numeric values include int and float, but **not** bool.   
- pass_mark must also be numeric and between 0 and 100.   
- pass_rate is returned as a percentage rounded to **2 decimal places**.   
-  A mark **equal to** pass_mark is considered passing.  
** **  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OMQ2AABAAsSNBACPiUML0NpGACyywEZJWQZeZ2aszAAD+4l6rrTq+ngAA8Nr1AL/SBEZwuCSwAAAAAElFTkSuQmCC)  
**5. Prompt D — my combined prompt**  
**The complete prompt I wrote** (one message, sent to a fresh chat):  
You are a Python developer. Implement:  
   
```python  
def analyze_marks(marks, pass_mark=50):  
    ...  
```  
Return a dictionary with exactly these keys: `"average"`, `"highest"`, `"lowest"`, `"pass_rate"`. Do not add other keys. Use no external libraries.  
   
Validation:  
- `marks` must be a list of `int` or `float`; `bool` is not allowed.  
- Empty list → `ValueError`.  
- Non-list `marks` → `ValueError`.  
- Any mark must be a number in `[0, 100]`; out-of-range values → `ValueError`.  
- `NaN` and `inf` are invalid → `ValueError`.  
- `pass_mark` defaults to `50`, must be an `int` or `float`, not `bool`, and must be in `[0, 100]`; otherwise → `ValueError`.  
   
Logic:  
- `average` = arithmetic mean of `marks`, rounded to 2 decimal places.  
- `highest` = maximum of `marks`, no rounding.  
- `lowest` = minimum of `marks`, no rounding.  
- `pass_rate` = percentage of marks that are `>= pass_mark`: `(count >= pass_mark) / len(marks) * 100`, rounded to 2 decimal places.  
- A mark equal to `pass_mark` is considered passed (`>=`).  
- Round `average` and `pass_rate` with `round(value, 2)`.  
- Do not round `highest` and `lowest`.  
   
Example:  
```python  
analyze_marks([40, 60, 80], 50)  
# → {"average": 60.0, "highest": 80, "lowest": 40, "pass_rate": 66.67}  
```  
   
Write tests with `assert` for:  
1. One mark: `analyze_marks([75])` → `average 75.0`, `highest 75`, `lowest 75`, `pass_rate 100.0`.  
2. Decimals: `analyze_marks([49.5, 50.5, 75.25], 50)` → `average 58.42`, `highest 75.25`, `lowest 49.5`, `pass_rate 66.67`.  
3. Custom `pass_mark`: `analyze_marks([40, 60, 80], 60)` → `pass_rate 66.67`.  
4. Empty list: `analyze_marks([])` → `ValueError`.  
5. Text value: `analyze_marks([50, "60"])` → `ValueError`.  
6. Out-of-range: `analyze_marks([-1, 50])` → `ValueError`; `analyze_marks([100.1])` → `ValueError`.  
7. Boundary `pass_mark`: `analyze_marks([50], 50)` → `pass_rate 100.0`.  
Before the code, state any remaining assumptions. Then return the code plus a short explanation.  
**What I deliberately added that A, B and C did not have:**  
- Explicit rounding rules (round(value, 2)) for calculated floats (average and pass_rate) while forbidding rounding for highest and lowest.   
- Strict type validation banning bool, NaN, and inf types, which Python otherwise silently treats as valid numbers or integers.   
- A clear definition of the pass condition (marks >= pass_mark) to avoid boundary logic errors.  
   
**The ambiguity I found in the specification, and how I resolved it inside Prompt D:**  
The specification requires formatted percentages (like 66.67 instead of 66.666666...), but didn't state rounding rules. It also didn't explicitly say whether a mark exactly equal to pass_mark is considered a pass. I resolved this by hardcoding the pass condition as >= pass_mark and enforcing round(value, 2) for average and pass_rate directly in the prompt instructions.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSPBCj7fFwtCmJHAjAU2QtIq6DIzW7UHAMBfnGt1V8fHEQAA3rsexOkF3va0dq8AAAAASUVORK5CYII=)  
**6. Test results — the evidence**  
Six cases × four prompts. Verdicts are **PASS**,  **FAIL** or  **ERROR** only.  
| | | | | | | |  
|-|-|-|-|-|-|-|  
| **#** | **Call** | **Required** | **A** | **B** | **C** | **D** |   
| 1 | analyze_marks([40, 60, 80], 50) | avg 60 · high 80 · low 40 · rate 66.67 | ERROR | PASS | PASS  | PASS  |   
| 2 | analyze_marks([100], 50) | avg 100 · high 100 · low 100 · rate 100 | ERROR  | PASS  | PASS  | PASS  |   
| 3 | analyze_marks([49.5, 50], 50) | avg 49.75 · high 50 · low 49.5 · rate 50 | ERROR  | PASS  | PASS  | PASS  |   
| 4 | analyze_marks([], 50) | raises ValueError | ERROR  | PASS  | PASS  | PASS  |   
| 5 | analyze_marks([40, "60"], 50) | raises ValueError | ERROR  | PASS  | PASS  | PASS  |   
| 6 | analyze_marks([-1, 50, 101], 50) | raises ValueError | ERROR  | PASS  | PASS  | PASS  |   
|   | **Totals** |   | /6 | /6 | /6 | /6 |   
   
**For every FAIL and ERROR above, one line: what was returned or raised instead.**  
| | | |  
|-|-|-|  
| **Prompt** | **Case** | **What actually happened** |   
| A | 1-6 | raised TypeError: analyze_marks() takes 1 positional argument but 2 were given. |   
|   |   |   |   
|   |   |   |   
   
**Pasted terminal output — all four runs**  
*This is the part that makes the table above count. Paste the * ***whole*** * output, unedited,*  
 *  
 including the header lines. A table with nothing behind it is not accepted.*  
**Prompt A**  
 Average: 65.29  
Highest: 91  
Lowest: 39  
Pass rate: 71.43%  
========================================================================  
analyze_marks harness — code/prompt_a.py  
tolerance for numeric comparison: 0.01  
========================================================================  
Average: 50.00  
Highest: 50  
Lowest: 50  
Pass rate: 100.00%  
SIGNATURE: ok  
------------------------------------------------------------------------  
case 1  ERROR  analyze_marks([40, 60, 80], 50)  
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67  
          got   : raised TypeError: analyze_marks() takes 1 positional argument but 2 were given  
------------------------------------------------------------------------  
case 2  ERROR  analyze_marks([100], 50)  
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0  
          got   : raised TypeError: analyze_marks() takes 1 positional argument but 2 were given  
------------------------------------------------------------------------  
case 3  ERROR  analyze_marks([49.5, 50], 50)  
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0  
          got   : raised TypeError: analyze_marks() takes 1 positional argument but 2 were given  
------------------------------------------------------------------------  
case 4  ERROR  analyze_marks([], 50)  
          expect: ValueError  
          got   : raised TypeError instead of ValueError: analyze_marks() takes 1 positional argument but 2 were given  
------------------------------------------------------------------------  
case 5  ERROR  analyze_marks([40, '60'], 50)  
          expect: ValueError  
          got   : raised TypeError instead of ValueError: analyze_marks() takes 1 positional argument but 2 were given  
------------------------------------------------------------------------  
case 6  ERROR  analyze_marks([-1, 50, 101], 50)  
          expect: ValueError  
          got   : raised TypeError instead of ValueError: analyze_marks() takes 1 positional argument but 2 were given  
------------------------------------------------------------------------  
RESULT  0 PASS · 0 FAIL · 6 ERROR   (code/prompt_a.py)  
========================================================================  
**Prompt B**  
 ========================================================================  
analyze_marks harness — code/prompt_b.py  
tolerance for numeric comparison: 0.01  
========================================================================  
SIGNATURE: ok  
------------------------------------------------------------------------  
case 1  PASS   analyze_marks([40, 60, 80], 50)  
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67  
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.66666666666666  
------------------------------------------------------------------------  
case 2  PASS   analyze_marks([100], 50)  
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0  
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0  
------------------------------------------------------------------------  
case 3  PASS   analyze_marks([49.5, 50], 50)  
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0  
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0  
------------------------------------------------------------------------  
case 4  PASS   analyze_marks([], 50)  
          expect: ValueError  
          got   : raised ValueError: Marks list cannot be empty.  
------------------------------------------------------------------------  
case 5  PASS   analyze_marks([40, '60'], 50)  
          expect: ValueError  
          got   : raised ValueError: All marks must be numeric.  
------------------------------------------------------------------------  
case 6  PASS   analyze_marks([-1, 50, 101], 50)  
          expect: ValueError  
          got   : raised ValueError: Marks must be between 0 and 100.  
------------------------------------------------------------------------  
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_b.py)  
========================================================================  
**Prompt C**  
 All tests passed!  
========================================================================  
analyze_marks harness — code/prompt_c.py  
tolerance for numeric comparison: 0.01  
========================================================================  
SIGNATURE: ok  
------------------------------------------------------------------------  
case 1  PASS   analyze_marks([40, 60, 80], 50)  
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67  
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67  
------------------------------------------------------------------------  
case 2  PASS   analyze_marks([100], 50)  
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0  
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0  
------------------------------------------------------------------------  
case 3  PASS   analyze_marks([49.5, 50], 50)  
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0  
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0  
------------------------------------------------------------------------  
case 4  PASS   analyze_marks([], 50)  
          expect: ValueError  
          got   : raised ValueError: marks cannot be empty  
------------------------------------------------------------------------  
case 5  PASS   analyze_marks([40, '60'], 50)  
          expect: ValueError  
          got   : raised ValueError: marks must contain only numbers  
------------------------------------------------------------------------  
case 6  PASS   analyze_marks([-1, 50, 101], 50)  
          expect: ValueError  
          got   : raised ValueError: marks must be between 0 and 100  
------------------------------------------------------------------------  
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_c.py)  
========================================================================  
**Prompt D**  
 All tests passed!  
========================================================================  
analyze_marks harness — code/prompt_d.py  
tolerance for numeric comparison: 0.01  
========================================================================  
SIGNATURE: ok  
------------------------------------------------------------------------  
case 1  PASS   analyze_marks([40, 60, 80], 50)  
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67  
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67  
------------------------------------------------------------------------  
case 2  PASS   analyze_marks([100], 50)  
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0  
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0  
------------------------------------------------------------------------  
case 3  PASS   analyze_marks([49.5, 50], 50)  
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0  
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0  
------------------------------------------------------------------------  
case 4  PASS   analyze_marks([], 50)  
          expect: ValueError  
          got   : raised ValueError: marks cannot be empty  
------------------------------------------------------------------------  
case 5  PASS   analyze_marks([40, '60'], 50)  
          expect: ValueError  
          got   : raised ValueError: each mark must be an int or float  
------------------------------------------------------------------------  
case 6  PASS   analyze_marks([-1, 50, 101], 50)  
          expect: ValueError  
          got   : raised ValueError: marks must be between 0 and 100  
------------------------------------------------------------------------  
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_d.py)  
========================================================================  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsScYxpg/h5VMYARvRrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA224BcUMk6pDAAAAAElFTkSuQmCC)  
**7. Scoring**  
0–2 per criterion, using the rubric in README.md Part 7.  
| | | | | |  
|-|-|-|-|-|  
| **Criterion** | **A** | **B** | **C** | **D** |   
| Correctness (cases passed) | 0 | 2 | 2 | 2 |   
| Requirement coverage | 0 | 2 | 2 | 2 |   
| Verifiability (tests) | 0 | 0 | 2 | 2 |   
| Assumptions stated | 0 | 0 | 1 | 2 |   
| Noise (2 = none) | 1 | 2 | 2 | 2 |   
| **Total / 10** | 1 | 6 | 9 | 10 |   
   
**Prompt length, in words:** A __8__ · B __41__ · C __87__ · D __178__  
**Words added per point gained** — B over A, C over B, D over C. One line on what that ratio says:  
Going from A to B added ~33 words and gained 5 points (6.6 words/point), showing that basic constraints give the highest ROI. D added robust edge-case handling but the test cases were already passing.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAABRAsSdYxKa/jL0MIR7FCt5E2BJsmZmt2gMA4C+Otbqr8+sJAACvXQ85SAYUQNBTfQAAAABJRU5ErkJggg==)  
**8. Conclusion — 150–200 words**  
Answer in this order: (1) which prompt scored best, and whether it is the one you would actually  
   
 use at work; (2) which single addition bought the most correctness, naming the exact case that  
   
 changed verdict; (3) what was pure noise; (4) the ambiguity and your resolution.  
Name test cases and real returned values. "More detailed prompts work better" scores zero.  
 Prompt D scored the highest (10/10) and is the exact prompt I would use at work. While Prompts B and C also passed all test cases, Prompt D bulletproofed the logic against Python's type quirks (like bool bypassing numeric checks) and guaranteed stable output regardless of the environment.   
The single addition that bought the most correctness was explicitly defining the return dictionary and ValueError validations in Prompt B. This single change flipped Case 4 (`analyze_marks([], 50)`) from an ERROR (`raised TypeError: analyze_marks() takes 1 positional argument`) to a PASS (`raised ValueError`), and successfully fixed all other cases. Pure noise appeared in Prompt A, which decided to use print statements like `Average: 65.29` and `Pass rate: 71.43%` instead of actually returning a usable data structure.   
The primary ambiguity in the specification was the exact boundary condition for passing and the rounding precision. I resolved this in Prompt D by strictly stating "A mark equal to pass_mark is considered passed (>=)" and enforcing `round(value, 2)` for calculations.  
   
   
   
**Word count:169**  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OYQ1AABSAwc8mi5wvkwZyCKCAACr4Z7a7BLfMzFYdAQDwF+da3dX+9QQAgNeuB6feBdUJcyS2AAAAAElFTkSuQmCC)  
**9. Two questions for the debrief**  
For how long will prompt engineering remain relevant?  
Should we expect the day when we no need to check ai did smthing wrong or not?  
   
   
   
