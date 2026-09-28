# Acceptance criteria — three selected stories

## Assumptions

These must settle the two questions the scenario leaves open. Either answer is accepted; no answer is not.

- **Overlap:** a booking that ends exactly when another begins is not allowed under R3, because a new booking cannot start at the exact same minute an existing one ends.
- **Duration:** a booking of exactly two hours is allowed under R2, because bookings must be exactly two hours long (no shorter, no longer).

---

## US-02 — Book room

### AC-01
- **Given** a study room is available and unblocked
- **When** a student books the room for a future date and exactly a two-hour duration
- **Then** the system creates the booking.

### AC-02
- **Given** a student selects a future start time
- **When** the selected duration is not exactly two hours
- **Then** the system rejects the booking.

### AC-03
- **Given** a room already has a booking from 12:00 to 14:00
- **When** a student tries to book the same room starting exactly at 14:00
- **Then** the system rejects the booking due to overlap.

### AC-04
- **Given** a study room is blocked by an administrator
- **When** a student tries to book that room
- **Then** the system rejects the booking.

---

## US-04 — Cancel booking

### AC-05
- **Given** a student has an existing future booking
- **When** the student cancels the booking
- **Then** the system removes the booking and makes the room available again.

### AC-06
- **Given** a booking belongs to student A
- **When** student B tries to cancel student A's booking
- **Then** the system rejects the action.

### AC-07
- **Given** a student attempts to cancel a booking
- **When** the booking does not exist in the system
- **Then** the system rejects the action.

---

## US-05 — Block or unblock room

### AC-08
- **Given** an administrator selects an available study room
- **When** the administrator blocks the room
- **Then** the system changes the room status to blocked.

### AC-09
- **Given** a room is currently blocked
- **When** an administrator unblocks the room
- **Then** the system changes the room status to available.

### AC-10
- **Given** a room has an existing future booking
- **When** an administrator blocks the room
- **Then** the system prevents new bookings but keeps the existing booking active.
