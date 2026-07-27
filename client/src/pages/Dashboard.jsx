import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { reportService } from '../services/reportService.js'
import { handleApiError } from '../utils/errorHandler.js'
import { useAuth } from '../hooks/useAuth.js'
import ReportCard from '../components/ReportCard.jsx'
import ReportSkeleton from '../components/ReportSkeleton.jsx'
import EmptyReports from '../components/EmptyReports.jsx'
import StatsCard from '../components/StatsCard.jsx'
import ProfileCard from '../components/ProfileCard.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { AlertTriangle, Check, FileText, MapPin, ShieldCheck } from '../components/icons.jsx'

function deriveCounts(reports) {
  return reports.reduce(
    (acc, report) => {
      acc.total += 1

      switch (report.status) {
        case 'Pending':
          acc.pending += 1
          break

        case 'Verified':
          acc.verified += 1
          break

        case 'Resolved':
          acc.resolved += 1
          break

        default:
          break
      }

      return acc
    },
    {
      total: 0,
      pending: 0,
      verified: 0,
      resolved: 0,
    }
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    async function loadMyReports() {
      setIsLoading(true)
      try {
        // Fetched once and reused both for the stat cards and the "recent
        // reports" preview, so counts and the list below always agree.
        const { data } = await reportService.getMine({ sort: '-createdAt' })
        if (!ignore) setReports(data.reports ?? data)
      } catch (error) {
        handleApiError(error, 'Could not load your dashboard.')
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }
    loadMyReports()
    return () => { ignore = true }
  }, [])

  const counts = deriveCounts(reports)
  const recentReports = reports.slice(0, 3)

  return (
    <PageTransition title="Dashboard">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold text-asphalt-900 dark:text-white">
          Welcome, {user?.name?.split(' ')[0] || 'Citizen'}
        </h1>
        <p className="mt-1 text-asphalt-500 dark:text-asphalt-400">
          Here's a quick look at your reporting activity.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatsCard label="Total Reports" value={counts.total} icon={FileText} isLoading={isLoading} />
          <StatsCard label="Pending" value={counts.pending} icon={AlertTriangle} isLoading={isLoading} />
          <StatsCard label="Verified" value={counts.verified} icon={ShieldCheck} isLoading={isLoading} />
          <StatsCard label="Resolved" value={counts.resolved} icon={Check} isLoading={isLoading} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-asphalt-900 dark:text-white">Quick actions</h2>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Link to="/reports/new" className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-md">
                <div className="rounded-full bg-hazard-500/10 p-2.5 text-hazard-500"><FileText size={20} /></div>
                <div>
                  <p className="text-sm font-semibold text-asphalt-900 dark:text-white">Report Damage</p>
                  <p className="text-xs text-asphalt-500 dark:text-asphalt-400">Submit a new report</p>
                </div>
              </Link>
              <Link to="/reports/mine" className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-md">
                <div className="rounded-full bg-hazard-500/10 p-2.5 text-hazard-500"><FileText size={20} /></div>
                <div>
                  <p className="text-sm font-semibold text-asphalt-900 dark:text-white">My Reports</p>
                  <p className="text-xs text-asphalt-500 dark:text-asphalt-400">Track your submissions</p>
                </div>
              </Link>
              <Link to="/reports" className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-md">
                <div className="rounded-full bg-hazard-500/10 p-2.5 text-hazard-500"><MapPin size={20} /></div>
                <div>
                  <p className="text-sm font-semibold text-asphalt-900 dark:text-white">All Reports</p>
                  <p className="text-xs text-asphalt-500 dark:text-asphalt-400">Browse public reports</p>
                </div>
              </Link>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-asphalt-900 dark:text-white">Recent reports</h2>
                <Link to="/reports/mine" className="text-sm font-medium text-hazard-500 hover:text-hazard-600">
                  View all
                </Link>
              </div>

              <div className="mt-4">
                {isLoading ? (
                  <ReportSkeleton count={3} />
                ) : recentReports.length === 0 ? (
                  <EmptyReports
                    title="No reports yet"
                    message="Once you submit a report, it will show up here."
                    showCreateAction
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {recentReports.map((report) => <ReportCard key={report._id} report={report} />)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-asphalt-900 dark:text-white">Profile summary</h2>
            <div className="mt-3">
              <ProfileCard user={user} compact />
              <Link to="/profile" className="btn-secondary mt-3 w-full">
                View full profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
