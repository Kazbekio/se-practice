
def analyze_marks(marks):
    if not marks:
        return "No marks provided."

    average = sum(marks) / len(marks)
    highest = max(marks)
    lowest = min(marks)
    pass_rate = sum(mark >= 50 for mark in marks) / len(marks) * 100

    print(f"Average: {average:.2f}")
    print(f"Highest: {highest}")
    print(f"Lowest: {lowest}")
    print(f"Pass rate: {pass_rate:.2f}%")


marks = [85, 72, 91, 48, 67, 55, 39]
analyze_marks(marks)
