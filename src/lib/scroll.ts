import type Lenis from 'lenis'

let lenis: Lenis | null = null

export function registerLenis(instance: Lenis) {
  lenis = instance
}

export function unregisterLenis(instance: Lenis) {
  if (lenis === instance) lenis = null
}

export function stopScroll() {
  lenis?.stop()
  document.documentElement.classList.add('scroll-locked')
}

export function startScroll() {
  lenis?.start()
  document.documentElement.classList.remove('scroll-locked')
}

export function scrollToTarget(target: string | HTMLElement, offset = -1) {
  const element =
    typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!element) return

  const top = element.getBoundingClientRect().top + window.scrollY + offset
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (lenis && !reduced) {
    lenis.scrollTo(top, { duration: 1.35 })
    return
  }

  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}
