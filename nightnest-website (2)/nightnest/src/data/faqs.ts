export type FaqCategory = 'The kit' | 'Planner' | 'Ordering & launch' | 'Student discount' | 'Gifting'

export interface Faq {
  q: string
  a: string
  category: FaqCategory
}

export const faqs: Faq[] = [
  {
    category: 'The kit',
    q: 'What is in the Student Rest Kit?',
    a: 'Four items in one bundle: a light-blocking sleep mask, a reusable earplug case, a compact accessory pouch, and the sleep-and-study planner (bedtime tracker, weekly study schedule, exam countdown and mood check-in).',
  },
  {
    category: 'The kit',
    q: 'How is this different from buying a sleep mask?',
    a: 'A generic mask treats sleep as a separate problem. NightNest combines the physical sleep essentials with a planner built around student routines, so bedtime is planned alongside revision, lectures and exam dates.',
  },
  {
    category: 'The kit',
    q: 'Is the kit useful outside halls?',
    a: 'Yes. Travellers and commuters can use the mask and earplugs on trains, coaches and flights, and the pouch keeps everything together in a bag.',
  },
  {
    category: 'Planner',
    q: 'Can I try the planner before the kit launches?',
    a: 'Yes. The online planner on this site is free to use now. It saves to your own browser only, and you can print a weekly sheet at any time.',
  },
  {
    category: 'Planner',
    q: 'Where is my planner data stored?',
    a: 'Only in your browser’s local storage on this device. It is not sent to NightNest. Clearing your browser data or switching devices will reset it, and you can clear it yourself from the planner.',
  },
  {
    category: 'Planner',
    q: 'What is the free sleep-routine sheet?',
    a: 'A one-page printable wind-down routine and bedtime checklist designed for halls and exam weeks. Enter your email on the planner page to unlock it.',
  },
  {
    category: 'Ordering & launch',
    q: 'Can I buy the kit today?',
    a: 'Not yet. NightNest is pre-launch. You can register your interest now and we will contact you when the first small batch is ready. No payment is taken when you register.',
  },
  {
    category: 'Ordering & launch',
    q: 'How much will it cost?',
    a: 'The Rest Kit is around £16–18, with an extra student discount for anyone with a .ac.uk email. The exact launch price will be emailed to everyone who registers interest.',
  },
  {
    category: 'Ordering & launch',
    q: 'Will there be a shop?',
    a: 'NightNest is online-only: this website plus social channels. Keeping out of physical retail keeps costs low, which helps us keep the kit affordable.',
  },
  {
    category: 'Ordering & launch',
    q: 'When will the first batch be ready?',
    a: 'We are working towards freshers’ week and the exam seasons as launch moments. Exact dates depend on supplier lead times, so we will email everyone who registers interest once they are confirmed.',
  },
  {
    category: 'Student discount',
    q: 'Who is eligible for the student discount?',
    a: 'Students with a valid UK university email address ending in .ac.uk. Join the student list and we will send your discount when the kit launches.',
  },
  {
    category: 'Student discount',
    q: 'How much is the student discount?',
    a: 'The discount amount will be confirmed together with the launch price. Everyone on the student list will receive it.',
  },
  {
    category: 'Gifting',
    q: 'Does the kit work as a gift?',
    a: 'Yes, that is part of the design. The pouch packages the kit as a ready-to-give present for students starting university. You can say it is a gift when you register interest.',
  },
  {
    category: 'Gifting',
    q: 'Can I send it straight to a student’s halls?',
    a: 'We plan to support delivery to a separate address. Delivery options will be confirmed at launch.',
  },
]

export const faqCategories: FaqCategory[] = ['The kit', 'Planner', 'Ordering & launch', 'Student discount', 'Gifting']
