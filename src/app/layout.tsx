import type { Metadata } from 'next';
import { M_PLUS_Rounded_1c } from 'next/font/google';
import '@/styles/globals.css';

// Rounded JP+Latin family — soft, newcomer-friendly tone (no italics; obliques are synthesized)
const rounded = M_PLUS_Rounded_1c({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rounded',
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
    <html lang="ja" className={rounded.variable}>
      <body>{children}</body>
    </html>
  );
}
