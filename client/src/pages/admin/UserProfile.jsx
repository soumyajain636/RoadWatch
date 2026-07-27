import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminService } from '../../services/adminService.js'
import { handleApiError } from '../../utils/errorHandler.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ProfileCard from '../../components/ProfileCard.jsx'
import DeleteUserModal from '../../components/DeleteUserModal.jsx'
import PageTransition from '../../components/PageTransition.jsx'

export default function UserProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let ignore = false
    async function loadUser() {
      try {
        const { data } = await adminService.getUserById(id)
        if (!ignore) setUser(data.user ?? data)
      } catch (error) {
        handleApiError(error, 'Could not load this user.')
        navigate('/admin/users')
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }
    loadUser()
    return () => { ignore = true }
  }, [id, navigate])

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await adminService.deleteUser(id)
      toast.success('User removed.')
      navigate('/admin/users')
    } catch (error) {
      handleApiError(error, 'Could not remove user.')
    } finally {
      setIsDeleting(false)
      setConfirmDelete(false)
    }
  }

  if (isLoading) return <LoadingSpinner fullScreen label="Loading user…" />
  if (!user) return null

  return (
    <PageTransition title={user.name}>
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">User profile</h1>
          {user.role !== 'admin' && (
            <button className="btn-danger !py-1.5" onClick={() => setConfirmDelete(true)}>
              Remove user
            </button>
          )}
        </div>
        <div className="mt-6">
          <ProfileCard user={user} compact={false} showEditLink={false} />
        </div>

        <DeleteUserModal
          user={confirmDelete ? user : null}
          isSubmitting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      </div>
    </PageTransition>
  )
}
