import { useRef } from 'react'
import { Environment, Lightformer } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { stage, type Chapter } from '../lib/stage'

const intensity: Record<
  Chapter,
  { key: number; rim: number; fill: number; core: number }
> = {
  object: { key: 2.0, rim: 1.1, fill: 0.25, core: 1.1 },
  impression: { key: 3.1, rim: 1.6, fill: 0.4, core: 1.8 },
  scent: { key: 2.6, rim: 1.9, fill: 0.45, core: 1.5 },
  anatomy: { key: 3.4, rim: 1.8, fill: 0.5, core: 1.9 },
  collection: { key: 2.7, rim: 1.5, fill: 0.4, core: 1.4 },
  finale: { key: 1.1, rim: 0.8, fill: 0.2, core: 0.7 },
}

export function Lights({ quality }: { quality: 'high' | 'medium' }) {
  const key = useRef<THREE.DirectionalLight>(null)
  const rim = useRef<THREE.DirectionalLight>(null)
  const fill = useRef<THREE.DirectionalLight>(null)
  const core = useRef<THREE.PointLight>(null)

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1)
    const target = intensity[stage.chapter] ?? intensity.object
    if (key.current) key.current.intensity = THREE.MathUtils.damp(key.current.intensity, target.key, 2.5, dt)
    if (rim.current) rim.current.intensity = THREE.MathUtils.damp(rim.current.intensity, target.rim, 2.5, dt)
    if (fill.current) fill.current.intensity = THREE.MathUtils.damp(fill.current.intensity, target.fill, 2.5, dt)
    if (core.current) core.current.intensity = THREE.MathUtils.damp(core.current.intensity, target.core, 2.5, dt)
  })

  return (
    <>
      <ambientLight intensity={0.16} color="#cbb79c" />
      <directionalLight ref={key} position={[4.5, 6.5, 5]} intensity={2} color="#ffe7c9" />
      <directionalLight ref={rim} position={[-5, 2.5, -5]} intensity={1.1} color="#a8bdd6" />
      <directionalLight ref={fill} position={[3.5, -2, 4]} intensity={0.25} color="#ffd7ac" />
      <pointLight ref={core} position={[0, 0.35, 0.6]} intensity={1.1} distance={2.6} decay={2} color="#ff9a4a" />

      <Environment resolution={quality === 'high' ? 256 : 128} frames={1} background={false}>
        <color attach="background" args={['#050403']} />
        <Lightformer
          form="rect"
          intensity={4}
          color="#fff1de"
          position={[0, 7, 1]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[10, 6, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.6}
          color="#c8d4e4"
          position={[-5.5, 1, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[3, 6, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#ffcf9d"
          position={[5.5, 0, 1.5]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[2.6, 5, 1]}
        />
        <Lightformer
          form="ring"
          intensity={3}
          color="#ffffff"
          position={[2.4, 3.2, -5]}
          scale={2.6}
        />
        <Lightformer
          form="rect"
          intensity={0.7}
          color="#7a5637"
          position={[0, -1, 6]}
          scale={[6, 3, 1]}
        />
      </Environment>
    </>
  )
}
