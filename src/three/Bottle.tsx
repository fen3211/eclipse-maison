import { useEffect, useMemo, type RefObject } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import type { Scent } from '../data/content'
import { useChapter } from '../lib/stage'
import {
  createBodyGeometry,
  createCapGeometry,
  createKnurledBandGeometry,
  createLabelTexture,
  createLiquidGeometry,
  getShadowTexture,
} from './geometry'

interface BottleModelProps {
  scent: Scent
  glassRef?: RefObject<THREE.Group | null>
  liquidRef?: RefObject<THREE.Group | null>
  capRef?: RefObject<THREE.Group | null>
  shadowRef?: RefObject<THREE.Mesh | null>
  liquidMaterialRef?: RefObject<THREE.MeshPhysicalMaterial | null>
  labels?: boolean
  quality: 'high' | 'medium'
}

function GlassMaterial({
  scent,
  quality,
}: {
  scent: Scent
  quality: 'high' | 'medium'
}) {
  return (
    <meshPhysicalMaterial
      color={scent.glass}
      metalness={0}
      roughness={0.055}
      transmission={quality === 'high' ? 1 : 0.92}
      thickness={0.92}
      ior={1.51}
      clearcoat={1}
      clearcoatRoughness={0.035}
      attenuationColor={scent.glass}
      attenuationDistance={2.8}
      envMapIntensity={1.55}
      transparent
      opacity={1}
      side={THREE.FrontSide}
    />
  )
}

function PartLabel({
  position,
  no,
  text,
  side = 'right',
}: {
  position: [number, number, number]
  no: string
  text: string
  side?: 'left' | 'right'
}) {
  const chapter = useChapter()
  if (chapter !== 'anatomy') return null

  return (
    <Html
      position={position}
      center={false}
      zIndexRange={[10, 0]}
      style={{ pointerEvents: 'none' }}
    >
      <div className={`part-label part-label--${side}`}>
        <span className="part-label__dot" />
        <span className="part-label__line" />
        <span className="part-label__text">
          <b>{no}</b>
          {text}
        </span>
      </div>
    </Html>
  )
}

export function BottleModel({
  scent,
  glassRef,
  liquidRef,
  capRef,
  shadowRef,
  liquidMaterialRef,
  labels = false,
  quality,
}: BottleModelProps) {
  const bodyGeometry = useMemo(() => createBodyGeometry(), [])
  const liquidGeometry = useMemo(() => createLiquidGeometry(), [])
  const capGeometry = useMemo(() => createCapGeometry(), [])
  const bandGeometry = useMemo(() => createKnurledBandGeometry(), [])
  const labelTexture = useMemo(
    () => createLabelTexture(scent.no, scent.name),
    [scent.no, scent.name],
  )
  const shadowTexture = useMemo(() => getShadowTexture(), [])

  useEffect(
    () => () => {
      bodyGeometry.dispose()
      liquidGeometry.dispose()
      capGeometry.dispose()
      bandGeometry.dispose()
    },
    [bandGeometry, bodyGeometry, capGeometry, liquidGeometry],
  )

  useEffect(
    () => () => {
      labelTexture?.dispose()
    },
    [labelTexture],
  )

  return (
    <group>
      <group ref={glassRef}>
        <mesh geometry={bodyGeometry}>
          <GlassMaterial scent={scent} quality={quality} />
        </mesh>

        <mesh position={[0.04, 2.48, 0]}>
          <cylinderGeometry args={[0.225, 0.235, 0.24, 48]} />
          <GlassMaterial scent={scent} quality={quality} />
        </mesh>

        {labelTexture ? (
          <mesh position={[0.02, 0.62, 0.383]}>
            <planeGeometry args={[0.54, 0.27]} />
            <meshBasicMaterial
              map={labelTexture}
              transparent
              opacity={0.72}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ) : null}

        {labels ? (
          <PartLabel position={[0.82, 0.15, 0.3]} no="02" text="The vessel" />
        ) : null}
      </group>

      <group ref={liquidRef} position={[0, 0.16, 0]}>
        <mesh geometry={liquidGeometry}>
          <meshPhysicalMaterial
            ref={liquidMaterialRef}
            color={scent.liquid}
            metalness={0}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.06}
            envMapIntensity={1.25}
            emissive={scent.liquidDeep}
            emissiveIntensity={0.2}
          />
        </mesh>

        <mesh position={[0, 1.635, 0]}>
          <boxGeometry args={[1.1, 0.014, 0.37]} />
          <meshPhysicalMaterial
            color={scent.liquid}
            metalness={0.15}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.03}
            transparent
            opacity={0.82}
            emissive={scent.liquidDeep}
            emissiveIntensity={0.15}
          />
        </mesh>

        {labels ? (
          <PartLabel position={[0.85, 1.35, 0.3]} no="03" text="The elixir" />
        ) : null}
      </group>

      <group ref={capRef} position={[0.04, 2.6, 0]}>
        <mesh position={[0, -0.065, 0]}>
          <cylinderGeometry args={[0.315, 0.325, 0.13, 56]} />
          <meshStandardMaterial
            color={scent.cap}
            metalness={1}
            roughness={0.36}
            envMapIntensity={1.4}
          />
        </mesh>

        <mesh position={[0, -0.005, 0]}>
          <cylinderGeometry args={[0.275, 0.275, 0.04, 48]} />
          <meshStandardMaterial color="#0d0b09" metalness={0.35} roughness={0.5} />
        </mesh>

        <mesh geometry={capGeometry}>
          <meshStandardMaterial
            color={scent.cap}
            metalness={1}
            roughness={0.28}
            envMapIntensity={1.6}
          />
        </mesh>

        <mesh geometry={bandGeometry} position={[0, 0.245, 0]}>
          <meshStandardMaterial
            color={scent.cap}
            metalness={1}
            roughness={0.36}
            envMapIntensity={1.45}
          />
        </mesh>

        <mesh position={[0, 0.501, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.17, 0.3, 72]} />
          <meshStandardMaterial color="#2b1f15" metalness={0.9} roughness={0.34} />
        </mesh>

        <mesh position={[0, 0.502, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.155, 72]} />
          <meshStandardMaterial
            color={scent.cap}
            metalness={1}
            roughness={0.19}
            envMapIntensity={1.7}
          />
        </mesh>

        <mesh position={[0, 0.504, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.152, 0.158, 72]} />
          <meshBasicMaterial color="#d9b98d" toneMapped={false} transparent opacity={0.55} />
        </mesh>

        {labels ? (
          <PartLabel position={[0.5, 0.16, 0.2]} no="01" text="The cap" />
        ) : null}
      </group>

      {shadowTexture ? (
        <mesh
          ref={shadowRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.006, 0.05]}
          scale={[3.25, 1.95, 1]}
          renderOrder={1}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={shadowTexture}
            transparent
            opacity={0.72}
            depthWrite={false}
            color="#000000"
            toneMapped={false}
          />
        </mesh>
      ) : null}
    </group>
  )
}
