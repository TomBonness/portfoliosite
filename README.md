# Tom Bonness — portfolio

A single-page portfolio built with Next.js 16 and React 19, exported as a static site. It is styled as a terminal: an intro window with a `whoami` and a `neofetch`, a `tree` of every project, three chapters of work (boring to run, fast, shipped) in which each project is a window with a real screen, a list of earlier projects, an about window and a contact window. There are no client components: everything renders at build time.

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

- `src/data/projects.ts`: all project copy, and the data behind every screen. Each project gets one line, one readout (a measured figure with its unit), a short tag for the `tree`, its stack, its links, and details folded behind "how it works". Every number comes from a project's own README, release, or measurement record. Keep it that way, and keep development status explicit.
- `src/components/ProjectCard.tsx`: a project as a terminal window. Its screen comes first, then the name, the text and the links; the window sets them side by side only when it has room.
- `src/components/figures/`: one screen per project, made of real material wherever it exists: the bundle validator's own output, distributr's deploy job line for line, the installer's menu in its own words, the Cinmux screenshots, the Open Micro render, and the two live dashboards. Where nothing real can be shown, a terminal drawing of real facts stands in (Daish's sources, the week of releases, fngine's tiers, Lavtype's steps), and its caption says what is only an example.
- `src/components/Neofetch.tsx`, `WorkTree.tsx`, `Terminal.tsx`: the intro's facts, the project tree, and the window bar and prompt every window shares.
- `src/components/Picture.tsx` and `public/projects/`: images as AVIF with a WebP fallback, in two widths each. The Cinmux screenshots and the Open Micro render come from the [lab's repository](https://github.com/TomBonness/kettlemoraineweb); the ChipGuard and CloudSprouts dashboards were captured from the live sites in November 2026.
- `src/app/page.tsx`: page structure and the remaining copy (intro, about, contact).
- `src/app/globals.css`: all styling.
- `src/app/opengraph-image.png`: the link-preview card.

Project links go to the owner's GitHub account, a live deployment, or a Kettle Moraine Research Labs product page. `src/data/projects.test.ts` enforces the GitHub rule along with https links, unique anchor ids, and an image file for every variant the page asks for.

### Design rules

The design takes its restraint from [unslop](https://github.com/heydamir/unslop) by Damir Sokolovsky, and its markup and CSS from Chrome's [modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance).

- A terminal that is easy on the eyes: soft pastels on deep indigo, after the Catppuccin Mocha palette, never pure black or white. Body text holds at least 4.5:1 against what it sits on.
- One accent per chapter: green for boring to run, peach for fast, blue for shipped, mauve for the rest. It colors the chapter's prompts, readouts and marks, never a block of background.
- Two families through `next/font`: JetBrains Mono for anything a terminal would print, and Inter for sentences. Code turns ligatures off, so it shows the characters it has.
- Every screen is real output, real code, a real image, or a drawing of real facts. Decorative prompts and window titles are hidden from assistive tech; the headings beside them say the same.
- Sizes are in rem on a quarter-rem grid, line heights are unitless, and nothing that holds text has a fixed height, so the page follows the reader's text size. Windows and screens change layout on their own width through container queries.
- Motion is limited to `whoami` typing itself once, the cursor blinking five times, the header stepping aside on scroll, and the "how it works" toggle. All of it is off under reduced motion.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```
