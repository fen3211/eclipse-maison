import { useMemo } from 'react'
import { getBackdropTexture } from './geometry'
import type { Layout } from '../lib/stage'

export function Backdrop({ layout }: { layout: Layout }) {
  const texture = useMemo(() => getBackdropTexture(), [])
  if (!texture) return null

  const position: [number, number, number] =
    layout === 'mobile' ? [0, 0.1, -5] : layout === 'tablet' ? [0.4, 0.15, -5] : [0.8, 0.2, -5]
  const scale: [number, number, number] =
    layout === 'mobile' ? [9, 12, 1] : [12, 9, 1]

  return (
    <mesh position={position} scale={scale} renderOrder={-1}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        opacity={0.95}
        toneMapped={false}
      />
    </mesh>
  )
}
