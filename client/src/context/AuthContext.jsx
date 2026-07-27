import { createContext, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { authService } from '../services/authService.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  const loadCurrentUser = useCallback(async () => {
    const storedToken = localStorage.getItem('token')

    if (!storedToken) {
      setIsAuthLoading(false)
      return
    }

    try {
      const { data } = await authService.getCurrentUser()
      setUser(data.user)
      console.log("User set:", data.user)
      setToken(storedToken)
    } catch {
      localStorage.removeItem('token')
      setUser(null)
      setToken(null)
    } finally {
      setIsAuthLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCurrentUser()
  }, [loadCurrentUser])

  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem('token')
      setUser(null)
      setToken(null)
    }

    window.addEventListener('auth:unauthorized', handleUnauthorized)

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized)
    }
  }, [])

  const login = async (credentials) => {
    console.log("1. Login function started")

    const { data } = await authService.login(credentials)

    console.log("2. API returned:", data)

    localStorage.setItem("token", data.token)
    console.log("3. Token saved")

    setToken(data.token)
    console.log("4. Token state updated")

    setUser(data.user)
    console.log("5. User state updated:", data.user)

    toast.success(`Welcome back, ${data.user.name}!`)

    return data.user
  }

  const register = async (payload) => {
    const { data } = await authService.register(payload)

    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser(data.user)

    toast.success('Account created successfully.')

    return data.user
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
    toast.info('Signed out.')
  }

  const value = {
    user,
    setUser,
    token,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    isAuthLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}