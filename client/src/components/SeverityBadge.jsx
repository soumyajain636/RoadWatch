const SEVERITY_STYLES = {
  low: 'bg-signal-go/15 text-signal-go',
  medium: 'bg-signal-caution/15 text-signal-caution',
  high: 'bg-hazard-500/15 text-hazard-600 dark:text-hazard-400',
  critical: 'bg-signal-stop/15 text-signal-stop',
}

export default function SeverityBadge({ severity }) {
  if (!severity) return null
  const normalized = severity.toLowerCase()
  const style = SEVERITY_STYLES[normalized] || 'bg-asphalt-200 text-asphalt-600'
  return <span className={`status-pill ${style}`}>{severity}</span>
}
