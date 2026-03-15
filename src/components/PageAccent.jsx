import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CanvasErrorBoundary } from './ErrorBoundary'

function FloatingRing() {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.4
    ref.current.rotation.z = t * 0.2
    ref.current.position.y = Math.sin(t * 0.5) * 0.1
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.6, 0.15, 16, 32]} />
      <meshBasicMaterial color="#14b8a6" wireframe transparent opacity={0.25} toneMapped={false} />
    </mesh>
  )
}

function BreathingOrb() {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.scale.setScalar(0.8 + Math.sin(t * 0.8) * 0.1)
    ref.current.rotation.y = t * 0.2
  })
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.2} toneMapped={false} />
    </mesh>
  )
}

export function PageAccent({ variant = 'ring' }) {
  const isMobile = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

  if (isMobile) return null

  return (
    <CanvasErrorBoundary>
      <div className="w-20 h-20 shrink-0" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true }}
          style={{ background: 'transparent' }}
        >
          {variant === 'ring' ? <FloatingRing /> : <BreathingOrb />}
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  )
}
