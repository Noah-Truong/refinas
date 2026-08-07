import type { Metadata } from 'next';
import { Montserrat, Noto_Sans_JP } from 'next/font/google';
import '@/styles/globals.css';

// Noto Sans JP body/headings + Montserrat EN kickers — same pairing as the reference site
const sans = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const montserrat = Montserrat({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

// Nortiq Revise pins fix requests to a specific build; on Vercel the commit SHA is in the
// build env. Omit the tag entirely off-Vercel rather than emit a placeholder (tool's request).
const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;

export const metadata: Metadata = {
  metadataBase: new URL('https://refinas.jp'),
  ...(commitSha ? { other: { 'nq-sha': commitSha } } : {}),
  title: {
    default: 'Refinas｜キックボクシングジム リフィナス',
    template: '%s｜キックボクシングジム Refinas',
  },
  description:
    '「理想」に向かい「輝き続ける」人々のために。初心者・女性歓迎のキックボクシングジム Refinas（リフィナス）。全38店舗。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${sans.variable} ${montserrat.variable}`}>
      <body>
        {children}
        {/* Nortiq Revise fix-request widget — renders nothing for visitors without an invite token */}
        <script src="https://nortiq-client.vercel.app/w.js" data-project="refinas" defer />
      </body>
    </html>
  );
}
