import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './ColumnList.module.css';
import { JaWrap } from '@/components/ui/JaWrap';

/** The page renders this section only when there are column articles. */
export const hasColumns = (gym: Gym) => (gym.columns?.length ?? 0) > 0;

/** Column: 3 article cards (photo + title) + read-more button. */
export function ColumnList({ gym }: { gym: Gym }) {
  if (!hasColumns(gym)) return null;
  const columns = gym.columns ?? [];
  return (
    <>
      <SectionTitle id="column" kicker="COLUMN" title="キックボクシングコラム" />
      <ul className={styles.grid}>
        {columns.map((column) => (
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
              <span className={styles.title}>
                <JaWrap>{column.title}</JaWrap>
              </span>
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
