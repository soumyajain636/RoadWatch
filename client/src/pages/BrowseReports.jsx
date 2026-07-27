import { useEffect, useState } from 'react'
import { reportService } from '../services/reportService.js'
import { handleApiError } from '../utils/errorHandler.js'
import { useDebounce } from '../hooks/useDebounce.js'
import { DEFAULT_PAGE_SIZE } from '../utils/reportConstants.js'
import ReportCard from '../components/ReportCard.jsx'
import ReportTable from '../components/ReportTable.jsx'
import ReportFilters from '../components/ReportFilters.jsx'
import ReportSkeleton from '../components/ReportSkeleton.jsx'
import EmptyReports from '../components/EmptyReports.jsx'
import Pagination from '../components/Pagination.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { LayoutDashboard } from '../components/icons.jsx'

export default function BrowseReports() {
  const [reports, setReports] = useState([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState('cards')

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [category, setCategory] = useState('all')
  const [severity, setSeverity] = useState('all')
  const [page, setPage] = useState(1)

  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, status, category, severity])

  useEffect(() => {
    let ignore = false

    const loadReports = async () => {
      try {
        setIsLoading(true)

        const params = {
          page,
          limit: DEFAULT_PAGE_SIZE,
          ...(debouncedSearch && { search: debouncedSearch }),
          ...(status !== 'all' && { status }),
          ...(category !== 'all' && { category }),
          ...(severity !== 'all' && { severity }),
        }

        const { data } = await reportService.getAll(params)

        if (ignore) return

        const list = data.reports ?? []

        setReports(list)
        setTotal(data.count ?? list.length)
      } catch (error) {
        handleApiError(error, 'Could not load reports.')
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadReports()

    return () => {
      ignore = true
    }
  }, [page, debouncedSearch, status, category, severity])

  const totalPages = Math.max(
    1,
    Math.ceil(total / DEFAULT_PAGE_SIZE)
  )

  return (
    <PageTransition title="All Reports">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">
            All Reports
          </h1>

          <button
            className="btn-secondary !py-1.5"
            onClick={() =>
              setView((v) => (v === 'cards' ? 'table' : 'cards'))
            }
          >
            <LayoutDashboard size={16} />
            {view === 'cards'
              ? ' Table View'
              : ' Card View'}
          </button>
        </div>

        <div className="mt-4">
          <ReportFilters
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            category={category}
            onCategoryChange={setCategory}
            severity={severity}
            onSeverityChange={setSeverity}
          />
        </div>

        <div className="mt-6">
          {isLoading ? (
            <ReportSkeleton view={view} />
          ) : reports.length === 0 ? (
            <EmptyReports
              title="No reports match your search"
              message="Try a different keyword or clear a filter."
            />
          ) : view === 'table' ? (
            <ReportTable reports={reports} />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <ReportCard
                  key={report._id}
                  report={report}
                />
              ))}
            </div>
          )}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </PageTransition>
  )
}