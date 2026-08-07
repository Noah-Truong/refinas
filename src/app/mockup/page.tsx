import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './mockup.module.css';

/** fix24 — one link to hand the client, listing every open decision. */
export const metadata: Metadata = {
  title: { absolute: 'ご確認いただきたい変更案' },
};

const DECISIONS = [
  {
    href: '/mockup/trial',
    title: '1. 体験レッスン枠の配色（2案）',
    note: '「中を青く」のご要望に対する2案です。ページの背景は白のまま、枠の内側だけを青にしています。青の濃さが異なります。',
    meta: 'A案（ロゴブルー塗り・推奨） / B案（淡いブルー）',
  },
  {
    href: '/mockup/cta',
    title: '2. 予約ボタンの配色（3案）',
    note: '青い枠の中に置く「無料体験を予約する」ボタンの見え方です。赤と青は色味が強くぶつかるため、白地に赤文字を推奨しています。',
    meta: '白地に赤文字（推奨） / 赤のまま / 白フチのみ',
  },
  {
    href: '/mockup/markers',
    title: '3. 四角マーカーの色（赤 → 青）',
    note: '「本文の頭にある赤い四角」を青に変更しました。対象の箇所をご確認ください。変更前後を並べています。',
    meta: '変更済み・ご確認のみ',
  },
];

const PENDING = [
  'コンセプト欄のお写真：元データ（原寸）をお送りください。LINEでいただいた画像はiPad画面の再撮影のため、画質が足りません。',
];

/**
 * The "previous version" request is answered by a separate deployment rather than a
 * page here — it is the whole site at an earlier commit, on its own domain.
 * Deployed with X-Robots-Tag: noindex so it cannot compete with the live site.
 */
const PREVIOUS_VERSION_URL = 'https://refinas-before-7-22.vercel.app/gym/shibuya';

export default function MockupIndexPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.header}>
          <p className={styles.kicker}>Refinas — Review</p>
          <h1 className={styles.title}>ご確認いただきたい変更案</h1>
          <p className={styles.lead}>
            いただいたご要望をもとに変更案をご用意しました。各ページで案を並べていますので、
            ご希望のものをお選びください。実際のサイトにはA案・青のマーカーを適用済みです。
          </p>
        </div>

        <div className={styles.cardList}>
          {DECISIONS.map((decision) => (
            <Link key={decision.href} href={decision.href} className={styles.linkCard}>
              <span className={styles.linkCardTitle}>{decision.title}</span>
              <span className={styles.linkCardNote}>{decision.note}</span>
              <span className={styles.linkCardMeta}>{decision.meta}</span>
            </Link>
          ))}
        </div>

        <div className={styles.pending}>
          <p className={styles.pendingTitle}>以前のバージョン（7月22日の修正前）</p>
          <p style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-body)' }}>
            「以前のバージョンを見たい」というご要望に対して、7月22日の修正を行う前の状態を
            別のアドレスで公開しました。今のサイトはそのままです。
            <br />
            この時点のもので合っているかご確認ください。
          </p>
          <a className={styles.linkCardMeta} href={PREVIOUS_VERSION_URL} target="_blank" rel="noreferrer">
            {PREVIOUS_VERSION_URL}
          </a>
        </div>

        <div className={styles.pending}>
          <p className={styles.pendingTitle}>お客様からのご連絡をお待ちしている項目</p>
          <ul className={styles.pendingList}>
            {PENDING.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
