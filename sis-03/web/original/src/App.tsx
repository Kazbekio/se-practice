import { useMemo, useState } from 'react';
import {
  Clock,
  DoorClosed,
  CheckCircle2,
  XCircle,
  CalendarClock,
  Users,
  MapPin,
  AlertTriangle,
} from 'lucide-react';
import { SAMPLE_ROOMS, type Room } from '@/data/rooms';
import {
  checkAvailability,
  fmt,
  parseTime,
  MAX_DURATION_MINUTES,
} from '@/lib/availability';

function nowMinutes(d = new Date()): number {
  return d.getHours() * 60 + d.getMinutes();
}

export default function App() {
  const [rooms] = useState<Room[]>(() =>
    SAMPLE_ROOMS.map((r) => ({ ...r, bookings: [...r.bookings] })),
  );
  const [currentMinutes, setCurrentMinutes] = useState<number>(() =>
    nowMinutes(),
  );
  const [currentTimeInput, setCurrentTimeInput] = useState<string>(() => {
    const n = new Date();
    return `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}`;
  });
  const [roomId, setRoomId] = useState<string>(rooms[0]?.id ?? '');
  const [startInput, setStartInput] = useState<string>('');
  const [endInput, setEndInput] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === roomId) ?? null,
    [rooms, roomId],
  );

  const start = parseTime(startInput);
  const end = parseTime(endInput);

  const result = useMemo(() => {
    if (!selectedRoom) return null;
    if (start === null || end === null) return null;
    return checkAvailability(selectedRoom, start, end, currentMinutes);
  }, [selectedRoom, start, end, currentMinutes]);

  function handleCurrentTimeChange(value: string) {
    setCurrentTimeInput(value);
    const parsed = parseTime(value);
    if (parsed !== null) setCurrentMinutes(parsed);
  }

  function handleCheck() {
    setSubmitted(true);
  }

  function handleReset() {
    setStartInput('');
    setEndInput('');
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <DoorClosed className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Smart Campus Room Availability
            </h1>
            <p className="text-sm text-slate-500">
              Check whether a campus room is free for your requested time slot.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Form panel */}
          <section className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <CalendarClock className="h-5 w-5 text-blue-600" />
              Check a room
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Current time">
                <div className="relative">
                  <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="time"
                    value={currentTimeInput}
                    onChange={(e) => handleCurrentTimeChange(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Bookings must start after this time.
                </p>
              </Field>

              <Field label="Room">
                <select
                  value={roomId}
                  onChange={(e) => {
                    setRoomId(e.target.value);
                    setSubmitted(false);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} — {r.building}
                      {r.blocked ? ' (blocked)' : ''}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Start time">
                <input
                  type="time"
                  value={startInput}
                  onChange={(e) => {
                    setStartInput(e.target.value);
                    setSubmitted(false);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1 text-xs text-slate-500">Interval includes start.</p>
              </Field>

              <Field label="End time">
                <input
                  type="time"
                  value={endInput}
                  onChange={(e) => {
                    setEndInput(e.target.value);
                    setSubmitted(false);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Interval excludes end. Max {MAX_DURATION_MINUTES} min.
                </p>
              </Field>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCheck}
                disabled={!selectedRoom || start === null || end === null}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                Check availability
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Reset
              </button>
            </div>

            {submitted && (
              <DecisionPanel
                available={result?.available ?? false}
                reasons={result?.reasons ?? []}
                hasInvalidInput={start === null || end === null}
              />
            )}
          </section>

          {/* Room detail panel */}
          <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            {selectedRoom ? (
              <RoomDetail room={selectedRoom} />
            ) : (
              <p className="text-sm text-slate-500">Select a room to view details.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

function DecisionPanel({
  available,
  reasons,
  hasInvalidInput,
}: {
  available: boolean;
  reasons: string[];
  hasInvalidInput: boolean;
}) {
  if (hasInvalidInput) {
    return (
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
        <div>
          <p className="font-medium text-amber-900">Enter valid times first</p>
          <p className="text-sm text-amber-800">
            Both start and end times must be in HH:MM format.
          </p>
        </div>
      </div>
    );
  }

  if (available) {
    return (
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
        <div>
          <p className="font-semibold text-emerald-900">Available</p>
          <p className="text-sm text-emerald-800">
            The room is free for the requested interval. Existing bookings are
            unchanged.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4">
      <div className="flex items-start gap-3">
        <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
        <div>
          <p className="font-semibold text-rose-900">Unavailable</p>
          <p className="text-sm text-rose-800">
            The requested interval cannot be booked.
          </p>
        </div>
      </div>
      <ul className="mt-3 space-y-1.5 pl-8 text-sm text-rose-800">
        {reasons.map((r, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500" />
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoomDetail({ room }: { room: Room }) {
  const sorted = [...room.bookings].sort((a, b) => a.start - b.start);
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">{room.name}</h2>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <Detail icon={<MapPin className="h-4 w-4" />} label="Building" value={room.building} />
        <Detail icon={<Users className="h-4 w-4" />} label="Capacity" value={`${room.capacity}`} />
      </dl>

      {room.blocked ? (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-600" />
          <span>
            Blocked{room.blockedReason ? `: ${room.blockedReason}` : ''}.
          </span>
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Clock className="h-4 w-4 text-blue-600" />
            Existing bookings today
          </h3>
          {sorted.length === 0 ? (
            <p className="text-sm text-slate-500">No existing bookings.</p>
          ) : (
            <ul className="space-y-2">
              {sorted.map((b, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                >
                  <span className="font-medium text-slate-700">
                    {fmt(b.start)} – {fmt(b.end)}
                  </span>
                  <span className="text-slate-500">{b.bookedBy}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-slate-800">{value}</dd>
    </div>
  );
}
