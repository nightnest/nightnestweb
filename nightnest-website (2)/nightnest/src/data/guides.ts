export type GuideTag = 'Exam weeks' | 'Halls life' | 'Routines' | 'Planner'

export type GuideBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'tip'; text: string }

export interface Guide {
  slug: string
  title: string
  excerpt: string
  tag: GuideTag
  readMinutes: number
  scene: 'desk' | 'room' | 'window' | 'planner'
  body: GuideBlock[]
}

export const guides: Guide[] = [
  {
    slug: 'exam-week-routine',
    title: 'An exam-week routine that protects your sleep',
    excerpt: 'Plan bedtime, study blocks and wind-down together, so revision doesn’t quietly eat the hours you need to remember it.',
    tag: 'Exam weeks',
    readMinutes: 6,
    scene: 'desk',
    body: [
      { type: 'p', text: 'Exam weeks tend to follow the same pattern: revision runs late, bedtime slips, mornings start groggy and the next day’s plan shrinks. The fix isn’t heroic willpower. It’s deciding your sleep window first and fitting study around it.' },
      { type: 'h2', text: 'Start with a fixed wake-up time' },
      { type: 'p', text: 'Pick the time you need to be up on your earliest exam day and use it every day of the exam period, including days off. A steady wake-up time is the anchor that makes a steady bedtime possible.' },
      { type: 'tip', text: 'Count back roughly eight hours from your wake-up time to set a target bedtime, then log it in the planner’s bedtime tracker so you can see when it starts slipping.' },
      { type: 'h2', text: 'Build study blocks, not study days' },
      { type: 'ul', items: [
        'Plan two or three focused blocks of 60–90 minutes with real breaks between them.',
        'Put the hardest subject in the block where you usually feel sharpest.',
        'Stop starting new topics in the last hour before bed. Use it for light review or flashcards.',
      ] },
      { type: 'h2', text: 'Protect a 30-minute wind-down' },
      { type: 'ol', items: [
        'Close the laptop and write tomorrow’s first task on paper so it isn’t running in your head.',
        'Dim the room: lamp on, main light off.',
        'Get the mask and earplugs out of the pouch before you need them, not at 1am in the dark.',
        'Do a quick mood check-in. A bad day noted down is easier to leave on the page.',
      ] },
      { type: 'h2', text: 'Use the exam countdown honestly' },
      { type: 'p', text: 'A countdown is useful when it shows how many study blocks you really have left, not as a source of panic. Divide the topics you still need to cover by the blocks remaining and adjust early rather than the night before.' },
      { type: 'p', text: 'If sleep problems carry on beyond exam season or start affecting your wellbeing, talk to your GP or your university’s wellbeing service. This guide is general advice, not medical advice.' },
    ],
  },
  {
    slug: 'how-to-sleep-in-halls',
    title: 'How to sleep in halls: a survival guide to noise and light',
    excerpt: 'Thin walls, fire doors, corridor lights and flatmates on a different schedule. Practical fixes for the most common halls sleep problems.',
    tag: 'Halls life',
    readMinutes: 5,
    scene: 'room',
    body: [
      { type: 'p', text: 'Halls are designed to fit a lot of people into a small space, which is great for meeting people and less great at 2am. Most halls sleep problems come down to two things you can partly control: noise and light.' },
      { type: 'h2', text: 'Noise' },
      { type: 'ul', items: [
        'Make earplugs routine. Keeping them in a case by the bed means you actually use them rather than hunting for a loose pair.',
        'Agree flat quiet hours early in the year, before anyone gets annoyed. It is much easier as a group conversation in week one.',
        'A small rug or a towel along the bottom of the door softens corridor noise and slamming fire doors.',
        'If you share a wall with a desk, ask whether the bed can move to the quieter side of the room.',
      ] },
      { type: 'h2', text: 'Light' },
      { type: 'ul', items: [
        'Halls curtains are often thin or too short. A sleep mask is the quickest fix and works in any room.',
        'Corridor lights on sensors flash on through door gaps. Tape over standby lights in the room too.',
        'Keep a warm lamp for the evening instead of the main ceiling light.',
      ] },
      { type: 'tip', text: 'Pack the mask and earplug case into the pouch and keep it in the same place every night. A habit that lives in one spot is a habit that sticks.' },
      { type: 'h2', text: 'Different schedules' },
      { type: 'p', text: 'Flatmates with 9am lectures and flatmates with night shifts will share the same kitchen. Put your rest window in the planner and share it. Most people are happy to keep it down once they know.' },
    ],
  },
  {
    slug: 'freshers-week-sleep',
    title: 'Freshers’ week without wrecking your sleep',
    excerpt: 'Enjoy the first week without spending the first month catching up. A realistic plan for late nights and early starts.',
    tag: 'Routines',
    readMinutes: 4,
    scene: 'window',
    body: [
      { type: 'p', text: 'Freshers’ week is meant to be busy. The goal isn’t to go to bed at ten every night; it’s to make sure the week ends with you rested enough to start lectures properly.' },
      { type: 'h2', text: 'Before you arrive' },
      { type: 'ul', items: [
        'Pack a sleep kit you can find on the first night: mask, earplugs and a phone charger long enough to reach the bed.',
        'Look up your first week’s timetable and note any early starts.',
      ] },
      { type: 'h2', text: 'During the week' },
      { type: 'ul', items: [
        'Pick one or two nights to have a quieter evening. Put them in the planner like an event.',
        'After a late night, keep your wake-up time close to normal and take a short early-afternoon nap instead of sleeping until 2pm.',
        'Drink water before bed and keep some by the bed.',
      ] },
      { type: 'tip', text: 'The first time someone in the flat shouts down the corridor at 4am, you will be glad the earplug case is already on the bedside table.' },
      { type: 'h2', text: 'The week after' },
      { type: 'p', text: 'Use the bedtime tracker for the first two weeks of term. Seeing your actual bedtimes is usually more convincing than any advice.' },
    ],
  },
  {
    slug: 'planner-walkthrough',
    title: 'Planner walk-through: linking bedtime to your study week',
    excerpt: 'How the four parts of the NightNest planner work together, and how to set it up in ten minutes on a Sunday evening.',
    tag: 'Planner',
    readMinutes: 4,
    scene: 'planner',
    body: [
      { type: 'p', text: 'The NightNest planner has four parts: a bedtime tracker, a weekly study schedule, an exam countdown and a mood check-in. Each is simple on its own. Used together, they show you how your sleep and your study affect each other.' },
      { type: 'h2', text: 'A ten-minute Sunday setup' },
      { type: 'ol', items: [
        'Add your exams and deadlines to the countdown.',
        'Block out lectures and fixed commitments in the weekly schedule.',
        'Add study blocks around them, finishing at least an hour before your target bedtime.',
        'Set your target bedtime and wake-up time in the tracker.',
      ] },
      { type: 'h2', text: 'Each day' },
      { type: 'ul', items: [
        'Log last night’s bedtime and wake-up time. It takes ten seconds.',
        'Tick off study blocks as you finish them.',
        'Do a one-tap mood check-in.',
      ] },
      { type: 'h2', text: 'At the end of the week' },
      { type: 'p', text: 'Look at the week as a whole. Did late nights cluster before particular deadlines? Were low-mood days after short nights? Move one thing next week, not everything.' },
      { type: 'tip', text: 'You can try the planner free on this site right now. It saves to your browser only, and you can print the week to stick above your desk.' },
    ],
  },
]

export const guideTags: GuideTag[] = ['Exam weeks', 'Halls life', 'Routines', 'Planner']
