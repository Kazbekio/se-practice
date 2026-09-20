def analyze_marks(marks, pass_mark=50):
    if not isinstance(pass_mark, (int, float)) or isinstance(pass_mark, bool):
        raise ValueError("pass_mark must be a number")

    if not 0 <= pass_mark <= 100:
        raise ValueError("pass_mark must be between 0 and 100")

    if not marks:
        raise ValueError("marks cannot be empty")

    for mark in marks:
        if not isinstance(mark, (int, float)) or isinstance(mark, bool):
            raise ValueError("marks must contain only numbers")

        if not 0 <= mark <= 100:
            raise ValueError("marks must be between 0 and 100")

    average = sum(marks) / len(marks)
    highest = max(marks)
    lowest = min(marks)

    passed = sum(mark >= pass_mark for mark in marks)
    pass_rate = round((passed / len(marks)) * 100, 2)

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate
    }


# Tests

# 1. One mark
assert analyze_marks([75]) == {
    "average": 75,
    "highest": 75,
    "lowest": 75,
    "pass_rate": 100.0
}

# 2. Decimals
result = analyze_marks([55.5, 70.5, 80.0])
assert result["average"] == 68.66666666666667
assert result["highest"] == 80.0
assert result["lowest"] == 55.5
assert result["pass_rate"] == 100.0

# 3. Custom pass_mark
result = analyze_marks([40, 60, 80], pass_mark=70)
assert result == {
    "average": 60.0,
    "highest": 80,
    "lowest": 40,
    "pass_rate": 33.33
}

# Example
result = analyze_marks([40, 60, 80], 50)
assert result == {
    "average": 60.0,
    "highest": 80,
    "lowest": 40,
    "pass_rate": 66.67
}

# 4. Empty list
try:
    analyze_marks([])
    assert False
except ValueError:
    pass

# 5. Text value
try:
    analyze_marks([40, "60", 80])
    assert False
except ValueError:
    pass

# 6. Mark below 0
try:
    analyze_marks([-10, 50, 80])
    assert False
except ValueError:
    pass

# 7. Mark above 100
try:
    analyze_marks([50, 80, 110])
    assert False
except ValueError:
    pass

print("All tests passed!")
