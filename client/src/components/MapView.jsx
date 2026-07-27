import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import StatusPill from './StatusPill.jsx'
import SeverityBadge from './SeverityBadge.jsx'

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

function RecenterMap({ center }) {
  const map = useMap()

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom())
    }
  }, [center, map])

  return null
}

function ClickCapture({ onMapClick }) {
  const map = useMap()

  useEffect(() => {
    const handleClick = (e) =>
      onMapClick({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      })

    map.on('click', handleClick)

    return () => map.off('click', handleClick)
  }, [map, onMapClick])

  return null
}

export default function MapView({
  reports = [],
  center = [26.9124, 75.7873],
  zoom = 12,
  height = '420px',
  onMapClick,
  singleMarker,
  singleMarkerLabel = 'Location',
}) {
  const validReports = reports.filter(
    (report) =>
      report.location?.latitude != null &&
      report.location?.longitude != null
  )

  return (
    <div
      style={{ height }}
      className="w-full overflow-hidden rounded-lg border border-asphalt-200 dark:border-asphalt-800"
      role="application"
      aria-label="Road Damage Map"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap center={center} />

        {onMapClick && (
          <ClickCapture onMapClick={onMapClick} />
        )}

        {singleMarker?.lat != null &&
          singleMarker?.lng != null && (
            <Marker
              position={[
                singleMarker.lat,
                singleMarker.lng,
              ]}
              icon={defaultIcon}
            >
              <Popup>{singleMarkerLabel}</Popup>
            </Marker>
          )}

        {validReports.map((report) => (
          <Marker
            key={report._id}
            position={[
              report.location.latitude,
              report.location.longitude,
            ]}
            icon={defaultIcon}
          >
            <Popup minWidth={220}>
              <div className="space-y-2">

                {report.images?.[0]?.url && (
                  <img
                    src={report.images[0].url}
                    alt={report.title}
                    className="h-20 w-full rounded object-cover"
                    loading="lazy"
                  />
                )}

                <p className="font-semibold">
                  {report.title}
                </p>

                <div className="flex flex-wrap gap-2">
                  <StatusPill status={report.status} />
                  <SeverityBadge severity={report.severity} />
                </div>

                {report.location?.address && (
                  <p className="text-xs text-asphalt-500">
                    {report.location.address}
                  </p>
                )}

                <Link
                  to={`/reports/${report._id}`}
                  className="block text-sm font-medium text-hazard-600 hover:underline"
                >
                  Open Report →
                </Link>

              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}