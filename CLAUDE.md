# Refinas store-page demo

Next.js 15 (App Router, TS, CSS Modules — no Tailwind, no UI deps) demo reproducing LAVA's
16-block store-page IA with Refinas design tokens. Build spec: `context/RE9710~1.MD` (English, §0 = this demo phase).

## Commands
- `npm run dev` / `npm run build` / `npm start`
- Demo routes: `/gym/shibuya` (primary), `/gym/refinas_ikebukuro`, `/gym/yokohama`, `/gym` (list)

## Rules
- All colors/spacing/type via CSS vars in `src/styles/tokens.css` — never hardcode colors.
- Section components live in `src/components/gym/`, receive data only via `{ gym: Gym }` props
  (type: `src/types/gym.ts`), and do NOT render their own `<Section>` — `app/gym/[slug]/page.tsx`
  wraps them and owns the background/corner-cut alternation. `SiteFooter` renders its own `<footer>`.
- Section order is fixed (spec §5, 16 blocks) — do not reorder.
- Data access goes through `getGym(slug)`/`getAllGyms()` in `src/data/getGym.ts`; the demo reads
  `src/data/demoGym.ts`, the real build will swap in CMS fetching with the same signatures.
- Design language (red/blue/white per client minutes `context/fix1.pdf`, 2026-07-07): brand red
  #D8212C for CTA/emphasis, brand blue #0F6EB8 for contrast bands/secondary accents, white/light
  grounds — no black/dark grounds. Sharp -18deg skew accents, radius 4/8px, diagonal clip-path
  corner cuts between sections, Roboto 900 italic EN kickers + Noto Sans JP.
- `context/` holds reference research (LAVA audits, scraped brand notes) — excluded from tsconfig;
  never import from it.
- Placeholder images are SVGs in `public/dummy/` (next.config enables dangerouslyAllowSVG).

## Out of scope this phase (spec §0)
WordPress/ACF/GraphQL integration, reservation systems, 38-store data load, sitemap/redirects,
performance tuning.
