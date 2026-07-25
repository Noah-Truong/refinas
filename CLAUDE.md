# Refinas store-page demo

Next.js 15 (App Router, TS, CSS Modules — no Tailwind, no UI deps) demo reproducing LAVA's
16-block store-page IA with Refinas design tokens. Build spec: `context/01-spec/build-spec.md`
(English, §0 = this demo phase). Reference material is indexed in `context/README.md`.

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
- Design language (red/blue/white per client minutes `context/02-client-feedback/2026-07-07-fix1-minutes.pdf`; surface
  language matched to yoga-lava.com 2026-07-15): brand red #D8212C for CTA/emphasis, brand blue
  #0E6EB8 for contrast bands/secondary accents, white/#F8F7F7 grounds — no black/dark grounds,
  no skews/italics (logo text excepted). Soft LAVA rhythm: one large rounded corner per section
  band (--radius-band, alternating side, bands overlap), pill buttons/chips (--radius-pill),
  square heading markers, Noto Sans JP body + Montserrat EN kickers (weights ≤700).
  Both brand hexes are sampled from `public/logo/refinas-logo.png` — re-sample rather than
  guess if they ever come into question.
- Square heading markers (the `::before` blocks on section/row titles) all reference
  `--color-marker`, blue since `context/02-client-feedback/2026-07-24-fix24-request.txt` §3.
  One token flips the whole set.
- `TrialCta` takes a `variant` prop (`'a'` solid blue / `'b'` pale blue) pending the client's
  pick from `/mockup/trial`; that route is noindex and should be deleted once they decide.
- `context/` holds reference material only — gitignored, excluded from tsconfig, never import
  from it. Start at `context/README.md`; it maps `01-spec/` (what to build), `02-client-feedback/`
  (dated revision rounds), `03-lava-reference/` (the IA we model), `04-refinas-reference/`,
  `05-brand-assets/`. Never add a file named `claude.md` there — it auto-loads as a nested
  `CLAUDE.md` and overrides this one. Skip `03-lava-reference/raw-captures/` (~5.8 MB of scrape
  output); the digested markdown beside it covers the same ground.
- Our client-round status reports live at the repo root: `fix1-checklist.md`, `fix24-checklist.md`.
- Placeholder images are SVGs in `public/dummy/` (next.config enables dangerouslyAllowSVG).

## Out of scope this phase (spec §0)
WordPress/ACF/GraphQL integration, reservation systems, 38-store data load, sitemap/redirects,
performance tuning.
