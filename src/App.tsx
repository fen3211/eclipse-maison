import { lazy, Suspense, useCallback, useState } from 'react'
import { Nav } from './components/Nav'
import { ProgressRail } from './components/ProgressRail'
import { Hero } from './components/Hero'
import { Impression } from './components/Impression'
import { ScentScene } from './components/ScentScene'
import { Interlude } from './components/Interlude'
import { Anatomy } from './components/Anatomy'
import { Collection } from './components/Collection'
import { Finale } from './components/Finale'
import { Footer } from './components/Footer'
import { FallbackPoster } from './components/FallbackPoster'
import { DebugHud } from './components/DebugHud'
import { useLayout, usePrefersReducedMotion } from './hooks/useMedia'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { usePageTheme } from './hooks/usePageTheme'
import { useWebGLSupport } from './hooks/useWebGLSupport'

const SceneCanvas = lazy(() => import('./three/SceneCanvas'))

export default function App() {
  const layout = useLayout()
  const reducedMotion = usePrefersReducedMotion()
  const webgl = useWebGLSupport()
  const light = usePageTheme()
  const [activeScent, setActiveScent] = useState(0)
  const [sceneReady, setSceneReady] = useState(false)

  useSmoothScroll(reducedMotion)

  const handleSelectScent = useCallback((index: number) => {
    setActiveScent(index)
  }, [])

  const theme = light ? 'light' : 'dark'
  const quality = layout === 'desktop' ? 'high' : 'medium'

  return (
    <div className={`site ${reducedMotion ? 'is-reduced' : ''}`}>
      <a className="skip-link" href="#object">
        Skip to content
      </a>

      <div
        className={`canvas-layer ${sceneReady ? 'is-ready' : ''}`}
        aria-hidden="true"
      >
        {webgl === true ? (
          <Suspense fallback={null}>
            <SceneCanvas
              layout={layout}
              activeScent={activeScent}
              quality={quality}
              active={!light}
              onReady={() => setSceneReady(true)}
            />
          </Suspense>
        ) : null}
      </div>

      <div className="scene-vignette" aria-hidden="true" />

      {webgl === false ? <FallbackPoster /> : null}

      <Nav theme={theme} />
      <ProgressRail theme={theme} />

      <main>
        <Hero />
        <Impression />
        <ScentScene />
        <Interlude />
        <Anatomy />
        <Collection activeScent={activeScent} onSelectScent={handleSelectScent} />
        <Finale />
      </main>

      <Footer onSelectScent={handleSelectScent} />

      <div className="grain" aria-hidden="true" />
      <DebugHud />
    </div>
  )
}
