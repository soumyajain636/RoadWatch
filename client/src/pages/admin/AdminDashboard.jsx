import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '../../services/adminService.js'
import { handleApiError } from '../../utils/errorHandler.js'
import StatsCard from '../../components/StatsCard.jsx'
import ReportTable from '../../components/ReportTable.jsx'
import ReportSkeleton from '../../components/ReportSkeleton.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import PageTransition from '../../components/PageTransition.jsx'
import {
  AlertTriangle, BarChart3, Check, FileText, MapPin, ShieldCheck, Users,
} from '../../components/icons.jsx'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [isStatsLoading, setIsStatsLoading] = useState(true)
  const [recentReports, setRecentReports] = useState([])
  const [isRecentLoading, setIsRecentLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    async function loadStats() {
      try {
        const { data } = await adminService.getStats()
        if (!ignore) setStats(data)
      } catch (error) {
        handleApiError(error, 'Could not load dashboard stats.')
      } finally {
        if (!ignore) setIsStatsLoading(false)
      }
    }
    loadStats()
    return () => { ignore = true }
  }, [])

  useEffect(() => {
    let ignore = false
    async function loadRecent() {
      try {
        // "Recent activity" is the most recently created/updated reports —
        // there's no separate activity-log endpoint, so this reuses the
        // existing GET /reports call rather than inventing one.
        const { data } = await adminService.getReports({ limit: 5, sort: '-updatedAt' })
        if (!ignore) setRecentReports(data.reports ?? data)
      } catch (error) {
        handleApiError(error, 'Could not load recent activity.')
      } finally {
        if (!ignore) setIsRecentLoading(false)
      }
    }
    loadRecent()
    return () => { ignore = true }
  }, [])

  const cards = [
    { label: 'Total Users', value: stats?.totalUsers, icon: Users },
    { label: 'Total Reports', value: stats?.totalReports, icon: FileText },
    { label: 'Pending', value: stats?.pendingReports, icon: AlertTriangle },
    { label: 'Verified', value: stats?.verifiedReports, icon: ShieldCheck },
    { label: 'Resolved', value: stats?.resolvedReports, icon: Check },
  ]

  return (
    <PageTransition title="Admin Dashboard">
      <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">Admin dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map(({ label, value, icon }) => (
          <StatsCard key={label} label={label} value={value} icon={icon} isLoading={isStatsLoading} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-asphalt-900 dark:text-white">Quick actions</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/admin/reports" className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-md">
            <div className="rounded-full bg-hazard-500/10 p-2.5 text-hazard-500"><FileText size={20} /></div>
            <p className="text-sm font-semibold text-asphalt-900 dark:text-white">Manage Reports</p>
          </Link>
          <Link to="/admin/users" className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-md">
            <div className="rounded-full bg-hazard-500/10 p-2.5 text-hazard-500"><Users size={20} /></div>
            <p className="text-sm font-semibold text-asphalt-900 dark:text-white">Manage Users</p>
          </Link>
          <Link to="/admin/analytics" className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-md">
            <div className="rounded-full bg-hazard-500/10 p-2.5 text-hazard-500"><BarChart3 size={20} /></div>
            <p className="text-sm font-semibold text-asphalt-900 dark:text-white">Analytics</p>
          </Link>
          <Link to="/admin/map" className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-md">
            <div className="rounded-full bg-hazard-500/10 p-2.5 text-hazard-500"><MapPin size={20} /></div>
            <p className="text-sm font-semibold text-asphalt-900 dark:text-white">Map Explorer</p>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-asphalt-900 dark:text-white">Recent activity</h2>
          <Link to="/admin/reports" className="text-sm font-medium text-hazard-500 hover:text-hazard-600">
            View all reports
          </Link>
        </div>
        <div className="mt-3">
          {isRecentLoading ? (
            <ReportSkeleton view="table" count={5} />
          ) : recentReports.length === 0 ? (
            <EmptyState icon={FileText} title="No report activity yet" />
          ) : (
            <ReportTable reports={recentReports} />
          )}
        </div>
      </div>
    </PageTransition>
  )
}
