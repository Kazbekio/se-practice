import { EQUIPMENT } from '../rooms';

type Props = {
  attendees: string; selectedEquipment: string[];
  onAttendeesChange: (value: string) => void;
  onEquipmentChange: (value: string[]) => void;
  onReset: () => void;
};

export function RoomFilters({ attendees, selectedEquipment, onAttendeesChange, onEquipmentChange, onReset }: Props) {
  return <section className="filter-panel" aria-labelledby="filter-heading">
    <div className="section-heading"><h2 id="filter-heading">Your group</h2><button className="text-button" type="button" aria-label="Reset filters" onClick={onReset}>Reset</button></div>
    <label className="guest-field" htmlFor="attendees">Attendees
      <input id="attendees" type="number" min="1" step="1" value={attendees} onChange={event => onAttendeesChange(event.target.value)} />
    </label>
    <p className="field-note">Rooms with enough seats will appear.</p>
    <fieldset className="equipment-filter"><legend>What do you need?</legend>
      {Object.entries(EQUIPMENT).map(([key, label]) => <label className="equipment-option" key={key}>
        <input type="checkbox" checked={selectedEquipment.includes(key)} onChange={event => onEquipmentChange(event.target.checked ? [...selectedEquipment, key] : selectedEquipment.filter(item => item !== key))} />
        <span>{label}</span>
      </label>)}
    </fieldset>
    <div className="filter-tip"><span className="small-mark" aria-hidden="true">i</span><p>Every selected item must be in the room. Maintenance rooms stay visible with a label.</p></div>
  </section>;
}
