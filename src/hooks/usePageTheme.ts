import { useEffect, useState } from 'react'

/**
 * The page has two light, opaque sections. The fixed WebGL layer is hidden
 * behind them, so we also use this to pause the render loop.
 */
export function usePageTheme() {
  const [light, setLight] = useState(false)

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-page-theme="light"]'),
    )
    if (!sections.length) return

    const visible = new Set<HTMLElement>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement
          if (entry.isIntersecting) visible.add(element)
          else visible.delete(element)
        })
        setLight(visible.size > 0)
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return light
}
