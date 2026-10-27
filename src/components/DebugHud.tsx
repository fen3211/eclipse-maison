import { useEffect, useRef, useState } from 'react'
import { stage } from '../lib/stage'
import { metrics } from '../three/metrics'

export function DebugHud() {
  const [enabled] = useState(
    () => new URLSearchParams(window.location.search).has('debug'),
  )
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return
    const id = window.setInterval(() => {
      if (!ref.current) return
      const since = metrics.lastFrameAt
        ? Math.round(performance.now() - metrics.lastFrameAt)
        : -1
      ref.current.textContent = `fps ${metrics.fps} · calls ${metrics.calls} · tris ${metrics.triangles} · dpr ${metrics.dpr.toFixed(2)} · ${stage.chapter} p${stage.progress.toFixed(2)} · ${since}ms ago`
    }, 420)
    return () => window.clearInterval(id)
  }, [enabled])

  if (!enabled) return null
  return <div className="debug-hud" ref={ref} />
}
