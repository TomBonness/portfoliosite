# Tom Bonness — portfolio

A single-page portfolio built with Next.js 16 and React 19, exported as a static site. The page is rendered at build time and has no client components: a hero with four measured results, the work grouped by kind (infrastructure and operations, performance and systems, shipped software, earlier builds, small tools), a toolbox, and contact links.

## Run locally

```bash
npm ci
npm run dev
```

Development: [localhost:3000](http://localhost:3000).

```bash
npm run build
npm run preview
```

Production preview: [localhost:4173](http://localhost:4173). Deploy the generated `out/` directory; no application server is required.

## Content and design

- `src/data/projects.ts`: all copy for the work sections, the proof strip, small tools, and the toolbox. Every number comes from a project's own README, release, or measurement record. Keep it that way, and keep development status explicit.
- `src/app/page.tsx`: page structure and the remaining copy (hero, about, contact).
- `src/components/ProjectEntry.tsx` and `ProjectCard.tsx`: the full and compact project layouts.
- `src/components/ProjectFigure.tsx`: the figure beside an entry, which is a step flow, a bar chart, a label/detail table, or an image.
- `src/app/globals.css`: layout, light and dark color, type, and reduced-motion styles. Entries respond to their own width through container queries.
- `src/app/opengraph-image.png`: the link-preview card.
- `public/projects/`: the Cinmux screenshot and the Open Micro concept render, both from the [lab's repository](https://github.com/TomBonness/kettlemoraineweb). The render is not a finished-product photograph.

Typography is self-hosted through `next/font`: Instrument Serif, IBM Plex Sans, and IBM Plex Mono. Project content is local; there are no runtime API requests.

Project links go to the owner's GitHub account, a live deployment, or a Kettle Moraine Research Labs product page. `src/data/projects.test.ts` enforces the GitHub rule along with https links and unique anchor ids.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```
