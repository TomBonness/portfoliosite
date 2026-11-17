# Tom Bonness — portfolio

A single-page portfolio built with Next.js 16 and React 19, exported as a static site. A hero with one moving visual, three chapters of work (boring to run, fast, shipped), a short index of smaller projects, a toolbox, and contact links.

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

- `src/data/projects.ts`: all project copy. Each project gets one line, one readout (a measured figure with its unit), its links, and details folded behind "How it works". Every number comes from a project's own README, release, or measurement record. Keep it that way, and keep development status explicit.
- `src/data/race.ts` and `src/lib/race.ts`: the hero race. Three engines write distributr's deploy role and CI workflow at their measured tokens per second, and the race stops when the first one finishes. `src/components/Race.tsx` is the only client component; it renders the finished race on the server and replays it once in the browser, never under reduced motion.
- `src/components/Preflight.tsx`, `WeekChart.tsx`: the visuals for the first two chapters. The third is the Cinmux screenshot in `public/projects/`, from the [lab's repository](https://github.com/TomBonness/kettlemoraineweb).
- `src/components/ProjectFeature.tsx`, `ProjectRow.tsx`: a chapter's first project beside its visual, and the rest as an index with aligned columns.
- `src/app/page.tsx`: page structure and the remaining copy (hero, about, contact).
- `src/app/globals.css`: all styling, light and dark.
- `src/app/opengraph-image.png`: the link-preview card.

Project links go to the owner's GitHub account, a live deployment, or a Kettle Moraine Research Labs product page. `src/data/projects.test.ts` enforces the GitHub rule along with https links and unique anchor ids.

### Design rules

The design pass follows [unslop](https://github.com/heydamir/unslop) by Damir Sokolovsky.

- One visual per chapter, and one readout per project. Nothing else competes for attention.
- Two families through `next/font`: IBM Plex Sans, and IBM Plex Mono for figures and code.
- Seven type sizes (12, 14, 16, 20, 28, 40, 56) and two weights (400, 500). Sentence case, no italics.
- Spacing on a 4px grid.
- One warm neutral ramp with three text roles. The accent appears only inside the visuals.
- Short strings (headlines, labels, captions, one-line summaries) end without a period.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```
