def process_marks(raw_marks):
    vm = []
    for item in raw_marks:
        if isinstance(item, int):
            if 0 <= item <= 100:
                vm.append(item)
    if not vm:
        print("No valid marks")
        return
    
    tot_v = len(vm)
    av = sum(vm) / tot_v
    mx = max(vm)
    mn = min(vm)

    cnt = 0
    for mark in vm:
        if mark >= 50:
            cnt += 1
    ps_rate = (cnt / tot_v) * 100

    print(f"Valid marks: {tot_v}")
    print(f"Average:     {av:.2f}")
    print(f"Highest:     {mx}")
    print(f"Lowest:      {mn}")
    print(f"Pass rate:   {ps_rate:.1f}%")
cases = {
    "A": [85, 23, 45, 90, 92],
    "B": [88, 47, -5, 101, "abc", 73, 50, "", 100],
    "C": [10, 20, 30],
    "D": ["abc", "", "xyz"],
}

for case, data in cases.items():
    print(f"--- {case} ---")
    process_marks(data)
    print()
