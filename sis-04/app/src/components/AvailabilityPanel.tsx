import type { FormEvent } from 'react';
import type { Room } from '../rooms';
import { formatMinutes, type TimeFields } from '../time';
import { TimeField } from './TimeField';

type Props = {
  room?: Room; fields: TimeFields; result: boolean | null;
  onFieldChange: (key: 'now' | 'start' | 'end', value: string) => void;
  onEndOfDayChange: (value: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AvailabilityPanel({ room, fields, result, onFieldChange, onEndOfDayChange, onSubmit }: Props) {
  return <section className="check-panel" aria-labelledby="check-heading">
    <p className="eyebrow">PLAN YOUR SESSION</p><h2 id="check-heading">Check a time</h2>
    <div className="selected-summary"><span>SELECTED ROOM</span><h3>{room?.name ?? 'No room selected'}</h3></div>
    <form onSubmit={onSubmit}>
      <fieldset className="time-fields" disabled={!room}>
        <TimeField id="current-time" label="Current time" value={fields.now} onChange={value => onFieldChange('now', value)} />
        <div className="time-pair"><TimeField id="start-time" label="Start" value={fields.start} onChange={value => onFieldChange('start', value)} /><TimeField id="end-time" label="End" value={fields.end} disabled={fields.endOfDay} onChange={value => onFieldChange('end', value)} /></div>
        <label className="end-day"><input type="checkbox" checked={fields.endOfDay} onChange={event => onEndOfDayChange(event.target.checked)} /> Ends at 24:00</label>
        <button className="primary-button" type="submit" disabled={!room}>Check availability <span aria-hidden="true">→</span></button>
      </fieldset>
    </form>
    <div className={`decision ${result === null ? 'waiting' : result ? 'available' : 'unavailable'}`} role="status" aria-live="polite">
      {result === null ? <p>{room ? 'Choose a time and check this room.' : 'Choose filters that match at least one room.'}</p> : <><span className="eyebrow">CHECK RESULT</span><p className="decision-value">{result ? 'Available' : 'Unavailable'}</p><p>{result ? 'This time is free. This check does not save a booking.' : 'Check the time order, 120-minute limit, room status and existing bookings.'}</p></>}
    </div>
    <div className="existing-bookings"><h3>Existing bookings</h3><p className="field-note">For the selected room only</p>
      <ul className="booking-list" data-testid="bookings">{room ? room.bookings.length ? room.bookings.map((booking, index) => <li key={index}>{formatMinutes(booking.start)}<span aria-hidden="true"> — </span>{formatMinutes(booking.end)}</li>) : <li>No existing bookings</li> : <li>Select a matching room</li>}</ul>
    </div>
    <p className="panel-footnote">Maximum session: 120 minutes. Times that only touch another booking are allowed.</p>
  </section>;
}
