import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

export default function ProtectedRoute() {
  const { isAuthenticated, isAuthLoading } = useAuth()
  const location = useLocation()

  if (isAuthLoading) return <LoadingSpinner fullScreen label="Checking your session…" />

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
