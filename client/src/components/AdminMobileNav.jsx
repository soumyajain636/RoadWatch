import { NavLink } from 'react-router-dom'
import { ADMIN_LINKS } from './Sidebar.jsx'

/** Horizontal scrollable admin nav shown on small screens where Sidebar is hidden. */
export default function AdminMobileNav() {
  return (
    <nav
      aria-label="Admin navigation"
      className="flex gap-1 overflow-x-auto border-b border-asphalt-200 dark:border-asphalt-800 bg-white dark:bg-asphalt-950 px-3 py-2 md:hidden"
    >
      {ADMIN_LINKS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium ${
              isActive
                ? 'bg-hazard-500/10 text-hazard-600 dark:text-hazard-400'
                : 'text-asphalt-600 dark:text-asphalt-300'
            }`
          }
        >
          <Icon size={14} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
