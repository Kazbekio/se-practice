// @vitest-environment jsdom
import { describe, expect, test } from 'vitest';
import { canBook } from './booking';
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

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

  test('BUG-A AC4: the exact gap between two bookings is available', () => {
    const bookings = [{ start: 600, end: 660 }, { start: 720, end: 780 }];
    expect(canBook({ start: 660, end: 720, now: 540, blocked: false, bookings })).toBe(true);
  });

  test('BUG-B AC5: a separate afternoon slot leaves bookings unchanged', () => {
    const bookings = [{ start: 600, end: 660 }, { start: 840, end: 900 }];
    const before = structuredClone(bookings);
    expect(canBook({ start: 765, end: 810, now: 540, blocked: false, bookings })).toBe(true);
    expect(bookings).toEqual(before);
  });
});


test('R2 AC6: editing form inputs must not keep stale Available feedback', async () => {
  const flags = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };
  const previousFlag = flags.IS_REACT_ACT_ENVIRONMENT;
  flags.IS_REACT_ACT_ENVIRONMENT = true;
  const host = document.createElement('div');
  document.body.append(host);
  const root = createRoot(host);
  const feedback = () => host.querySelector('.result')?.textContent;
  const setTime = async (input: HTMLInputElement, value: string) => {
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  };

  try {
    await act(async () => { root.render(createElement(App)); });
    await act(async () => { host.querySelector('button')!.click(); });
    expect(feedback()).toBe('Available');

    const times = host.querySelectorAll<HTMLInputElement>('input[type="time"]');
    await setTime(times[2], '10:30');
    expect(feedback()).toBe('Unavailable');
    expect(host.querySelector('.error')?.textContent).toBe('The end time must be after the start time.');

    await setTime(times[2], '12:00');
    expect(feedback()).toBe('Available');
    const blocked = host.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')[1];
    await act(async () => { blocked.click(); });
    expect(feedback()).toBe('Unavailable');
    await act(async () => { blocked.click(); });
    expect(feedback()).toBe('Available');
    await setTime(times[0], '11:00');
    expect(feedback()).toBe('Unavailable');
  } finally {
    await act(async () => { root.unmount(); });
    host.remove();
    flags.IS_REACT_ACT_ENVIRONMENT = previousFlag;
  }
});
