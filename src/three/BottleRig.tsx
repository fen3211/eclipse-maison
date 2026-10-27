import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scents } from '../data/content'
import { stage, type Chapter, type Layout } from '../lib/stage'
import { BottleModel } from './Bottle'

interface BottleRigProps {
  layout: Layout
  activeScent: number
  quality: 'high' | 'medium'
}

interface Composition {
  x: number
  y: number
  scale: number
  rotation: number
}

function singleComposition(layout: Layout, chapter: Chapter): Composition {
  if (layout === 'mobile') {
    /* Fitted so the object fills the band left free by the bottom-anchored
       copy: hero between the headline and the meta rule, chapter 02 in the top
       band, chapter 04 between the intro and the parts list. */
    const mobile: Record<Chapter, Composition> = {
      object: { x: 0, y: -2.5, scale: 1.05, rotation: 0.3 },
      impression: { x: 0, y: 0.98, scale: 0.76, rotation: 0.62 },
      /* The three note specimens carry chapter 03 on a phone. */
      scent: { x: 0, y: -1.5, scale: 0, rotation: -0.35 },
      anatomy: { x: 0, y: -0.1, scale: 0.58, rotation: 0.08 },
      collection: { x: 0, y: -1.5, scale: 0.94, rotation: 0.2 },
      finale: { x: 0, y: 0.78, scale: 1.5, rotation: 0.45 },
    }
    return mobile[chapter]
  }

  if (layout === 'tablet') {
    /* One column of copy on the left, the object pushed into the right band. */
    const tablet: Record<Chapter, Composition> = {
      object: { x: 0.75, y: -1.68, scale: 0.96, rotation: 0.3 },
      impression: { x: 2.15, y: -1.19, scale: 0.74, rotation: 0.62 },
      scent: { x: 0.62, y: -1.54, scale: 0, rotation: -0.35 },
      anatomy: { x: 2.35, y: -1.14, scale: 0.72, rotation: 0.08 },
      collection: { x: 0.62, y: -1.54, scale: 0.96, rotation: 0.2 },
      finale: { x: 0, y: 0.9, scale: 0.7, rotation: 0.45 },
    }
    return tablet[chapter]
  }

  const desktop: Record<Chapter, Composition> = {
    object: { x: 1.02, y: -1.62, scale: 1, rotation: 0.32 },
    impression: { x: 0.85, y: -1.58, scale: 1, rotation: 0.62 },
    scent: { x: 2.15, y: -0.85, scale: 0.68, rotation: -0.3 },
    anatomy: { x: 1.45, y: -1.72, scale: 0.62, rotation: 0.08 },
    collection: { x: 0.55, y: -1.5, scale: 1, rotation: 0.2 },
    finale: { x: 0, y: 0.7, scale: 0.6, rotation: 0.45 },
  }
  return desktop[chapter]
}

function explodeTarget(chapter: Chapter, progress: number) {
  if (chapter !== 'anatomy') return 0
  if (progress < 0.32) return THREE.MathUtils.smoothstep(progress, 0, 0.32)
  if (progress < 0.72) return 1
  return 1 - THREE.MathUtils.smoothstep(progress, 0.72, 1)
}

function range(value: number, min: number, max: number) {
  return THREE.MathUtils.smoothstep(value, min, max)
}

function SingleBottle({
  layout,
  scentIndex,
  quality,
}: {
  layout: Layout
  scentIndex: number
  quality: 'high' | 'medium'
}) {
  const root = useRef<THREE.Group>(null)
  const glass = useRef<THREE.Group>(null)
  const liquid = useRef<THREE.Group>(null)
  const cap = useRef<THREE.Group>(null)
  const shadow = useRef<THREE.Mesh>(null)
  const liquidMaterial = useRef<THREE.MeshPhysicalMaterial>(null)
  const explode = useRef(0)
  const blend = useRef(0)
  const scent = scents[scentIndex] ?? scents[0]
  const liquidBase = useMemo(() => new THREE.Color(scent.liquid), [scent.liquid])
  const liquidDeep = useMemo(() => new THREE.Color(scent.liquidDeep), [scent.liquidDeep])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1)
    const chapter = stage.chapter
    const composition = singleComposition(layout, chapter)
    const targetBlend = chapter === 'collection' ? 1 : 0
    blend.current = THREE.MathUtils.damp(blend.current, targetBlend, 4.2, dt)

    if (!root.current) return
    const visibility = 1 - range(blend.current, 0.2, 0.78)
    const scale = composition.scale * visibility
    root.current.visible = scale > 0.015

    root.current.position.x = THREE.MathUtils.damp(
      root.current.position.x,
      composition.x,
      4.5,
      dt,
    )
    root.current.position.y = THREE.MathUtils.damp(
      root.current.position.y,
      composition.y,
      4.5,
      dt,
    )
    root.current.scale.setScalar(
      THREE.MathUtils.damp(root.current.scale.x, scale, 5, dt),
    )

    const idle =
      chapter === 'object'
        ? state.clock.elapsedTime * 0.1
        : chapter === 'finale'
          ? state.clock.elapsedTime * 0.035
          : 0
    const targetRotation = composition.rotation + idle
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      targetRotation,
      2.8,
      dt,
    )
    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      chapter === 'scent' ? -0.035 : 0,
      3,
      dt,
    )

    const targetExplode = explodeTarget(chapter, stage.progress)
    explode.current = THREE.MathUtils.damp(explode.current, targetExplode, 8, dt)
    const e = explode.current

    if (cap.current) {
      cap.current.position.set(0.04 + e * 0.1, 2.6 + e * 0.78, e * 0.26)
      cap.current.rotation.z = e * 0.055
    }
    if (glass.current) {
      glass.current.position.x = -e * 0.42
      glass.current.position.z = e * 0.04
      glass.current.rotation.z = -e * 0.05
    }
    if (liquid.current) {
      liquid.current.position.set(e * 0.7, 0.16 + e * 0.04, e * 0.38)
      liquid.current.rotation.z = e * 0.045
    }
    if (liquidMaterial.current) {
      liquidMaterial.current.color.lerpColors(liquidBase, liquidDeep, e * 0.7)
      liquidMaterial.current.emissiveIntensity = 0.2 - e * 0.14
      liquidMaterial.current.roughness = 0.16 + e * 0.14
      liquidMaterial.current.clearcoat = 1 - e * 0.55
      liquidMaterial.current.envMapIntensity = 1.25 - e * 0.5
    }
    if (shadow.current) {
      const material = shadow.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.72 * (1 - e)
      shadow.current.visible = material.opacity > 0.01
    }
  })

  return (
    <group ref={root}>
      <BottleModel
        scent={scent}
        glassRef={glass}
        liquidRef={liquid}
        capRef={cap}
        shadowRef={shadow}
        liquidMaterialRef={liquidMaterial}
        labels
        quality={quality}
      />
    </group>
  )
}

interface CollectionTuning {
  spacing: number
  activeY: number
  sideY: number
  sideZ: number
  activeScale: number
  sideScale: number
}

/**
 * The collection row is sized per layout so the three flacons stay inside the
 * right half of the frame on desktop and the upper band on smaller screens.
 */
const collectionTuning: Record<Layout, CollectionTuning> = {
  desktop: {
    spacing: 1.3,
    activeY: 0.1,
    sideY: -0.42,
    sideZ: -0.78,
    activeScale: 0.72,
    sideScale: 0.46,
  },
  tablet: {
    spacing: 1.15,
    activeY: 0.06,
    sideY: -0.26,
    sideZ: -0.7,
    activeScale: 0.34,
    sideScale: 0.26,
  },
  mobile: {
    spacing: 0.95,
    activeY: 0.04,
    sideY: -0.18,
    sideZ: -0.7,
    activeScale: 0.52,
    sideScale: 0.4,
  },
}

function CollectionBottle({
  index,
  activeIndex,
  layout,
  quality,
}: {
  index: number
  activeIndex: number
  layout: Layout
  quality: 'high' | 'medium'
}) {
  const root = useRef<THREE.Group>(null)
  const scent = scents[index]
  const tuning = collectionTuning[layout]

  useFrame((state, delta) => {
    if (!root.current) return
    const dt = Math.min(delta, 0.1)
    let diff = index - activeIndex
    if (diff > 1.5) diff -= 3
    if (diff < -1.5) diff += 3
    const isActive = diff === 0

    const targetX = diff * tuning.spacing
    const targetY = isActive ? tuning.activeY : tuning.sideY
    const targetZ = isActive ? 0.24 : tuning.sideZ
    const targetScale = isActive ? tuning.activeScale : tuning.sideScale

    root.current.position.x = THREE.MathUtils.damp(
      root.current.position.x,
      targetX,
      4,
      dt,
    )
    root.current.position.y = THREE.MathUtils.damp(
      root.current.position.y,
      targetY,
      4,
      dt,
    )
    root.current.position.z = THREE.MathUtils.damp(
      root.current.position.z,
      targetZ,
      4,
      dt,
    )
    root.current.scale.setScalar(
      THREE.MathUtils.damp(root.current.scale.x, targetScale, 4, dt),
    )

    const targetRotation =
      diff * 0.34 +
      (isActive && !stage.reducedMotion ? state.clock.elapsedTime * 0.06 : 0)
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      targetRotation,
      2.6,
      dt,
    )
  })

  return (
    <group ref={root} position={[0, 0.1, 0.24]}>
      <BottleModel scent={scent} quality={quality} />
    </group>
  )
}

export function BottleRig({ layout, activeScent, quality }: BottleRigProps) {
  const collectionRoot = useRef<THREE.Group>(null)
  const blend = useRef(0)
  const groupPosition = useMemo<[number, number, number]>(() => {
    if (layout === 'mobile') return [0, 0.86, 0]
    if (layout === 'tablet') return [2.76, 1.53, 0]
    return [2.2, -1.59, 0]
  }, [layout])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1)
    const target = stage.chapter === 'collection' ? 1 : 0
    blend.current = THREE.MathUtils.damp(blend.current, target, 4.2, dt)
    if (!collectionRoot.current) return
    const visibility = range(blend.current, 0.12, 0.9)
    collectionRoot.current.visible = visibility > 0.015
    collectionRoot.current.scale.setScalar(visibility)
  })

  return (
    <>
      <SingleBottle layout={layout} scentIndex={activeScent} quality={quality} />
      <group ref={collectionRoot} position={groupPosition}>
        {scents.map((scent, index) => (
          <CollectionBottle
            key={scent.id}
            index={index}
            activeIndex={activeScent}
            layout={layout}
            quality={quality}
          />
        ))}
      </group>
    </>
  )
}
