import { useEffect } from 'react'
import { motion } from 'framer-motion'

const SITE_NAME = 'RoadWatch'

/**
 * Subtle fade + rise wrapper applied once per page — the single place pages
 * reach for Framer Motion entrance transitions, so the effect stays
 * consistent app-wide. Also sets document.title when a `title` is passed,
 * so every page gets an SEO/tab-friendly title without each page wiring up
 * its own effect.
 */
export default function PageTransition({ children, title }) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME
  }, [title])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
