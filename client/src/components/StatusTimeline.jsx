import { STATUSES, STATUS_LABELS } from '../utils/reportConstants.js'
import { Check } from './icons.jsx'

/**
 * Visual pending → verified → in-progress → resolved progress tracker for
 * Report Details / Report Review. Only reflects the report's actual current
 * status field — never fabricates a history log the backend doesn't send.
 */
export default function StatusTimeline({ status }) {
  const currentIndex = STATUSES.indexOf(status || 'Pending')

  return (
    <ol className="flex items-center" aria-label="Report status progress">
      {STATUSES.map((step, index) => {
        const isComplete = index <= currentIndex
        const isLast = index === STATUSES.length - 1
        return (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${isComplete
                    ? 'bg-hazard-500 text-white'
                    : 'bg-asphalt-100 text-asphalt-400 dark:bg-asphalt-800'
                  }`}
                aria-current={index === currentIndex ? 'step' : undefined}
              >
                {isComplete ? <Check size={14} /> : index + 1}
              </div>
              <span className={`text-[11px] ${isComplete ? 'text-asphalt-800 dark:text-asphalt-100' : 'text-asphalt-400'}`}>
                {STATUS_LABELS[step]}
              </span>
            </div>
            {!isLast && (
              <div
                className={`mx-2 h-0.5 flex-1 ${index < currentIndex ? 'bg-hazard-500' : 'bg-asphalt-100 dark:bg-asphalt-800'
                  }`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
