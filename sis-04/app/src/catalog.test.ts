import { expect, test } from 'vitest';
import { filterRooms } from './filter';

const fixture = () => [
  { id: 'a', name: 'Test A', capacity: 8, equipment: ['projector', 'whiteboard'], blocked: false, bookings: [{ start: 600, end: 660 }] },
  { id: 'b', name: 'Test B', capacity: 12, equipment: ['whiteboard'], blocked: false, bookings: [{ start: 780, end: 840 }] },
  { id: 'c', name: 'Test C', capacity: 20, equipment: ['projector', 'whiteboard'], blocked: true, bookings: [] },
  { id: 'd', name: 'Test D', capacity: 6, equipment: ['projector'], blocked: false, bookings: [{ start: 660, end: 720 }] },
];

test('F1 B5: equal capacity is included', () => {
  expect(filterRooms(fixture(), { attendees: 8, equipment: [] }).map(room => room.id)).toEqual(['a', 'b', 'c']);
});

test('F1 B6: capacity one below is excluded', () => {
  expect(filterRooms(fixture(), { attendees: 9, equipment: [] }).map(room => room.id)).toEqual(['b', 'c']);
});

test('F2: all selected equipment is required', () => {
  expect(filterRooms(fixture(), { attendees: 6, equipment: ['projector', 'whiteboard'] }).map(room => room.id)).toEqual(['a', 'c']);
});

test('F2: no equipment requirement allows every capacity match', () => {
  expect(filterRooms(fixture(), { attendees: 6, equipment: [] }).map(room => room.id)).toEqual(['a', 'b', 'c', 'd']);
});

test('F4: no room has enough seats', () => {
  expect(filterRooms(fixture(), { attendees: 21, equipment: [] })).toEqual([]);
});

test('AC5 F1 F2: filtering preserves the catalog and criteria', () => {
  const rooms = fixture();
  const criteria = { attendees: 8, equipment: ['whiteboard'] };
  const before = structuredClone({ rooms, criteria });
  expect(filterRooms(rooms, criteria).map(room => room.id)).toEqual(['a', 'b', 'c']);
  expect({ rooms, criteria }).toEqual(before);
});
