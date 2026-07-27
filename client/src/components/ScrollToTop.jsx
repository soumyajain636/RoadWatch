import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll position to the top on every route change, so navigating
 * from a long list (e.g. Manage Reports, page 3) to another page never
 * lands the person mid-scroll on the new page.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
