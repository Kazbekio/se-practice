


import unittest
from booking import can_book

class BookingTests(unittest.TestCase):
    # --- 6 Table Cases ---
    def test_touching_end_is_allowed(self):
        self.assertEqual(can_book(660, 720, 540, False, [(600, 660)]), True)

    def test_overlap_rejected(self):
        self.assertEqual(can_book(630, 690, 540, False, [(600, 660)]), False)

    def test_blocked_room_rejected(self):
        self.assertEqual(can_book(660, 720, 540, True, [(600, 660)]), False)

    def test_exactly_two_hours_allowed(self):
        self.assertEqual(can_book(720, 840, 540, False, [(600, 660)]), True)

    def test_over_two_hours_rejected(self):
        self.assertEqual(can_book(720, 841, 540, False, [(600, 660)]), False)

    def test_starts_now_rejected(self):
        self.assertEqual(can_book(540, 570, 540, False, [(600, 660)]), False)

    # --- 5 Further Kinds ---
    def test_zero_length_rejected(self):
        self.assertEqual(can_book(700, 700, 540, False, [(600, 660)]), False)

    def test_reversed_times_rejected(self):
        self.assertEqual(can_book(720, 700, 540, False, [(600, 660)]), False)

    def test_day_bound_midnight_allowed(self):
        self.assertEqual(can_book(1380, 1440, 540, False, [(600, 660)]), True)

    def test_day_bound_exceeds_midnight_rejected(self):
        self.assertEqual(can_book(1380, 1441, 540, False, [(600, 660)]), False)

    def test_empty_existing_allowed(self):
        self.assertEqual(can_book(600, 660, 540, False, []), True)

    def test_multiple_existing_overlap_rejected(self):
        self.assertEqual(can_book(700, 760, 540, False, [(600, 660), (740, 800)]), False)

    def test_contains_existing_rejected(self):
        self.assertEqual(can_book(570, 690, 540, False, [(600, 660)]), False)

    def test_inside_existing_rejected(self):
        self.assertEqual(can_book(615, 645, 540, False, [(600, 660)]), False)

    def test_input_unchanged(self):
        existing = [(600, 660)]
        can_book(660, 720, 540, False, existing)
        self.assertEqual(existing, [(600, 660)])
    
    def test_strict_boolean_return_type(self):
        result_true = can_book(660, 720, 540, False, [(600, 660)])
        self.assertIs(result_true, True)
        result_false = can_book(630, 690, 540, False, [(600, 660)])
        self.assertIs(result_false, False)
    def test_input_unchanged_when_rejected(self):
        existing = [(900, 960), (600, 660)]
        # Запрашиваем время с пересечением, чтобы получить False
        can_book(610, 650, 540, False, existing)
        # Проверяем, что исходный неотсортированный список остался ровно таким же
        self.assertEqual(existing, [(900, 960), (600, 660)])
    def test_touching_start_is_allowed(self):
        # Касание с другой стороны (новая граница для §5)
        self.assertEqual(can_book(570, 600, 540, False, [(600, 660)]), True)

    def test_input_unchanged_when_rejected(self):
        # Ловим M10: мутация при отказе
        existing = [(600, 660)]
        can_book(610, 650, 540, False, existing)
        self.assertEqual(existing, [(600, 660)])
    def test_input_unchanged_unsorted(self):
        # Ловим M10: мутант сортирует список внутри функции
        existing = [(900, 960), (600, 660)]
        can_book(780, 840, 540, False, existing)
        self.assertEqual(existing, [(900, 960), (600, 660)])
