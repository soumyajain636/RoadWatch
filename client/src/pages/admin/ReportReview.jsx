import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminService } from '../../services/adminService.js'
import { handleApiError } from '../../utils/errorHandler.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import SeverityBadge from '../../components/SeverityBadge.jsx'
import StatusTimeline from '../../components/StatusTimeline.jsx'
import MediaGallery from '../../components/MediaGallery.jsx'
import MapView from '../../components/MapView.jsx'
import DeleteReportModal from '../../components/DeleteReportModal.jsx'
import PageTransition from '../../components/PageTransition.jsx'
import { Check, MapPin, ShieldCheck, Users } from '../../components/icons.jsx'

export default function ReportReview() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isActing, setIsActing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadReport = async () => {
    try {
      const { data } = await adminService.getReportById(id)
      setReport(data.report ?? data)
    } catch (error) {
      handleApiError(error, 'Could not load this report.')
      navigate('/admin/reports')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadReport()
  }, [id])

  const runAction = async (action, nextStatus) => {
    setIsActing(true)

    try {
      await action(id)
      setReport((prev) => ({
        ...prev,
        status: nextStatus,
      }))
      toast.success(`Report marked as ${nextStatus}.`)
    } catch (error) {
      handleApiError(error, 'Could not update report status.')
    } finally {
      setIsActing(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      await adminService.deleteReport(id)
      toast.success('Report deleted.')
      navigate('/admin/reports')
    } catch (error) {
      handleApiError(error, 'Could not delete report.')
    } finally {
      setIsDeleting(false)
      setConfirmDelete(false)
    }
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen label="Loading report…" />
  }

  if (!report) {
    return null
  }

  return (
    <PageTransition title={`Review: ${report.title}`}>
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">
              {report.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <SeverityBadge severity={report.severity} />
              {report.category && (
                <span className="text-xs text-asphalt-400">
                  {report.category}
                </span>
              )}
            </div>
          </div>

          <button
            className="btn-danger !py-1.5"
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </button>
        </div>

        <div className="card mt-6 p-5">
          <StatusTimeline status={report.status} />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {report.status === 'Pending' && (
            <button
              disabled={isActing}
              onClick={() =>
                runAction(adminService.verifyReport, 'Verified')
              }
              className="btn-primary"
            >
              <ShieldCheck size={16} />
              Verify Report
            </button>
          )}

          {report.status === 'Verified' && (
            <button
              disabled={isActing}
              onClick={() =>
                runAction(adminService.resolveReport, 'Resolved')
              }
              className="btn-primary"
            >
              <Check size={16} />
              Mark Resolved
            </button>
          )}

          {report.status === 'Resolved' && (
            <StatusPill status="Resolved" />
          )}
        </div>

        <div className="mt-6">
          <MediaGallery
            images={report.images}
            video={report.video}
          />
        </div>

        <p className="mt-6 whitespace-pre-line text-asphalt-700 dark:text-asphalt-200">
          {report.description}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {report.user?.name && (
            <div className="card p-4">
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-asphalt-400">
                <Users size={14} />
                Reported By
              </p>

              <p className="mt-1 text-sm text-asphalt-800 dark:text-asphalt-100">
                {report.user.name}
              </p>

              {report.user.email && (
                <p className="mt-0.5 text-xs text-asphalt-400">
                  {report.user.email}
                </p>
              )}
            </div>
          )}

          {report.location?.address && (
            <div className="card p-4">
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-asphalt-400">
                <MapPin size={14} />
                Location
              </p>

              <p className="mt-1 text-sm text-asphalt-800 dark:text-asphalt-100">
                {report.location.address}
              </p>

              {report.location.latitude != null &&
                report.location.longitude != null && (
                  <p className="mt-1 font-mono text-xs text-asphalt-400">
                    {Number(report.location.latitude).toFixed(6)},
                    {' '}
                    {Number(report.location.longitude).toFixed(6)}
                  </p>
                )}
            </div>
          )}
        </div>

        {report.location?.latitude != null &&
          report.location?.longitude != null && (
            <div className="mt-4">
              <MapView
                singleMarker={{
                  lat: report.location.latitude,
                  lng: report.location.longitude,
                }}
                singleMarkerLabel="Report location"
                center={[
                  report.location.latitude,
                  report.location.longitude,
                ]}
                height="280px"
              />
            </div>
          )}

        <DeleteReportModal
          report={confirmDelete ? report : null}
          isSubmitting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      </div>
    </PageTransition>
  )
}