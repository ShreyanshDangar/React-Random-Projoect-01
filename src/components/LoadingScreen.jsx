import { motion } from 'framer-motion'

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel rounded-xl p-8 flex flex-col items-center gap-4"
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-accent-500"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
        <p className="text-text-muted text-sm font-body">Loading...</p>
      </motion.div>
    </div>
  )
}
