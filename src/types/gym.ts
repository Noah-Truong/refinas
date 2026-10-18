export type Image = { url: string; width: number; height: number; alt: string };
export type File = { url: string; label?: string };

export type Gym = {
  slug: string;                 // post slug (URL)
  name: string;                 // store name (e.g. "キックボクシング渋谷 Refinas")
  nameKana?: string;
  area: string;                 // area/prefecture (list grouping key)
  brandLabel: string;           // e.g. "キックボクシングスタジオ"
  status: 'published' | 'preparing';
  /** Version marker from the page API (e.g. "s12.o3": store-doc version . org-doc version).
   *  Rendered as <meta name="page-version"> so the LINE service can confirm a publish. */
  pageVersion?: string;

  // ① Hero
  catchCopy: string;
  heroImage: Image;            // lead photo — also the OG-image fallback
  heroPhotos?: Image[];        // full hero slideshow (falls back to [heroImage])
  targetNote?: string;          // e.g. "初心者歓迎・男女共用"

  // ② Access / NAP
  postalCode: string;
  address: string;
  tel: string;
  access: Array<{ line: string; station: string; exit?: string; walkMin: number }>;
  accessNote?: string;
  /** Route from the station (the 「詳しい経路」 disclosure). accessNote is appended after it. */
  directions?: string;
  parking?: string;
  geo: { lat: number; lng: number };
  mapPlaceId?: string;

  // Hours
  hours: Array<{ label: string; time: string }>;
  holiday?: string;
  /** note under the schedule hours table (falls back to the SNS line) */
  scheduleNote?: string;

  // ③ Pricing
  plans: Array<{
    planName: string;
    priceMale?: number;
    priceFemale?: number;
    price?: number;
    unit: string;               // e.g. "円/月（税抜）"
    target?: string;
    sessions?: string;          // 通い放題 / 月4回 など
    isRecommended: boolean;
    ctaUrl?: string;
  }>;
  options?: Array<{ name: string; price: number; note?: string }>;
  campaign?: { active: boolean; title?: string; banner?: Image; url?: string };
  /** Trial lesson. Amounts are 税込 and displayed as-is (unlike plans, which are stored 税抜).
   *  A price of 0 is what makes the page say 「無料体験」 — see isTrialFree() in src/lib/trial.ts. */
  trial?: { price: number; regularPrice?: number; durationMin?: number };
  /** Brand-wide facts used in copy (NearbyGyms: 「全{storeCount}店舗」). */
  brand?: { storeCount?: number };

  // ④ Programs / Schedule
  programs: Array<{
    name: string;
    description: string;
    intensity: number;          // 1–5
    durationMin?: number;
    image?: Image;
    trialOk: boolean;
  }>;
  scheduleType: 'pdf' | 'external' | 'none';
  schedulePdf?: File;
  reserveUrl?: string;

  // ⑤ Staff / Voices
  trainers: Array<{ name: string; nameKana?: string; role?: string; profile: string; photo?: Image }>;
  /** consentConfirmed is required by checklist ⑪ (★) — voices without it are never rendered */
  voices?: Array<{ label: string; comment: string; tags?: string[]; consentConfirmed: boolean }>;
  /** Source note under the voices (e.g. survey name and year). Omitted when absent. */
  voicesNote?: string;

  // ⑥ FAQ / News / Nearby
  faqs: Array<{ q: string; a: string }>;
  /** url is optional — items without one (or with "#") render as plain text, not links */
  news?: Array<{ date: string; title: string; url?: string; important?: boolean; pdf?: boolean }>;
  nearbyGyms?: Array<{ slug: string; name: string; accessNote?: string }>;
  /** ⑦ Column: brand-wide article picks (image card + title) */
  columns?: Array<{ title: string; url: string; image: Image }>;

  // Facilities / Payment / Type
  facilities: string[];         // names from FACILITY_NAMES (AccessNap) get their own icon
  studioType?: string;
  paymentMethods?: string[];
  /** Per-store interior photos for the 「店舗の雰囲気」 slider (falls back to the shared set) */
  studioPhotos?: Image[];

  // CTA / SNS
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  contactUrl?: string;
  telCta?: string;
  sns?: { instagram?: string; line?: string; youtube?: string };

  // SEO (optional overrides)
  seo?: { title?: string; description?: string; ogImage?: Image };
};
