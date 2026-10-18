import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { PREVIEW_COOKIE, PREVIEW_MAX_AGE_SEC, pageApiConfig, verifyPreviewToken } from '@/lib/pageApi';

/**
 * Preview entry, linked from the LINE page service (docs/design-v1.2.md §6「プレビュー」).
 *
 * GET /api/preview?token=<base64url(JSON)>.<base64url(HMAC-SHA256(PAGE_REVALIDATE_SECRET, first part))>
 * JSON = { o, s, cr? | v?, exp } — on success: Draft Mode on, cookie page_preview = token (10 min),
 * 307 to /gym/{s}. getGym() then reads that store's draft with ?preview={token}.
 *
 * 401 invalid / expired / other org · 503 page API or secret not configured
 */
export const dynamic = 'force-dynamic';

const json = (body: unknown, status: number) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function GET(request: NextRequest) {
  const secret = process.env.PAGE_REVALIDATE_SECRET;
  let org: string | undefined;
  try {
    org = pageApiConfig()?.org;
  } catch {
    org = undefined; // half-configured env → treated as not configured
  }
  if (!secret || !org) return json({ error: 'not_configured' }, 503);

  const token = request.nextUrl.searchParams.get('token') ?? '';
  const payload = verifyPreviewToken(token, secret);
  if (!payload || payload.o !== org) return json({ error: 'invalid_token' }, 401);

  (await draftMode()).enable();
  (await cookies()).set(PREVIEW_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: PREVIEW_MAX_AGE_SEC,
  });
  redirect(`/gym/${payload.s}`); // s is checked against the slug pattern by verifyPreviewToken
}
