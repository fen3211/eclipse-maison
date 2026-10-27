import { useSyncExternalStore } from 'react'

export type Chapter =
  | 'object'
  | 'impression'
  | 'scent'
  | 'anatomy'
  | 'collection'
  | 'finale'

export type Layout = 'desktop' | 'tablet' | 'mobile'

/**
 * Mutable bridge between the scroll timeline and the WebGL render loop.
 * ScrollTrigger writes here; useFrame reads here. No React re-render per frame.
 */
export const stage = {
  chapter: 'object' as Chapter,
  progress: 0,
  pointerX: 0,
  pointerY: 0,
  activeScent: 0,
  reducedMotion: false,
}

const listeners = new Set<() => void>()

export function setChapter(chapter: Chapter) {
  if (stage.chapter === chapter) return
  stage.chapter = chapter
  listeners.forEach((listener) => listener())
}

export function subscribeChapter(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getChapter() {
  return stage.chapter
}

export function useChapter() {
  return useSyncExternalStore(subscribeChapter, getChapter, () => 'object' as Chapter)
}

export const chapterIndex: Record<Chapter, number> = {
  object: 0,
  impression: 1,
  scent: 2,
  anatomy: 3,
  collection: 4,
  finale: 5,
}
