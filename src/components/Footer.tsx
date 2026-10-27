import { useEffect, useState, type FormEvent } from 'react'
import { brand, scents } from '../data/content'
import { scrollToTarget } from '../lib/scroll'
import { Dialog } from './Dialog'

interface FooterProps {
  onSelectScent: (index: number) => void
}

type Legal = 'privacy' | 'terms' | null

export function Footer({ onSelectScent }: FooterProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [legal, setLegal] = useState<Legal>(null)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('eclipse:newsletter')
      if (saved) {
        setEmail(saved)
        setStatus('saved')
      }
    } catch {
      // Storage can be unavailable in private contexts; the form still works.
    }
  }, [])

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!valid) {
      setStatus('error')
      return
    }
    try {
      window.localStorage.setItem('eclipse:newsletter', email.trim())
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }

  const chooseScent = (index: number) => {
    onSelectScent(index)
    scrollToTarget('#collection', 0)
  }

  return (
    <>
      <footer id="contact" className="footer" data-page-theme="light">
        <div className="footer__top container">
          <div className="footer__statement">
            <span className="eyebrow eyebrow--ink">
              <span className="eyebrow__rule" />
              Scent is a form of memory
            </span>
            <p className="footer__line">
              Invisible by nature.
              <br />
              Impossible to forget.
            </p>
          </div>

          <div className="footer__wordmark" aria-hidden="true">
            <span className="footer__mark">
              <i />
            </span>
            ECLIPSE
          </div>
        </div>

        <div className="footer__grid container">
          <div className="footer__column footer__column--wide">
            <span className="footer__label">The Collection</span>
            <ul>
              {scents.map((scent, index) => (
                <li key={scent.id}>
                  <button type="button" onClick={() => chooseScent(index)}>
                    <span className="footer__scent-no">{scent.no}</span>
                    {scent.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <span className="footer__label">Maison</span>
            <ul>
              <li>
                <button type="button" onClick={() => scrollToTarget('#object', 0)}>
                  The Object
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToTarget('#scent', 0)}>
                  The Scent
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToTarget('#anatomy', 0)}>
                  Anatomy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToTarget('#maison', 0)}>
                  The Maison
                </button>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <span className="footer__label">Contact</span>
            <ul>
              <li>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </li>
              <li>
                <span>{brand.address}</span>
              </li>
              <li>
                <span>{brand.instagram}</span>
              </li>
            </ul>
            <p className="footer__hours">Atelier visits by appointment.<br />Tuesday — Friday, 10h — 18h.</p>
          </div>

          <div className="footer__column footer__column--newsletter">
            <span className="footer__label">Correspondence</span>
            <p className="footer__news-copy">
              A letter, four times a year. Notes on the objects, the materials
              and the people who make them.
            </p>
            <form className="newsletter" onSubmit={subscribe} noValidate>
              <label className="visually-hidden" htmlFor="newsletter-email">
                Email address
              </label>
              <div className="newsletter__row">
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  aria-describedby="newsletter-note newsletter-status"
                />
                <button type="submit" aria-label="Subscribe to the correspondence">
                  <span>{status === 'saved' ? 'Saved' : 'Join'}</span>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </button>
              </div>
              <p id="newsletter-note" className="newsletter__note">
                Demo — your address is stored only in this browser. Nothing is
                sent.
              </p>
              <p
                id="newsletter-status"
                className={`newsletter__status ${status === 'error' ? 'is-error' : ''}`}
                aria-live="polite"
              >
                {status === 'saved' && 'Saved locally. No data leaves your device.'}
                {status === 'error' && 'Enter a valid email address.'}
              </p>
            </form>
          </div>
        </div>

        <div className="footer__bottom container">
          <span>© 2026 Maison Eclipse — Paris</span>
          <span className="footer__credit">A fictional maison, built as an interactive study.</span>
          <div className="footer__legal">
            <button type="button" onClick={() => setLegal('privacy')}>Privacy</button>
            <button type="button" onClick={() => setLegal('terms')}>Terms</button>
            <button type="button" onClick={() => scrollToTarget('#object', 0)}>
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>

      <Dialog
        open={legal !== null}
        onClose={() => setLegal(null)}
        title={legal === 'terms' ? 'Terms' : 'Privacy'}
      >
        {legal === 'terms' ? (
          <>
            <p>
              ECLIPSE is a fictional maison created as a design and development
              study. Products, prices, addresses and availability on this site
              are not real.
            </p>
            <p>
              The interface is provided as a demonstration. No purchase can be
              made, and no commercial relationship is created by using it.
            </p>
            <p>
              All imagery, copy and three-dimensional forms are original work
              made for this project.
            </p>
          </>
        ) : (
          <>
            <p>
              This site does not use analytics, advertising cookies or third-party
              trackers. No personal data is transmitted to a server.
            </p>
            <p>
              If you use the correspondence form, the address you enter is saved
              in your own browser's localStorage so the interface can remember
              it. You can clear it at any time through your browser settings.
            </p>
            <p>
              Email links open your own mail application. Nothing is sent until
              you choose to send it.
            </p>
          </>
        )}
      </Dialog>
    </>
  )
}
