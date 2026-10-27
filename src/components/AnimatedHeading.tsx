import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useMedia'

interface AnimatedHeadingProps {
  lines: string[]
  className?: string
  as?: 'h1' | 'h2' | 'h3'
  immediate?: boolean
  delay?: number
}

function renderLine(line: string, keyPrefix: string) {
  const words = line.split(' ')
  return words.map((word, index) => {
    const italic = word.startsWith('*') && word.endsWith('*')
    const clean = italic ? word.slice(1, -1) : word
    return (
      <span className="ah-word" key={`${keyPrefix}-${index}`}>
        <span className="ah-word__in">{italic ? <em>{clean}</em> : clean}</span>
      </span>
    )
  })
}

export function AnimatedHeading({
  lines,
  className,
  as: Tag = 'h2',
  immediate = false,
  delay = 0,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const words = element.querySelectorAll<HTMLElement>('.ah-word__in')
    if (reduced) {
      gsap.set(words, { yPercent: 0, rotate: 0 })
      return
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 112, rotate: 2.5 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.25,
          ease: 'expo.out',
          stagger: 0.055,
          delay: immediate ? delay : 0,
          scrollTrigger: immediate
            ? undefined
            : {
                trigger: element,
                start: 'top 86%',
                once: true,
              },
        },
      )
    }, element)

    return () => context.revert()
  }, [immediate, delay, reduced])

  const label = lines.join(' ').replaceAll('*', '')

  return (
    <Tag ref={ref} className={className} aria-label={label}>
      {lines.map((line, index) => (
        <span className="ah-line" key={`${line}-${index}`} aria-hidden="true">
          {renderLine(line, `l${index}`)}
        </span>
      ))}
    </Tag>
  )
}
