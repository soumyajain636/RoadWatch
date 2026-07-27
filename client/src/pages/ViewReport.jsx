import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reportService } from '../services/reportService.js'
import { handleApiError } from '../utils/errorHandler.js'
import { useAuth } from '../hooks/useAuth.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import StatusPill from '../components/StatusPill.jsx'
import SeverityBadge from '../components/SeverityBadge.jsx'
import StatusTimeline from '../components/StatusTimeline.jsx'
import MediaGallery from '../components/MediaGallery.jsx'
import MapView from '../components/MapView.jsx'
import DeleteReportModal from '../components/DeleteReportModal.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { Edit, MapPin, Users } from '../components/icons.jsx'

export default function ViewReport() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()

  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [targetReport, setTargetReport] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let ignore = false

    const loadReport = async () => {
      try {
        const { data } = await reportService.getById(id)

        if (!ignore) {
          setReport(data.report)
        }
      } catch (error) {
        handleApiError(error, 'Could not load this report.')
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadReport()

    return () => {
      ignore = true
    }
  }, [id])

  const ownerId = report?.user?._id ?? report?.user

  const isOwner = Boolean(
    report &&
    user &&
    ownerId === user._id
  )

  const canManage = isOwner || isAdmin

  const hasLocation =
    report?.location?.latitude != null &&
    report?.location?.longitude != null

  const handleDelete = async () => {
    if (!targetReport) return

    try {
      setIsDeleting(true)

      await reportService.remove(targetReport._id)

      toast.success('Report deleted.')

      navigate(isOwner ? '/reports/my-reports' : '/reports')
    } catch (error) {
      handleApiError(error, 'Could not delete report.')
    } finally {
      setIsDeleting(false)
      setTargetReport(null)
    }
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen label="Loading report..." />
  }

  if (!report) {
    return null
  }
  console.log(report.images);
  return (
    <PageTransition title={report.title}>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">
              {report.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusPill status={report.status} />
              <SeverityBadge severity={report.severity} />

              {report.category && (
                <span className="text-xs text-asphalt-400">
                  {report.category}
                </span>
              )}
            </div>
          </div>

          {canManage && (
            <div className="flex gap-2">
              {isOwner && (
                <Link
                  to={`/reports/${id}/edit`}
                  className="btn-secondary !py-1.5"
                >
                  <Edit size={16} />
                  Edit
                </Link>
              )}

              <button
                className="btn-danger !py-1.5"
                onClick={() => setTargetReport(report)}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="card mt-6 p-5">
          <StatusTimeline status={report.status} />
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
          {report.location?.address && (
            <div className="card p-4">
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-asphalt-400">
                <MapPin size={14} />
                Location
              </p>

              <p className="mt-1 text-sm text-asphalt-800 dark:text-asphalt-100">
                {report.location.address}
              </p>

              <p className="text-xs text-asphalt-500">
                {report.location.city}, {report.location.state}
              </p>

              {hasLocation && (
                <p className="mt-1 font-mono text-xs text-asphalt-400">
                  {Number(report.location.latitude).toFixed(6)},{' '}
                  {Number(report.location.longitude).toFixed(6)}
                </p>
              )}
            </div>
          )}

          {report.user?.name && (
            <div className="card p-4">
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-asphalt-400">
                <Users size={14} />
                Reported By
              </p>

              <p className="mt-1 text-sm text-asphalt-800 dark:text-asphalt-100">
                {report.user.name}
              </p>

              {report.createdAt && (
                <p className="mt-1 text-xs text-asphalt-400">
                  {new Date(report.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          )}
        </div>

        {hasLocation && (
          <div className="mt-4">
            <MapView
              singleMarker={{
                lat: report.location.latitude,
                lng: report.location.longitude,
              }}
              singleMarkerLabel="Report Location"
              center={[
                report.location.latitude,
                report.location.longitude,
              ]}
              height="320px"
            />
          </div>
        )}

        <DeleteReportModal
          report={targetReport}
          isSubmitting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setTargetReport(null)}
        />
      </div>
    </PageTransition>
  )
}