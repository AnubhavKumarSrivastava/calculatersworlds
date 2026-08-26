export default function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="result" style={{ padding: 20, borderRadius: 18 }}>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: "#667085" }}>
        {label}
      </p>
      <p style={{ margin: "8px 0 0", fontSize: "clamp(24px,4vw,32px)", fontWeight: 950 }}>
        {value}
      </p>
    </div>
  );
}
