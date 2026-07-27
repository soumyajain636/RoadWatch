import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import AdminMobileNav from '../components/AdminMobileNav.jsx'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-asphalt-50 dark:bg-asphalt-950">
      <Navbar />
      <AdminMobileNav />
      <div className="flex flex-1">
        <Sidebar />
        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
