import { canBook, type Booking } from './booking';

type AvailabilityInput = {
  start: string;
  end: string;
  now: string;
  endOfDay: boolean;
  blocked: boolean;
  bookings: Booking[];
};

type AvailabilityFeedback = { available: boolean | null; error: string };

const toMinutes = (value: string) => {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
};

export function evaluateAvailability({ start, end, now, endOfDay, blocked, bookings }: AvailabilityInput): AvailabilityFeedback {
  if (!start || !now || (!end && !endOfDay)) {
    return { available: null, error: 'Fill in the current time, the start and the end.' };
  }
  const s = toMinutes(start);
  const e = endOfDay ? 1440 : toMinutes(end);
  const n = toMinutes(now);
  return {
    available: canBook({ start: s, end: e, now: n, blocked, bookings }),
    error: s < e ? '' : 'The end time must be after the start time.',
  };
}
