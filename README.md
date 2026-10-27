# ECLIPSE — Maison de parfum

An interactive single-page study for a fictional Paris perfume house. Smoked
glass, amber and serif type; the flacon is rendered in real time and taken
apart while you scroll.

Demo only: the maison, the scents, the addresses and the correspondence form
are invented. No data leaves the browser.

## Stack

- React 19 + TypeScript + Vite
- Three.js / @react-three/fiber / drei for the flacon and the note specimens
- Lenis for smooth scrolling, GSAP for reveals
- Self-hosted Instrument Serif and Inter Tight (Fontsource)

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle into dist/
npm run preview  # serve the production build locally
npm run lint
```

## Structure

- `src/three/` — flacon model, materials, specimens, camera and light rigs
- `src/components/` — chapters, collection, dialog, footer
- `src/lib/stage.ts` — layout modes, reduced-motion, scroll-driven chapter state
- `src/styles/` — tokens, layout, sections, 3D overlays

## Deployment

The Vite `base` is relative, so the build works from any sub-path. A GitHub
Actions workflow in `.github/workflows/deploy.yml` builds and publishes `dist`
to GitHub Pages on every push to `main` (Pages source: GitHub Actions).

## Notes

- Reduced motion is respected: chapter transitions snap, the flacon stops
  floating, and reveals do not animate.
- The correspondence form stores the address in `localStorage` only.
- Site copy and imagery are fictional; fonts are used under the SIL Open Font
  License.
