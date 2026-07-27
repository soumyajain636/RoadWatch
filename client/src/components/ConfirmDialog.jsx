import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  danger = false,
  isSubmitting = false,
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null)
  const previouslyFocused = useRef(null)

  // Move focus into the dialog on open, and restore it to whatever
  // triggered the dialog on close — standard modal focus management.
  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement
      confirmRef.current?.focus()
    } else {
      previouslyFocused.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onCancel])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            className="card w-full max-w-sm p-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="confirm-dialog-title" className="text-xl font-semibold text-asphalt-900 dark:text-white">
              {title}
            </h2>
            {message && (
              <p className="mt-2 text-sm text-asphalt-500 dark:text-asphalt-400">{message}</p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button className="btn-secondary" onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </button>
              <button
                ref={confirmRef}
                className={danger ? 'btn-danger' : 'btn-primary'}
                onClick={onConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Working…' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
