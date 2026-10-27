import { useRef, type CSSProperties } from 'react'
import { scents } from '../data/content'
import { AnimatedHeading } from './AnimatedHeading'
import { Reveal } from './Reveal'
import { useChapterTrigger } from '../hooks/useChapterTrigger'

interface CollectionProps {
  activeScent: number
  onSelectScent: (index: number) => void
}

export function Collection({ activeScent, onSelectScent }: CollectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  useChapterTrigger('collection', 'anatomy', sectionRef)
  const active = scents[activeScent] ?? scents[0]

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="chapter chapter--collection"
      aria-labelledby="collection-title"
    >
      <div className="chapter__sticky">
        <div className="collection__head container">
          <Reveal className="chapter__label" distance={12}>
            <span className="chapter__no">05</span>
            <span className="chapter__rule" />
            <span>The Collection</span>
          </Reveal>

          <AnimatedHeading
            lines={['Three ways', 'to *disappear.*']}
            className="chapter__title collection__title"
          />

          <Reveal className="collection__intro" delay={0.1}>
            <p>
              One house, three temperatures. Each extrait is built around a
              single material and the shadow it casts.
            </p>
          </Reveal>
        </div>

        <div className="collection__panel container">
          <div className="collection__cards" role="group" aria-label="Choose an extrait">
            {scents.map((scent, index) => {
              const selected = index === activeScent
              return (
                <button
                  key={scent.id}
                  type="button"
                  className={`scent-card ${selected ? 'is-active' : ''}`}
                  aria-pressed={selected}
                  onClick={() => onSelectScent(index)}
                >
                  <span className="scent-card__no">{scent.no}</span>
                  <span className="scent-card__name">{scent.name}</span>
                  <span className="scent-card__family">{scent.family}</span>
                  <span
                    className="scent-card__swatch"
                    style={{ '--swatch': scent.swatch } as CSSProperties}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>

          <div className="collection__detail" aria-live="polite">
            <div className="collection__detail-top">
              <span>{active.family}</span>
              <span>{active.price}</span>
            </div>
            <div className="collection__detail-body" key={active.id}>
              <p>{active.detail}</p>
              <ul className="collection__notes" aria-label={`Notes of ${active.name}`}>
                {active.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
            <a
              className="text-link text-link--small"
              href={`mailto:hello@eclipse-parfums.com?subject=${encodeURIComponent(
                `Sample request — No. ${active.no} ${active.name}`,
              )}`}
            >
              <span>Request a sample</span>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="collection__mobile-detail" aria-live="polite">
          <div className="collection__detail-top">
            <span>{active.family}</span>
            <span>{active.price}</span>
          </div>
          <p key={active.id}>{active.description}</p>
        </div>

        <div className="collection__mobile-tabs" role="group" aria-label="Choose an extrait">
          {scents.map((scent, index) => (
            <button
              key={scent.id}
              type="button"
              className={index === activeScent ? 'is-active' : ''}
              aria-pressed={index === activeScent}
              onClick={() => onSelectScent(index)}
            >
              <span>{scent.no}</span>
              <span>{scent.name}</span>
            </button>
          ))}
        </div>

        <div className="chapter__foot container">
          <span>05 / The Collection</span>
          <span className="chapter__foot-mid">Extrait de parfum — 50 ml</span>
          <span>Paris — 2026</span>
        </div>
      </div>
    </section>
  )
}
