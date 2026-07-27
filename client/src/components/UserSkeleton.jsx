export default function UserSkeleton({ count = 6 }) {
  return (
    <div className="card overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-asphalt-100 dark:border-asphalt-800 p-4 last:border-0">
          <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-asphalt-100 dark:bg-asphalt-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 animate-pulse rounded bg-asphalt-100 dark:bg-asphalt-800" />
            <div className="h-3 w-1/4 animate-pulse rounded bg-asphalt-100 dark:bg-asphalt-800" />
          </div>
          <div className="h-6 w-14 animate-pulse rounded-full bg-asphalt-100 dark:bg-asphalt-800" />
        </div>
      ))}
    </div>
  )
}
