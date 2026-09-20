
def analyze_marks(marks, pass_mark=50):
    # Validate marks container
    if not isinstance(marks, list):
        raise ValueError("marks must be a list")

    if not marks:
        raise ValueError("marks cannot be empty")

    # Validate pass_mark
    if isinstance(pass_mark, bool) or not isinstance(pass_mark, (int, float)):
        raise ValueError("pass_mark must be an int or float")

    if pass_mark < 0 or pass_mark > 100:
        raise ValueError("pass_mark must be between 0 and 100")

    if isinstance(pass_mark, float):
        if pass_mark != pass_mark or pass_mark in (float("inf"), float("-inf")):
            raise ValueError("pass_mark must be finite")

    # Validate marks
    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError("each mark must be an int or float")

        if isinstance(mark, float):
            if mark != mark or mark in (float("inf"), float("-inf")):
                raise ValueError("marks must contain only finite numbers")

        if mark < 0 or mark > 100:
            raise ValueError("marks must be between 0 and 100")

    average = round(sum(marks) / len(marks), 2)
    highest = max(marks)
    lowest = min(marks)

    passed = sum(mark >= pass_mark for mark in marks)
    pass_rate = round(passed / len(marks) * 100, 2)

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate,
    }


# Tests

# 1. One mark
result = analyze_marks([75])
assert result == {
    "average": 75.0,
    "highest": 75,
    "lowest": 75,
    "pass_rate": 100.0,
}

# 2. Decimals
result = analyze_marks([49.5, 50.5, 75.25], 50)
assert result == {
    "average": 58.42,
    "highest": 75.25,
    "lowest": 49.5,
    "pass_rate": 66.67,
}

# 3. Custom pass_mark
result = analyze_marks([40, 60, 80], 60)
assert result["pass_rate"] == 66.67

# 4. Empty list
try:
    analyze_marks([])
    assert False
except ValueError:
    pass

# 5. Text value
try:
    analyze_marks([50, "60"])
    assert False
except ValueError:
    pass

# 6. Out-of-range
try:
    analyze_marks([-1, 50])
    assert False
except ValueError:
    pass

try:
    analyze_marks([100.1])
    assert False
except ValueError:
    pass

# 7. Boundary pass_mark
result = analyze_marks([50], 50)
assert result["pass_rate"] == 100.0

print("All tests passed!")
