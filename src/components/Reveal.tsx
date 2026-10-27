import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useMedia'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
  start?: string
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 26,
  start = 'top 88%',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (reduced) {
      gsap.set(element, { opacity: 1, y: 0 })
      return
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y: distance },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          delay,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: element,
            start,
            once: true,
          },
        },
      )
    }, element)

    return () => context.revert()
  }, [delay, distance, reduced, start])

  return (
    <div
      ref={ref}
      className={className}
      style={reduced ? undefined : { opacity: 0 }}
    >
      {children}
    </div>
  )
}
