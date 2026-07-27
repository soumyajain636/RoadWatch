import ConfirmDialog from './ConfirmDialog.jsx'

export default function DeleteUserModal({ user, isSubmitting, onConfirm, onCancel }) {
  return (
    <ConfirmDialog
      open={Boolean(user)}
      title="Remove this user?"
      message={user ? `"${user.name}"'s account will be permanently deleted. This cannot be undone.` : ''}
      confirmLabel="Remove user"
      danger
      isSubmitting={isSubmitting}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  )
}
