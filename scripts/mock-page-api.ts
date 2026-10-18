/**
 * Local stand-in for the LINE page service's read API (nortiq-line-post, docs/design-v1.2.md §6),
 * serving the demo data so the site can be built and run in API mode without the real service.
 * Dev tool only — no dependencies beyond Node.
 *
 *   PAGE_API_KEY=testkey npx tsx scripts/mock-page-api.ts            # PORT defaults to 4010
 *   PAGE_API_BASE=http://127.0.0.1:4010/api/v1/orgs/refinas PAGE_API_KEY=testkey npm run build
 *
 * GET /api/v1/orgs/refinas/stores          → { org, stores: Gym[] }   (pageVersion "s1.o1")
 * GET /api/v1/orgs/refinas/stores/{slug}   → { gym } | 404
 *     ...?preview={token}                  → the "draft": pageVersion "s2.o1" and a 【プレビュー】
 *                                            prefix on catchCopy, so a preview is easy to spot.
 *                                            With PAGE_REVALIDATE_SECRET set, the token is verified
 *                                            (signature, expiry, slug) like the real service would.
 * Every request needs `Authorization: Bearer {PAGE_API_KEY}` (401 otherwise).
 */
import { createHmac, timingSafeEqual } from 'node:crypto';
import { createServer, type ServerResponse } from 'node:http';
import { demoGyms } from '../src/data/demoGym';

const KEY = process.env.PAGE_API_KEY;
const SECRET = process.env.PAGE_REVALIDATE_SECRET;
const PORT = Number(process.env.PORT ?? 4010);
const ORG = 'refinas';
const LIVE_VERSION = 's1.o1';
const DRAFT_VERSION = 's2.o1';

if (!KEY) {
  console.error('PAGE_API_KEY is required (the bearer key the site sends).');
  process.exit(1);
}

const safeEqual = (a: string, b: string) => {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
};

/** Same check the site does in src/lib/pageApi.ts (that module is server-only, so not imported). */
function previewTokenValid(token: string, slug: string): boolean {
  if (!SECRET) return true;
  const [body, sig, ...rest] = token.split('.');
  if (!body || !sig || rest.length) return false;
  if (!safeEqual(sig, createHmac('sha256', SECRET).update(body).digest('base64url'))) return false;
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as { o?: unknown; s?: unknown; exp?: unknown };
    return data.o === ORG && data.s === slug && typeof data.exp === 'number' && data.exp * 1000 >= Date.now();
  } catch {
    return false;
  }
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  res.on('finish', () => console.log(`${req.method} ${url.pathname}${url.search ? ' (?preview)' : ''} → ${res.statusCode}`));

  if (req.method !== 'GET') return send(res, 405, { error: 'method_not_allowed' });
  if (!safeEqual(req.headers.authorization ?? '', `Bearer ${KEY}`)) return send(res, 401, { error: 'unauthorized' });

  const match = url.pathname.match(/^\/api\/v1\/orgs\/([^/]+)\/stores(?:\/([^/]+))?\/?$/);
  if (!match || match[1] !== ORG) return send(res, 404, { error: 'not_found' });

  if (!match[2]) return send(res, 200, { org: ORG, stores: demoGyms.map((gym) => ({ ...gym, pageVersion: LIVE_VERSION })) });
  let slug: string;
  try {
    slug = decodeURIComponent(match[2]);
  } catch {
    return send(res, 400, { error: 'bad_slug' });
  }

  const gym = demoGyms.find((g) => g.slug === slug);
  if (!gym) return send(res, 404, { error: 'not_found' });

  const preview = url.searchParams.get('preview');
  if (preview === null) return send(res, 200, { gym: { ...gym, pageVersion: LIVE_VERSION } });
  if (!previewTokenValid(preview, slug)) return send(res, 403, { error: 'invalid_preview_token' });
  return send(res, 200, { gym: { ...gym, pageVersion: DRAFT_VERSION, catchCopy: `【プレビュー】${gym.catchCopy}` } });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`mock page API: http://127.0.0.1:${PORT}/api/v1/orgs/${ORG}  (${demoGyms.length} stores)`);
  console.log(`build with: PAGE_API_BASE=http://127.0.0.1:${PORT}/api/v1/orgs/${ORG} PAGE_API_KEY=<same key> npm run build`);
});
