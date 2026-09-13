# Rocket Prompt Log 
## 1. Initial Prompt 

> Build a small program that processes a list of student marks and prints: > average, highest, lowest, and pass rate. 

## 2. Rocket Questions 
### Question 1
Rocket asked:

> Who is this tool for?

My answer:

Just me, personal use (I enter marks myself and view the stats instantly)

## 3. Rewritten Prompt

> A personal student marks processor where you input a list of marks and instantly see the computed average, highest score, lowest score, and pass rate — all in a clean, single-page interface built for quick, effortless use.
>
> Building with Next.js and TypeScript.

## 4. What Rocket Added

- Technology stack: Next.js and TypeScript.
- User interface: A single-page web interface.
- Pass threshold: 50 by default, with a configurable pass threshold slider.
- Extra features: median, standard deviation, grade distribution chart, pass/fail donut chart, color-coded pass/fail mark chips, individual mark removal, sample data, responsive layout.
- Other assumptions: Marks are entered as free-form text and can be separated by commas, spaces, or new lines. Marks are processed locally in the browser.

## 5. Testing 
### Test A 
Input:

85, 23, 45, 90, 92

Expected:

Valid marks: 5
Average: 67.00
Highest: 92
Lowest: 23
Pass rate: 60.0%

Rocket output:

Valid: 5
Average: 67.0
Highest: 92
Lowest: 23
Pass rate: 60.0%

Match: No - average was displayed with one decimal place.
### Test B
Input:

88, 47, -5, 101, abc, 73, 50, , 100

Expected:

Valid marks: 5
Average: 71.60
Highest: 100
Lowest: 47
Pass rate: 80.0%

Rocket output:

Valid marks: 5
Average:     71.6
Highest:     100
Lowest:      47
Pass rate:   80.0%

Match: No - average was displayed with one decimal place.

### Test C 
 Input:

10, 20, 30

Expected:

Valid marks: 3
Average: 20.00
Highest: 30
Lowest: 10
Pass rate: 0.0%

Rocket output:

Valid marks: 3
Average:     20.0
Highest:     30
Lowest:      10
Pass rate:   0.0%

Match: No
### Test D 
Input:

abc, , xyz

Expected:

Valid marks: 0
Clear message, no crash.

Rocket output:

No valid marks found.

Match: Yes
## 6. Defect

### Defect

The average was displayed with one decimal place instead of the required two decimal places. For example, Test A showed 67.0 instead of 67.00.

### Follow-up Prompt

Fix the average display so that it always shows exactly two decimal places, for example 67.00 instead of 67.0. Do not change the other calculations or features.

### Result

Rocket updated the average display to use exactly two decimal places. Test A then displayed 67.00.

