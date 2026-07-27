
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'
import GuestRoute from './GuestRoute.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import AdminRoute from './AdminRoute.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'

// Every page is code-split via React.lazy — each route's chunk is only
// downloaded the first time it's visited, keeping the initial bundle small.
const Home = lazy(() => import('../pages/Home.jsx'))
const Login = lazy(() => import('../pages/Login.jsx'))
const Register = lazy(() => import('../pages/Register.jsx'))
const Dashboard = lazy(() => import('../pages/Dashboard.jsx'))
const Profile = lazy(() => import('../pages/Profile.jsx'))
const EditProfile = lazy(() => import('../pages/EditProfile.jsx'))
const ReportRoadDamage = lazy(() => import('../pages/ReportRoadDamage.jsx'))
const EditReport = lazy(() => import('../pages/EditReport.jsx'))
const MyReports = lazy(() => import('../pages/MyReports.jsx'))
const BrowseReports = lazy(() => import('../pages/BrowseReports.jsx'))
const ViewReport = lazy(() => import('../pages/ViewReport.jsx'))
const Unauthorized = lazy(() => import('../pages/Unauthorized.jsx'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard.jsx'))
const ManageReports = lazy(() => import('../pages/admin/ManageReports.jsx'))
const ReportReview = lazy(() => import('../pages/admin/ReportReview.jsx'))
const ManageUsers = lazy(() => import('../pages/admin/ManageUsers.jsx'))
const UserProfile = lazy(() => import('../pages/admin/UserProfile.jsx'))
const Analytics = lazy(() => import('../pages/admin/Analytics.jsx'))
const MapExplorer = lazy(() => import('../pages/admin/MapExplorer.jsx'))
const NearbyReports = lazy(() => import('../pages/NearbyReports.jsx'))

/**
 * PHASE 4 — complete route table. All-Reports and Report-Details stay
 * public; Citizen pages require ProtectedRoute; Admin pages require
 * AdminRoute + AdminLayout. Every page is lazy-loaded, wrapped in a single
 * top-level Suspense so route transitions show the existing LoadingSpinner
 * instead of a blank screen while a chunk downloads.
 */
export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner fullScreen label="Loading…" />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/reports" element={<BrowseReports />} />
            <Route path="/reports/:id" element={<ViewReport />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/reports/new" element={<ReportRoadDamage />} />
              <Route path="/reports/nearby" element={<NearbyReports />} />
              <Route path="/reports/mine" element={<MyReports />} />
              <Route path="/reports/:id/edit" element={<EditReport />} />
            </Route>
          </Route>

          <Route element={<GuestRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>

          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/reports" element={<ManageReports />} />
              <Route path="/admin/reports/:id" element={<ReportReview />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/users/:id" element={<UserProfile />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/map" element={<MapExplorer />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
