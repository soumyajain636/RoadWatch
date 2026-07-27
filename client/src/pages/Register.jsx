import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { handleApiError } from '../utils/errorHandler.js'
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../utils/validators.js'
import PageTransition from '../components/PageTransition.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
    }
    setErrors(nextErrors)
    return Object.values(nextErrors).every((msg) => !msg)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), password: form.password })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      handleApiError(error, 'Registration failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition title="Register">
    <div>
      <h1 className="text-3xl font-bold text-asphalt-900 dark:text-white">Create your account</h1>
      <p className="mt-1 text-sm text-asphalt-500 dark:text-asphalt-400">
        Start reporting road damage in your area.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div>
          <label className="label-field" htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className="input-field"
            value={form.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-signal-stop">{errors.name}</p>}
        </div>
        <div>
          <label className="label-field" htmlFor="email">Email</label>
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
          {errors.email && <p className="mt-1 text-xs text-signal-stop">{errors.email}</p>}
        </div>
        <div>
          <label className="label-field" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            className="input-field"
            value={form.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && <p className="mt-1 text-xs text-signal-stop">{errors.password}</p>}
        </div>
        <div>
          <label className="label-field" htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            className="input-field"
            value={form.confirmPassword}
            onChange={handleChange}
            aria-invalid={Boolean(errors.confirmPassword)}
          />
          {errors.confirmPassword && <p className="mt-1 text-xs text-signal-stop">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-asphalt-500 dark:text-asphalt-400">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-hazard-500 hover:text-hazard-600">
          Log in
        </Link>
      </p>
    </div>
    </PageTransition>
  )
}
