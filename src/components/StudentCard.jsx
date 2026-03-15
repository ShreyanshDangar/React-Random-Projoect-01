import { motion } from 'framer-motion'
import { Mail, Phone, User } from 'lucide-react'

export function StudentCard({ name, email, phone, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 25, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="glass-card card-accent-line p-7 group cursor-default hover:shadow-glow-md hover:border-accent-500/20 transition-all duration-300"
    >
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 rounded-xl bg-accent-500/12 flex items-center justify-center border border-accent-500/20 group-hover:bg-accent-500/20 transition-colors">
          <User className="w-6 h-6 text-accent-400" />
        </div>
        <h3 className="font-display font-semibold text-body-lg text-text-primary truncate">{name}</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-text-secondary text-sm">
          <Mail className="w-4.5 h-4.5 text-secondary-400 shrink-0" />
          <span className="truncate">{email}</span>
        </div>
        <div className="flex items-center gap-3 text-text-secondary text-sm">
          <Phone className="w-4.5 h-4.5 text-secondary-400 shrink-0" />
          <span>{phone}</span>
        </div>
      </div>
    </motion.article>
  )
}
