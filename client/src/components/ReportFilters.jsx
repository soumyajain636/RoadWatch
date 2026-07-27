import { Search } from './icons.jsx'
import { CATEGORIES, SEVERITIES, STATUSES } from '../utils/reportConstants.js'

/**
 * Shared search + status + category + severity filter bar for My Reports
 * and All Reports. Fully controlled — the parent owns all filter state.
 */
export default function ReportFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  severity,
  onSeverityChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <div className="relative flex-1 sm:min-w-[220px]">
        <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-asphalt-400" />
        <input
          className="input-field pl-10"
          placeholder="Search by title or location…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select className="input-field sm:w-40" value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="all">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s} className="capitalize">{s}</option>
        ))}
      </select>

      <select className="input-field sm:w-44" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="all">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select className="input-field sm:w-36" value={severity} onChange={(e) => onSeverityChange(e.target.value)}>
        <option value="all">All severities</option>
        {SEVERITIES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  )
}
