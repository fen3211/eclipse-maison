export type ScentId = 'amber' | 'iris' | 'cedar'

export interface Scent {
  id: ScentId
  no: string
  name: string
  family: string
  description: string
  detail: string
  notes: string[]
  liquid: string
  liquidDeep: string
  glass: string
  cap: string
  swatch: string
  price: string
}

export const scents: Scent[] = [
  {
    id: 'amber',
    no: '01',
    name: 'Amber',
    family: 'Amber · Labdanum · Vanilla',
    description:
      'Warm, resinous, close to the skin. The memory of a room after the fire has gone out.',
    detail:
      'A dark amber built on labdanum absolute and a whisper of vanilla. It opens dry and mineral, then turns honeyed as it meets skin. The most physical of the three.',
    notes: ['Labdanum absolute', 'Vanilla', 'Benzoin', 'A trace of salt'],
    liquid: '#b76a2a',
    liquidDeep: '#7c3a0e',
    glass: '#74675b',
    cap: '#9a7448',
    swatch: '#c08446',
    price: '€240 / 50 ml',
  },
  {
    id: 'iris',
    no: '02',
    name: 'Iris',
    family: 'Iris · Orris · Musk',
    description:
      'Powdery, cool, mineral. Linen and stone in winter light.',
    detail:
      'Florentine orris butter, aged three years, gives a root-like powder that feels almost metallic. Clean musk holds it close. A scent with no temperature of its own.',
    notes: ['Orris butter', 'Violet leaf', 'White musk', 'Wet stone'],
    liquid: '#9d95b0',
    liquidDeep: '#5f5874',
    glass: '#6b6a72',
    cap: '#8e8b87',
    swatch: '#aaa2b8',
    price: '€260 / 50 ml',
  },
  {
    id: 'cedar',
    no: '03',
    name: 'Cedar',
    family: 'Cedar · Vetiver · Smoke',
    description:
      'Dry, vertical, green at the edge. A forest after rain, seen from inside.',
    detail:
      'Atlas cedarwood is smoked over green vetiver and a pinch of black pepper. It is the driest of the collection: less a trail than a structure, holding the air around you.',
    notes: ['Atlas cedar', 'Vetiver root', 'Black pepper', 'Cold smoke'],
    liquid: '#616c42',
    liquidDeep: '#353e22',
    glass: '#63655a',
    cap: '#6d5b44',
    swatch: '#7b865c',
    price: '€240 / 50 ml',
  },
]

export const chapterMeta = [
  { id: 'object', no: '01', label: 'The Object' },
  { id: 'impression', no: '02', label: 'First Impression' },
  { id: 'scent', no: '03', label: 'Inside the Scent' },
  { id: 'anatomy', no: '04', label: 'Anatomy' },
  { id: 'collection', no: '05', label: 'The Collection' },
  { id: 'finale', no: '06', label: 'Leave a Trace' },
] as const

export const brand = {
  name: 'ECLIPSE',
  city: 'Paris',
  email: 'hello@eclipse-parfums.com',
  address: '14 Rue de Turenne, 75003 Paris',
  instagram: '@eclipse.parfums',
}
