import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CanvasErrorBoundary } from './ErrorBoundary'

function Orb({ value }) {
  const meshRef = useRef()
  const targetScale = 0.6 + Math.min(value, 20) * 0.08
  const intensity = 0.3 + Math.min(value, 20) * 0.15

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const current = meshRef.current.scale.x
    const lerped = current + (targetScale - current) * 0.05
    meshRef.current.scale.setScalar(lerped)
    meshRef.current.rotation.y = t * 0.3
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.2
  })

  const color = value > 0 ? '#14b8a6' : '#ef4444'

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={intensity}
        toneMapped={false}
      />
    </mesh>
  )
}

export function CounterOrb({ value }) {
  return (
    <CanvasErrorBoundary>
      <div className="w-full h-32 sm:h-48" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Orb value={value} />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  )
}
