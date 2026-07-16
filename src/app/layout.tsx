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

export const metadata: Metadata = {
  metadataBase: new URL('https://refinas.jp'),
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
      <body>{children}</body>
    </html>
  );
}
