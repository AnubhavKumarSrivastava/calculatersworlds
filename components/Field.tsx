export default function Field({
  label,
  value,
  onChange,
  type = "number",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label style={{ display: "block" }}>
      <span className="field-label">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="light-input"
      />
    </label>
  );
}
