import { useEffect, type RefObject } from 'react'
import { ScrollTrigger } from '../lib/gsap'
import type { Chapter } from '../lib/stage'
import { setChapter, stage } from '../lib/stage'

/**
 * One trigger per chapter. Ranges are contiguous: a section is "active" while
 * its sticky canvas is on screen. Scroll progress is written to a mutable
 * store so the render loop stays out of React.
 */
export function useChapterTrigger(
  chapter: Chapter,
  previous: Chapter,
  sectionRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      // `isActive` is the reliable gate: callback ordering inside ScrollTrigger
      // means a one-off jump into a chapter can fire onEnter without a following
      // onUpdate, which left the progress pinned at 0.
      onUpdate: (self) => {
        if (!self.isActive) return
        setChapter(chapter)
        stage.progress = self.progress
      },
      onLeave: () => {
        stage.progress = 1
      },
      onLeaveBack: () => {
        stage.progress = 0
        setChapter(previous)
      },
    })

    return () => trigger.kill()
  }, [chapter, previous, sectionRef])
}
