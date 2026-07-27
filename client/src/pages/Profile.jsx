import { useAuth } from '../hooks/useAuth.js'
import ProfileCard from '../components/ProfileCard.jsx'
import PageTransition from '../components/PageTransition.jsx'

export default function Profile() {
  const { user } = useAuth()

  return (
    <PageTransition title="My Profile">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">My profile</h1>
        <div className="mt-6">
          <ProfileCard user={user} />
        </div>
      </div>
    </PageTransition>
  )
}
