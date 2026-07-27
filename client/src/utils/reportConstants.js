export const CATEGORIES = [
  'Pothole',
  'Cracked Pavement',
  'Broken Sidewalk',
  'Faded Markings',
  'Damaged Signage',
  'Other',
]

export const SEVERITIES = ['Low', 'Medium', 'High', 'Critical']

export const STATUSES = [
  'Pending',
  'Verified',
  'Resolved',
]

export const STATUS_LABELS = {
  Pending: 'Pending',
  Verified: 'Verified',
  Resolved: 'Resolved',
}

export const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest first' },
  { value: 'createdAt', label: 'Oldest first' },
  { value: '-severity', label: 'Severity (high to low)' },
]

export const DEFAULT_PAGE_SIZE = 9