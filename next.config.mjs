/** @type {import('next').NextConfig} */

// Build-time static assets under public/. They are referenced by stable, unhashed
// paths, so they get a long max-age but stay revalidatable (no `immutable`) —
// photos still change between client fix rounds.
const STATIC_ASSET_DIRS = ['logo', 'photos', 'trainer', 'dummy'];

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
