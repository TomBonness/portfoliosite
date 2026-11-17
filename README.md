# Tom Bonness — portfolio

A single-page portfolio built with Next.js 16 and React 19, exported as a static site. An intro with a color-coded index, three chapters of work (boring to run, fast, shipped) in which every project has a picture, a short list of earlier projects, a toolbox, and contact links. There are no client components: everything renders at build time.

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

- `src/data/projects.ts`: all project copy, and the data behind every figure. Each project gets one line, one readout (a measured figure with its unit), its links, and details folded behind "How it works". Every number comes from a project's own README, release, or measurement record. Keep it that way, and keep development status explicit.
- `src/components/ProjectCard.tsx`: a project as a card with four regions in reading order: picture, name, text, links. A card with a row to itself sets the picture beside the text when it is wide enough; two cards side by side share their row's tracks so they line up.
- `src/components/figures/`: one picture per project. A real image where the thing can be seen (the Cinmux windows, the Open Micro render, the two live dashboards), and a diagram of real facts where it can't (the boot check, the deploy pipeline, the installer menu, Daish's sources, the week of releases, fngine's tiers, Lavtype's flow). Where part of a figure is only an example, its caption says so.
- `src/components/Picture.tsx` and `public/projects/`: images as AVIF with a WebP fallback, in two widths each. The Cinmux screenshots and the Open Micro render come from the [lab's repository](https://github.com/TomBonness/kettlemoraineweb); the ChipGuard and CloudSprouts dashboards were captured from the live sites in November 2026.
- `src/app/page.tsx`: page structure and the remaining copy (intro, about, contact).
- `src/app/globals.css`: all styling, light and dark.
- `src/app/opengraph-image.png`: the link-preview card.

Project links go to the owner's GitHub account, a live deployment, or a Kettle Moraine Research Labs product page. `src/data/projects.test.ts` enforces the GitHub rule along with https links, unique anchor ids, and an image file for every variant the page asks for.

### Design rules

The design follows [unslop](https://github.com/heydamir/unslop) by Damir Sokolovsky, and the markup and CSS follow Chrome's [modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance).

- One picture and one readout per project. A picture has to explain something; none is there to fill space.
- Each chapter owns one color (green, orange, blue) in four roles: tint, soft, vivid and ink. Color appears where a chapter shows its work: its stages, its heading, its readouts. Everything else stays neutral. Marks and display type hold 3:1 against what they sit on, and text holds 4.5:1.
- Two families through `next/font`: IBM Plex Sans, and IBM Plex Mono for figures and code.
- Seven type sizes (0.75, 0.875, 1, 1.25, 1.75 and 2.5rem, plus one fluid display size) and two weights (400, 500). Sentence case, no italics.
- Sizes are in rem on a quarter-rem grid, line heights are unitless, and nothing that holds text has a fixed height, so the page follows the reader's text size. Layout changes on container width or em-based breakpoints.
- Short strings (headlines, labels, one-line captions and summaries) end without a period.
- Motion is limited to the header stepping aside on scroll, the "How it works" toggle, and hover states. Movement is off under reduced motion; color transitions stay.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```
