export default function Field({ label, value, onChange, type = "number" }: { label: string; value: string; onChange: (x: string) => void; type?: string }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span><input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100" /></label>;
}
