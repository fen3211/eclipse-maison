import { useRef } from 'react'
import { AnimatedHeading } from './AnimatedHeading'
import { Reveal } from './Reveal'
import { useChapterTrigger } from '../hooks/useChapterTrigger'

export function Impression() {
  const sectionRef = useRef<HTMLElement>(null)
  useChapterTrigger('impression', 'object', sectionRef)

  return (
    <section
      ref={sectionRef}
      id="impression"
      className="chapter chapter--impression"
      aria-labelledby="impression-title"
    >
      <div className="chapter__sticky">
        <div className="chapter__grid container">
          <div className="chapter__copy">
            <Reveal className="chapter__label" distance={12}>
              <span className="chapter__no">02</span>
              <span className="chapter__rule" />
              <span>The First Impression</span>
            </Reveal>

            <AnimatedHeading
              lines={['It arrives', 'before you do.']}
              className="chapter__title"
            />

            <Reveal className="chapter__body" delay={0.12}>
              <p>
                A cool breath of bergamot, sharpened by pink pepper. For a moment
                the scent is all surface — bright, weightless, almost anonymous.
                Then the iris opens, and the room changes temperature.
              </p>
            </Reveal>

            <Reveal className="note-stack" delay={0.22}>
              <div>
                <span>Top</span>
                <span>Bergamot, pink pepper</span>
              </div>
              <div>
                <span>Heart</span>
                <span>Iris, orris butter</span>
              </div>
              <div>
                <span>Base</span>
                <span>Cedar, ambergris</span>
              </div>
            </Reveal>
          </div>

          <div className="chapter__void" aria-hidden="true">
            <span className="chapter__coordinate">48°51′42″ N — 2°21′48″ E</span>
          </div>
        </div>

        <div className="chapter__foot container">
          <span>02 / The First Impression</span>
          <span className="chapter__foot-mid">Smoked glass — solid bronze</span>
          <span>Maceration — six weeks</span>
        </div>
      </div>
    </section>
  )
}
