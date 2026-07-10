# fix1.pdf 対応チェックリスト & 監査レポート

**Source:** `context/fix1.pdf` (Nortiq Lab meeting minutes 2026-07-07 + 16-section information checklist)
**Audited:** 2026-07-09 · **Fixes applied:** 2026-07-09 (same day, see Part 3) · `npm run build` = ✅ green (3 store pages SSG)

**Legend:** ✅ done in codebase · ⚠️ partially done / needs work · ⏳ blocked on client input · ❌ not done · — N/A this phase

---

## Part 1 — Meeting minutes (design decisions)

| # | Decision | Status | Evidence / Notes |
|---|----------|--------|------------------|
| 1a | Official brand colors in hex: **#D8212C** (red) / **#0F6EB8** (blue) | ✅ | `src/styles/tokens.css` — `--color-brand: #d8212c` / `--color-brand-blue: #0f6eb8` (plus new blue-strong/blue-tint/on-brand derivatives) |
| 1b | Color scheme = **red / blue / white** | ✅ fixed 07-09 | Blue #0F6EB8 now active: trial-CTA band & brand-concept band (`--surface-blue` gradient), price-table row headers, FAQ "A" chips, voice label chips, slider arrows, secondary/ghost buttons, footer wordmark/marquee/SNS icons. |
| 1c | **Black areas → white** | ✅ fixed 07-09 | All dark `#111` grounds repainted: header/hero/drawer/bottom-bar → white, footer bands → white/blue-tint, former dark sections → brand-blue gradient (blue is in the approved palette; keeps contrast without black). Dark token family (`--color-dark`, `--surface-dark`, `--color-on-dark*`) **deleted from tokens.css** — `grep -rn "on-dark" src/` returns nothing. New `--color-on-brand` token carries white-on-red/blue text. |
| 2 | Font change | ⏳ | Client status "under confirmation". Current setup (Roboto + Noto Sans JP, `tokens.css:31-32`) matches the checklist's stated default-if-unspecified. Nothing to do until client decides. |
| 3 | CEO greeting section — restructure for more inquiries | — / ❓ | The 16-block **store page** template has no CEO greeting block (closest is `BrandConcept.tsx`, a brand statement). This item refers to the **corporate top page**, which is outside the store-page demo scope. Needs scope clarification with client. |
| 4 | Header — no change | ✅ | `SiteHeader.tsx` unchanged; nothing required. |

## Part 2 — 16-section checklist (client-filled values vs. codebase)

### Global / Common
| Item | Client value | Status | Evidence |
|---|---|---|---|
| Site / brand name | Kickboxing Gym Refinas | ✅ | `demoGym.ts:229` `brandLabel: 'キックボクシングジム'` + store names |
| Logo (PSD available) | PSD from client | ⏳ | Header/footer use text wordmark; awaiting SVG/white-version export |
| Brand colors | #D8212C / #0F6EB8 | ✅ | Both in active use (see 1b/1c) |
| Global menu items | Us → confirm | ✅ | `SiteHeader.tsx:9-19` — 8 anchor items, drafted for client confirmation |
| Member login URL | **None** | ✅ | Correctly absent from header/footer |
| Main phone | 0120-181-199 | ✅ | `demoGym.ts:265,321` (Shibuya tel + telCta) |
| Key figures (38 stores) | 38 stores | ✅ | `layout.tsx:27` (meta description), `gym/page.tsx:20`, `NearbyGyms.tsx:16` |
| Domain refinas.jp / launch ASAP | — | — | Infra, out of demo scope (spec §0) |

### ② Hero
| Item | Status | Evidence |
|---|---|---|
| Store name 「キックボクシング渋谷 Refinas」 | ✅ | `demoGym.ts:256` |
| Furigana | ✅ | `demoGym.ts:257` nameKana |
| Area Tokyo / Shibuya | ✅ | `demoGym.ts:258` |
| Catchphrase (Us → confirm) | ✅ drafted | `demoGym.ts:259` — awaiting client sign-off |
| Co-ed target | ✅ | `targetNote: '初心者歓迎・男女可'` (:261), `studioType: '男女可'` (:241) |
| 5 min walk from Shibuya Sta. | ✅ | catchCopy + `access: [{...walkMin: 5}]` (:266) |
| Hero image (by plan) | ⏳ | Placeholder `/hero-kickboxing.png`; real wide photo pending |

### ③ Trial CTA
| Item | Status | Evidence |
|---|---|---|
| CTA text "Book a free trial" | ✅ | `primaryCtaLabel: '無料体験を予約する'` (:243) |
| Booking URL (currently refinas.net) | ✅ fixed 07-09 | Centralized as `RESERVE_URL` const at the top of `demoGym.ts` (all plans/campaign/CTA fields reference it). Demo keeps the in-page `#reserve` landing block; launch swap = edit one line. |
| Contact channel (phone/form) | ✅ | Phone CTAs in TrialFlow/Footer; form = reserve anchor |
| Key selling points ×3 | ⏳ | Optional; "Us → confirm" not yet drafted as a distinct 3-point block |
| Trial price 5,000 → 0 | ✅ | Campaign title `demoGym.ts:68` + SEO description (:325) |

### ④ Campaign
✅ All four items match: `active: true`, title 「無料体験実施中｜体験レッスン通常5,000円→0円」, placeholder banner, no campaign page → links to `#reserve` (`demoGym.ts:64-76`). Real banner image pending (by plan).

### ⑤ Access / NAP
| Item | Status | Evidence |
|---|---|---|
| 〒150-0002 | ✅ | `demoGym.ts:263` |
| オーベル渋谷1階 (Aubel Shibuya 1F, 3-1-8 Shibuya) | ✅ | `demoGym.ts:264` |
| Phone 0120-181-199 | ✅ | :265 |
| Hours 11–22 / 10–20 / 10–18 | ✅ | `demoGym.ts:18-22` |
| Closed Monday | ✅ | `holiday: '毎週月曜'` (:232) |
| Nearest station ① | ✅ | JR山手線・渋谷駅・徒歩5分 (:266) |
| Nearest stations ②③ | ⏳ | Client hasn't supplied for Shibuya (Ikebukuro/Yokohama demo entries have 3 each) |
| Parking (★ required) | ⚠️ | Client left blank; dummy placeholder text in place (:268). **Needs real answer** |
| Lat/lng | ✅ | :269 |
| Google Maps | ✅ | Live embed `AccessNap.tsx:146-147` |

### ⑥–⑯ remaining sections
| § | Item | Status | Evidence |
|---|---|---|---|
| ⑥ | Interior photos + captions | ✅ structure / ⏳ real photos | 6 studio photos with JP alt captions `demoGym.ts:9-16` |
| ⑦ | Plans: シルバー/プラチナ/フルアクセス, 月4回/通い放題/全店舗通い放題, recommended = unlimited | ✅ | `demoGym.ts:25-56`; プラチナ(通い放題) `isRecommended: true` |
| ⑦ | Monthly fees | ⚠️ dummy | Client left price cells blank — demo amounts are placeholders (noted in code comment :24) |
| ⑧ | Nearby stores + cross-store use (Full Access) | ✅ | `nearbyGyms` (:317-320) with valid slugs; フルアクセス cross-use note `NearbyGyms.tsx:16` |
| ⑨ | Trial flow: 4 STEPs, 60 min, images | ✅ | `TrialFlow.tsx:8-53` (STEP01–04), 「約60分」(:67), placeholder step images |
| ⑩ | Trainers: name/kana/role/profile/photo | ✅ structure / ⏳ real roster | 3 dummy trainers per store; real data comes via client Excel ③ |
| ⑪ | Testimonials + **publish-consent flag (★)** | ✅ fixed 07-09 | `consentConfirmed: boolean` added to the voices type (`gym.ts`); `VoiceSection` filters out unconsented voices; all 6 demo voices flagged `true` |
| ⑫ | Programs (client has none — new) | ✅ drafted | 8 programs with intensity 1–5 / duration / trialOk `demoGym.ts:78-151`; needs client confirmation |
| ⑬ | Schedule delivery method (★) | ⏳ | Client hasn't chosen PDF vs URL; demo uses `scheduleType: 'external'` with `#reserve` placeholder |
| ⑭ | Common FAQ ✚ no store-specific FAQ | ✅ | 7 Q&As `demoGym.ts:153-182` (incl. payment & facilities answers); store-specific correctly absent |
| ⑮ | News: date/title/important flag | ✅ | Per-store `news` arrays; `important`/`pdf` flags in type `gym.ts:65`. Real WP posts migrate in CMS phase |
| ⑯ | Company overview / privacy / **Tokushoho notice** / terms | ⚠️ | Footer labels exist `SiteFooter.tsx:10-17` but all link to `#` — actual pages don't exist; Tokushoho text is **New = client must supply** |
| ⑯ | SNS Instagram (**per store**) | ✅ structure fixed 07-09 / ⏳ URLs | `sns` moved out of `shared` — each store entry now carries its own `sns` field (with TODO); real per-store URLs still needed from client |
| ⑯ | Payment methods (口座振替 / 現金・クレカ) | ✅ | `demoGym.ts:195-198`, rendered in `AccessNap.tsx:216-219` + FAQ |
| ⑯ | Facility icons (7 items) | ✅ | All 7 client-listed facilities `demoGym.ts:185-193`, rendered `AccessNap.tsx:190` |
| ⑯ | Studio type co-ed | ✅ | `studioType: '男女可'`, rendered in hero badge + AccessNap |

## Part 3 — Fixes applied 2026-07-09 (all our-side items complete)

1. **Black → white repaint (1c)** — done. Header, hero, mobile drawer, bottom quick-nav → white with ink text; footer → blue-tint / white bands; the two former dark sections (trial CTA `#reserve` block, brand concept) → brand-blue gradient bands (`--surface-blue`); campaign fallback → red-tint. Hero photo scrim recolored from black to deep blue. The entire dark token family was **removed from tokens.css** so no component can regress to black.
2. **Blue #0F6EB8 activated (1b)** — blue gradient bands, price-table row headers, FAQ answer chips, voice label chips, slider arrows, secondary/ghost buttons, footer wordmark + marquee outline + SNS icons. Red remains exclusive to CTA/emphasis.
3. **Booking URL centralized** — `RESERVE_URL` const in `demoGym.ts` with a launch-swap comment (real refinas.net URL is a 1-line change).
4. **Consent flag (⑪ ★)** — `consentConfirmed` added to the type, enforced in `VoiceSection` (unconsented voices never render), set on all demo voices.
5. **Per-store SNS structure (⑯)** — `sns` is now a per-store field (shared account as placeholder + TODO per store).
6. **60/90-minute wording aligned** — FAQ "体験当日の流れ" now says 約60分, matching checklist ⑨ and the TrialFlow lead.
7. **CLAUDE.md design-language rule updated** — now states red/blue/white per fix1.pdf, corrects the brand-red hex to #D8212C, and bans dark grounds.

Verified: `npm run build` green; served CSS contains zero dark-token/`#111` values; full-page desktop + mobile screenshots reviewed (header, trial band, price table, trainers, voices, FAQ, brand band, footer).

**Blocked on client (chase list):**
- Final font decision (or confirm Roboto + Noto Sans JP)
- Logo SVG/white version (PSD → export)
- Real plan prices (⑦ blank in checklist)
- Parking info (★), nearest stations ②③, per-store Instagram URLs
- Schedule delivery method (PDF vs URL) + the URL
- Tokushoho / terms-of-use text (★ New)
- Key selling points ×3, real photos (hero / interior / steps / trainers / campaign banner)
- CEO greeting scope: corporate page — in this project or not?

## Part 4 — How to verify the applied fixes

1. **Build & run:** `npm run build` (green, 3 SSG store pages) then `npm run dev` → open `http://localhost:3000/gym/shibuya`.
2. **No black anywhere (1c):** run `grep -rn "on-dark\|color-dark\|surface-dark" src/` → **zero hits**. Visually: header is white with dark text (red underline + red CTA intact); hero sits on white with a blue-toned photo overlay; footer is light. Nothing on the page has a black background.
3. **Blue in use (1b):** the 無料体験 (`#reserve`) block and the closing brand-concept block are deep-blue gradient bands; price-table row headers (月会費/通えるスタジオ/月間利用回数), FAQ answer "A" chips (open any question), voice label chips (20代女性 etc.), photo-slider arrows and 「他の店舗を探す」-style secondary buttons are brand blue; the footer Refinas wordmark and marquee outline are blue.
4. **Red unchanged:** all CTAs (無料体験を予約する), kickers, campaign banner, recommended badge stay red — red never sits on blue.
5. **Booking URL:** `src/data/demoGym.ts` line ~10 `RESERVE_URL` const — all CTA fields reference it; page CTAs still scroll to the on-page `#reserve` block (swap the const at launch).
6. **Consent flag:** `src/types/gym.ts` voices now require `consentConfirmed`; set one voice to `false` in `demoGym.ts` and its card disappears from 会員様の声 (then revert).
7. **Per-store SNS:** each store entry in `demoGym.ts` has its own `sns:` line (TODO comments mark the pending per-store URLs).
8. **60-min alignment:** FAQ「体験当日はどんな流れですか？」now ends 「全体で約60分」, matching the trial-flow lead.
9. **Mobile:** narrow the window under 900px — white drawer menu, white bottom quick-nav with red 無料体験 tab.
10. **Still-open client items** (unchanged): footer legal links go to `#` (pages need client text), plan prices/photos are dummies, per-store Instagram URLs pending.
