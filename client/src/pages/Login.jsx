import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { handleApiError } from '../utils/errorHandler.js'
import { validateEmail, validatePassword } from '../utils/validators.js'
import PageTransition from '../components/PageTransition.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validate = () => {
    const nextErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    }

    setErrors(nextErrors)

    return Object.values(nextErrors).every((msg) => !msg)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      console.log('Submitting...')

      const user = await login(form)

      console.log('Returned user:', user)

      alert('LOGIN FINISHED')

      const redirectTo =
        location.state?.from?.pathname ||
        (user?.role === 'admin'
          ? '/admin/dashboard'
          : '/dashboard')

      navigate(redirectTo, { replace: true })
    } catch (error) {
      console.log(error)
      handleApiError(error, 'Login failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition title="Log In">
      <div>
        <h1 className="text-3xl font-bold text-asphalt-900 dark:text-white">
          Welcome back
        </h1>

        <p className="mt-1 text-sm text-asphalt-500 dark:text-asphalt-400">
          Log in to report and track road damage.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 space-y-5"
        >
          <div>
            <label
              className="label-field"
              htmlFor="email"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="input-field"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-signal-stop">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              className="label-field"
              htmlFor="password"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="input-field"
              value={form.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
            />

            {errors.password && (
              <p className="mt-1 text-xs text-signal-stop">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-asphalt-500 dark:text-asphalt-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-hazard-500 hover:text-hazard-600"
          >
            Sign up
          </Link>
        </p>
      </div>
    </PageTransition>
  )
}