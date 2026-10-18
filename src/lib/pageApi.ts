import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Shared pieces of the contract with the LINE page service (nortiq-line-post,
 * docs/design-v1.2.md §6): where the read API lives, the revalidate signature and
 * the preview token. Server-only — the secrets never reach the browser.
 */

/** Slugs (store / org) and tag ids share one charset. */
export const SLUG_RE = /^[A-Za-z0-9_-]{1,64}$/;
export const TAG_RE = /^(org|store|list):[A-Za-z0-9_-]{1,64}$/;

/** Cookie carrying the preview token while Draft Mode is on. */
export const PREVIEW_COOKIE = 'page_preview';
export const PREVIEW_MAX_AGE_SEC = 600;

export type PageApiConfig = {
  /** e.g. https://post.nortiqlab.com/api/v1/orgs/refinas (no trailing slash) */
  base: string;
  key: string;
  /** last path segment of base — used for the cache tags */
  org: string;
};

/**
 * Read API settings from the env. `null` = PAGE_API_BASE unset → demo data.
 * A half-configured env throws, so a build can never quietly fall back to demo data.
 */
export function pageApiConfig(): PageApiConfig | null {
  const raw = process.env.PAGE_API_BASE?.trim();
  if (!raw) return null;
  const base = raw.replace(/\/+$/, '');
  let url: URL;
  try {
    url = new URL(base);
  } catch {
    throw new Error('PAGE_API_BASE is not a valid URL');
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('PAGE_API_BASE must be an http(s) URL');
  }
  const org = url.pathname.split('/').filter(Boolean).pop() ?? '';
  if (!SLUG_RE.test(org)) {
    throw new Error('PAGE_API_BASE must end with the org slug (…/api/v1/orgs/{org})');
  }
  const key = process.env.PAGE_API_KEY?.trim();
  if (!key) throw new Error('PAGE_API_BASE is set but PAGE_API_KEY is missing');
  return { base, key, org };
}

/** Constant-time comparison of two strings (false on length mismatch). */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/** `sha256=<hex HMAC-SHA256 of the raw body>` — the x-page-signature header value. */
export function signBody(rawBody: Buffer | string, secret: string): string {
  return `sha256=${createHmac('sha256', secret).update(rawBody).digest('hex')}`;
}

/** Checks x-page-signature against the raw request body. */
export function verifyBodySignature(rawBody: Buffer, header: string | null, secret: string): boolean {
  if (!header) return false;
  return safeEqual(header.trim(), signBody(rawBody, secret));
}

export type PreviewPayload = {
  /** org slug */
  o: string;
  /** store slug */
  s: string;
  /** change request id (or `v`, a version) — passed through to the API, unused here */
  cr?: string;
  v?: number | string;
  /** expiry, unix seconds */
  exp: number;
};

/**
 * Verifies a preview token: `base64url(JSON) + "." + base64url(HMAC-SHA256(secret, firstPart))`.
 * Returns the payload only if the signature matches, it has not expired and the slugs are well-formed.
 */
export function verifyPreviewToken(token: string, secret: string, nowMs = Date.now()): PreviewPayload | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  if (!body || !sig) return null;
  const expected = createHmac('sha256', secret).update(body).digest('base64url');
  if (!safeEqual(sig, expected)) return null;
  let data: unknown;
  try {
    data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  if (typeof data !== 'object' || data === null) return null;
  const { o, s, exp } = data as Record<string, unknown>;
  if (typeof o !== 'string' || !SLUG_RE.test(o)) return null;
  if (typeof s !== 'string' || !SLUG_RE.test(s)) return null;
  if (typeof exp !== 'number' || !Number.isFinite(exp) || exp * 1000 < nowMs) return null;
  return data as PreviewPayload;
}
