import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminService } from '../../services/adminService.js'
import { handleApiError } from '../../utils/errorHandler.js'
import { useDebounce } from '../../hooks/useDebounce.js'
import UserSkeleton from '../../components/UserSkeleton.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import Pagination from '../../components/Pagination.jsx'
import DeleteUserModal from '../../components/DeleteUserModal.jsx'
import PageTransition from '../../components/PageTransition.jsx'
import { Search, Users } from '../../components/icons.jsx'

const PAGE_SIZE = 10

const USER_STATUS_STYLES = {
  active: 'bg-signal-go/15 text-signal-go',
  suspended: 'bg-signal-stop/15 text-signal-stop',
}

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('all')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)

  const [targetUser, setTargetUser] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => { setPage(1) }, [debouncedSearch, role])

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      const params = {
        page,
        limit: PAGE_SIZE,
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
        ...(role !== 'all' ? { role } : {}),
      }
      const { data } = await adminService.getUsers(params)
      const list = data.users ?? data
      setUsers(list)
      setTotal(data.total ?? list.length)
    } catch (error) {
      handleApiError(error, 'Could not load users.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch, role])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const handleDelete = async () => {
    if (!targetUser) return
    setIsDeleting(true)
    try {
      await adminService.deleteUser(targetUser._id)
      setUsers((prev) => prev.filter((u) => u._id !== targetUser._id))
      setTotal((prev) => Math.max(0, prev - 1))
      toast.success('User removed.')
    } catch (error) {
      handleApiError(error, 'Could not remove user.')
    } finally {
      setIsDeleting(false)
      setTargetUser(null)
    }
  }

  return (
    <PageTransition title="Manage Users">
      <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">Manage users</h1>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-asphalt-400" />
          <input
            className="input-field pl-10"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search users"
          />
        </div>
        <select className="input-field sm:w-40" value={role} onChange={(e) => setRole(e.target.value)} aria-label="Filter by role">
          <option value="all">All roles</option>
          <option value="citizen">Citizen</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <UserSkeleton />
        ) : users.length === 0 ? (
          <EmptyState icon={Users} title="No users found" message="Try a different search or filter." />
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-asphalt-100 dark:border-asphalt-800 text-asphalt-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-asphalt-100 dark:border-asphalt-800 last:border-0">
                    <td className="px-4 py-3">
                      <Link to={`/admin/users/${u._id}`} className="font-medium text-asphalt-900 hover:text-hazard-500 dark:text-white">
                        {u.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-asphalt-500 dark:text-asphalt-400">{u.email}</td>
                    <td className="px-4 py-3 capitalize text-asphalt-500 dark:text-asphalt-400">{u.role}</td>
                    <td className="px-4 py-3">
                      {/* Only rendered if the backend actually sends a status field — no fabricated default. */}
                      {u.status && (
                        <span className={`status-pill ${USER_STATUS_STYLES[u.status] || 'bg-asphalt-200 text-asphalt-600'}`}>
                          {u.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setTargetUser(u)}
                        className="text-signal-stop hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={u.role === 'admin'}
                        title={u.role === 'admin' ? 'Cannot remove an admin' : 'Remove user'}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <DeleteUserModal
        user={targetUser}
        isSubmitting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setTargetUser(null)}
      />
    </PageTransition>
  )
}
