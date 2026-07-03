/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
