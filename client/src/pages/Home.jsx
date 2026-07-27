import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import PageTransition from '../components/PageTransition.jsx'

export default function Home() {
  const { isAuthenticated, isAdmin } = useAuth()
  const primaryTo = isAuthenticated ? (isAdmin ? '/admin/dashboard' : '/dashboard') : '/register'

  return (
    <PageTransition title="Home">
    <div>
      <section className="relative overflow-hidden">
        <div className="hazard-stripe h-1.5 w-full" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="font-mono text-xs uppercase tracking-widest text-hazard-500">Report → Verify → Resolve</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold leading-tight text-asphalt-900 dark:text-white sm:text-6xl">
            Every pothole starts a paper trail now.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-asphalt-500 dark:text-asphalt-400">
            Snap a photo, drop a pin, and watch your local authority take it from reported to
            resolved — right there on the map.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={primaryTo} className="btn-primary">
              {isAuthenticated ? 'Go to dashboard' : 'Get started'}
            </Link>
            <Link to="/reports" className="btn-secondary">Browse reports</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { step: '01', title: 'Report', copy: 'Photograph the damage and pin its exact location.' },
            { step: '02', title: 'Verify', copy: 'Your local team reviews and confirms the report.' },
            { step: '03', title: 'Resolve', copy: 'Track repair progress until the road is fixed.' },
          ].map((item) => (
            <div key={item.step} className="card p-6">
              <p className="font-mono text-sm text-hazard-500">{item.step}</p>
              <h3 className="mt-2 text-lg font-semibold text-asphalt-900 dark:text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-asphalt-500 dark:text-asphalt-400">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </PageTransition>
  )
}
