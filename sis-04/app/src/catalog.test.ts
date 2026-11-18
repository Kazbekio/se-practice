import { expect, test } from 'vitest';
import { filterRooms } from './filter';
import { checkRoom } from './booking';

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

test('AC3 F3: a blocked room is unavailable', () => {
  expect(checkRoom(fixture(), 'c', { start: 630, end: 660, now: 540 })).toBe(false);
});

test('F5: the same request uses each room own bookings', () => {
  const rooms = fixture();
  const request = { start: 630, end: 660, now: 540 };
  expect(checkRoom(rooms, 'a', request)).toBe(false);
  expect(checkRoom(rooms, 'b', request)).toBe(true);
});

test('F5: an unknown room is unavailable', () => {
  expect(checkRoom(fixture(), 'missing', { start: 630, end: 660, now: 540 })).toBe(false);
});

test('AC5 F5: repeated checks preserve every room', () => {
  const rooms = fixture();
  const before = structuredClone(rooms);
  expect(checkRoom(rooms, 'a', { start: 660, end: 720, now: 540 })).toBe(true);
  expect(checkRoom(rooms, 'a', { start: 660, end: 720, now: 540 })).toBe(true);
  expect(checkRoom(rooms, 'c', { start: 660, end: 720, now: 540 })).toBe(false);
  expect(rooms).toEqual(before);
});

test('AC2 B1: exactly 120 minutes is allowed', () => {
  expect(checkRoom(fixture(), 'b', { start: 600, end: 720, now: 540 })).toBe(true);
});

test('AC2 B2: 121 minutes is rejected', () => {
  expect(checkRoom(fixture(), 'b', { start: 600, end: 721, now: 540 })).toBe(false);
});

test('AC4 B3: endpoint contact is allowed', () => {
  expect(checkRoom(fixture(), 'd', { start: 630, end: 660, now: 540 })).toBe(true);
});

test('AC4 B4: overlap is rejected', () => {
  expect(checkRoom(fixture(), 'a', { start: 630, end: 660, now: 540 })).toBe(false);
});

test('INT F1 F2 F3: filter matches are checked for availability', () => {
  const rooms = fixture();
  const before = structuredClone(rooms);
  const matches = filterRooms(rooms, { attendees: 8, equipment: ['projector', 'whiteboard'] });
  expect(matches.map(room => room.id)).toEqual(['a', 'c']);
  expect(checkRoom(matches, matches[0].id, { start: 660, end: 720, now: 540 })).toBe(true);
  expect(checkRoom(matches, matches[1].id, { start: 660, end: 720, now: 540 })).toBe(false);
  expect(rooms).toEqual(before);
});
