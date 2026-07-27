import { useState, useCallback } from 'react'

/**
 * On-demand browser geolocation. Call requestLocation() from a click handler
 * (e.g. "Use my current location") rather than on mount, since most browsers
 * require a user gesture before prompting for permission.
 */
export function useGeolocation() {
  const [coords, setCoords] = useState(null)
  const [error, setError] = useState(null)
  const [isLocating, setIsLocating] = useState(false)

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.')
      return
    }
    setIsLocating(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsLocating(false)
      },
      (geoError) => {
        setError(geoError.message || 'Unable to retrieve your location.')
        setIsLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }, [])

  return { coords, error, isLocating, requestLocation }
}
