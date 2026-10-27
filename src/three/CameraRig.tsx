import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { stage, type Chapter, type Layout } from '../lib/stage'

type Pose = {
  pos: [number, number, number]
  look: [number, number, number]
  fov: number
}

type Keyframe = { p: number; pose: Pose }

const keys: Record<Chapter, Keyframe[]> = {
  object: [
    { p: 0, pose: { pos: [0, 0.4, 8.4], look: [0.55, 0, 0], fov: 32 } },
  ],
  impression: [
    { p: 0, pose: { pos: [0, 0.4, 8.4], look: [0.55, 0, 0], fov: 32 } },
    { p: 0.36, pose: { pos: [1.0, 0.28, 6.9], look: [0.75, 0.02, 0], fov: 32 } },
    { p: 0.7, pose: { pos: [1.7, 0.55, 5.9], look: [0.8, 0.05, 0], fov: 32 } },
    { p: 1, pose: { pos: [1.95, 0.4, 6.5], look: [0.85, 0.05, 0], fov: 32 } },
  ],
  scent: [
    { p: 0, pose: { pos: [1.95, 0.4, 6.5], look: [0.85, 0.05, 0], fov: 32 } },
    { p: 0.35, pose: { pos: [1.05, 0.35, 7.9], look: [0.9, 0.05, 0], fov: 32 } },
    { p: 0.7, pose: { pos: [2.2, 0.6, 7.6], look: [0.9, 0.1, 0], fov: 32 } },
    { p: 1, pose: { pos: [0.35, 0.5, 8.2], look: [0.55, 0.1, 0], fov: 32 } },
  ],
  anatomy: [
    { p: 0, pose: { pos: [0.35, 0.5, 8.2], look: [0.55, 0.1, 0], fov: 32 } },
    { p: 0.42, pose: { pos: [0.55, 0.5, 9.0], look: [0.55, 0.2, 0], fov: 32 } },
    { p: 1, pose: { pos: [0.55, 0.6, 8.95], look: [0.55, 0.2, 0], fov: 32 } },
  ],
  collection: [
    { p: 0, pose: { pos: [0.3, 0.55, 10.2], look: [0.4, 0.15, 0], fov: 32 } },
    { p: 1, pose: { pos: [0.3, 0.48, 10.0], look: [0.4, 0.15, 0], fov: 32 } },
  ],
  finale: [
    { p: 0, pose: { pos: [0, 0.9, 10.2], look: [0, 0.4, 0], fov: 32 } },
    { p: 1, pose: { pos: [0, 1.35, 12.4], look: [0, 0.5, 0], fov: 32 } },
  ],
}

const mobileZ: Record<Chapter, number> = {
  object: 1.55,
  impression: 1.85,
  scent: 1.85,
  anatomy: 1.7,
  collection: 1.7,
  finale: 1.9,
}

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value))
  return t * t * (3 - 2 * t)
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function samplePose(chapter: Chapter, progress: number): Pose {
  const chapterKeys = keys[chapter]
  if (progress <= chapterKeys[0].p) return chapterKeys[0].pose

  for (let index = 0; index < chapterKeys.length - 1; index += 1) {
    const current = chapterKeys[index]
    const next = chapterKeys[index + 1]
    if (progress <= next.p) {
      const t = smoothstep((progress - current.p) / (next.p - current.p))
      return {
        pos: [
          mix(current.pose.pos[0], next.pose.pos[0], t),
          mix(current.pose.pos[1], next.pose.pos[1], t),
          mix(current.pose.pos[2], next.pose.pos[2], t),
        ],
        look: [
          mix(current.pose.look[0], next.pose.look[0], t),
          mix(current.pose.look[1], next.pose.look[1], t),
          mix(current.pose.look[2], next.pose.look[2], t),
        ],
        fov: mix(current.pose.fov, next.pose.fov, t),
      }
    }
  }

  return chapterKeys[chapterKeys.length - 1].pose
}

function adaptPose(pose: Pose, layout: Layout, chapter: Chapter): Pose {
  if (layout === 'desktop') return pose

  if (layout === 'tablet') {
    return {
      pos: [pose.pos[0] * 0.7, pose.pos[1] + 0.1, pose.pos[2] * 1.14],
      look: [pose.look[0] * 0.7, pose.look[1] + 0.1, pose.look[2]],
      fov: pose.fov + 1,
    }
  }

  return {
    pos: [
      pose.pos[0] * 0.15,
      pose.pos[1] + 0.35,
      pose.pos[2] * mobileZ[chapter],
    ],
    look: [pose.look[0] * 0.15, pose.look[1] + 0.55, pose.look[2]],
    fov: pose.fov + 2,
  }
}

export function CameraRig({ layout }: { layout: Layout }) {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera
  const currentPosition = useRef(new THREE.Vector3(0, 0.4, 8.4))
  const currentLook = useRef(new THREE.Vector3(0.55, 0, 0))
  const currentFov = useRef(32)

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1)
    const pose = adaptPose(
      samplePose(stage.chapter, stage.progress),
      layout,
      stage.chapter,
    )

    const targetPosition = new THREE.Vector3(...pose.pos)
    const targetLook = new THREE.Vector3(...pose.look)

    if (layout === 'desktop' && !stage.reducedMotion) {
      targetPosition.x += stage.pointerX * 0.12
      targetPosition.y -= stage.pointerY * 0.07
      targetLook.x += stage.pointerX * 0.035
      targetLook.y -= stage.pointerY * 0.02
    }

    if (stage.reducedMotion) {
      currentPosition.current.copy(targetPosition)
      currentLook.current.copy(targetLook)
      currentFov.current = pose.fov
    } else {
      const positionEase = 1 - Math.exp(-dt * 7.5)
      const lookEase = 1 - Math.exp(-dt * 8.5)
      currentPosition.current.lerp(targetPosition, positionEase)
      currentLook.current.lerp(targetLook, lookEase)
      currentFov.current = THREE.MathUtils.damp(currentFov.current, pose.fov, 5, dt)
    }

    camera.position.copy(currentPosition.current)
    camera.lookAt(currentLook.current)

    if (Math.abs(camera.fov - currentFov.current) > 0.001) {
      camera.fov = currentFov.current
      camera.updateProjectionMatrix()
    }
  })

  return null
}
