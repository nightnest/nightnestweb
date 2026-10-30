# NightNest — Student Rest Kit website

Website for **NightNest**, a pre-launch, online-only business selling a compact **Student Rest Kit**
(sleep mask, earplug case, accessory pouch and a sleep-and-study planner) to university students
living in halls and shared flats. Built from the *NightNest Project Idea* concept document.

> **Pre-launch.** The kit is priced at around £16–18. The site collects *registered interest*, not orders.

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`), brand tokens in `src/index.css`
- React Router (client-side routing)
- Lucide icons
- Self-hosted fonts via Fontsource: Poppins (headings) and Inter (body), as specified in the brand guide

No backend is required to run it. Optional integrations are configured through environment variables.

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
npm run lint       # oxlint
```

## Configuration

Copy `.env.example` to `.env` and fill in what you need. All values are optional.

| Variable | Purpose |
| --- | --- |
| `VITE_FORM_ENDPOINT` | URL that accepts JSON `POST`s (e.g. a [Formspree](https://formspree.io) form or your own serverless function). Used by all four forms. |
| `VITE_PLAUSIBLE_DOMAIN` | Enables [Plausible](https://plausible.io) analytics; CTA clicks and sign-ups are sent as custom events with a `variant` property for the A/B test. |
| `VITE_CONTACT_EMAIL` | Public contact email shown in the footer and on the contact page. |
| `VITE_INSTAGRAM_URL`, `VITE_TIKTOK_URL` | Social profile links. Hidden until set. |

**Demo mode:** without `VITE_FORM_ENDPOINT`, form submissions are saved to the visitor's
`localStorage` only and every success message says so. Nothing pretends to reach a server.
Only put *public* values in `VITE_*` variables — they are embedded in the client bundle.

## Pages and features

| Route | What it does |
| --- | --- |
| `/` | Homepage: hero with A/B headline, customer problem, the four-item kit, differentiation, planner, target customers, how it works, guides, free routine sheet, FAQs, CTA |
| `/kit` | Kit details, what each item helps with, launch offers (bundle, printable planner, add-ons), target pricing |
| `/planner` | **Working planner**: bedtime tracker (weekly averages, late nights), weekly study schedule (flags blocks that run into bedtime), exam countdown, mood check-in with sleep/mood comparison. Saved in `localStorage`; printable; example week; clear data |
| `/routine-sheet` | Printable sleep-routine sheet, unlocked by email sign-up (builds the email list) |
| `/register-interest` | "Order or express interest" form: kit quantity, add-ons, gift option, live estimate from the target range, `.ac.uk` discount detection |
| `/student-discount` | Student list sign-up; validates `.ac.uk` addresses |
| `/guides`, `/guides/:slug` | Four SEO-focused guides (exam-week routine, sleeping in halls, freshers' week, planner walk-through) with topic filter and search |
| `/faq` | Searchable, filterable FAQ accordion |
| `/about` | Mission, principles and the public launch timeline |
| `/contact` | Enquiry form with validation and a spam honeypot |
| `/insights` | Team view of the A/B message test (see below) |
| `/privacy`, `*` | Privacy summary, 404 page |

### A/B message test

From the business plan: *"Sleep better in halls"* (A) vs *"Study smarter this exam season"* (B).
Each visitor is assigned a variant once (kept in `localStorage`); `?v=a` / `?v=b` forces one, so
social posts can link to a specific message. `utm_source` is captured on landing. `/insights`
shows the funnel from events recorded **in that browser only** (demo); real, aggregated numbers come
from Plausible when `VITE_PLAUSIBLE_DOMAIN` is set.

## Project structure

```
src/
  components/
    home/            homepage sections (Hero, KitSection, PlannerTeaser, ...)
    illustrations/   original SVG concept art (kit items + scenes)
    layout/          Header, Footer, AnnouncementBar, Layout, Logo
    planner/         planner tabs, types and example data
    ui/              Button, Accordion, FormField, FormResult, Reveal, ...
  data/              site copy: products, audiences, FAQs, guides
  hooks/             usePersistentState, useDocumentTitle
  lib/               config, analytics, A/B experiment, forms, validation, dates, storage
  pages/             one file per route
```

## Imagery

All visuals are original SVG illustrations in the brand palette (Midnight `#0F1B3D`, Lavender
`#A99BE8`, Moonlight `#F4D58D`), in `src/components/illustrations/`. No third-party images are used,
so no attribution is required.

## Deployment

The output is a static site in `dist/`. Because it uses client-side routing, the host must serve
`index.html` for unknown paths — config for this is included.

- **Netlify:** build command `npm run build`, publish directory `dist` (`public/_redirects` handles routing).
- **Vercel:** import the repo; framework preset *Vite* (`vercel.json` handles routing).
- **Cloudflare Pages:** build `npm run build`, output `dist`; add a `_redirects` rule as above (already included).

Set the `VITE_*` environment variables in the host's dashboard before building.

## Still needed before a real launch

- A form backend (`VITE_FORM_ENDPOINT`) and an email tool for the interest/student lists
- Analytics account (`VITE_PLAUSIBLE_DOMAIN`) to run the A/B test on real traffic
- Confirmed supplier, unit cost and launch price; discount amount; delivery options
- Photos of real kit samples; public contact email and social handles
- Payments/checkout (e.g. Stripe or Shopify) once the kit is actually on sale, plus a full privacy policy
