import type { ReactNode } from 'react';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './TopicList.module.css';
import { GymName } from '@/components/ui/GymName';
import { JaWrap } from '@/components/ui/JaWrap';

type NewsItem = NonNullable<Gym['news']>[number];

/** The page renders this section only when the store has news. */
export const hasNews = (gym: Gym) => (gym.news?.length ?? 0) > 0;

/** A news item links somewhere only with a real URL — none or "#" renders as plain text. */
const newsHref = (item: NewsItem) => {
  const url = item.url?.trim();
  return url && url !== '#' ? url : undefined;
};

/** Topics: news list rows (date / important chip / title) + load-more style button. */
export function TopicList({ gym }: { gym: Gym }) {
  if (!hasNews(gym)) return null;
  const news = gym.news ?? [];
  return (
    <>
      <SectionTitle id="topics" kicker="TOPICS" title={<><GymName name={gym.name} />からのお知らせ</>} />
      <ul className={styles.list}>
        {news.map((item, i) => {
          const href = newsHref(item);
          const content: ReactNode = (
            <>
              <span className={styles.meta}>
                <time dateTime={item.date.replace(/\//g, '-')} className={styles.date}>
                  {item.date}
                </time>
                {item.important && (
                  <span className={styles.importantChip}>
                    <span>重要</span>
                  </span>
                )}
              </span>
              <span className={styles.title}>
                <JaWrap>{item.title}</JaWrap>
              </span>
            </>
          );
          return (
            <li key={`${i}-${item.date}-${item.title}`} className={styles.item}>
              {href ? (
                <a href={href} className={styles.link}>
                  {content}
                </a>
              ) : (
                // same row layout as the link, without link affordances (no hover color)
                <div className={styles.row}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
      <div className={styles.buttonWrapper}>
        <Button href="#topics" variant="ghost">
          さらに読み込む
        </Button>
      </div>
    </>
  );
}
