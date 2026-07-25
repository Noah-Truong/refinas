# fix24 — implementation checklist (2026-07-24)

Source: `context/02-client-feedback/2026-07-24-fix24-request.txt` (Mr. Higashimoto, LINE). Four client items.

---

## 1. Blue accent token — DONE

The doc listed this as blocked on "final logo-blue hex". Resolved by sampling
`public/logo/refinas-logo.png` directly:

| Role | Sampled hex | Pixel count |
|---|---|---|
| Glove blue | **#0E6EB8** | 3,707 |
| Glove red | **#D8232B** | 4,313 |

`--color-brand-blue` was `#0f6eb8` and is now the exact `#0e6eb8`. The red token
`--color-brand` stays `#d8212c` — that value comes from the fix1.pdf minutes, and the
1-unit drift from the logo sample is not worth reopening a signed-off decision over.

New tokens in `src/styles/tokens.css`:
- `--color-blue-border: #cfe0f0` — cool 1px rule for blue-tinted surfaces
- `--color-marker: var(--color-brand-blue)` — see item 3

## 2. "Make the inside blue" (Trial Lesson section) — DONE, awaiting A/B pick

Built both intensities. `TrialCta` takes `variant="a" | "b"`; **A is live** on
`/gym/[slug]` since the report recommends it.

**`/mockup` is the single link to send the client** — see "What the client reviews" below.
`/mockup/trial` renders A and B side by side with Japanese labels and spec notes.

Option A (solid logo blue), per the confirmed knock-on table:

| Element | Treatment |
|---|---|
| Card background | Logo blue `#0E6EB8` |
| Light gray border | Removed |
| Heading | White |
| TRIAL LESSON label + flanking rules | White / 82% white |
| Price box | **White card, red ¥0 preserved** |
| Checklist ✓ and text | White |
| CTA | White fill, red text (report's ranked choice 1) |
| 体験の流れを詳しく見る | White, chevron follows the text color |

Option B (pale blue) reuses the existing `--color-blue-tint` `#ECF3FA` rather than
introducing the report's `#F0F4FA` — the two are visually indistinguishable and the
token already existed. Text and the red CTA are untouched, as specified.

Supporting changes:
- `Button` gained a `white` variant (white fill / brand-red label)
- `ArrowLink` gained `tone="inherit"` so its chevron follows the link color on
  colored grounds instead of staying brand red

The page background is untouched — only the card's inside takes color, which is what
"outside the border stays white" asked for.

## What the client reviews

Everything under `/mockup` is a review page: unlinked from the site, `noindex, nofollow`
via `src/app/mockup/layout.tsx`, and deleted once the client has decided. `/mockup` is the
only URL they need — the rest hang off it.

| Route | Decision | Options |
|---|---|---|
| `/mockup` | Index — lists all three, plus what we're waiting on from them | — |
| `/mockup/trial` | Blue intensity of the Trial Lesson card | A 塗り（推奨）/ B 淡い |
| `/mockup/cta` | Reservation button colour on the blue field | 白地に赤文字（推奨）/ 赤のまま / 白フチのみ |
| `/mockup/markers` | Confirm which squares turned blue | Before/after, no choice needed |

`/mockup/cta` covers the report's second "decision needed", which the first pass had
resolved silently by picking the recommended treatment. Putting all three on the same blue
field is the only way the red-on-blue clash the report warns about is actually visible.

`/mockup/markers` exists so the client can confirm scope rather than us asking them to
circle elements on a screenshot. It shows all three marker sizes before and after, lists
the five places they appear in words, and shows the red chips and badges we deliberately
did **not** change so they can tell us if they wanted those too.

The index also states the two things blocking us — the original photo file and which
previous version they want — so the ask travels with the deliverable.

## 3. Red square markers → blue — DONE

The doc flagged this as blocked on identifying the elements. It is not ambiguous: the
markers are literal 12px/10px/9px **squares** rendered as `::before` pseudo-elements
before section and row titles. They were introduced as red squares in Fix Point 7/22
Task 1, which is almost certainly what the client is now reacting to.

All six now use `--color-marker`:

| File | Selector | Size |
|---|---|---|
| `ui/SectionTitle.module.css` | `.title::before` | 12px |
| `gym/PriceTable.module.css` | `.optionsTitle::before` | 10px |
| `app/gym/page.module.css` | `.areaTitle::before` | 10px |
| `gym/AccessNap.module.css` | `.rowTitle::before` | 9px |
| `gym/TrialFlow.module.css` | `.supportTitle::before` | 9px |
| `gym/SiteFooter.module.css` | `.supportTitle::before` | 9px |

Deliberately left red, because they are not squares preceding text: the FAQ Q/A chips,
the recommended-plan badge, the campaign kicker pill, the header/drawer/bottom-bar CTAs,
the 体験レッスン price chip, and the accordion indicator bars.

The checklist ✓ marks — the report's third candidate — turn white inside the blue card
under Option A, so that reading of the request is covered either way.

## 4. Previous deployment link — NOT ACTIONABLE HERE

Still blocked on the client confirming *which* version they mean, and it cannot be done
from this repo: the connected Vercel account (team `nortiqs-projects`) contains only a
project named `files`. The refinas project lives on a different account, and there is no
`.vercel/project.json` link and no Vercel CLI installed.

Whoever owns that Vercel account should pull the deployment URL from
Project → Deployments, check Deployment Protection, and send it labeled as the *previous*
version alongside the current URL. Do not promote the old deployment to production.

## 5. Concept-section photo — BLOCKED

No new asset has arrived. `public/photos/` still holds only the original six studio and
action shots; there is no owner photo in the repo. `BrandConcept` continues to use
`studioPhotos[0]` (`interior-01.jpg`).

When the original file arrives: add it to `public/photos/`, point `BrandConcept` at it,
crop to the current aspect ratio, and write a Japanese `alt` describing the owner.
Note the LINE image is a re-photograph of an iPad screen and is not usable.

---

## Coverage gap caught on the final pass

The request's §1 lists candidate places to extend blue beyond the trial card — section
kickers, price unit text, divider rules, the inactive side of the SP bottom nav. Those were
candidates, not confirmed, so none were applied. But the client's actual words were "I want
more blue", and the first draft of the report never surfaced them, which quietly narrowed the
request to what we happened to implement.

The client document now has a **2-2「さらに青を増やせる箇所」** section listing all four as
optional extras, each with what it looks like today and what changes if it goes blue, plus a
note that stripping too much red weakens the reservation button. Nothing was changed in code —
this is purely so the client can ask for them.

## Deliverable

`context/deliverables/refinas-revision-report-7-24.pdf` — 10 pages, A4, Japanese. See
`context/deliverables/README.md` for how to regenerate it and what to check before sending
(the `refinas.vercel.app` base URL appears in five places).

## Verification

Audited against the production build (`npm start`), driven over CDP:

- **Responsive:** 8 pages × 6 widths (320 / 390 / 768 / 1024 / 1280 / 1440) = 48 combinations.
  **No page-level horizontal overflow anywhere** — `scrollWidth === clientWidth` in every case.
  Elements reported outside the viewport are all inside `overflow-x: auto` containers: the
  off-canvas drawer, the `ProgramSlider`/`PhotoSlider` carousels (`Slider_track`), and the
  `/mockup` swipe row added below. Verified by walking each offender's ancestor chain.
- **Contrast (WCAG AA needs 4.5:1):** white on the solid blue card = **5.33:1** for the
  heading, checklist, kicker and flow link; brand red on the white CTA = **5.03:1**. Both pass.
- **Marker colour:** `--color-marker` resolves to `#0e6eb8` and the `::before` renders
  `rgb(14, 110, 184)` — the exact logo sample, not a near-miss.
- **Indexing:** `noindex, nofollow` present on all four `/mockup` pages, absent on `/gym/*`.
- **Anchors:** every in-page `href="#…"` resolves — `#flow`, `#faq`, `#access`, `#price`,
  `#topics`, `#column`, `#reserve` all have matching ids.
- `npm run build` green — 14 static routes.

### Fixed during the audit

The `/mockup` comparison pages **stacked vertically below 980px**, putting ~850px of scroll
between option A and option B. The client received this request over LINE and will almost
certainly open the links on a phone — where a side-by-side comparison that can never show two
options at once is worthless. The collapsed grid is now a **swipeable, snap-scrolling row**
(`.column { flex: 0 0 90% }`), so the next option's edge stays visible and flicking between
them is instant. 90% rather than 86% because at 86% the trial card's CTA label wrapped to two
lines.

The swipe hint was initially invisible: its base `display: none` was declared *after* the
media query that sets `display: block`, so at equal specificity the later rule won. Moved the
base rule above the query.

### Mobile pass

Audited at 390px against the production build, then fixed. Tap targets under 44px went
from **12 to 1** on the store page, and sub-12px text to zero.

| Element | Was | Now |
|---|---|---|
| Footer nav links | 52×19 | ~52×45 (padding; row-gap dropped to 0 so rows can't overlap) |
| Footer SNS icons | 20×20 | 44×44 |
| Slider arrows | 40×40 | 44×44 |
| Slider bullets | 20×20 | 24×44 |
| `ArrowLink` (体験の流れ etc.) | 151×25 | 151×45 |
| `/mockup` back link | 80×25 | 80×45 |
| `PriceTable` tax note | 11px | 12px |
| `scroll-padding-top` (SP) | 64px | 76px |

The one remaining sub-44 target is the slider bullet at **24×44**, and it stays that way on
purpose: the bullet row has to fit between the two arrow buttons, and eight bullets at 44px
wide would overflow. 24px is the WCAG 2.5.8 (AA) minimum, and the height carries the comfort.

**Two bugs surfaced while doing this, both pre-existing:**

- `.bulletActive` and `.bullet:hover` set the `background` *shorthand*, which resets
  `background-clip` back to `border-box`. The 10px dot was therefore painting across the
  whole padding box. Invisible at the old 20×20 (it just looked like a slightly fatter dot)
  but a solid red slab once the target grew to 24×44. Both now use `background-color`, which
  leaves `background-clip: content-box` intact.
- The `@media (max-width: 640px)` bullet rule sits *after* the 900px rule in the file, so at
  390px the later one won and my first attempt silently did nothing. Same class of ordering
  trap as the `.swipeHint` bug above — worth remembering that this stylesheet is
  source-order-sensitive.

### Mobile performance

`GymHero` paints a base LCP photo plus **six** full-width crossfade layers, all above the
fold — so `loading="lazy"` does not defer them and they compete with the LCP image for
bandwidth. None is visible for at least `SLIDE_SECONDS` (5s), so they now carry
`fetchPriority="low"`. Verified in the served HTML: the LCP photo has its
`<link rel="preload" as="image">` and the six layers are `loading="lazy" fetchPriority="low"`.

(Note for future greps: React emits this attribute camelCased as `fetchPriority`, so a
case-sensitive search for `fetchpriority` finds nothing and looks like a failure.)

Image `sizes` attributes were already correct on all ten `next/image` call sites — no change
needed there.

### Known, out of scope

`SiteFooter` renders its nav items as `href="#"` placeholders. Pre-existing demo state, not
part of fix24 — resolving it needs real destinations from the client.

Two traps worth knowing about, since both produced convincing false evidence:

- **Do not run `npm run build` while `next dev` is running.** They fight over `.next`;
  the symptom is a 404 on `layout.css` (so pages render with no tokens at all) or a 500
  with `routes-manifest.json` missing. Neither is a code fault. Kill the dev server,
  `rm -rf .next`, then build.
- **Old headless Chrome's `--window-size` misreports layout.** It rendered the mobile
  Trial card as if it overflowed the viewport. Driving Chrome over CDP with
  `Emulation.setDeviceMetricsOverride` showed no overflow at all. Trust CDP measurements
  over `--screenshot` for anything responsive.

## Open questions for the client

1. Which previous version should the link point to?
2. Trial card: A案 or B案? → `/mockup/trial`
3. Reservation button: which of the three? → `/mockup/cta`
4. Are the blue squares the right elements, and should the red chips change too?
   → `/mockup/markers`
5. Is the owner photo final, and how will the original file be delivered?
6. Should blue extend further — section kickers, price units, dividers, the SP bottom nav?

Questions 2–4 each have a page to look at, so the client can answer by pointing rather
than describing.
