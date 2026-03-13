import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar, LoadingScreen } from '@/components'

const Home = lazy(() => import('@/pages/Home'))
const Students = lazy(() => import('@/pages/Students'))
const AddStudent = lazy(() => import('@/pages/AddStudent'))
const Counter = lazy(() => import('@/pages/Counter'))

export default function App() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-base-950">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/students" element={<Students />} />
              <Route path="/add" element={<AddStudent />} />
              <Route path="/counter" element={<Counter />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  )
}
