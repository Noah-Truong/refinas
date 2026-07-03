import Link from 'next/link';
import type { Gym } from '@/types/gym';
import styles from './Breadcrumb.module.css';

/** Breadcrumb strip — sits at the bottom of <main>, above the footer (reference-site placement). */
export function Breadcrumb({ gym }: { gym: Gym }) {
  return (
    <nav aria-label="パンくずリスト" className={styles.nav}>
      <ol className={styles.list}>
        <li>
          <Link href="/">Refinasトップ</Link>
        </li>
        <li>
          <Link href="/gym">店舗一覧</Link>
        </li>
        <li>
          <Link href="/gym">{gym.area}</Link>
        </li>
        <li aria-current="page">{gym.name}</li>
      </ol>
    </nav>
  );
}
