import { useRef } from 'react'
import { Trash, Video } from './icons.jsx'

const MAX_SIZE_MB = 50

/**
 * Controlled single-video picker. `video` is { file, previewUrl } | null.
 */
export default function VideoUploader({ video, onChange }) {
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('video/')) return
    if (file.size > MAX_SIZE_MB * 1024 * 1024) return
    onChange({ file, previewUrl: URL.createObjectURL(file) })
  }

  const clear = () => {
    if (video) URL.revokeObjectURL(video.previewUrl)
    onChange(null)
  }

  return (
    <div>
      {video ? (
        <div className="relative w-full max-w-xs overflow-hidden rounded-md border border-asphalt-200 dark:border-asphalt-700">
          <video src={video.previewUrl} controls className="w-full" />
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
            aria-label="Remove video"
          >
            <Trash size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full max-w-xs flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-asphalt-300 py-6 text-asphalt-400 transition-colors hover:border-hazard-400 hover:text-hazard-500 dark:border-asphalt-700"
        >
          <Video size={22} />
          <span className="text-xs">Add a short video (optional)</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        hidden
        onChange={(e) => {
          handleFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />
      <p className="mt-2 text-xs text-asphalt-400">Max {MAX_SIZE_MB}MB.</p>
    </div>
  )
}
