  import axios from 'axios'

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  })

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error),
  )

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        error.friendlyMessage = 'Cannot reach the server. Check your connection and try again.'
        return Promise.reject(error)
      }

      const { status, data } = error.response
      const backendMessage = data?.message || data?.error

      switch (status) {
        case 401:
          error.friendlyMessage = backendMessage || 'Your session has expired. Please log in again.'
          localStorage.removeItem('token')
          window.dispatchEvent(new CustomEvent('auth:unauthorized'))
          break

        case 403:
          error.friendlyMessage = backendMessage || "You don't have permission to do that."
          break

        case 404:
          error.friendlyMessage = backendMessage || 'The requested resource was not found.'
          break

        case 500:
          error.friendlyMessage = backendMessage || 'Something went wrong on our end. Please try again shortly.'
          break

        default:
          error.friendlyMessage = backendMessage || 'Something went wrong. Please try again.'
      }

      return Promise.reject(error)
    },
  )

  export default axiosInstance