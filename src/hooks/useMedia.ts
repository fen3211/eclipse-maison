import { useSyncExternalStore } from 'react'
import type { Layout } from '../lib/stage'

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export function useLayout(): Layout {
  const mobile = useMediaQuery('(max-width: 699px)')
  const tablet = useMediaQuery('(max-width: 1099px)')
  if (mobile) return 'mobile'
  if (tablet) return 'tablet'
  return 'desktop'
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
