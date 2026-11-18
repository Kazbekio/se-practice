import { EQUIPMENT, type Room } from '../rooms';

type Props = { rooms: Room[]; selectedId?: string; onSelect: (id: string) => void };

export function RoomCatalog({ rooms, selectedId, onSelect }: Props) {
  return <section className="catalog" aria-labelledby="catalog-heading">
    <div className="section-heading catalog-heading"><div><p className="eyebrow">FIND YOUR SPACE</p><h2 id="catalog-heading">Room catalog</h2></div><span className="count-pill">{rooms.length} rooms</span></div>
    {rooms.length === 0 ? <div className="empty-state" role="status"><div className="empty-symbol" aria-hidden="true">∅</div><h3>No rooms match your needs</h3><p>Try fewer attendees or remove an equipment choice.</p></div> : <div className="room-grid">
      {rooms.map((room, index) => <button className={`room-card ${selectedId === room.id ? 'selected' : ''}`} type="button" key={room.id} data-room-id={room.id} aria-label={`Select ${room.name}`} aria-pressed={selectedId === room.id} onClick={() => onSelect(room.id)}>
        <div className="room-card-top"><span className="room-number">{String(index + 1).padStart(2, '0')}</span><span className={`room-tag ${room.blocked ? 'maintenance' : ''}`}>{room.blocked ? 'Maintenance' : 'Study space'}</span></div>
        <h3>{room.name}</h3><p className="capacity">Up to <strong>{room.capacity}</strong> people</p>
        <div className="equipment-tags">{room.equipment.map(item => <span key={item}>{EQUIPMENT[item] ?? item}</span>)}</div>
        <div className="card-footer"><span>{room.bookings.length} existing booking{room.bookings.length === 1 ? '' : 's'}</span><span className="selection-mark" aria-hidden="true">{selectedId === room.id ? '✓' : '↗'}</span></div>
      </button>)}
    </div>}
  </section>;
}
