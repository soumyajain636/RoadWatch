/**
 * Loading placeholder shown while a report list is fetching. `view` controls
 * whether it renders card-shaped or table-row-shaped skeletons so it can be
 * dropped into either layout.
 */
export default function ReportSkeleton({ view = 'cards', count = 6 }) {
  if (view === 'table') {
    return (
      <div className="card overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-asphalt-100 dark:border-asphalt-800 p-4 last:border-0">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded bg-asphalt-100 dark:bg-asphalt-800" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 animate-pulse rounded bg-asphalt-100 dark:bg-asphalt-800" />
              <div className="h-3 w-1/5 animate-pulse rounded bg-asphalt-100 dark:bg-asphalt-800" />
            </div>
            <div className="h-6 w-16 animate-pulse rounded-full bg-asphalt-100 dark:bg-asphalt-800" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card overflow-hidden">
          <div className="aspect-video w-full animate-pulse bg-asphalt-100 dark:bg-asphalt-800" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-2/3 animate-pulse rounded bg-asphalt-100 dark:bg-asphalt-800" />
            <div className="h-3 w-full animate-pulse rounded bg-asphalt-100 dark:bg-asphalt-800" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-asphalt-100 dark:bg-asphalt-800" />
          </div>
        </div>
      ))}
    </div>
  )
}
