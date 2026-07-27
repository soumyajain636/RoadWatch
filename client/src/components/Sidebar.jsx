import { NavLink } from 'react-router-dom'
import { BarChart3, FileText, LayoutDashboard, MapPin, Users } from './icons.jsx'

// Exported so AdminMobileNav can render the same links on small screens
// without duplicating this list.
export const ADMIN_LINKS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/reports', label: 'Reports', icon: FileText },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/map', label: 'Map Explorer', icon: MapPin },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-asphalt-200 dark:border-asphalt-800 bg-white dark:bg-asphalt-950 md:block">
      <nav aria-label="Admin navigation" className="sticky top-[57px] flex flex-col gap-1 p-4">
        {ADMIN_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-hazard-500/10 text-hazard-600 dark:text-hazard-400'
                  : 'text-asphalt-600 hover:bg-asphalt-100 dark:text-asphalt-300 dark:hover:bg-asphalt-900'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
