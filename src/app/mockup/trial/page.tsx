import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGym } from '@/data/getGym';
import { TrialCta } from '@/components/gym/TrialCta';
import shell from '../mockup.module.css';

/**
 * fix24 §1 — side-by-side comparison of the two blue intensities for the Trial
 * Lesson card. Once a variant is chosen, set it as the default in `TrialCta` and
 * delete the whole /mockup directory.
 */
export const metadata: Metadata = {
  title: { absolute: '体験レッスン枠の配色 2案' },
};

const OPTIONS = [
  {
    variant: 'a' as const,
    name: 'A案 — ロゴブルー塗り',
    note: 'カードの中身をロゴのブルーで塗りつぶし、文字は白に反転。「中を青く」というご要望に最も近い案です。',
    recommended: true,
    specs: [
      '背景：ロゴブルー #0E6EB8',
      '見出し・チェック・リンク：白',
      '料金枠：白のまま（¥0 の赤を活かすため）',
      'ボタン：白地に赤文字',
    ],
  },
  {
    variant: 'b' as const,
    name: 'B案 — 淡いブルー',
    note: '背景のみ淡いブルーに。文字色と赤いボタンはそのままで変更は最小ですが、青の印象は弱めです。',
    recommended: false,
    specs: [
      '背景：淡いブルー #ECF3FA',
      '見出し・チェック・リンク：現状のまま',
      '料金枠：白のまま',
      'ボタン：赤のまま',
    ],
  },
];

export default async function TrialMockupPage() {
  const gym = await getGym('shibuya');
  if (!gym) notFound();

  return (
    <main className={shell.page}>
      <div className={shell.shell}>
        <Link href="/mockup" className={shell.back}>
          ← 一覧に戻る
        </Link>
        <div className={shell.header}>
          <p className={shell.kicker}>Trial Lesson — Color Options</p>
          <h1 className={shell.title}>体験レッスン枠の配色 2案</h1>
          <p className={shell.lead}>
            ページの背景は白のまま、枠の内側だけを青にしています。どちらかをお選びください。
            ボタンの色は別途3案をご用意しています。
          </p>
        </div>
        <p className={shell.swipeHint}>← 横にスワイプして見比べられます →</p>
        <div className={shell.grid}>
          {OPTIONS.map((option) => (
            <div key={option.variant} className={shell.column}>
              <div className={shell.label}>
                <span className={shell.labelRow}>
                  <span className={shell.labelName}>{option.name}</span>
                  {option.recommended && <span className={shell.recommended}>推奨</span>}
                </span>
                <span className={shell.labelNote}>{option.note}</span>
              </div>
              <TrialCta gym={gym} variant={option.variant} />
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
