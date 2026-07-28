import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

export default function GuestRoute() {
  const { isAuthenticated, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return <LoadingSpinner fullScreen label="Loading…" />
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}