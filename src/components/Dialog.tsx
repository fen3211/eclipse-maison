import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { startScroll, stopScroll } from '../lib/scroll'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Dialog({ open, onClose, title, children }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    stopScroll()
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || !focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      startScroll()
      previous?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        className="dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="dialog-panel__head">
          <span className="eyebrow eyebrow--ink">
            <span className="eyebrow__rule" />
            Maison Eclipse
          </span>
          <button
            ref={closeRef}
            type="button"
            className="dialog-panel__close"
            onClick={onClose}
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <h2 id="dialog-title" className="dialog-panel__title">{title}</h2>
        <div className="dialog-panel__body">{children}</div>
        <div className="dialog-panel__foot">
          <span>Paris · 2026</span>
          <button type="button" className="text-link text-link--small" onClick={onClose}>
            <span>Return</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
