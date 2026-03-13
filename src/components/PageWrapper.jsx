import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const pageTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
}

export function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className={`min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.div>
  )
}
