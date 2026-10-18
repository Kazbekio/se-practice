import type { Booking, Room } from '@/data/rooms';

export interface CheckResult {
  available: boolean;
  reasons: string[];
}

export const MINUTES_PER_DAY = 1440;
export const MAX_DURATION_MINUTES = 120;

// Two half-open intervals [s1,e1) and [s2,e2) overlap iff s1 < e2 && s2 < e1.
// Touching endpoints (s1 === e2 or s2 === e1) are NOT an overlap.
export function intervalsOverlap(a: Booking, start: number, end: number): boolean {
  return start < a.end && a.start < end;
}

/**
 * Evaluate a candidate booking against AC1-AC5.
 * Does NOT mutate the room's booking data (AC5).
 */
export function checkAvailability(
  room: Room,
  start: number,
  end: number,
  currentTime: number,
): CheckResult {
  const reasons: string[] = [];

  // AC1: valid interval and start after current time.
  if (!(Number.isFinite(start) && Number.isFinite(end))) {
    reasons.push('Start and end times are required.');
    return { available: false, reasons };
  }
  if (start < 0 || end > MINUTES_PER_DAY) {
    reasons.push('Times must be within a single day (00:00 to 24:00).');
  }
  if (!(start < end)) {
    reasons.push('Start time must be earlier than end time.');
  }
  if (start <= currentTime) {
    reasons.push('Start time must be after the current time.');
  }

  // AC2: max 120 minutes.
  if (end - start > MAX_DURATION_MINUTES) {
    reasons.push(`Bookings cannot exceed ${MAX_DURATION_MINUTES} minutes.`);
  }

  // AC3: room blocked.
  if (room.blocked) {
    reasons.push(
      `Room is blocked${room.blockedReason ? `: ${room.blockedReason}` : ''}.`,
    );
  }

  // AC4: overlap with existing bookings (touching endpoints allowed).
  if (start < end && start >= 0 && end <= MINUTES_PER_DAY) {
    const conflicts = room.bookings.filter((b) =>
      intervalsOverlap(b, start, end),
    );
    if (conflicts.length > 0) {
      const first = conflicts[0];
      reasons.push(
        `Overlaps an existing booking (${fmt(first.start)}–${fmt(first.end)}, ${first.bookedBy}).`,
      );
    }
  }

  return { available: reasons.length === 0, reasons };
}

export function fmt(minutes: number): string {
  const m = ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

export function parseTime(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const mm = Number(match[2]);
  if (h < 0 || h > 23 || mm < 0 || mm > 59) return null;
  return h * 60 + mm;
}
