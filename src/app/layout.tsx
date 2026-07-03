import type { Metadata } from 'next';
import { Roboto, Noto_Sans_JP } from 'next/font/google';
import '@/styles/globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://refinas-demo.example.com'),
  title: {
    default: 'Refinas｜キックボクシングスタジオ',
    template: '%s｜キックボクシングスタジオ Refinas',
  },
  description:
    '「理想」に向かい「輝き続ける」人々のために。初心者・女性歓迎のキックボクシングスタジオ Refinas（リフィナス）。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${roboto.variable} ${notoSansJp.variable}`}>
      <body>{children}</body>
    </html>
  );
}
