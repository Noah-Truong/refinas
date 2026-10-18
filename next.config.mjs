/** @type {import('next').NextConfig} */

// Build-time static assets under public/. They are referenced by stable, unhashed
// paths, so they get a long max-age but stay revalidatable (no `immutable`) —
// photos still change between client fix rounds.
const STATIC_ASSET_DIRS = ['logo', 'photos', 'trainer', 'dummy'];

// Hosts that serve photos referenced by the page API (comma-separated hostnames, e.g.
// "media.example.com"). next/image only optimizes remote images from allowed hosts.
const PAGE_MEDIA_HOSTS = (process.env.PAGE_MEDIA_HOSTS ?? '')
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean);
for (const host of PAGE_MEDIA_HOSTS) {
  // Fail the build on "https://…" or "host/path" rather than silently allowing nothing.
  if (!/^[A-Za-z0-9*.-]+$/.test(host)) {
    throw new Error(`PAGE_MEDIA_HOSTS: "${host}" is not a hostname (no scheme, port or path)`);
  }
}

const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  poweredByHeader: false,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Every image on the site renders through next/image, so the optimizer's cache
    // is what visitors actually hit. The default TTL is 60s, which re-optimizes the
    // same unchanging photos all day; source images are static, so hold them 31 days.
    minimumCacheTTL: 60 * 60 * 24 * 31,
    ...(PAGE_MEDIA_HOSTS.length > 0
      ? { remotePatterns: PAGE_MEDIA_HOSTS.map((hostname) => ({ protocol: 'https', hostname })) }
      : {}),
  },
  async headers() {
    return [
      {
        source: `/:dir(${STATIC_ASSET_DIRS.join('|')})/:path*`,
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default nextConfig;
