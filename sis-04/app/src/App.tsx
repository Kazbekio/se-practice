import { useState, type FormEvent } from 'react';
import { ROOMS } from './rooms';
import { filterRooms } from './filter';
import { checkRoom, type BookingRequest } from './booking';
import { toMinutes, type TimeFields } from './time';
import { RoomFilters } from './components/RoomFilters';
import { RoomCatalog } from './components/RoomCatalog';
import { AvailabilityPanel } from './components/AvailabilityPanel';

type CheckedRequest = Pick<BookingRequest, 'start' | 'end' | 'now'>;

export default function App() {
  const [attendees, setAttendees] = useState('8');
  const [equipment, setEquipment] = useState<string[]>([]);
  const [roomId, setRoomId] = useState('cedar');
  const [fields, setFields] = useState<TimeFields>({ now: '09:00', start: '11:00', end: '12:00', endOfDay: false });
  const [checkedRequest, setCheckedRequest] = useState<CheckedRequest | null>(null);
  const matches = filterRooms(ROOMS, { attendees: Number(attendees) || 1, equipment });
  const selectedRoom = matches.find(room => room.id === roomId) ?? matches[0];
  const result = checkedRequest && selectedRoom ? checkRoom(ROOMS, selectedRoom.id, checkedRequest) : null;

  function updateFilters(count: string, items: string[]) {
    setAttendees(count); setEquipment(items); setCheckedRequest(null);
  }

  function updateField(key: 'now' | 'start' | 'end', value: string) {
    setFields(previous => ({ ...previous, [key]: value })); setCheckedRequest(null);
  }

  function check(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCheckedRequest({ start: toMinutes(fields.start), end: fields.endOfDay ? 1440 : toMinutes(fields.end), now: toMinutes(fields.now) });
  }

  return <main className="page-shell">
    <header className="topbar"><div className="brand"><span className="brand-mark" aria-hidden="true">cc</span><div><strong>Campus Commons</strong><span>ROOM FINDER</span></div></div><span className="demo-tag"><i aria-hidden="true" />Fictional campus</span></header>
    <section className="hero"><div><p className="eyebrow">A LITTLE SPACE. A BIG IDEA.</p><h1>Find a room.<br />Make it your own.</h1><p>Match your group, choose your tools, then check a time.</p></div><div className="day-card"><span>DEMO DAY</span><strong>18 <small>NOV 2026</small></strong><p>One day · a fixed clock<br />Availability checks only</p></div></section>
    <div className="workspace">
      <RoomFilters attendees={attendees} selectedEquipment={equipment} onAttendeesChange={value => updateFilters(value, equipment)} onEquipmentChange={items => updateFilters(attendees, items)} onReset={() => updateFilters('8', [])} />
      <RoomCatalog rooms={matches} selectedId={selectedRoom?.id} onSelect={setRoomId} />
      <AvailabilityPanel room={selectedRoom} fields={fields} result={result} onFieldChange={updateField} onEndOfDayChange={endOfDay => { setFields(previous => ({ ...previous, endOfDay })); setCheckedRequest(null); }} onSubmit={check} />
    </div>
    <footer className="page-footer"><span>Campus Commons</span><span>All rooms and bookings are fictional. Nothing is saved.</span></footer>
  </main>;
}
