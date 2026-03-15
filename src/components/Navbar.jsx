import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { NAV_LINKS, APP_NAME } from '@/utils/constants'

function PortalXLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="28" height="28" rx="8" stroke="url(#logo-grad)" strokeWidth="2" fill="none" />
      <path d="M10 11h5l-3 10h-5l3-10z" fill="url(#logo-grad)" />
      <path d="M17 11h5l-3 10h-5l3-10z" fill="url(#logo-grad)" opacity="0.6" />
      <circle cx="24" cy="10" r="2.5" fill="#60a5fa" />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function HamburgerIcon({ isOpen }) {
  return (
    <div className="hamburger-icon" aria-label={isOpen ? 'Close menu' : 'Open menu'}>
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          display: 'block', width: '20px', height: '2px',
          background: 'var(--color-accent-400)', borderRadius: '2px',
        }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          display: 'block', width: '20px', height: '2px',
          background: 'var(--color-text-secondary)', borderRadius: '2px', marginTop: '4px',
        }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          display: 'block', width: '20px', height: '2px',
          background: 'var(--color-accent-400)', borderRadius: '2px', marginTop: '4px',
        }}
      />
    </div>
  )
}

export function Navbar() {
  const location = useLocation()
  const navRef = useRef(null)
  const linksContainerRef = useRef(null)
  const linkRefs = useRef({})
  const [hoverIndex, setHoverIndex] = useState(null)
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const activeIndex = NAV_LINKS.findIndex((link) => link.path === location.pathname)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const idx = hoverIndex !== null ? hoverIndex : activeIndex
    if (idx < 0) {
      setBubbleStyle((prev) => ({ ...prev, opacity: 0 }))
      return
    }
    const el = linkRefs.current[idx]
    const container = linksContainerRef.current
    if (el && container) {
      const containerRect = container.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      setBubbleStyle({
        left: elRect.left - containerRect.left,
        width: elRect.width,
        opacity: 1,
      })
    }
  }, [hoverIndex, activeIndex, location.pathname])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      )
    }
  }, [])

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 nav-responsive" aria-label="Main navigation">
      <div
        ref={navRef}
        className="flex items-center gap-1.5 px-3 py-2 rounded-pill glass-panel opacity-0 nav-inner"
        style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      >
        <NavLink to="/" className="flex items-center gap-2.5 px-3.5 py-2 shrink-0" aria-label="Home">
          <PortalXLogo />
          <span className="font-display font-semibold text-body text-text-primary tracking-tight hidden sm:block">
            {APP_NAME}
          </span>
        </NavLink>

        <div className="w-px h-6 bg-border-subtle mx-1 nav-desktop-only" />

        <div ref={linksContainerRef} className="relative flex items-center gap-1 nav-desktop-only">
          <motion.div
            className="absolute top-0 h-full rounded-pill bg-accent-500/12 border border-accent-500/25"
            animate={{
              left: bubbleStyle.left,
              width: bubbleStyle.width,
              opacity: bubbleStyle.opacity,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            style={{ pointerEvents: 'none' }}
          />

          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              ref={(el) => { linkRefs.current[i] = el }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className={() => {
                const isActive = location.pathname === link.path
                return `relative z-10 px-4 py-2 text-body font-body font-medium rounded-pill transition-colors whitespace-nowrap ${isActive ? 'text-accent-400' : 'text-text-secondary hover:text-text-primary'
                  }`
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          className="nav-mobile-only ml-auto p-2 cursor-pointer bg-transparent border-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <HamburgerIcon isOpen={mobileMenuOpen} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="nav-mobile-dropdown glass-panel rounded-xl mt-2 overflow-hidden"
            style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          >
            {NAV_LINKS.map((link, i) => {
              const isActive = location.pathname === link.path
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-5 py-3.5 text-body font-body font-medium transition-colors ${
                      isActive
                        ? 'text-accent-400 bg-accent-500/10'
                        : 'text-text-secondary hover:text-text-primary hover:bg-base-800/50'
                    }`}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
