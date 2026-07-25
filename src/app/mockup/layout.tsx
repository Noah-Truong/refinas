import type { Metadata } from 'next';

/**
 * fix24 — internal review pages. Nothing under /mockup is linked from the site and
 * none of it should be indexed; the whole directory goes away once the client has
 * picked their options.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MockupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
