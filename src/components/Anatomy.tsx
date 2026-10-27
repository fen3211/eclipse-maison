import { useRef } from 'react'
import { AnimatedHeading } from './AnimatedHeading'
import { Reveal } from './Reveal'
import { useChapterTrigger } from '../hooks/useChapterTrigger'

const parts = [
  {
    no: '01',
    name: 'The cap',
    material: 'Solid bronze · 84 g',
    copy: 'Hand-brushed, weighted, warm to the touch. A closure you hear before you see.',
  },
  {
    no: '02',
    name: 'The vessel',
    material: 'Smoked glass · 6 mm',
    copy: 'Cast, never blown, so the walls stay perfectly still. Each one is annealed for eleven hours.',
  },
  {
    no: '03',
    name: 'The elixir',
    material: 'Extrait · 30%',
    copy: 'Amber, labdanum, a trace of salt. The only part that is meant to disappear.',
  },
]

export function Anatomy() {
  const sectionRef = useRef<HTMLElement>(null)
  useChapterTrigger('anatomy', 'scent', sectionRef)

  return (
    <section
      ref={sectionRef}
      id="anatomy"
      className="chapter chapter--anatomy"
      aria-labelledby="anatomy-title"
    >
      <div className="chapter__sticky">
        <div className="anatomy__grid container">
          <div className="anatomy__copy">
            <Reveal className="chapter__label" distance={12}>
              <span className="chapter__no">04</span>
              <span className="chapter__rule" />
              <span>Anatomy of an Object</span>
            </Reveal>

            <AnimatedHeading
              lines={['Made to be held.', 'Built to *disappear.*']}
              className="chapter__title anatomy__title"
            />

            <Reveal className="chapter__body" delay={0.1}>
              <p>
                A single object, assembled from three materials. Nothing
                decorative; every edge exists to catch or release light.
              </p>
            </Reveal>

            <div className="parts">
              {parts.map((part, index) => (
                <Reveal key={part.no} className="part" delay={index * 0.06}>
                  <div className="part__head">
                    <span className="part__no">{part.no}</span>
                    <h3 className="part__name">{part.name}</h3>
                    <span className="part__material">{part.material}</span>
                  </div>
                  <p className="part__copy">{part.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="anatomy__void" aria-hidden="true">
            <span className="anatomy__hint">Scroll to disassemble</span>
          </div>
        </div>

        <div className="chapter__foot container">
          <span>04 / Anatomy of an Object</span>
          <span className="chapter__foot-mid">Three parts — one object</span>
          <span>Assembled in France</span>
        </div>
      </div>
    </section>
  )
}
