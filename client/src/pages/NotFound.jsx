import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

export default function NotFound() {
  return (
    <PageTransition title="Page Not Found">
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-hazard-500">404</p>
      <h1 className="font-display text-4xl font-bold text-asphalt-900 dark:text-white">Road not found</h1>
      <p className="max-w-sm text-asphalt-500 dark:text-asphalt-400">
        This page took a detour that doesn't exist. Let's get you back on route.
      </p>
      <Link to="/" className="btn-primary">Back to home</Link>
    </div>
    </PageTransition>
  )
}
