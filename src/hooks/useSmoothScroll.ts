import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { registerLenis, unregisterLenis } from '../lib/scroll'
import { stage } from '../lib/stage'

export function useSmoothScroll(reducedMotion: boolean) {
  useEffect(() => {
    stage.reducedMotion = reducedMotion
    if (reducedMotion) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
    })
    registerLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh).catch(() => undefined)
    const timeout = window.setTimeout(refresh, 800)

    return () => {
      window.clearTimeout(timeout)
      gsap.ticker.remove(tick)
      lenis.destroy()
      unregisterLenis(lenis)
      gsap.ticker.lagSmoothing(500, 33)
    }
  }, [reducedMotion])
}
