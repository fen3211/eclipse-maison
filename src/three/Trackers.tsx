import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { metrics } from './metrics'
import { stage } from '../lib/stage'

export function PointerTracker() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      stage.pointerX = (event.clientX / window.innerWidth) * 2 - 1
      stage.pointerY = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return null
}

export function PerfMeter() {
  const gl = useThree((state) => state.gl)
  const frame = useRef(0)
  const last = useRef(performance.now())

  useEffect(() => {
    metrics.dpr = gl.getPixelRatio()
    metrics.programs = gl.info.programs?.length ?? 0
  }, [gl])

  useFrame(() => {
    frame.current += 1
    const now = performance.now()
    metrics.lastFrameAt = now
    const elapsed = now - last.current
    if (elapsed >= 500) {
      metrics.fps = Math.round((frame.current * 1000) / elapsed)
      metrics.frames += frame.current
      metrics.calls = gl.info.render.calls
      metrics.triangles = gl.info.render.triangles
      metrics.programs = gl.info.programs?.length ?? 0
      metrics.dpr = gl.getPixelRatio()
      frame.current = 0
      last.current = now
    }
  })

  return null
}
