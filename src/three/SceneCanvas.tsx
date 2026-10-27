import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import type { Layout } from '../lib/stage'
import { Experience } from './Experience'

interface SceneCanvasProps {
  layout: Layout
  activeScent: number
  quality: 'high' | 'medium'
  active: boolean
  onReady: () => void
}

export default function SceneCanvas({
  layout,
  activeScent,
  quality,
  active,
  onReady,
}: SceneCanvasProps) {
  const maxDpr = Math.min(
    window.devicePixelRatio || 1,
    layout === 'desktop' ? 1.75 : layout === 'tablet' ? 1.5 : 1.35,
  )

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, maxDpr]}
      gl={{
        antialias: layout !== 'mobile',
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      camera={{ position: [0, 0.4, 8.4], fov: 32, near: 0.1, far: 80 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.08
        gl.setClearColor(0x000000, 0)
        gl.transmissionResolutionScale = 0.5
        requestAnimationFrame(() => onReady())
      }}
    >
      <Suspense fallback={null}>
        <Experience layout={layout} activeScent={activeScent} quality={quality} />
      </Suspense>
    </Canvas>
  )
}
