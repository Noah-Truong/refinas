import { randomUUID } from 'node:crypto';
import { cache } from 'react';
import { cookies, draftMode } from 'next/headers';
import { demoGyms } from './demoGym';
import type { Gym } from '@/types/gym';
import { PREVIEW_COOKIE, SLUG_RE, pageApiConfig, verifyPreviewToken, type PageApiConfig } from '@/lib/pageApi';

/*
 * Store data access — the only way pages read store data. Same signatures in both modes:
 *
 * - PAGE_API_BASE unset → the demo data in ./demoGym (unchanged demo output).
 * - PAGE_API_BASE set   → the LINE page service's read API (nortiq-line-post, docs/design-v1.2.md §6).
 *   Reads are cached by Next with tags — store: `org:{org}` + `store:{slug}`, list: `org:{org}` +
 *   `list:{org}` — and /api/revalidate invalidates them. Any failure other than a store 404 throws,
 *   so a build against a broken API fails instead of shipping empty pages.
 * - Draft Mode with a valid `page_preview` cookie for that slug → the draft (`?preview=`), never cached.
 */

/** A hung API should fail the build with a clear error, not stall it. */
const API_TIMEOUT_MS = 15_000;

/**
 * `next build` keeps .next/cache/fetch-cache from earlier builds, so a build could quietly reuse an
 * older build's API responses — shipping stale content, and "succeeding" while the API is down.
 * Request headers are part of Next's fetch cache key, so during a build each worker sends its own
 * nonce and every build reads the API fresh. At runtime there is no nonce: those reads stay cached
 * (tagged) until /api/revalidate invalidates them.
 */
const BUILD_NONCE = process.env.NEXT_PHASE === 'phase-production-build' ? randomUUID() : undefined;

function apiGet(api: PageApiConfig, pathAndQuery: string, cacheInit: RequestInit): Promise<Response> {
  return fetch(`${api.base}${pathAndQuery}`, {
    ...cacheInit,
    headers: {
      Authorization: `Bearer ${api.key}`,
      Accept: 'application/json',
      ...(BUILD_NONCE ? { 'X-Page-Build': BUILD_NONCE } : {}),
    },
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
  });
}

async function fetchStore(api: PageApiConfig, slug: string, previewToken?: string): Promise<Gym | undefined> {
  const path = `/stores/${encodeURIComponent(slug)}`;
  const res = previewToken
    ? await apiGet(api, `${path}?preview=${encodeURIComponent(previewToken)}`, { cache: 'no-store' })
    : await apiGet(api, path, { cache: 'force-cache', next: { tags: [`org:${api.org}`, `store:${slug}`] } });
  if (res.status === 404) return undefined;
  // Error messages carry the path only — never the key or the preview token.
  if (!res.ok) throw new Error(`Page API GET ${path}${previewToken ? ' (preview)' : ''} failed: HTTP ${res.status}`);
  const body = (await res.json()) as { gym?: Gym } | null;
  if (!body?.gym || body.gym.slug !== slug) throw new Error(`Page API GET ${path}: response has no gym "${slug}"`);
  return body.gym;
}

async function fetchStores(api: PageApiConfig): Promise<Gym[]> {
  const res = await apiGet(api, '/stores', {
    cache: 'force-cache',
    next: { tags: [`org:${api.org}`, `list:${api.org}`] },
  });
  if (!res.ok) throw new Error(`Page API GET /stores failed: HTTP ${res.status}`);
  const body = (await res.json()) as { org?: string; stores?: Gym[] } | null;
  const stores = body?.stores;
  if (!Array.isArray(stores)) throw new Error('Page API GET /stores: response has no stores[]');
  if (body?.org !== api.org) throw new Error(`Page API GET /stores: org "${body?.org}" is not "${api.org}"`);
  const bad = stores.find((gym) => typeof gym?.slug !== 'string' || !SLUG_RE.test(gym.slug));
  if (bad) throw new Error(`Page API GET /stores: invalid store slug ${JSON.stringify(bad?.slug)}`);
  return stores;
}

/**
 * The preview token for this slug, if the visitor is previewing it.
 * cookies() is read only in Draft Mode — outside it, touching cookies would turn every
 * prerendered store page into a per-request render.
 */
async function previewTokenFor(api: PageApiConfig, slug: string): Promise<string | undefined> {
  if (!(await draftMode()).isEnabled) return undefined;
  const secret = process.env.PAGE_REVALIDATE_SECRET;
  const token = (await cookies()).get(PREVIEW_COOKIE)?.value;
  if (!secret || !token) return undefined;
  const payload = verifyPreviewToken(token, secret);
  return payload && payload.o === api.org && payload.s === slug ? token : undefined;
}

// cache(): generateMetadata and the page share one read per request.
export const getGym = cache(async (slug: string): Promise<Gym | undefined> => {
  const api = pageApiConfig();
  if (!api) return demoGyms.find((g) => g.slug === slug);
  if (!SLUG_RE.test(slug)) return undefined;
  return fetchStore(api, slug, await previewTokenFor(api, slug));
});

export const getAllGyms = cache(async (): Promise<Gym[]> => {
  const api = pageApiConfig();
  if (!api) return demoGyms;
  return fetchStores(api);
});
