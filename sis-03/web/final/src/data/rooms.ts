export interface Booking {
  start: number; // minutes from 00:00, inclusive
  end: number; // minutes from 00:00, exclusive
  bookedBy: string;
}

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  blocked: boolean;
  blockedReason?: string;
  bookings: Booking[];
}

// Fictional sample data. Times are minutes-from-midnight.
// The standard room has one fixed 10:00–11:00 booking for T1–T9 and T11–T12.
// Design Studio 2 adds 11:40–12:40 so the second-booking case T10 is testable.
const BASE_BOOKING: Booking = {
  start: 10 * 60,
  end: 11 * 60,
  bookedBy: 'Fixed Base',
};

const SECOND_BOOKING: Booking = {
  start: 11 * 60 + 40,
  end: 12 * 60 + 40,
  bookedBy: 'Project Review',
};

export const SAMPLE_ROOMS: Room[] = [
  {
    id: 'r-101',
    name: 'Engineering Lab A',
    building: 'Block C',
    capacity: 40,
    blocked: false,
    bookings: [BASE_BOOKING],
  },
  {
    id: 'r-102',
    name: 'Design Studio 2',
    building: 'Block C',
    capacity: 24,
    blocked: false,
    bookings: [BASE_BOOKING, SECOND_BOOKING],
  },
  {
    id: 'r-201',
    name: 'Lecture Hall 3',
    building: 'Block A',
    capacity: 120,
    blocked: true,
    blockedReason: 'Scheduled maintenance',
    bookings: [BASE_BOOKING],
  },
  {
    id: 'r-301',
    name: 'Seminar Room 5',
    building: 'Block B',
    capacity: 16,
    blocked: false,
    bookings: [BASE_BOOKING],
  },
];
