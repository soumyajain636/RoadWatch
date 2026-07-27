import { useEffect, useState } from 'react'
import { X } from './icons.jsx'

/**
 * Image grid with a click-to-enlarge lightbox, plus an optional video. Used
 * by Report Details and Report Review so media review doesn't require
 * leaving the page.
 */
export default function MediaGallery({ images = [], video }) {
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (activeIndex === null) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex, images.length])

  if (images.length === 0 && !video) return null

  return (
    <div>
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((url, index) => (
            <button
              key={url}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="aspect-square overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-hazard-500"
              aria-label={`View photo ${index + 1} of ${images.length}`}
            >
              <img src={url} alt="" loading="lazy" className="h-full w-full object-cover transition-transform hover:scale-105" />
            </button>
          ))}
        </div>
      )}

      {video && (
        <video src={video} controls className="mt-4 w-full max-w-md rounded-md">
          <track kind="captions" />
        </video>
      )}

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close photo viewer"
          >
            <X size={22} />
          </button>
          <img
            src={images[activeIndex]}
            alt={`Photo ${activeIndex + 1} of ${images.length}`}
            className="max-h-[85vh] max-w-full rounded-md object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
