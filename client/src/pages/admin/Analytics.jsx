import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService.js'
import { handleApiError } from '../../utils/errorHandler.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import StatBarChart from '../../components/StatBarChart.jsx'
import PageTransition from '../../components/PageTransition.jsx'
import { BarChart3 } from '../../components/icons.jsx'

/** Turns a { pothole: 12, pending: 4, ... }-shaped object into chart rows. */
function toChartData(obj) {
  if (!obj || typeof obj !== 'object') return null
  const entries = Object.entries(obj)
  if (entries.length === 0) return null
  return entries.map(([label, value]) => ({ label, value }))
}

export default function Analytics() {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    async function loadStats() {
      try {
        const { data } = await adminService.getStats()
        if (!ignore) setStats(data)
      } catch (error) {
        handleApiError(error, 'Could not load analytics.')
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }
    loadStats()
    return () => { ignore = true }
  }, [])

  if (isLoading) return <LoadingSpinner fullScreen label="Loading analytics…" />

  // Only render a chart section for data the backend actually sent — never
  // fabricate a breakdown it didn't provide.
  const byStatus = toChartData(stats?.byStatus)
  const byCategory = toChartData(stats?.byCategory)
  const bySeverity = toChartData(stats?.bySeverity)
  const hasAnyChart = byStatus || byCategory || bySeverity

  return (
    <PageTransition title="Analytics">
      <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">Analytics</h1>

      {!hasAnyChart ? (
        <div className="mt-6">
          <EmptyState
            icon={BarChart3}
            title="No analytics data available yet"
            message="This page will populate automatically once the backend's stats endpoint returns a byStatus, byCategory, or bySeverity breakdown."
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <StatBarChart title="Reports by status" data={byStatus} />
          <StatBarChart title="Reports by category" data={byCategory} />
          <StatBarChart title="Reports by severity" data={bySeverity} />
        </div>
      )}
    </PageTransition>
  )
}
