import { motion } from 'framer-motion'

export default function StatsCard({ label, value, icon: Icon, isLoading }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-asphalt-500 dark:text-asphalt-400">{label}</p>
        {Icon && <Icon size={18} className="text-hazard-500" />}
      </div>
      {isLoading ? (
        <div className="mt-3 h-8 w-16 animate-pulse rounded bg-asphalt-100 dark:bg-asphalt-800" />
      ) : (
        <p className="mt-2 text-3xl font-bold text-asphalt-900 dark:text-white">{value ?? 0}</p>
      )}
    </motion.div>
  )
}
