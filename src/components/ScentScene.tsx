import { useRef } from 'react'
import { AnimatedHeading } from './AnimatedHeading'
import { Reveal } from './Reveal'
import { useChapterTrigger } from '../hooks/useChapterTrigger'

const notes = [
  {
    no: '01',
    name: 'Bergamot',
    origin: 'Calabria · cold-pressed',
    copy: 'A citrus that behaves like a shadow: bright at the edge, bitter at the core.',
  },
  {
    no: '02',
    name: 'Iris',
    origin: 'Florence · orris butter',
    copy: 'Powdery, root-like, faintly metallic. Pressed linen in an empty room.',
  },
  {
    no: '03',
    name: 'Cedar',
    origin: 'Atlas · smoked wood',
    copy: 'Dry, vertical, quietly animal. The structure that holds the other two in place.',
  },
]

export function ScentScene() {
  const sectionRef = useRef<HTMLElement>(null)
  useChapterTrigger('scent', 'impression', sectionRef)

  return (
    <section
      ref={sectionRef}
      id="scent"
      className="chapter chapter--scent"
      aria-labelledby="scent-title"
    >
      <div className="chapter__sticky">
        <div className="scent__head container">
          <Reveal className="chapter__label" distance={12}>
            <span className="chapter__no">03</span>
            <span className="chapter__rule" />
            <span>Inside the Scent</span>
          </Reveal>

          <AnimatedHeading
            lines={['Three notes.', 'One weather.']}
            className="chapter__title scent__title"
          />

          <Reveal className="scent__intro" delay={0.12}>
            <p>
              Composed in Paris and macerated for six weeks, No. 01 moves from
              citrus light into powdered iris and a dry cedar base. It is not a
              trail. It is a room you carry.
            </p>
          </Reveal>
        </div>

        <div className="scent__notes container">
          {notes.map((note, index) => (
            <Reveal
              key={note.no}
              className="scent-note"
              delay={index * 0.07}
              start="top 82%"
            >
              <div className="scent-note__top">
                <span className="scent-note__no">{note.no}</span>
                <span className="scent-note__origin">{note.origin}</span>
              </div>
              <h3 className="scent-note__name">{note.name}</h3>
              <p className="scent-note__copy">{note.copy}</p>
            </Reveal>
          ))}
        </div>

        <div className="chapter__foot container">
          <span>03 / Inside the Scent</span>
          <span className="chapter__foot-mid">Top · Heart · Base</span>
          <span>Composed in Paris</span>
        </div>
      </div>
    </section>
  )
}
