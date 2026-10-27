import { useRef } from 'react'
import { AnimatedHeading } from './AnimatedHeading'
import { Reveal } from './Reveal'
import { scrollToTarget } from '../lib/scroll'
import { useChapterTrigger } from '../hooks/useChapterTrigger'

export function Finale() {
  const sectionRef = useRef<HTMLElement>(null)
  useChapterTrigger('finale', 'collection', sectionRef)

  return (
    <section
      ref={sectionRef}
      id="finale"
      className="chapter chapter--finale"
      aria-labelledby="finale-title"
    >
      <div className="chapter__sticky finale__sticky">
        <div className="finale__inner container">
          <Reveal className="chapter__label finale__label" distance={12}>
            <span className="chapter__no">06</span>
            <span className="chapter__rule" />
            <span>Leave a Trace</span>
          </Reveal>

          <AnimatedHeading
            lines={['What remains', 'is *invisible.*']}
            className="finale__title"
          />

          <Reveal className="finale__copy" delay={0.12}>
            <p>
              The scent is gone by morning. The memory is not. Wear it once, and
              the room will remember for you.
            </p>
          </Reveal>

          <Reveal className="finale__actions" delay={0.22}>
            <button
              type="button"
              className="button button--light"
              onClick={() => scrollToTarget('#collection', 0)}
            >
              <span>Discover the collection</span>
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <path
                  d="M3 9h12M10 4l5 5-5 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </button>
            <a
              className="text-link"
              href="mailto:hello@eclipse-parfums.com?subject=Extrait%20request%20%E2%80%94%20Maison%20Eclipse"
            >
              <span>Request the extrait</span>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </a>
          </Reveal>
        </div>

        <div className="chapter__foot container finale__foot">
          <span>06 / Leave a Trace</span>
          <span className="chapter__foot-mid">No. 01 — Amber · 50 ml</span>
          <span>Maison Eclipse — Paris</span>
        </div>
      </div>
    </section>
  )
}
