import { AnimatedHeading } from './AnimatedHeading'
import { Reveal } from './Reveal'
import { scrollToTarget } from '../lib/scroll'

function ArrowDown() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1v13M2.5 8.5 8 14l5.5-5.5" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function Hero() {
  return (
    <section id="object" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner container">
        <div className="hero__copy">
          <Reveal className="eyebrow" distance={14}>
            <span className="eyebrow__rule" />
            Maison Eclipse — Paris
          </Reveal>

          <AnimatedHeading
            as="h1"
            className="hero__title"
            lines={['Scent is', 'a form of', '*memory.*']}
            immediate
            delay={0.18}
          />

          <Reveal className="hero__sub" delay={0.55} distance={20}>
            <p>
              Invisible by nature.
              <br />
              Impossible to forget.
            </p>
          </Reveal>

          <Reveal className="hero__action" delay={0.72} distance={18}>
            <button
              type="button"
              className="text-link"
              onClick={() => scrollToTarget('#impression', 0)}
            >
              <span>Discover the object</span>
              <ArrowDown />
            </button>
          </Reveal>
        </div>

        <div className="hero__aside" aria-hidden="true">
          <span className="hero__aside-index">No. 01</span>
          <span className="hero__aside-line" />
          <span className="hero__aside-name">Amber</span>
          <span className="hero__aside-meta">Extrait de parfum<br />50 ml</span>
        </div>
      </div>

      <div className="hero__foot container">
        <div className="scroll-cue">
          <span className="scroll-cue__line" aria-hidden="true">
            <i />
          </span>
          <span>Scroll to reveal</span>
        </div>
        <span className="hero__foot-center">Extrait de parfum — 30%</span>
        <span className="hero__foot-right">Paris · 48.8647° N</span>
      </div>
    </section>
  )
}
