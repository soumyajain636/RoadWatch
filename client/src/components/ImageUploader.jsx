import { useRef } from 'react'
import { Camera, Trash } from './icons.jsx'

const MAX_IMAGES = 5
const MAX_SIZE_MB = 5

/**
 * Controlled multi-image picker. `images` is an array of { file, previewUrl }.
 * Parent owns the state and passes the array into FormData on submit
 * (e.g. formData.append('images', img.file)).
 */
export default function ImageUploader({ images, onChange, maxImages = MAX_IMAGES }) {
  const inputRef = useRef(null)

  const handleFiles = (fileList) => {
    const incoming = Array.from(fileList).filter((file) => {
      if (!file.type.startsWith('image/')) return false
      if (file.size > MAX_SIZE_MB * 1024 * 1024) return false
      return true
    })

    const room = maxImages - images.length
    const accepted = incoming.slice(0, room).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }))

    onChange([...images, ...accepted])
  }

  const removeAt = (index) => {
    URL.revokeObjectURL(images[index].previewUrl)
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((img, index) => (
          <div key={img.previewUrl} className="group relative h-24 w-24 overflow-hidden rounded-md border border-asphalt-200 dark:border-asphalt-700">
            <img src={img.previewUrl} alt={`Upload ${index + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(index)}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove image"
            >
              <Trash size={18} className="text-white" />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-asphalt-300 text-asphalt-400 transition-colors hover:border-hazard-400 hover:text-hazard-500 dark:border-asphalt-700"
          >
            <Camera size={20} />
            <span className="text-xs">Add photo</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ''
        }}
      />
      <p className="mt-2 text-xs text-asphalt-400">
        Up to {maxImages} photos, {MAX_SIZE_MB}MB each.
      </p>
    </div>
  )
}
