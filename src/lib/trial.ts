import type { Gym } from '@/types/gym';

/**
 * Whether the page may call the trial lesson 「無料」.
 *
 * Only when the data says so (`trial.price === 0`). A missing `trial` counts as NOT free:
 * the page must not claim a free trial that no data backs up — the LINE service checks the
 * data, so wording baked into components would go stale unseen (design-v1.2 §0 #10).
 * The demo data carries `trial.price: 0`, so the demo copy is unchanged.
 */
export function isTrialFree(gym: Gym): boolean {
  return gym.trial?.price === 0;
}

/** Catch line shown above the section-end trial CTA buttons. */
export function trialCatchText(gym: Gym): string {
  return isTrialFree(gym) ? 'まずは気軽に無料体験から' : 'まずは気軽に体験から';
}

/** Yen amounts in copy: 5000 → "5,000". */
export const formatYen = (amount: number) => amount.toLocaleString('ja-JP');
