import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

/** For login/register — redirects away if already authenticated. */
export default function GuestRoute() {
  const { isAuthenticated, isAuthLoading, isAdmin } = useAuth()

  if (isAuthLoading) return <LoadingSpinner fullScreen label="Loading…" />

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/admin/dashboard' : '/dashboard'} replace />
  }

  return <Outlet />
}
