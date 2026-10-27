import { AnimatedHeading } from './AnimatedHeading'
import { Reveal } from './Reveal'

export function Interlude() {
  return (
    <section
      id="maison"
      className="interlude"
      data-page-theme="light"
      aria-labelledby="maison-title"
    >
      <div className="interlude__inner container">
        <div className="interlude__head">
          <Reveal className="eyebrow eyebrow--ink" distance={12}>
            <span className="eyebrow__rule" />
            The Maison
          </Reveal>
          <AnimatedHeading
            lines={['Invisible', 'by *nature.*']}
            className="interlude__title"
          />
        </div>

        <div className="interlude__body">
          <Reveal delay={0.1}>
            <p className="interlude__lead">
              ECLIPSE is a small maison in the 3rd arrondissement, working with a
              single perfumer and a glass foundry outside Nancy.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p>
              We release one collection every two years. Nothing is seasonal.
              Nothing is repeated. The bottles are cast in smoked glass and
              finished by hand; the caps are machined from recycled bronze. Each
              scent is macerated for six weeks, then rested for six more.
            </p>
          </Reveal>
          <Reveal className="interlude__meta" delay={0.26}>
            <div>
              <span>Paris</span>
              <span>Est. 2019</span>
            </div>
            <div>
              <span>Concentration</span>
              <span>Extrait — 30%</span>
            </div>
            <div>
              <span>Production</span>
              <span>Hand-finished in France</span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="interlude__mark" aria-hidden="true">
        <span className="interlude__mark-ring" />
        <span className="interlude__mark-disc" />
        <span className="interlude__mark-caption">ECLIPSE / MMXXVI</span>
      </div>

      <div className="interlude__foot container">
        <span>Maison Eclipse — Paris</span>
        <span>Objects for the moment after.</span>
      </div>
    </section>
  )
}
