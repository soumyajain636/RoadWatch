import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { handleApiError } from '../utils/errorHandler.js'
import { validateName } from '../utils/validators.js'
import PageTransition from '../components/PageTransition.jsx'

export default function EditProfile() {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })
  const [errors, setErrors] = useState({})
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const validate = () => {
    const nextErrors = { name: validateName(form.name) }
    setErrors(nextErrors)
    return Object.values(nextErrors).every((msg) => !msg)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('name', form.name.trim())
      formData.append('phone', form.phone.trim())
      formData.append('address', form.address.trim())
      if (avatarFile) formData.append('avatar', avatarFile)
      await updateProfile(formData)
      navigate('/profile')
    } catch (error) {
      handleApiError(error, 'Could not update your profile.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition title="Edit Profile">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">Edit profile</h1>

        <form onSubmit={handleSubmit} noValidate className="card mt-6 space-y-5 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-hazard-500/10 text-2xl font-bold text-hazard-500">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="h-16 w-16 object-cover" />
              ) : (
                form.name?.[0]?.toUpperCase() || '?'
              )}
            </div>
            <div>
              <label htmlFor="avatar" className="label-field !mb-1">Profile photo</label>
              <input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm" />
            </div>
          </div>

          <div>
            <label className="label-field" htmlFor="name">Full name</label>
            <input id="name" name="name" className="input-field" value={form.name} onChange={handleChange} />
            {errors.name && <p className="mt-1 text-xs text-signal-stop">{errors.name}</p>}
          </div>
          <div>
            <label className="label-field" htmlFor="phone">Phone</label>
            <input id="phone" name="phone" className="input-field" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="label-field" htmlFor="address">Address</label>
            <input id="address" name="address" className="input-field" value={form.address} onChange={handleChange} />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving…' : 'Save changes'}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </PageTransition>
  )
}
