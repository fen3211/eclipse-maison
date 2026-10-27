import { useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { stage, useChapter, type Layout } from '../lib/stage'
type NoteKind = 'bergamot' | 'iris' | 'cedar'

interface SpecimenProps {
  kind: NoteKind
  no: string
  name: string
  position: [number, number, number]
  scale: number
  phase: number
  showLabel: boolean
  labelSide: 'left' | 'right'
  labelOffset?: [number, number, number]
}

function NoteLabel({
  no,
  name,
  side,
  offset,
}: {
  no: string
  name: string
  side: 'left' | 'right'
  offset: [number, number, number]
}) {
  const chapter = useChapter()
  if (chapter !== 'scent') return null
  return (
    <Html position={offset} center={false} zIndexRange={[8, 0]} style={{ pointerEvents: 'none' }}>
      <div className={`note-label note-label--${side}`}>
        <span className="note-label__dot" />
        <span className="note-label__line" />
        <span className="note-label__text">
          <b>{no}</b>
          {name}
        </span>
      </div>
    </Html>
  )
}

function Bergamot() {
  return (
    <>
      <mesh scale={0.3}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#b9b85b"
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.2}
          emissive="#38380c"
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh position={[0.25, 0.13, 0.08]} scale={0.19}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#a8a94d"
          roughness={0.24}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.1}
        />
      </mesh>
      <mesh position={[-0.18, 0.18, -0.09]} scale={0.14}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#c8c56a" roughness={0.3} clearcoat={0.8} />
      </mesh>
      <mesh position={[0.03, -0.27, 0]} rotation={[0.15, 0, 0.5]}>
        <cylinderGeometry args={[0.024, 0.036, 0.2, 8]} />
        <meshStandardMaterial color="#8d6a3f" metalness={0.7} roughness={0.4} />
      </mesh>
    </>
  )
}

function Iris() {
  const petals = Array.from({ length: 5 }, (_, index) => {
    const angle = (index / 5) * Math.PI * 2
    return (
      <mesh
        key={index}
        position={[Math.cos(angle) * 0.13, 0, Math.sin(angle) * 0.13]}
        rotation={[0.48, angle, 0.22]}
        scale={[0.17, 0.5, 0.35]}
      >
        <sphereGeometry args={[1, 24, 16]} />
        <meshPhysicalMaterial
          color="#b9adc6"
          roughness={0.5}
          metalness={0}
          clearcoat={0.4}
          clearcoatRoughness={0.35}
          sheen={0.55}
          sheenColor="#e2d9e9"
          side={THREE.DoubleSide}
        />
      </mesh>
    )
  })

  return (
    <>
      {petals}
      <mesh scale={0.13}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#b58a4a" metalness={0.85} roughness={0.32} />
      </mesh>
      <mesh position={[0, -0.33, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.005, 8, 48]} />
        <meshStandardMaterial color="#8a6a45" metalness={0.9} roughness={0.35} />
      </mesh>
    </>
  )
}

function Cedar() {
  return (
    <>
      <mesh rotation={[0.25, 0.35, 0.4]} scale={[0.17, 0.56, 0.17]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#5d4630" roughness={0.78} metalness={0} />
      </mesh>
      <mesh position={[0.24, 0.08, 0.1]} rotation={[0.5, 0.2, -0.5]} scale={[0.13, 0.38, 0.13]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#6c5238" roughness={0.82} metalness={0} />
      </mesh>
      <mesh position={[-0.2, 0.12, -0.08]} rotation={[-0.3, 0.6, 0.7]} scale={[0.1, 0.3, 0.1]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#4d3a28" roughness={0.85} metalness={0} />
      </mesh>
      <mesh position={[0.02, 0.05, 0]} rotation={[Math.PI / 2, 0, 0.2]}>
        <torusGeometry args={[0.27, 0.008, 8, 48]} />
        <meshStandardMaterial color="#9a7448" metalness={0.9} roughness={0.34} />
      </mesh>
    </>
  )
}

function Specimen({
  kind,
  no,
  name,
  position,
  scale,
  phase,
  showLabel,
  labelSide,
  labelOffset,
}: SpecimenProps) {
  const float = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (float.current) {
      float.current.position.y =
        position[1] + (stage.reducedMotion ? 0 : Math.sin(time * 0.55 + phase) * 0.05)
    }
    if (spin.current) {
      spin.current.rotation.y =
        (stage.reducedMotion ? 0 : time * 0.1) + phase * 0.7
    }
  })

  return (
    <group ref={float} position={position}>
      <group ref={spin} scale={scale}>
        {kind === 'bergamot' ? <Bergamot /> : null}
        {kind === 'iris' ? <Iris /> : null}
        {kind === 'cedar' ? <Cedar /> : null}
      </group>
      {showLabel ? (
        <group scale={scale}>
          <NoteLabel
            no={no}
            name={name}
            side={labelSide}
            offset={
              labelOffset ?? [labelSide === 'left' ? -0.55 : 0.55, 0.28, 0]
            }
          />
        </group>
      ) : null}
    </group>
  )
}

const layouts: Record<
  Layout,
  Array<{
    kind: NoteKind
    no: string
    name: string
    position: [number, number, number]
    scale: number
    labelSide?: 'left' | 'right'
    labelOffset?: [number, number, number]
  }>
> = {
  desktop: [
    {
      kind: 'bergamot',
      no: '01',
      name: 'Bergamot',
      position: [0.35, 1.05, 0.45],
      scale: 0.6,
      labelSide: 'left',
      labelOffset: [-0.55, 0.78, 0],
    },
    {
      kind: 'iris',
      no: '02',
      name: 'Iris',
      position: [1.1, 1.2, 0.5],
      scale: 0.46,
      labelSide: 'right',
    },
    {
      kind: 'cedar',
      no: '03',
      name: 'Cedar',
      position: [0.85, -0.35, 0.9],
      scale: 0.68,
      labelSide: 'left',
    },
  ],
  tablet: [
    { kind: 'bergamot', no: '01', name: 'Bergamot', position: [2.0, 0.85, 0.2], scale: 0.62 },
    { kind: 'iris', no: '02', name: 'Iris', position: [2.15, 0.25, 0.4], scale: 0.6 },
    { kind: 'cedar', no: '03', name: 'Cedar', position: [1.85, -0.35, 0.6], scale: 0.64 },
  ],
  mobile: [
    { kind: 'bergamot', no: '01', name: 'Bergamot', position: [-1.05, 1.8, 0.55], scale: 0.46 },
    { kind: 'iris', no: '02', name: 'Iris', position: [1.12, 1.3, 0.5], scale: 0.46 },
    { kind: 'cedar', no: '03', name: 'Cedar', position: [-0.9, 0.9, 0.9], scale: 0.48 },
  ],
}

export function NotesSpecimens({ layout }: { layout: Layout }) {
  const group = useRef<THREE.Group>(null)
  const blend = useRef(0)
  const items = layouts[layout]

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1)
    const target = stage.chapter === 'scent' ? 1 : 0
    blend.current = THREE.MathUtils.damp(blend.current, target, 3.4, dt)
    if (!group.current) return
    const visible = blend.current > 0.03
    group.current.visible = visible
    const scale = blend.current * (0.88 + 0.12 * blend.current)
    group.current.scale.setScalar(scale)
  })

  return (
    <group ref={group}>
      {items.map((item, index) => (
        <Specimen
          key={item.kind}
          kind={item.kind}
          no={item.no}
          name={item.name}
          position={item.position}
          scale={item.scale}
          phase={index * 1.7}
          showLabel={layout === 'desktop'}
          labelSide={item.labelSide ?? 'right'}
          labelOffset={item.labelOffset}
        />
      ))}
    </group>
  )
}
