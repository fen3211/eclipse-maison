import type { Layout } from '../lib/stage'
import { Backdrop } from './Backdrop'
import { BottleRig } from './BottleRig'
import { CameraRig } from './CameraRig'
import { Lights } from './Lights'
import { NotesSpecimens } from './Notes'
import { PerfMeter, PointerTracker } from './Trackers'

interface ExperienceProps {
  layout: Layout
  activeScent: number
  quality: 'high' | 'medium'
}

export function Experience({ layout, activeScent, quality }: ExperienceProps) {
  return (
    <>
      <CameraRig layout={layout} />
      <Lights quality={quality} />
      <Backdrop layout={layout} />
      <BottleRig layout={layout} activeScent={activeScent} quality={quality} />
      <NotesSpecimens layout={layout} />
      <PointerTracker />
      <PerfMeter />
    </>
  )
}
