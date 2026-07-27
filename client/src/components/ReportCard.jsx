import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Edit, Trash } from './icons.jsx'
import StatusPill from './StatusPill.jsx'
import SeverityBadge from './SeverityBadge.jsx'

export default function ReportCard({ report, onEdit, onDelete }) {
  const thumbnail = report.images?.[0]?.url
  const showActions = Boolean(onEdit || onDelete)

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      className="h-full"
    >
      <div className="card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
        <Link
          to={`/reports/${report._id}`}
          className="contents"
        >
          <div className="aspect-video w-full overflow-hidden bg-asphalt-100 dark:bg-asphalt-800">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={report.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-asphalt-300">
                <MapPin size={28} />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2 p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-1 font-semibold text-asphalt-900 dark:text-white">
                {report.title}
              </h3>

              <StatusPill status={report.status} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {report.category && (
                <span className="text-xs text-asphalt-400">
                  {report.category}
                </span>
              )}

              <SeverityBadge severity={report.severity} />
            </div>

            <p className="line-clamp-2 text-sm text-asphalt-500 dark:text-asphalt-400">
              {report.description}
            </p>

            <div className="mt-auto flex items-center gap-1 pt-2 text-xs text-asphalt-400">
              <MapPin
                size={14}
                className="shrink-0"
              />

              <span className="line-clamp-1">
                {report.location?.address || 'Location on file'}
              </span>
            </div>
          </div>
        </Link>

        {showActions && (
          <div className="flex items-center gap-4 border-t border-asphalt-100 px-4 py-3 dark:border-asphalt-800">
            <Link
              to={`/reports/${report._id}`}
              className="text-xs font-medium text-asphalt-500 hover:text-hazard-500 dark:text-asphalt-400"
            >
              View Details
            </Link>

            {onEdit && (
              <button
                onClick={() => onEdit(report)}
                className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-asphalt-500 hover:text-hazard-500"
              >
                <Edit size={13} />
                Edit
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => onDelete(report)}
                className="inline-flex items-center gap-1 text-xs font-medium text-signal-stop hover:underline"
              >
                <Trash size={13} />
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}