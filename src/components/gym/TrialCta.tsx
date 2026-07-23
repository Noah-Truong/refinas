import type { Gym } from '@/types/gym';
import { Button } from '@/components/ui/Button';
import { ArrowLink } from '@/components/ui/ArrowLink';
import styles from './TrialCta.module.css';

const CHECK_ITEMS = [
  '初心者・未経験OK',
  'ウェア・グローブ無料レンタル',
  'トレーナーがマンツーマンでサポート',
];

/** Trial CTA card (LAVA block 3). Rendered on the blue Section — white-on-blue styling (fix1). */
export function TrialCta({ gym }: { gym: Gym }) {
  return (
    <div className={styles.card}>
      <p className={styles.kicker}>
        <span className={styles.kickerLine} aria-hidden="true" />
        <strong className={styles.kickerLabel}>TRIAL LESSON</strong>
        <span className={styles.kickerLine} aria-hidden="true" />
      </p>
      <h2 className={styles.heading}>
        {gym.name}で<br className={styles.spBreak} />
        無料体験レッスンをはじめよう
      </h2>
      <div className={styles.priceBox}>
        <span className={styles.priceLabel}>体験レッスン</span>
        <span className={styles.priceValue}>
          <strong className={styles.priceAmount}>0</strong>
          <span className={styles.priceYen}>円</span>
          <span className={styles.priceTax}>（税込）</span>
        </span>
        <s className={styles.priceBefore}>通常5,000円</s>
      </div>
      <ul className={styles.checkList}>
        {CHECK_ITEMS.map((item) => (
          <li key={item} className={styles.checkItem}>
            {item}
          </li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <Button href={gym.primaryCtaUrl} size="lg">
          {gym.primaryCtaLabel}
        </Button>
        <ArrowLink href="#flow" className={styles.flowLink}>
          体験の流れを詳しく見る
        </ArrowLink>
      </div>
    </div>
  );
}
