import { useEffect, useState } from 'react'
import { MapPin } from './icons.jsx'
import ImageUploader from './ImageUploader.jsx'
import VideoUploader from './VideoUploader.jsx'
import { useGeolocation } from '../hooks/useGeolocation.js'
import { CATEGORIES, SEVERITIES } from '../utils/reportConstants.js'

export default function ReportForm({
  initialValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Submit Report',
}) {
  const [title, setTitle] = useState(initialValues?.title || '')
  const [description, setDescription] = useState(initialValues?.description || '')
  const [category, setCategory] = useState(initialValues?.category || CATEGORIES[0])
  const [severity, setSeverity] = useState(initialValues?.severity || SEVERITIES[0])

  const [address, setAddress] = useState(initialValues?.location?.address || '')
  const [city, setCity] = useState(initialValues?.location?.city || '')
  const [state, setState] = useState(initialValues?.location?.state || '')

  const [lat, setLat] = useState(initialValues?.location?.latitude ?? '')
  const [lng, setLng] = useState(initialValues?.location?.longitude ?? '')

  const [existingImages] = useState(initialValues?.images || [])
  const [images, setImages] = useState([])
  const [video, setVideo] = useState(null)

  const [errors, setErrors] = useState({})

  const { coords, isLocating, requestLocation, error: geoError } =
    useGeolocation()

  useEffect(() => {
    if (coords) {
      setLat((prev) => (prev === '' ? coords.lat.toFixed(6) : prev))
      setLng((prev) => (prev === '' ? coords.lng.toFixed(6) : prev))
    }
  }, [coords])

  const validate = () => {
    const next = {}

    if (!title.trim()) next.title = 'Title is required.'
    if (!description.trim()) next.description = 'Description is required.'
    if (!address.trim()) next.address = 'Address is required.'
    if (!city.trim()) next.city = 'City is required.'
    if (!state.trim()) next.state = 'State is required.'

    if (lat === '' || Number.isNaN(Number(lat))) {
      next.lat = 'Latitude is required.'
    }

    if (lng === '' || Number.isNaN(Number(lng))) {
      next.lng = 'Longitude is required.'
    }

    console.log('Validation Errors:', next)

    setErrors(next)

    return Object.keys(next).length === 0
  }
const handleSubmit = (e) => {
  e.preventDefault()

  console.log('1. ReportForm handleSubmit called')

  if (!validate()) {
    console.log('2. Validation failed')
    return
  }

  console.log('3. Validation passed')

  const formData = new FormData()

  formData.append('title', title.trim())
  formData.append('description', description.trim())
  formData.append('category', category)
  formData.append('severity', severity)

  formData.append(
    'location',
    JSON.stringify({
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      latitude: Number(lat),
      longitude: Number(lng),
    })
  )

  images.forEach((image) => {
    formData.append('images', image.file)
  })

  if (video) {
    formData.append('video', video.file)
  }

  console.log('4. Calling parent onSubmit')

  onSubmit(formData)
}
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      <div>
        <label className="label-field">Title</label>
        <input
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="mt-1 text-xs text-signal-stop">{errors.title}</p>}
      </div>

      <div>
        <label className="label-field">Description</label>
        <textarea
          rows={4}
          className="input-field resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="mt-1 text-xs text-signal-stop">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div>
          <label className="label-field">Category</label>
          <select
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-field">Severity</label>
          <select
            className="input-field"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            {SEVERITIES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

      </div>

      <div>
        <label className="label-field">Address</label>
        <input
          className="input-field"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p className="mt-1 text-xs text-signal-stop">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div>
          <label className="label-field">City</label>
          <input
            className="input-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && <p className="mt-1 text-xs text-signal-stop">{errors.city}</p>}
        </div>

        <div>
          <label className="label-field">State</label>
          <input
            className="input-field"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {errors.state && <p className="mt-1 text-xs text-signal-stop">{errors.state}</p>}
        </div>

      </div>

      <div>

        <div className="mb-2 flex items-center justify-between">

          <label className="label-field !mb-0">
            Location
          </label>

          <button
            type="button"
            onClick={requestLocation}
            className="flex items-center gap-1 text-sm font-medium text-hazard-500"
          >
            <MapPin size={16} />
            {isLocating ? 'Locating…' : 'Use my location'}
          </button>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <input
            className="input-field"
            type="number"
            step="any"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />

          <input
            className="input-field"
            type="number"
            step="any"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />

        </div>

        {geoError && (
          <p className="mt-1 text-xs text-signal-stop">
            {geoError}
          </p>
        )}

      </div>

      {existingImages.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {existingImages.map((img) => (
            <img
              key={img}
              src={img}
              className="h-24 w-24 rounded-md object-cover"
            />
          ))}
        </div>
      )}

      <ImageUploader
        images={images}
        onChange={setImages}
      />

      <VideoUploader
        video={video}
        onChange={setVideo}
      />

      <button
        className="btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : submitLabel}
      </button>

    </form>
  )
}