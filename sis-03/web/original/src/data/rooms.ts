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
export const SAMPLE_ROOMS: Room[] = [
  {
    id: 'r-101',
    name: 'Engineering Lab A',
    building: 'Block C',
    capacity: 40,
    blocked: false,
    bookings: [
      { start: 9 * 60, end: 10 * 60 + 30, bookedBy: 'Dr. Hale' },
      { start: 14 * 60, end: 15 * 60, bookedBy: 'Ms. Okafor' },
    ],
  },
  {
    id: 'r-102',
    name: 'Design Studio 2',
    building: 'Block C',
    capacity: 24,
    blocked: false,
    bookings: [
      { start: 11 * 60, end: 12 * 60, bookedBy: 'Prof. Lin' },
      { start: 13 * 60, end: 14 * 60 + 30, bookedBy: 'Study Group B' },
    ],
  },
  {
    id: 'r-201',
    name: 'Lecture Hall 3',
    building: 'Block A',
    capacity: 120,
    blocked: true,
    blockedReason: 'Scheduled maintenance',
    bookings: [],
  },
  {
    id: 'r-301',
    name: 'Seminar Room 5',
    building: 'Block B',
    capacity: 16,
    blocked: false,
    bookings: [
      { start: 8 * 60 + 30, end: 9 * 60 + 15, bookedBy: 'TA Council' },
      { start: 16 * 60, end: 17 * 60, bookedBy: 'Career Services' },
    ],
  },
];
