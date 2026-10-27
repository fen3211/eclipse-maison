import { useEffect, useRef } from 'react'
import { chapterMeta } from '../data/content'
import { useChapter } from '../lib/stage'

interface ProgressRailProps {
  theme: 'dark' | 'light'
}

export function ProgressRail({ theme }: ProgressRailProps) {
  const fillRef = useRef<HTMLSpanElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const chapter = useChapter()
  const meta = chapterMeta.find((item) => item.id === chapter) ?? chapterMeta[0]

  useEffect(() => {
    let frame = 0
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${progress})`
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${String(Math.round(progress * 100)).padStart(2, '0')}`
      }
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <aside className="rail" data-theme={theme} aria-hidden="true">
      <div className="rail__count">
        <span>{meta.no}</span>
        <span className="rail__total">/ 06</span>
      </div>
      <div className="rail__track">
        <span ref={fillRef} className="rail__fill" />
      </div>
      <div className="rail__label">
        <span>{meta.label}</span>
        <span className="rail__percent">
          <span ref={percentRef}>00</span>%
        </span>
      </div>
    </aside>
  )
}
