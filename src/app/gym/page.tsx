import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGyms } from '@/data/getGym';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '店舗一覧',
  description: 'キックボクシングスタジオ Refinas の店舗一覧（デモ）。',
};

export default async function GymListPage() {
  const gyms = await getAllGyms();
  const areas = [...new Set(gyms.map((g) => g.area))];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p className={styles.kicker}>GYM LIST</p>
        <h1 className={styles.title}>店舗一覧</h1>
        <p className={styles.note}>※ デザイン確認用デモ — {gyms.length}店舗のダミーデータを表示しています（本番は38店舗）。</p>
      </header>
      {areas.map((area) => (
        <section key={area} className={styles.areaBlock}>
          <h2 className={styles.areaTitle}>{area}</h2>
          <ul className={styles.list}>
            {gyms
              .filter((g) => g.area === area)
              .map((gym) => (
                <li key={gym.slug}>
                  <Link href={`/gym/${gym.slug}`} className={styles.card}>
                    <span className={styles.cardName}>{gym.name}</span>
                    <span className={styles.cardMeta}>
                      {gym.access[0]?.station} 徒歩{gym.access[0]?.walkMin}分
                    </span>
                    <span className={styles.cardArrow} aria-hidden="true" />
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
