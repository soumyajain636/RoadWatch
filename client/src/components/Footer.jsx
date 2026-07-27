export default function Footer() {
  return (
    <footer className="mt-16 border-t border-asphalt-200 dark:border-asphalt-800 bg-white dark:bg-asphalt-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-asphalt-500 dark:text-asphalt-400 sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} RoadWatch. Report it, track it, fix it.</p>
        <p>Built for safer streets.</p>
      </div>
    </footer>
  )
}
