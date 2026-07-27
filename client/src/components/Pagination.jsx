export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  )

  return (
    <nav className="mt-8 flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        className="btn-secondary !px-3 !py-1.5"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Prev
      </button>

      {pages.map((p, idx) => (
        <span key={p} className="flex items-center">
          {idx > 0 && pages[idx - 1] !== p - 1 && (
            <span className="px-1 text-asphalt-400">…</span>
          )}
          <button
            onClick={() => onPageChange(p)}
            className={`min-w-9 rounded-md px-3 py-1.5 text-sm font-medium ${
              p === page
                ? 'bg-hazard-500 text-white'
                : 'text-asphalt-600 hover:bg-asphalt-100 dark:text-asphalt-300 dark:hover:bg-asphalt-800'
            }`}
          >
            {p}
          </button>
        </span>
      ))}

      <button
        className="btn-secondary !px-3 !py-1.5"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </nav>
  )
}
