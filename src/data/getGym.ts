import { demoGyms } from './demoGym';
import type { Gym } from '@/types/gym';

// Demo: reads dummy data. Future: swap the body for a CMS fetch — the async signatures stay the same.
export async function getGym(slug: string): Promise<Gym | undefined> {
  return demoGyms.find((g) => g.slug === slug);
}

export async function getAllGyms(): Promise<Gym[]> {
  return demoGyms;
}
