# Tom Bonness — portfolio

A single-page portfolio built with Next.js 16 and React 19, exported as a static site. The homepage combines an interactive phyllotaxis study, Kettle Moraine Research Labs products, an illustrated project collection, and contact links.

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

- `src/app/page.tsx`: homepage sections and copy.
- `src/app/globals.css`: responsive layout, color, type, and reduced-motion styles.
- `src/data/projects.ts`: existing projects plus the separate lab catalog. Keep product development status explicit.
- `src/components/SeedStudy.tsx`: keyboard-accessible divergence-angle experiment.
- `src/components/ProjectArtwork.tsx`: decorative project illustrations, not product screenshots.
- `public/projects/open-micro.webp`: Open Micro concept artwork from the lab's own repository.

Typography is self-hosted through `next/font`: Instrument Serif, DM Sans, and IBM Plex Mono. Public project content is local; there are no runtime GitHub or lab API requests.

Lab descriptions, routes, and product status come from the [Kettle Moraine catalog](https://github.com/TomBonness/kettlemoraineweb/blob/main/src/content/catalog.ts) and its product content files. The [Open Micro concept image](https://github.com/TomBonness/kettlemoraineweb/blob/main/src/assets/product/marketing/open-micro-home-960.webp) is not a finished-product photograph.

This redesign covers the portfolio homepage. Linked project and lab websites remain separate and unchanged, pending approval of the visual direction.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```
