import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { mapService } from '../../services/mapService.js'
import { handleApiError } from '../../utils/errorHandler.js'
import { useGeolocation } from '../../hooks/useGeolocation.js'
import MapView from '../../components/MapView.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import SeverityBadge from '../../components/SeverityBadge.jsx'
import PageTransition from '../../components/PageTransition.jsx'
import { MapPin } from '../../components/icons.jsx'

export default function MapExplorer() {
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)
  const { coords, isLocating, error: geoError, requestLocation } = useGeolocation()

  useEffect(() => {
    let ignore = false
    async function loadMappable() {
      setIsLoading(true)
      try {
        const list = await mapService.getMappableReports({ limit: 500 })
        if (!ignore) setReports(list)
      } catch (error) {
        handleApiError(error, 'Could not load reports for the map.')
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }
    loadMappable()
    return () => { ignore = true }
  }, [])

  const selected = useMemo(() => reports.find((r) => r._id === selectedId), [reports, selectedId])
  const center = selected
    ? [selected.location.lat, selected.location.lng]
    : coords
      ? [coords.lat, coords.lng]
      : undefined

  return (
    <PageTransition title="Map Explorer">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">Map explorer</h1>
        <button onClick={requestLocation} className="btn-secondary !py-1.5">
          <MapPin size={16} /> {isLocating ? 'Locating…' : 'Locate me'}
        </button>
      </div>
      {geoError && <p className="mt-1 text-xs text-signal-stop">{geoError}</p>}

      {isLoading ? (
        <LoadingSpinner fullScreen={false} label="Loading map…" />
      ) : reports.length === 0 ? (
        <div className="mt-6">
          <EmptyState icon={MapPin} title="No mappable reports" message="No reports currently have location data attached." />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MapView
              reports={reports}
              center={center}
              zoom={selected ? 15 : 12}
              height="520px"
              singleMarker={!selected ? coords : null}
              singleMarkerLabel="Your location"
            />
          </div>

          <div className="max-h-[520px] space-y-2 overflow-y-auto">
            {reports.map((report) => (
              <button
                key={report._id}
                onClick={() => setSelectedId(report._id)}
                className={`card block w-full p-3 text-left transition-colors ${
                  selectedId === report._id ? 'ring-2 ring-hazard-500' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-asphalt-900 dark:text-white line-clamp-1">
                    {report.title}
                  </p>
                  <StatusPill status={report.status} />
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <SeverityBadge severity={report.severity} />
                  <span className="text-xs text-asphalt-400 line-clamp-1">{report.address}</span>
                </div>
                <Link
                  to={`/reports/${report._id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 inline-block text-xs font-medium text-hazard-500 hover:underline"
                >
                  Open details →
                </Link>
              </button>
            ))}
          </div>
        </div>
      )}
    </PageTransition>
  )
}
