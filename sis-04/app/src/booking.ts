import type { Room } from './rooms';

export type Booking = {
  start: number;
  end: number;
};

export type BookingRequest = {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: Booking[];
};

export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start < b.end && end > b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  return true;
}

export function checkRoom(rooms: Room[], roomId: string,
  request: { start: number; end: number; now: number }): boolean {
  const room = rooms.find(candidate => candidate.id === roomId);
  if (!room) return false;
  return canBook({
    start: request.start, end: request.end, now: request.now,
    blocked: room.blocked, bookings: room.bookings,
  });
}
