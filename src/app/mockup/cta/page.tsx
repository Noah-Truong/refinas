import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGym } from '@/data/getGym';
import { Button } from '@/components/ui/Button';
import { ArrowLink } from '@/components/ui/ArrowLink';
import shell from '../mockup.module.css';
import styles from './page.module.css';

/**
 * fix24 §1, "CTA button treatment (decision needed)" — the three treatments from the
 * report, each on the same blue field so the comparison is fair.
 */
export const metadata: Metadata = {
  title: { absolute: '予約ボタンの配色 3案' },
};

const OPTIONS = [
  {
    key: 'white',
    variant: 'white' as const,
    name: '案1 — 白地に赤文字',
    note: '青に対して最もはっきり見え、ブランドの赤も残ります。',
    recommended: true,
    specs: ['背景：白', '文字：ブランドレッド', '青との相性：良い'],
  },
  {
    key: 'red',
    variant: 'primary' as const,
    name: '案2 — 赤のまま',
    note: '変更は最小ですが、赤と青はほぼ補色のため強くぶつかり、安っぽく見えやすい配色です。',
    recommended: false,
    specs: ['背景：ブランドレッド', '文字：白', '青との相性：ぶつかりやすい'],
  },
  {
    key: 'outline',
    variant: 'whiteOutline' as const,
    name: '案3 — 白フチのみ',
    note: '落ち着いて見えますが、一番押してほしいボタンとしては弱くなります。',
    recommended: false,
    specs: ['背景：なし（透明）', '文字・フチ：白', '青との相性：良いが目立ちにくい'],
  },
];

export default async function CtaMockupPage() {
  const gym = await getGym('shibuya');
  if (!gym) notFound();

  return (
    <main id="main" tabIndex={-1} className={shell.page}>
      <div className={shell.shell}>
        <Link href="/mockup" className={shell.back}>
          ← 一覧に戻る
        </Link>
        <div className={shell.header}>
          <p className={shell.kicker}>Trial Lesson — CTA Options</p>
          <h1 className={shell.title}>予約ボタンの配色 3案</h1>
          <p className={shell.lead}>
            体験レッスン枠を青にした場合の、「無料体験を予約する」ボタンの見え方です。
            同じ青の上に並べています。案1を推奨しています。
          </p>
        </div>

        <p className={shell.swipeHint}>← 横にスワイプして見比べられます →</p>
        <div className={`${shell.grid} ${shell.grid3}`}>
          {OPTIONS.map((option) => (
            <div key={option.key} className={shell.column}>
              <div className={shell.label}>
                <span className={shell.labelRow}>
                  <span className={shell.labelName}>{option.name}</span>
                  {option.recommended && <span className={shell.recommended}>推奨</span>}
                </span>
                <span className={shell.labelNote}>{option.note}</span>
              </div>
              <div className={styles.field}>
                <Button href={gym.primaryCtaUrl} size="lg" variant={option.variant}>
                  {gym.primaryCtaLabel}
                </Button>
                <ArrowLink href="/mockup/cta" className={styles.flowLink} tone="inherit">
                  体験の流れを詳しく見る
                </ArrowLink>
              </div>
              <ul className={shell.specs}>
                {option.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
