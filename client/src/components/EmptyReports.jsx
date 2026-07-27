import { Link } from 'react-router-dom'
import { FileText } from './icons.jsx'
import EmptyState from './EmptyState.jsx'

/** Report-flavored wrapper around the generic EmptyState. */
export default function EmptyReports({
  title = 'No reports found',
  message = 'Try adjusting your filters, or check back later.',
  showCreateAction = false,
}) {
  return (
    <EmptyState
      icon={FileText}
      title={title}
      message={message}
      action={
        showCreateAction && (
          <Link to="/reports/new" className="btn-primary mt-2">
            Report road damage
          </Link>
        )
      }
    />
  )
}
