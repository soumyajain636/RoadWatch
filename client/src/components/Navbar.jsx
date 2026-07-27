import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Moon, Sun, X } from './icons.jsx'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useTheme } from '../hooks/useTheme.js'
import logo from '../assets/logo.png'

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive
      ? 'text-hazard-500'
      : 'text-asphalt-600 hover:text-asphalt-900 dark:text-asphalt-300 dark:hover:text-white'
  }`

export default function Navbar() {
  const { isAuthenticated, isAuthLoading, user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/login')
  }

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/reports', label: 'Browse Reports' },
    { to: '/reports/nearby', label: 'Report Map' },
    { to: '/reports/new', label: 'Report Damage' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-asphalt-200 bg-white/90 backdrop-blur dark:border-asphalt-800 dark:bg-asphalt-950/90">
      <div className="hazard-stripe h-1 w-full" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

        <Link
          to="/"
          className="flex items-center"
        >
          <img
            src={logo}
            alt="RoadWatch"
            className="h-14 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/reports'}
              className={navLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            className="rounded-md p-2 text-asphalt-500 hover:bg-asphalt-100 dark:hover:bg-asphalt-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthLoading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-asphalt-100 dark:bg-asphalt-800" />
          ) : isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-sm font-medium text-asphalt-600 dark:text-asphalt-300"
              >
                {user?.name?.split(' ')[0] || 'Profile'}
              </Link>

              <button
                onClick={handleLogout}
                className="btn-secondary !py-1.5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-secondary !py-1.5"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn-primary !py-1.5"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="p-2 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </nav>

      {menuOpen && (
        <div className="border-t border-asphalt-200 px-4 py-4 dark:border-asphalt-800 md:hidden">
          <div className="flex flex-col gap-4">

            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/reports'}
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {!isAuthLoading &&
              (isAuthenticated ? (
                <>
                  <NavLink
                    to="/profile"
                    className={navLinkClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="btn-secondary w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-secondary w-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="btn-primary w-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ))}

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-sm text-asphalt-500"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              Toggle theme
            </button>

          </div>
        </div>
      )}
    </header>
  )
}