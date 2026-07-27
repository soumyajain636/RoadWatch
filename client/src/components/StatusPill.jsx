const STATUS_STYLES = {
  Pending: 'bg-signal-caution/15 text-signal-caution',
  Verified: 'bg-hazard-500/15 text-hazard-600 dark:text-hazard-400',
  Resolved: 'bg-signal-go/15 text-signal-go',
}

export default function StatusPill({ status }) {
  const currentStatus = status || 'Pending'
  const style =
    STATUS_STYLES[currentStatus] ||
    'bg-asphalt-200 text-asphalt-600'

  return <span className={`status-pill ${style}`}>{currentStatus}</span>
}