import { revalidateTag } from 'next/cache';
import { TAG_RE, verifyBodySignature } from '@/lib/pageApi';

/**
 * On-demand regeneration, called by the LINE page service after it publishes
 * (docs/design-v1.2.md §6「再生成」).
 *
 * POST {"tags":["store:shibuya"],"ts":1760000000}
 * x-page-signature: sha256=<hex HMAC-SHA256 of the raw body, keyed with PAGE_REVALIDATE_SECRET>
 *
 * 200 {"revalidated":[...]} · 400 bad body · 401 bad signature / ts outside ±5 min · 503 secret unset
 */
export const dynamic = 'force-dynamic';

const MAX_SKEW_SEC = 300;
const MAX_BODY_BYTES = 16 * 1024;
const MAX_TAGS = 100;

const json = (body: unknown, status: number) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: Request) {
  const secret = process.env.PAGE_REVALIDATE_SECRET;
  if (!secret) return json({ error: 'not_configured' }, 503);

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return json({ error: 'too_large' }, 413);
  // The signature covers the exact bytes sent, so verify before parsing anything.
  const raw = Buffer.from(await request.arrayBuffer());
  if (raw.length > MAX_BODY_BYTES) return json({ error: 'too_large' }, 413);
  if (!verifyBodySignature(raw, request.headers.get('x-page-signature'), secret)) {
    return json({ error: 'bad_signature' }, 401);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw.toString('utf8'));
  } catch {
    return json({ error: 'bad_json' }, 400);
  }
  const { tags, ts } = (typeof body === 'object' && body !== null ? body : {}) as { tags?: unknown; ts?: unknown };

  if (typeof ts !== 'number' || !Number.isFinite(ts)) return json({ error: 'bad_ts' }, 400);
  // A signed body is only good for ±5 minutes (limits replays).
  if (Math.abs(Date.now() / 1000 - ts) > MAX_SKEW_SEC) return json({ error: 'stale_ts' }, 401);

  if (
    !Array.isArray(tags) ||
    tags.length === 0 ||
    tags.length > MAX_TAGS ||
    !tags.every((tag): tag is string => typeof tag === 'string' && TAG_RE.test(tag))
  ) {
    return json({ error: 'bad_tags' }, 400);
  }

  const revalidated = [...new Set(tags)];
  for (const tag of revalidated) revalidateTag(tag);
  return json({ revalidated }, 200);
}
