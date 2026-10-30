export type KitItemId = 'mask' | 'earplugs' | 'pouch' | 'planner'

export interface KitItem {
  id: KitItemId
  number: string
  name: string
  summary: string
  details: string[]
  helpsWith: string
}

/** The four items in the Student Rest Kit, as described in the NightNest concept. */
export const kitItems: KitItem[] = [
  {
    id: 'mask',
    number: '01',
    name: 'Sleep mask',
    summary: 'Comfortable, light-blocking and soft against the skin.',
    details: [
      'Contoured shape that blocks corridor light, streetlights and early sunrise',
      'Soft fabric with an adjustable strap for side and back sleepers',
      'Light enough to wear on trains, coaches and flights home',
    ],
    helpsWith: 'Light from thin curtains, corridor gaps and flatmates’ late nights',
  },
  {
    id: 'earplugs',
    number: '02',
    name: 'Earplug case',
    summary: 'Reusable storage case that keeps earplugs clean and findable.',
    details: [
      'Snap-shut case so earplugs don’t end up loose in a bag or under the bed',
      'Small enough for a bedside drawer, pocket or pencil case',
      'Makes reusable earplugs a habit rather than a one-off',
    ],
    helpsWith: 'Shared walls, slamming doors and kitchen noise at 2am',
  },
  {
    id: 'pouch',
    number: '03',
    name: 'Accessory pouch',
    summary: 'Compact pouch that keeps the kit together in a room or a bag.',
    details: [
      'Holds the mask, earplug case and a folded planner page',
      'Zips into a backpack for library naps, placements and trips home',
      'Doubles as a ready-to-give package for gifting',
    ],
    helpsWith: 'Keeping everything together when you move between rooms, campus and home',
  },
  {
    id: 'planner',
    number: '04',
    name: 'Sleep-and-study planner',
    summary: 'Bedtime tracker, weekly study schedule, exam countdown and mood check-in.',
    details: [
      'Bedtime tracker to spot late-night patterns before exam weeks',
      'Weekly study schedule that plans revision around rest, not instead of it',
      'Exam countdown and a quick daily mood check-in',
    ],
    helpsWith: 'Connecting bedtime to the study week, so sleep isn’t treated separately',
  },
]

export interface Offer {
  id: 'rest-kit' | 'digital-planner' | 'extra-pouch' | 'planner-refill'
  name: string
  type: 'bundle' | 'download' | 'add-on'
  description: string
  priceLabel: string
}

/** Revenue streams from the business model: bundles, digital planner downloads and add-ons. */
export const offers: Offer[] = [
  {
    id: 'rest-kit',
    name: 'Student Rest Kit',
    type: 'bundle',
    description: 'All four items in one pouch: sleep mask, earplug case, accessory pouch and the printed planner.',
    priceLabel: '£16–18',
  },
  {
    id: 'digital-planner',
    name: 'Printable digital planner',
    type: 'download',
    description: 'The sleep-and-study planner as a printable download. A low-cost way to start the routine.',
    priceLabel: 'Low-cost download',
  },
  {
    id: 'extra-pouch',
    name: 'Extra accessory pouch',
    type: 'add-on',
    description: 'A second pouch for a travel bag or a flatmate.',
    priceLabel: 'Price TBC',
  },
  {
    id: 'planner-refill',
    name: 'Planner refill',
    type: 'add-on',
    description: 'Fresh planner pages for the next term or exam season.',
    priceLabel: 'Price TBC',
  },
]

export const comparison = {
  generic: [
    'Sold everywhere, so easy to compare on price alone',
    'One item that treats sleep as a separate issue',
    'No link to the way students actually work',
    'Not designed around halls or exam weeks',
  ],
  nightnest: [
    'A bundle with every sleep essential in one pouch',
    'Planner connects bedtime to the study week',
    'Exam countdown and mood check-in built in',
    'Made specifically for student life',
  ],
}
