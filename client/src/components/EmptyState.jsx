/**
 * Generic empty-state block reused wherever a list can legitimately come
 * back with zero results (reports, users, map markers, analytics data).
 */
export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-asphalt-300 dark:border-asphalt-700 py-16 text-center">
      {Icon && <Icon size={28} className="text-asphalt-300 dark:text-asphalt-600" />}
      <p className="font-semibold text-asphalt-700 dark:text-asphalt-200">{title}</p>
      {message && <p className="max-w-xs text-sm text-asphalt-500 dark:text-asphalt-400">{message}</p>}
      {action}
    </div>
  )
}
