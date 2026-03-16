import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, RotateCcw } from 'lucide-react'
import { PageWrapper } from '@/components'
import { CounterOrb } from '@/components/CounterOrb'
import { COUNTER_INITIAL } from '@/utils/constants'

export default function Counter() {
  const [count, setCount] = useState(COUNTER_INITIAL)

  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => Math.max(0, c - 1))
  const resetCount = () => setCount(COUNTER_INITIAL)

  const colorClass = count > 0 ? 'text-success-400' : 'text-error-400'
  const glowClass = count > 0 ? 'shadow-[0_0_60px_rgba(34,197,94,0.15)]' : 'shadow-[0_0_60px_rgba(239,68,68,0.15)]'

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto text-center">
        <h1 className="font-display text-h1 font-bold text-text-primary mb-3">Counter</h1>
        <p className="text-text-secondary text-body-lg mb-10">Interact with data-driven visuals in real time</p>

        <div className={`glass-card p-6 sm:p-10 mb-8 sm:mb-10 transition-shadow duration-500 ${glowClass}`}>
          <CounterOrb value={count} />

          <div className="relative h-20 sm:h-32 flex items-center justify-center overflow-hidden my-4 sm:my-8">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -50, opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`font-display text-6xl sm:text-9xl font-bold absolute ${colorClass} transition-colors duration-500`}
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-text-muted text-sm mb-8">
            {count === 0 ? 'Press + to start counting' : `Current value: ${count}`}
          </p>

          <div className="flex items-center justify-center gap-4" role="group" aria-label="Counter controls">
            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={decrement}
              disabled={count === 0}
              aria-label="Decrement"
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center cursor-pointer transition-all border
                ${count === 0
                  ? 'bg-base-800/30 text-text-muted/40 border-border-subtle/50 cursor-default'
                  : 'bg-base-800/80 text-text-primary border-border-subtle hover:border-error-400/40 hover:text-error-400 hover:shadow-glow-sm active:bg-base-700/80'
                }`}
            >
              <Minus className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={resetCount}
              aria-label="Reset counter"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center bg-base-800/80 text-text-secondary border border-border-subtle hover:border-warning-500/40 hover:text-warning-500 cursor-pointer transition-all active:bg-base-700/80"
            >
              <RotateCcw className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={increment}
              aria-label="Increment"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center bg-accent-500/20 text-accent-400 border border-accent-500/30 hover:bg-accent-500/30 hover:shadow-glow-md cursor-pointer transition-all active:bg-accent-500/40"
            >
              <Plus className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
