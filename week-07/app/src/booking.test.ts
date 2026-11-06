import { describe, expect, test } from 'vitest';
import { canBook } from './booking';

const fixture = () => ({
  now: 540,
  blocked: false,
  bookings: [{ start: 600, end: 660 }],
});

describe('canBook', () => {
  test('T01 AC4: touching after is allowed', () => {
    expect(canBook({ start: 660, end: 720, ...fixture() })).toBe(true);
  });

  test('T02 AC1: starting at the current time is rejected', () => {
    expect(canBook({ start: 540, end: 570, ...fixture() })).toBe(false);
  });

  test('T03 AC1: zero duration is rejected', () => {
    expect(canBook({ start: 720, end: 720, ...fixture() })).toBe(false);
  });

  test('T04 AC1: a reversed interval is rejected', () => {
    expect(canBook({ start: 750, end: 720, ...fixture() })).toBe(false);
  });

  test('T05 AC1: an end after 1440 is rejected', () => {
    expect(canBook({ start: 1380, end: 1441, ...fixture() })).toBe(false);
  });

  test('T06 AC2: exactly 120 minutes is allowed', () => {
    expect(canBook({ start: 720, end: 840, ...fixture() })).toBe(true);
  });

  test('T07 AC2: 121 minutes is rejected', () => {
    expect(canBook({ start: 720, end: 841, ...fixture() })).toBe(false);
  });

  test('T08 AC4: touching before is allowed', () => {
    expect(canBook({ start: 570, end: 600, ...fixture() })).toBe(true);
  });

  test('T09 AC4: partial overlap is rejected', () => {
    expect(canBook({ start: 630, end: 690, ...fixture() })).toBe(false);
  });

  test('T10 AC4: an interval containing a booking is rejected', () => {
    expect(canBook({ start: 570, end: 690, ...fixture() })).toBe(false);
  });

  test('T11 AC4: an interval inside a booking is rejected', () => {
    expect(canBook({ start: 615, end: 645, ...fixture() })).toBe(false);
  });

  test('T12 AC4: an identical interval is rejected', () => {
    expect(canBook({ start: 600, end: 660, ...fixture() })).toBe(false);
  });

  test('T13 AC3: a blocked room is rejected', () => {
    expect(canBook({ start: 660, end: 720, ...fixture(), blocked: true })).toBe(false);
  });

  test('T14 AC4: an empty booking list has no overlap', () => {
    expect(canBook({ start: 630, end: 690, ...fixture(), bookings: [] })).toBe(true);
  });

  test('AC5: an available check does not change existing bookings', () => {
    const bookings = [{ start: 600, end: 660 }];
    const before = structuredClone(bookings);
    expect(canBook({ start: 660, end: 720, now: 540, blocked: false, bookings })).toBe(true);
    expect(bookings).toEqual(before);
  });

  test('X1 AC1 AC2: an interval may end exactly at 1440', () => {
    expect(canBook({ start: 1320, end: 1440, now: 540, blocked: false, bookings: [] })).toBe(true);
  });

  test('X2 AC1: a one-minute interval after now is allowed', () => {
    expect(canBook({ start: 541, end: 542, now: 540, blocked: false, bookings: [] })).toBe(true);
  });
});
