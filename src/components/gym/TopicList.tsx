import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './TopicList.module.css';

/** Topics: news list rows (date / important chip / title) + load-more style button. */
export function TopicList({ gym }: { gym: Gym }) {
  if (!gym.news?.length) return null;
  return (
    <>
      <SectionTitle id="topics" kicker="TOPICS" title={`${gym.name}からのお知らせ`} />
      <ul className={styles.list}>
        {gym.news.map((item) => (
          <li key={item.url + item.title} className={styles.item}>
            <a href={item.url} className={styles.link}>
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
              <span className={styles.title}>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <Button href="#topics" variant="ghost">
          さらに読み込む
        </Button>
      </div>
    </>
  );
}
