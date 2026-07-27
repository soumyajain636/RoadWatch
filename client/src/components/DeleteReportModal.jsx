import ConfirmDialog from './ConfirmDialog.jsx'

/**
 * Report-specific wrapper around the generic ConfirmDialog so every delete
 * flow (My Reports, Report Details) shows the same wording without
 * duplicating the dialog markup.
 */
export default function DeleteReportModal({ report, isSubmitting, onConfirm, onCancel }) {
  return (
    <ConfirmDialog
      open={Boolean(report)}
      title="Delete this report?"
      message={report ? `"${report.title}" will be permanently removed. This cannot be undone.` : ''}
      confirmLabel="Delete report"
      danger
      isSubmitting={isSubmitting}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  )
}
