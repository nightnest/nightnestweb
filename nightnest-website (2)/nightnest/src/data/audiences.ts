export interface Audience {
  id: 'students' | 'travellers' | 'parents'
  tag: string
  title: string
  body: string
  points: string[]
}

export const audiences: Audience[] = [
  {
    id: 'students',
    tag: 'Main market',
    title: 'Students in halls or shared flats',
    body: 'You share walls, corridors and kitchens, and face freshers’ week, early lectures and exam periods. You want an affordable, practical fix you can start using straight away.',
    points: ['Thin walls and late-night corridors', 'Early lectures after late nights', 'Exam weeks that push bedtime back'],
  },
  {
    id: 'travellers',
    tag: 'Secondary',
    title: 'Travellers and commuters',
    body: 'Compact rest accessories for trains, flights and unfamiliar rooms. The pouch makes the kit easy to carry.',
    points: ['Trips home at the end of term', 'Placements and early commutes', 'Hostels and unfamiliar rooms'],
  },
  {
    id: 'parents',
    tag: 'Gift buyer',
    title: 'Parents of new students',
    body: 'Looking for a useful, caring gift before the move to university. The bundle works as a ready-to-give present.',
    points: ['Ready to give, no assembly', 'Practical for the first term', 'Shows you thought about how they’ll settle in'],
  },
]
