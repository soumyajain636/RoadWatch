export default function LoadingSpinner({ label = 'Loading…', fullScreen = false, size = 'md' }) {
  const sizes = { sm: 'h-4 w-4 border-2', md: 'h-8 w-8 border-2', lg: 'h-12 w-12 border-[3px]' }

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-hazard-500 border-t-transparent`}
        role="status"
        aria-label={label}
      />
      {label && <p className="text-sm text-asphalt-500 dark:text-asphalt-400">{label}</p>}
    </div>
  )

  if (!fullScreen) return spinner

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      {spinner}
    </div>
  )
}
