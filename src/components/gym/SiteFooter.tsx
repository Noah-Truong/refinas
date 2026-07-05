import type { Gym } from '@/types/gym';
import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ArrowLink } from '@/components/ui/ArrowLink';
import styles from './SiteFooter.module.css';

// Legal/company links required by the footer composition (spec §5 block 16).
// Placeholder targets until the real-build pages exist; FAQ is omitted — the
// support band above already links to #faq.
const FOOTER_NAV = [
  '会社概要',
  '採用情報',
  'プライバシーポリシー',
  '特定商取引法に基づく表記',
  'サイトご利用上の注意',
  'サイトマップ',
];

const MARQUEE_TEXT = 'REFINE YOUR IDEAL — KICKBOXING STUDIO REFINAS — ';

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.72 3.72 0 0 1-.9 1.38 3.72 3.72 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63 3.35.94 2.68 1.35 2 2.03A5.92 5.92 0 0 0 .63 4.16C.33 4.92.13 5.8.07 7.07.01 8.35 0 8.76 0 12s.01 3.65.07 4.93c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.4 2.14a5.92 5.92 0 0 0 2.13 1.39c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.93.07s3.65-.01 4.93-.07c1.27-.06 2.15-.26 2.91-.56a5.92 5.92 0 0 0 2.14-1.39 5.92 5.92 0 0 0 1.39-2.14c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.93s-.01-3.65-.07-4.93c-.06-1.27-.26-2.15-.56-2.91a5.92 5.92 0 0 0-1.39-2.13A5.92 5.92 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A4 4 0 1 1 16 12a4 4 0 0 1-4 4z" />
      <circle cx="18.41" cy="5.59" r="1.44" />
    </svg>
  );
}

function LineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 5.66 2 10.15c0 4.03 3.55 7.4 8.34 8.04.32.07.77.21.88.49.1.25.07.65.03.9l-.14.86c-.04.26-.2 1 .88.55 1.08-.46 5.84-3.44 7.97-5.89C21.53 13.5 22 11.9 22 10.15 22 5.66 17.52 2 12 2zM8.4 12.66H6.34a.53.53 0 0 1-.53-.53V8.4a.53.53 0 0 1 1.06 0v3.2H8.4a.53.53 0 0 1 0 1.06zm1.87-.53a.53.53 0 0 1-1.06 0V8.4a.53.53 0 0 1 1.06 0v3.73zm4.52 0a.53.53 0 0 1-.36.5.54.54 0 0 1-.17.03.53.53 0 0 1-.43-.21l-1.9-2.58v2.26a.53.53 0 0 1-1.07 0V8.4a.53.53 0 0 1 .96-.32l1.9 2.59V8.4a.53.53 0 0 1 1.07 0v3.73zm3.36-2.4a.53.53 0 0 1 0 1.07h-1.53v.8h1.53a.53.53 0 0 1 0 1.06h-2.06a.53.53 0 0 1-.53-.53V8.4a.53.53 0 0 1 .53-.53h2.06a.53.53 0 0 1 0 1.07h-1.53v.8h1.53z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  );
}

/** Footer: trial support band + brand statement band + footer proper (3 stacked full-bleed bands). */
export function SiteFooter({ gym }: { gym: Gym }) {
  const tel = gym.telCta ?? gym.tel;
  const hoursLine = gym.hours.map((h) => `${h.label} ${h.time}`).join(' / ');
  const sns = [
    { key: 'instagram', label: 'Instagram', href: gym.sns?.instagram, icon: <InstagramIcon /> },
    { key: 'line', label: 'LINE', href: gym.sns?.line, icon: <LineIcon /> },
    { key: 'youtube', label: 'YouTube', href: gym.sns?.youtube, icon: <YoutubeIcon /> },
  ].filter((item): item is typeof item & { href: string } => Boolean(item.href));
  return (
    <footer className={styles.footer}>
      {/* a. Trial support band */}
      <div className={styles.trialBand}>
        <Container>
          <div className={styles.trialInner}>
            <Button href={gym.primaryCtaUrl} size="lg" catchText="まずは気軽に無料体験から">
              {gym.primaryCtaLabel}
            </Button>
            <div className={styles.support}>
              <div className={styles.supportCol}>
                <h3 className={styles.supportTitle}>体験予約専用ダイヤル</h3>
                <a href={`tel:${tel}`} className={styles.telLink}>
                  {tel}
                </a>
                <p className={styles.supportNote}>受付時間：{hoursLine}</p>
              </div>
              <div className={styles.supportCol}>
                <h3 className={styles.supportTitle}>お問い合わせ</h3>
                <p className={styles.supportNote}>体験前のご不明点はこちらをご覧ください。</p>
                <ArrowLink href="#faq" className={styles.supportLink}>
                  よくあるご質問
                </ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* b. Brand statement band */}
      <div className={styles.brandBand}>
        <Container>
          <div className={styles.brandInner}>
            <p className={styles.wordmark} aria-hidden="true">
              Refinas
            </p>
            <p className={styles.brandLine}>理想に向かい、輝き続ける人々のコミュニティを創造する</p>
            <p className={styles.brandText}>
              Refinasは、キックボクシングを通じて一人ひとりが自分を磨き、洗練させていくためのジムです。汗を流すその先にある、理想のあなたと輝く毎日を、私たちは全力で応援します。
            </p>
          </div>
        </Container>
      </div>

      {/* c. Footer proper */}
      <div className={styles.footerProper}>
        <p className={styles.marquee} aria-hidden="true">
          <span className={styles.marqueeText}>
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
          </span>
        </p>
        <Container>
          <div className={styles.footerInner}>
            <nav aria-label="フッターナビゲーション">
              <ul className={styles.nav}>
                {FOOTER_NAV.map((label) => (
                  <li key={label}>
                    <a href="#" className={styles.navLink}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {sns.length > 0 && (
              <ul className={styles.snsList}>
                {sns.map((item) => (
                  <li key={item.key}>
                    <a href={item.href} className={styles.snsLink} aria-label={item.label}>
                      {item.icon}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <p className={styles.copyright}>© 2026 Refinas fitness studio</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
