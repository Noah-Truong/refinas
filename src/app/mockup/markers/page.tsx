import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionTitle } from '@/components/ui/SectionTitle';
import shell from '../mockup.module.css';
import styles from './page.module.css';

/**
 * fix24 §3 — the client asked for the red squares before body text to go blue, and the
 * report wanted them to circle which elements they meant. Rather than ask, this shows
 * every square marker in the build before and after, plus the red elements we left
 * alone, so they can confirm the scope at a glance.
 */
export const metadata: Metadata = {
  title: { absolute: '四角マーカーの色 変更前後' },
};

/** One column of live markers at all three sizes used across the site. */
function MarkerSample() {
  return (
    <div className={styles.sample}>
      <SectionTitle title="渋谷店の料金プラン" />
      <p className={styles.optionsTitle}>オプション</p>
      <p className={styles.rowTitle}>住所</p>
      <p className={styles.rowTitle}>お電話でのお問い合わせ</p>
    </div>
  );
}

const WHERE = [
  '各セクションの見出し（料金プラン、アクセス情報、よくあるご質問 など）',
  'オプションの見出し',
  'アクセス欄の「住所」「営業時間」などの小見出し',
  '体験の流れ・フッターのお問い合わせ見出し',
  '店舗一覧ページのエリア見出し',
];

export default function MarkersMockupPage() {
  return (
    <main className={shell.page}>
      <div className={shell.shell}>
        <Link href="/mockup" className={shell.back}>
          ← 一覧に戻る
        </Link>
        <div className={shell.header}>
          <p className={shell.kicker}>Heading Markers</p>
          <h1 className={shell.title}>四角マーカーの色 変更前後</h1>
          <p className={shell.lead}>
            見出しの先頭にある四角のマーカーを、赤から青に変更しました。
            サイト全体で6か所すべてを一括で変更しています。認識に相違がないかご確認ください。
          </p>
        </div>

        <p className={shell.swipeHint}>← 横にスワイプして見比べられます →</p>
        <div className={shell.grid}>
          <div className={shell.column}>
            <div className={shell.label}>
              <span className={shell.labelRow}>
                <span className={shell.labelName}>変更前 — 赤</span>
              </span>
              <span className={shell.labelNote}>これまでの表示です。</span>
            </div>
            <div className={styles.before}>
              <MarkerSample />
            </div>
          </div>
          <div className={shell.column}>
            <div className={shell.label}>
              <span className={shell.labelRow}>
                <span className={shell.labelName}>変更後 — 青</span>
                <span className={shell.recommended}>適用済み</span>
              </span>
              <span className={shell.labelNote}>ロゴのブルー #0E6EB8 に合わせています。</span>
            </div>
            <MarkerSample />
          </div>
        </div>

        <h2 className={shell.blockTitle}>変更した箇所</h2>
        <div className={styles.where}>
          <ul className={styles.whereList}>
            {WHERE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <h2 className={shell.blockTitle}>赤のまま残した箇所</h2>
        <p className={styles.where}>
          以下は「本文の頭の四角」ではなく、ボタンやラベルとしての赤のため変更していません。
          こちらも青にしたほうがよろしければお知らせください。
        </p>
        <div className={styles.keptRow}>
          <span className={styles.chip}>体験レッスン</span>
          <span className={styles.chip}>キックボクシングジム</span>
          <span className={styles.chip}>おすすめ</span>
          <span className={styles.qChip}>Q</span>
          <span className={styles.qChip}>A</span>
        </div>
      </div>
    </main>
  );
}
