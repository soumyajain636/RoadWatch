import { Link, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hazard-stripe relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 flex flex-col justify-between bg-asphalt-950/80 p-12">
          <Link to="/" className="font-display text-3xl font-bold text-white">
            Road<span className="text-hazard-400">Watch</span>
          </Link>
          <div>
            <h2 className="font-display text-4xl font-bold text-white">
              Every pothole reported is a wheel saved.
            </h2>
            <p className="mt-3 max-w-sm text-asphalt-200">
              Track road damage in your neighborhood, follow it through repair, and see it
              resolved on the map.
            </p>
          </div>
          <p className="text-xs text-asphalt-300">© {new Date().getFullYear()} RoadWatch</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 block font-display text-2xl font-bold text-asphalt-900 dark:text-white lg:hidden">
            Road<span className="text-hazard-500">Watch</span>
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
