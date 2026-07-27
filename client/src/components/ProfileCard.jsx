import { Link } from 'react-router-dom'
import { Edit } from './icons.jsx'

export default function ProfileCard({ user, compact = false, showEditLink = true }) {
  if (!user) return null

  return (
    <div className="card p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-hazard-500/10 text-2xl font-bold text-hazard-500">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} loading="lazy" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            user.name?.[0]?.toUpperCase() || '?'
          )}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold text-asphalt-900 dark:text-white">{user.name}</h2>
          <p className="truncate text-sm text-asphalt-500 dark:text-asphalt-400">{user.email}</p>
        </div>
        {!compact && showEditLink && (
          <Link to="/profile/edit" className="btn-secondary ml-auto shrink-0 !py-1.5">
            <Edit size={16} /> Edit
          </Link>
        )}
      </div>

      {!compact && (
        <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-asphalt-100 dark:border-asphalt-800 pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-asphalt-400">Phone</dt>
            <dd className="mt-1 text-sm text-asphalt-800 dark:text-asphalt-100">{user.phone || '—'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-asphalt-400">Role</dt>
            <dd className="mt-1 text-sm capitalize text-asphalt-800 dark:text-asphalt-100">{user.role || 'citizen'}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-asphalt-400">Address</dt>
            <dd className="mt-1 text-sm text-asphalt-800 dark:text-asphalt-100">{user.address || '—'}</dd>
          </div>
          {user.createdAt && (
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-asphalt-400">Member since</dt>
              <dd className="mt-1 text-sm text-asphalt-800 dark:text-asphalt-100">
                {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
              </dd>
            </div>
          )}
        </dl>
      )}
    </div>
  )
}
