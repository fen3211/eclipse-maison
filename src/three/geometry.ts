import * as THREE from 'three'

export const BOTTLE = {
  bodyWidth: 1.52,
  bodyHeight: 2.55,
  bodyDepth: 0.55,
  bevel: 0.1,
  capHeight: 0.5,
  totalHeight: 3.12,
}

/**
 * The flacon is an extruded, asymmetric slab: a soft rectangular silhouette
 * with a shoulder that falls away to the right. The bevel is generous on
 * purpose — it is the edge that carries the glass highlight.
 */
export function createBodyGeometry() {
  const width = BOTTLE.bodyWidth / 2
  const radius = 0.16
  const shape = new THREE.Shape()

  shape.moveTo(-width + radius, 0)
  shape.lineTo(width - radius, 0)
  shape.quadraticCurveTo(width, 0, width, radius)
  shape.lineTo(width, 2.12)
  shape.quadraticCurveTo(width, 2.3, width - 0.16, 2.38)
  shape.lineTo(-width + 0.32, 2.51)
  shape.quadraticCurveTo(-width + 0.1, 2.54, -width + 0.06, 2.36)
  shape.lineTo(-width, 2.12)
  shape.lineTo(-width, radius)
  shape.quadraticCurveTo(-width, 0, -width + radius, 0)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: BOTTLE.bodyDepth,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: BOTTLE.bevel,
    bevelThickness: BOTTLE.bevel,
    curveSegments: 28,
  })

  geometry.center()
  geometry.computeBoundingBox()
  geometry.translate(0, -(geometry.boundingBox?.min.y ?? 0), 0)
  geometry.computeVertexNormals()
  return geometry
}

/** The liquid follows the body silhouette, but stops at a flat surface. */
export function createLiquidGeometry() {
  const width = 0.59
  const height = 1.52
  const radius = 0.12
  const shape = new THREE.Shape()

  shape.moveTo(-width + radius, 0)
  shape.lineTo(width - radius, 0)
  shape.quadraticCurveTo(width, 0, width, radius)
  shape.lineTo(width, height - radius)
  shape.quadraticCurveTo(width, height, width - radius, height)
  shape.lineTo(-width + radius, height)
  shape.quadraticCurveTo(-width, height, -width, height - radius)
  shape.lineTo(-width, radius)
  shape.quadraticCurveTo(-width, 0, -width + radius, 0)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.42,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.055,
    bevelThickness: 0.055,
    curveSegments: 20,
  })

  geometry.center()
  geometry.computeBoundingBox()
  geometry.translate(0, -(geometry.boundingBox?.min.y ?? 0), 0)
  geometry.computeVertexNormals()
  return geometry
}

export function createCapGeometry() {
  const profile = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.42, 0),
    new THREE.Vector2(0.49, 0.015),
    new THREE.Vector2(0.5, 0.055),
    new THREE.Vector2(0.5, 0.33),
    new THREE.Vector2(0.485, 0.39),
    new THREE.Vector2(0.44, 0.455),
    new THREE.Vector2(0.36, 0.49),
    new THREE.Vector2(0.22, 0.5),
    new THREE.Vector2(0, 0.5),
  ]

  return new THREE.LatheGeometry(profile, 72)
}

export function createKnurledBandGeometry() {
  const geometry = new THREE.CylinderGeometry(0.507, 0.507, 0.155, 120, 1, true)
  const position = geometry.attributes.position

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i)
    const z = position.getZ(i)
    const angle = Math.atan2(x, z)
    const radius = 0.507 + Math.sin(angle * 34) * 0.0038
    position.setX(i, Math.sin(angle) * radius)
    position.setZ(i, Math.cos(angle) * radius)
  }

  position.needsUpdate = true
  geometry.computeVertexNormals()
  return geometry
}

export function createLabelTexture(no: string, name: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const context = canvas.getContext('2d')
  if (!context) return null

  context.clearRect(0, 0, 512, 256)
  context.textAlign = 'center'
  context.fillStyle = 'rgba(239, 233, 221, 0.92)'
  context.font = '400 48px Georgia, "Times New Roman", serif'
  context.fillText('ECLIPSE', 256, 100)

  context.strokeStyle = 'rgba(239, 233, 221, 0.5)'
  context.lineWidth = 1
  context.beginPath()
  context.moveTo(186, 122)
  context.lineTo(326, 122)
  context.stroke()

  context.fillStyle = 'rgba(239, 233, 221, 0.68)'
  context.font = '500 18px Arial, sans-serif'
  context.fillText(`NO. ${no} — ${name.toUpperCase()}`, 256, 158)
  context.font = '400 13px Arial, sans-serif'
  context.fillStyle = 'rgba(239, 233, 221, 0.45)'
  context.fillText('EXTRAIT DE PARFUM', 256, 186)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  texture.needsUpdate = true
  return texture
}

let shadowTexture: THREE.CanvasTexture | null = null

export function getShadowTexture() {
  if (shadowTexture) return shadowTexture
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')
  if (!context) return null
  const gradient = context.createRadialGradient(128, 128, 4, 128, 128, 126)
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)')
  gradient.addColorStop(0.35, 'rgba(0, 0, 0, 0.55)')
  gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.18)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 256, 256)
  shadowTexture = new THREE.CanvasTexture(canvas)
  shadowTexture.colorSpace = THREE.SRGBColorSpace
  return shadowTexture
}

let backdropTexture: THREE.CanvasTexture | null = null

export function getBackdropTexture() {
  if (backdropTexture) return backdropTexture
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const context = canvas.getContext('2d')
  if (!context) return null
  const gradient = context.createRadialGradient(256, 248, 12, 256, 256, 254)
  gradient.addColorStop(0, 'rgba(126, 82, 43, 0.52)')
  gradient.addColorStop(0.32, 'rgba(83, 53, 28, 0.25)')
  gradient.addColorStop(0.62, 'rgba(39, 26, 16, 0.09)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 512, 512)
  backdropTexture = new THREE.CanvasTexture(canvas)
  backdropTexture.colorSpace = THREE.SRGBColorSpace
  return backdropTexture
}
