import { Link } from 'react-router-dom'
import StatusPill from './StatusPill.jsx'
import SeverityBadge from './SeverityBadge.jsx'
import { Edit, Trash } from './icons.jsx'

/**
 * Dense table alternative to ReportCard's grid. `onEdit`/`onDelete` are
 * optional — pass them only where the viewer is allowed to act (My Reports,
 * or Report Details' owner/admin actions), otherwise the columns are hidden.
 */
/**
 * Dense table alternative to ReportCard's grid.
 * - `onEdit`/`onDelete`: simple built-in Edit/Delete action columns (used by
 *   My Reports).
 * - `renderActions(report)`: full control over the actions cell — used by
 *   Manage Reports for Verify / In Progress / Resolve / Delete. When
 *   provided, it takes precedence over onEdit/onDelete.
 * - `linkTo(id)`: where the report title links to (public Report Details by
 *   default, or Admin's Report Review page).
 */
export default function ReportTable({ reports, onEdit, onDelete, renderActions, linkTo = (id) => `/reports/${id}` }) {
  const showActions = Boolean(onEdit || onDelete || renderActions)

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-asphalt-100 dark:border-asphalt-800 text-asphalt-400">
          <tr>
            <th className="px-4 py-3 font-medium">Report</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Severity</th>
            <th className="px-4 py-3 font-medium">Status</th>
            {showActions && <th className="px-4 py-3 font-medium text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id} className="border-b border-asphalt-100 dark:border-asphalt-800 last:border-0">
              <td className="px-4 py-3">
                <Link
                  to={linkTo(report._id)}
                  className="flex items-center gap-3 font-medium text-asphalt-900 hover:text-hazard-500 dark:text-white"
                >
                  {report.images?.[0]?.url && (
                    <img
                      src={report.images[0].url}
                      alt=""
                      loading="lazy"
                      className="h-10 w-10 rounded object-cover"
                    />
                  )}
                  <span className="line-clamp-1">{report.title}</span>
                </Link>
              </td>
              <td className="px-4 py-3 text-asphalt-500 dark:text-asphalt-400">{report.category || '—'}</td>
              <td className="px-4 py-3"><SeverityBadge severity={report.severity} /></td>
              <td className="px-4 py-3"><StatusPill status={report.status} /></td>
              {showActions && (
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    {renderActions ? (
                      renderActions(report)
                    ) : (
                      <>
                        {onEdit && (
                          <button
                            onClick={() => onEdit(report)}
                            className="inline-flex items-center gap-1 text-asphalt-500 hover:text-hazard-500"
                          >
                            <Edit size={14} /> Edit
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(report)}
                            className="inline-flex items-center gap-1 text-signal-stop hover:underline"
                          >
                            <Trash size={14} /> Delete
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
