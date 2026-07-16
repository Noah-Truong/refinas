export type Image = { url: string; width: number; height: number; alt: string };
export type File = { url: string; label?: string };

export type Gym = {
  slug: string;                 // post slug (URL)
  name: string;                 // store name (e.g. "キックボクシング渋谷 Refinas")
  nameKana?: string;
  area: string;                 // area/prefecture (list grouping key)
  brandLabel: string;           // e.g. "キックボクシングスタジオ"
  status: 'published' | 'preparing';

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
  parking?: string;
  geo: { lat: number; lng: number };
  mapPlaceId?: string;

  // Hours
  hours: Array<{ label: string; time: string }>;
  holiday?: string;

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

  // ⑥ FAQ / News / Nearby
  faqs: Array<{ q: string; a: string }>;
  news?: Array<{ date: string; title: string; url: string; important?: boolean; pdf?: boolean }>;
  nearbyGyms?: Array<{ slug: string; name: string; accessNote?: string }>;
  /** ⑦ Column: brand-wide article picks (image card + title) */
  columns?: Array<{ title: string; url: string; image: Image }>;

  // Facilities / Payment / Type
  facilities: string[];
  studioType?: string;
  paymentMethods?: string[];

  // CTA / SNS
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  contactUrl?: string;
  telCta?: string;
  sns?: { instagram?: string; line?: string; youtube?: string };

  // SEO (optional overrides)
  seo?: { title?: string; description?: string; ogImage?: Image };
};
