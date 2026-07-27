import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { adminService } from '../../services/adminService.js'
import { handleApiError } from '../../utils/errorHandler.js'
import { useDebounce } from '../../hooks/useDebounce.js'
import { DEFAULT_PAGE_SIZE, SORT_OPTIONS } from '../../utils/reportConstants.js'
import ReportFilters from '../../components/ReportFilters.jsx'
import ReportTable from '../../components/ReportTable.jsx'
import ReportSkeleton from '../../components/ReportSkeleton.jsx'
import EmptyReports from '../../components/EmptyReports.jsx'
import Pagination from '../../components/Pagination.jsx'
import DeleteReportModal from '../../components/DeleteReportModal.jsx'
import PageTransition from '../../components/PageTransition.jsx'
import { Check, ShieldCheck, Trash } from '../../components/icons.jsx'

export default function ManageReports() {
  const [reports, setReports] = useState([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [busyId, setBusyId] = useState(null)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [category, setCategory] = useState('all')
  const [severity, setSeverity] = useState('all')
  const [sort, setSort] = useState(SORT_OPTIONS[0].value)
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)

  const [targetReport, setTargetReport] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, status, category, severity, sort])

  const loadReports = async () => {
    setIsLoading(true)

    try {
      const params = {
        page,
        limit: DEFAULT_PAGE_SIZE,
        sort,
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
        ...(status !== 'all' ? { status } : {}),
        ...(category !== 'all' ? { category } : {}),
        ...(severity !== 'all' ? { severity } : {}),
      }

      const { data } = await adminService.getReports(params)

      const list = Array.isArray(data) ? data : data.reports ?? []

      setReports(list)
      setTotal(data.count ?? list.length)
    } catch (error) {
      handleApiError(error, 'Could not load reports.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadReports()
  }, [page, debouncedSearch, status, category, severity, sort])

  const totalPages = Math.max(1, Math.ceil(total / DEFAULT_PAGE_SIZE))

  const applyStatusChange = async (id, action, nextStatus) => {
    setBusyId(id)

    try {
      await action(id)

      setReports((prev) =>
        prev.map((report) =>
          report._id === id
            ? {
                ...report,
                status: nextStatus,
              }
            : report
        )
      )

      toast.success(`Report marked as ${nextStatus}.`)
    } catch (error) {
      handleApiError(error, 'Could not update report status.')
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async () => {
    if (!targetReport) return

    setIsDeleting(true)

    try {
      await adminService.deleteReport(targetReport._id)

      setReports((prev) => prev.filter((report) => report._id !== targetReport._id))
      setTotal((prev) => Math.max(0, prev - 1))

      toast.success('Report deleted.')
    } catch (error) {
      handleApiError(error, 'Could not delete report.')
    } finally {
      setIsDeleting(false)
      setTargetReport(null)
    }
  }

  return (
    <PageTransition title="Manage Reports">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">
          Manage Reports
        </h1>

        <select
          className="input-field w-auto"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort reports"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
          <ReportSkeleton view="table" />
        ) : reports.length === 0 ? (
          <EmptyReports
            title="No reports match your filters"
            message="Try clearing a filter."
          />
        ) : (
          <ReportTable
            reports={reports}
            linkTo={(id) => `/admin/reports/${id}`}
            renderActions={(report) => (
              <>
                {report.status === 'Pending' && (
                  <button
                    disabled={busyId === report._id}
                    onClick={() =>
                      applyStatusChange(
                        report._id,
                        adminService.verifyReport,
                        'Verified'
                      )
                    }
                    className="inline-flex items-center gap-1 text-hazard-500 hover:underline disabled:opacity-50"
                  >
                    <ShieldCheck size={14} />
                    Verify
                  </button>
                )}

                {report.status === 'Verified' && (
                  <button
                    disabled={busyId === report._id}
                    onClick={() =>
                      applyStatusChange(
                        report._id,
                        adminService.resolveReport,
                        'Resolved'
                      )
                    }
                    className="inline-flex items-center gap-1 text-signal-go hover:underline disabled:opacity-50"
                  >
                    <Check size={14} />
                    Resolve
                  </button>
                )}

                <button
                  onClick={() => setTargetReport(report)}
                  className="inline-flex items-center gap-1 text-signal-stop hover:underline"
                >
                  <Trash size={14} />
                  Delete
                </button>
              </>
            )}
          />
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <DeleteReportModal
        report={targetReport}
        isSubmitting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setTargetReport(null)}
      />
    </PageTransition>
  )
}