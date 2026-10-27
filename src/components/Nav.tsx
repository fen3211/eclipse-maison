import { useEffect, useRef, useState } from 'react'
import { chapterMeta } from '../data/content'
import { scrollToTarget } from '../lib/scroll'

interface NavProps {
  theme: 'dark' | 'light'
}

const links = [
  { label: 'The Object', href: '#object' },
  { label: 'The Scent', href: '#scent' },
  { label: 'The Collection', href: '#collection' },
  { label: 'The Maison', href: '#maison' },
]

export function Nav({ theme }: NavProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      setScrolled(window.scrollY > 24)
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.documentElement.classList.add('menu-open')
    window.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()
    return () => {
      document.documentElement.classList.remove('menu-open')
      window.removeEventListener('keydown', onKeyDown)
      previous?.focus?.()
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    window.setTimeout(() => scrollToTarget(href, 0), 30)
  }

  return (
    <>
      <header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        data-theme={theme}
      >
        <button
          className="nav__brand"
          type="button"
          onClick={() => scrollToTarget('#object', 0)}
          aria-label="ECLIPSE — back to the top"
        >
          <svg className="nav__mark" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1" />
            <path
              d="M12 2.8a9.2 9.2 0 0 0 0 18.4A9.2 9.2 0 0 0 21.2 12 9.2 9.2 0 0 0 12 2.8Z"
              fill="currentColor"
            />
          </svg>
          <span>ECLIPSE</span>
        </button>

        <nav className="nav__links" aria-label="Primary">
          {links.map((link) => (
            <button key={link.href} type="button" onClick={() => go(link.href)}>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="nav__end">
          <span className="nav__city">Paris · 3e</span>
          <button
            ref={menuButtonRef}
            type="button"
            className="nav__menu"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            <span>Menu</span>
            <span className="nav__menu-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        className={`menu ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="menu__top">
          <span className="menu__brand">ECLIPSE</span>
          <button
            ref={closeButtonRef}
            type="button"
            className="menu__close"
            onClick={() => setOpen(false)}
          >
            Close
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav className="menu__nav" aria-label="Menu">
          {chapterMeta.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              onClick={() => go(`#${chapter.id === 'object' ? 'object' : chapter.id}`)}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <span className="menu__no">{chapter.no}</span>
              <span className="menu__label">{chapter.label}</span>
            </button>
          ))}
        </nav>

        <div className="menu__foot">
          <a href="mailto:hello@eclipse-parfums.com">hello@eclipse-parfums.com</a>
          <span>14 Rue de Turenne, 75003 Paris</span>
          <span>© 2026 Maison Eclipse</span>
        </div>
      </div>
    </>
  )
}
