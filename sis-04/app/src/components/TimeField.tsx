type Props = { label: string; id: string; value: string; disabled?: boolean; onChange: (value: string) => void };

export function TimeField({ label, id, value, disabled, onChange }: Props) {
  return <label className="time-field" htmlFor={id}>
    <span>{label}</span>
    <input id={id} type="time" value={value} disabled={disabled} required onChange={event => onChange(event.target.value)} />
  </label>;
}
