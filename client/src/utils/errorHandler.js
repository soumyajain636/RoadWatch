import { toast } from 'react-toastify'

/**
 * Shows a toast for any Axios error normalized by axiosInstance's
 * response interceptor. Use in every catch block that follows an API call.
 */
export function handleApiError(error, fallbackMessage = 'Something went wrong.') {
  const message = error?.friendlyMessage || fallbackMessage
  toast.error(message)
  return message
}
