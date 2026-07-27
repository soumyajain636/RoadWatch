/**
 * Lightweight, dependency-free horizontal bar chart (pure SVG/HTML) used by
 * the Analytics page. Kept dependency-free so charting doesn't pull in a
 * library beyond the agreed stack — swap in a charting library later if
 * richer visuals are needed.
 *
 * `data` is an array of { label, value }. Renders nothing (caller should
 * hide the section) if data is empty — this component never invents bars.
 */
export default function StatBarChart({ title, data }) {
  if (!data || data.length === 0) return null
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="card p-5">
      {title && <h3 className="mb-4 text-sm font-semibold text-asphalt-900 dark:text-white">{title}</h3>}
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.label}>
            <div className="mb-1 flex items-center justify-between text-xs text-asphalt-500 dark:text-asphalt-400">
              <span className="capitalize">{d.label}</span>
              <span className="font-mono">{d.value}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-asphalt-100 dark:bg-asphalt-800">
              <div
                className="h-full rounded-full bg-hazard-500"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
