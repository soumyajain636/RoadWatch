/**
 * Pure, reusable field validators shared by Login and Register.
 * Each returns an error string, or '' when the value is valid.
 */

export function validateName(name) {
  if (!name.trim()) return 'Name is required.'
  if (name.trim().length < 2) return 'Name must be at least 2 characters.'
  return ''
}

export function validateEmail(email) {
  if (!email.trim()) return 'Email is required.'
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.trim())) return 'Enter a valid email address.'
  return ''
}

export function validatePassword(password) {
  if (!password) return 'Password is required.'
  if (password.length < 6) return 'Password must be at least 6 characters.'
  return ''
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Please confirm your password.'
  if (password !== confirmPassword) return 'Passwords do not match.'
  return ''
}
