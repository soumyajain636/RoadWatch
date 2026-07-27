import { useEffect, useState } from 'react'
import { reportService } from '../services/reportService.js'
import { handleApiError } from '../utils/errorHandler.js'
import { useGeolocation } from '../hooks/useGeolocation.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import MapView from '../components/MapView.jsx'
import ReportCard from '../components/ReportCard.jsx'
import { MapPin } from '../components/icons.jsx'

const DEFAULT_RADIUS_KM = 5

export default function NearbyReports() {

  console.log("NearbyReports Component Mounted")
  
  const { coords, isLocating, error: geoError, requestLocation } = useGeolocation()

  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [radiusKm, setRadiusKm] = useState(DEFAULT_RADIUS_KM)

  useEffect(() => {
    requestLocation()
  }, [])

  useEffect(() => {
    console.log('coords changed:', coords)

    if (!coords) {
      console.log('No coords yet')
      return
    }

    let ignore = false

    async function loadNearby() {
      setIsLoading(true)

      const params = {
        lat: coords.lat,
        lng: coords.lng,
        distance: radiusKm * 1000,
      }

      console.log('NearbyReports params:', params)

      try {
        const { data } = await reportService.getNearby(params)

        if (!ignore) {
          setReports(data.reports ?? data)
        }
      } catch (error) {
        console.log('Nearby API Error:', error.response?.data)
        handleApiError(error, 'Could not load nearby reports.')
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadNearby()

    return () => {
      ignore = true
    }
  }, [coords, radiusKm])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">
          Nearby reports
        </h1>

        <div className="flex items-center gap-2">
          <label
            htmlFor="radius"
            className="text-sm text-asphalt-500 dark:text-asphalt-400"
          >
            Radius
          </label>

          <select
            id="radius"
            className="input-field w-auto"
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
          >
            <option value={1}>1 km</option>
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={25}>25 km</option>
          </select>
        </div>
      </div>

      {!coords && !isLocating && (
        <div className="mt-6 card flex flex-col items-center gap-3 p-8 text-center">
          <MapPin size={28} className="text-hazard-500" />

          <p className="text-sm text-asphalt-500 dark:text-asphalt-400">
            {geoError || 'We need your location to show reports nearby.'}
          </p>

          <button
            className="btn-primary"
            onClick={requestLocation}
          >
            Share my location
          </button>
        </div>
      )}

      {isLocating && (
        <LoadingSpinner label="Getting your location…" />
      )}

      {coords && (
        <>
          <div className="mt-6">
            <MapView
              reports={reports}
              center={[coords.lat, coords.lng]}
              zoom={13}
              height="380px"
            />
          </div>

          {isLoading ? (
            <LoadingSpinner label="Loading nearby reports…" />
          ) : reports.length === 0 ? (
            <p className="mt-6 text-sm text-asphalt-500 dark:text-asphalt-400">
              No reports found within {radiusKm} km.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <ReportCard
                  key={report._id}
                  report={report}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}