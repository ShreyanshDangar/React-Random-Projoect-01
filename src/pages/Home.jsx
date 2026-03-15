import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { ArrowRight, Users, UserPlus, BarChart3, ChevronRight } from 'lucide-react'
import { HeroCanvas } from '@/components'
import { useStudents } from '@/hooks/useStudents'
import {
  APP_HEADLINE,
  APP_DESCRIPTION,
  EMPTY_STATE_MESSAGE,
  CTA_TEXT,
  HOME_FEATURES,
  HOME_WORKFLOW,
} from '@/utils/constants'

const iconMap = { Users, UserPlus, BarChart3 }

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const fadeUpSlow = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

const fadeScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const sectionFadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
}

export default function Home() {
  const { count } = useStudents()

  return (
    <div className="relative">
      <HeroCanvas />

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative z-10 pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24 flex items-center justify-center px-4 sm:px-6">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-accent-500/8 border border-accent-500/15"
          >
            <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span className="text-accent-400 text-sm font-medium tracking-wide">
              Next-Gen Student Management
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUpSlow}
            className="font-display text-display font-bold tracking-tight text-gradient mb-6 leading-tight"
          >
            {APP_HEADLINE}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-text-secondary text-body-lg font-body mb-12 max-w-3xl mx-auto leading-snug"
          >
            {APP_DESCRIPTION}
          </motion.p>

          {/* Stat */}
          <motion.div
            variants={fadeScale}
            className="glass-panel rounded-xl p-5 sm:p-8 inline-flex flex-col items-center gap-3 mb-8 sm:mb-10"
          >
            <div className="flex items-center gap-2.5 text-text-muted text-sm">
              <Users className="w-5 h-5 text-accent-400" />
              <span>Students Registered</span>
            </div>
            {count > 0 ? (
              <span className="font-display text-h1 font-bold text-accent-400">
                <CountUp end={count} duration={1.5} />
              </span>
            ) : (
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-text-muted text-sm italic"
              >
                {EMPTY_STATE_MESSAGE}
              </motion.p>
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/add">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
              >
                {CTA_TEXT}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/students">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
              >
                Browse Directory
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ FEATURES SECTION ═══════ */}
      <section className="relative z-10 py-[var(--space-section-sm)] lg:py-[var(--space-section)]">
        <div className="section-container">
          <motion.div {...sectionFadeUp} className="text-center mb-16">
            <span className="text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
              Platform Capabilities
            </span>
            <h2 className="font-display text-h1 font-bold text-text-primary mb-4">
              Everything You Need
            </h2>
            <p className="text-text-secondary text-body-lg max-w-2xl mx-auto">
              A complete toolkit for student lifecycle management, from registration to real-time data tracking.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOME_FEATURES.map((feature, i) => {
              const Icon = iconMap[feature.icon]
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="glass-card card-accent-line p-8 h-full flex flex-col group hover:shadow-glow-md transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mb-6 group-hover:bg-accent-500/20 transition-colors">
                      <Icon className="w-7 h-7 text-accent-400" />
                    </div>
                    <h3 className="font-display text-h3 font-semibold text-text-primary mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-body leading-normal mb-6 flex-1">
                      {feature.description}
                    </p>
                    <Link
                      to={feature.link}
                      className="inline-flex items-center gap-2 text-accent-400 font-medium text-sm hover:gap-3 transition-all group-hover:text-accent-400"
                    >
                      {feature.linkText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════ WORKFLOW SECTION ═══════ */}
      <section className="relative z-10 py-[var(--space-section-sm)] lg:py-[var(--space-section)] border-t border-border-subtle/30">
        <div className="section-container">
          <motion.div {...sectionFadeUp} className="text-center mb-16">
            <span className="text-secondary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
              How It Works
            </span>
            <h2 className="font-display text-h1 font-bold text-text-primary mb-4">
              Simple, Powerful Workflow
            </h2>
            <p className="text-text-secondary text-body-lg max-w-2xl mx-auto">
              Three steps to streamline your student management process from start to finish.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOME_WORKFLOW.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="glass-card p-8 h-full">
                  <span className="font-display text-7xl font-bold text-accent-500/10 absolute top-4 right-6 select-none">
                    {item.step}
                  </span>
                  <h3 className="font-display text-h3 font-semibold text-text-primary mb-3 relative">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-body leading-normal relative">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA SECTION ═══════ */}
      <section className="relative z-10 py-[var(--space-section-sm)] lg:py-[var(--space-section)] border-t border-border-subtle/30">
        <div className="section-container">
          <motion.div {...sectionFadeUp}>
            <div className="glass-panel rounded-2xl p-6 sm:p-12 md:p-16 text-center max-w-4xl mx-auto">
              <h2 className="font-display text-h1 font-bold text-text-primary mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-text-secondary text-body-lg mb-10 max-w-xl mx-auto">
                Begin managing your student data with a platform designed for clarity, speed, and professionalism.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/add">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
                  >
                    <UserPlus className="w-5 h-5" />
                    Register a Student
                  </motion.button>
                </Link>
                <Link to="/students">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-secondary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
                  >
                    View Directory
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-20" />
    </div>
  )
}
