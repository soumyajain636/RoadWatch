import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

/** Requires a logged-in user with role === 'admin'. */
export default function AdminRoute() {
  const { isAuthenticated, isAuthLoading, isAdmin } = useAuth()

  if (isAuthLoading) return <LoadingSpinner fullScreen label="Checking permissions…" />

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
