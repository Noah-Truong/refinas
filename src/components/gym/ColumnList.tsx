import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './ColumnList.module.css';

/** Column: 3 article cards (photo + title) + read-more button. */
export function ColumnList({ gym }: { gym: Gym }) {
  if (!gym.columns?.length) return null;
  return (
    <>
      <SectionTitle id="column" kicker="COLUMN" title="キックボクシングコラム" />
      <ul className={styles.grid}>
        {gym.columns.map((column) => (
          <li key={column.title}>
            <a href={column.url} className={styles.card}>
              <span className={styles.imageWrapper}>
                <Image
                  src={column.image.url}
                  width={column.image.width}
                  height={column.image.height}
                  alt={column.image.alt}
                  sizes="(max-width: 640px) 100vw, 250px"
                  className={styles.image}
                />
              </span>
              <span className={styles.title}>{column.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <Button href="#column" variant="ghost">
          他のコラムを読む
        </Button>
      </div>
    </>
  );
}
