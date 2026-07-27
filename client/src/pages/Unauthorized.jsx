import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

export default function Unauthorized() {
  return (
    <PageTransition title="Access Denied">
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-hazard-500">403</p>
      <h1 className="font-display text-4xl font-bold text-asphalt-900 dark:text-white">Access denied</h1>
      <p className="max-w-sm text-asphalt-500 dark:text-asphalt-400">
        You don't have permission to view this page.
      </p>
      <Link to="/dashboard" className="btn-primary">Back to dashboard</Link>
    </div>
    </PageTransition>
  )
}
