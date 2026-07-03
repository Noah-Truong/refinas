import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './FaqAccordion.module.css';

/** FAQ: native <details> accordion list (multiple can stay open) + contact button. */
export function FaqAccordion({ gym }: { gym: Gym }) {
  return (
    <>
      <SectionTitle id="faq" kicker="FAQ" title="よくあるご質問" />
      <ul className={styles.list}>
        {gym.faqs.map((faq) => (
          <li key={faq.q}>
            <details className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.qChip} aria-hidden="true">
                  <span>Q</span>
                </span>
                <h3 className={styles.question}>{faq.q}</h3>
                <span className={styles.indicator} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>
                <span className={styles.aChip} aria-hidden="true">
                  <span>A</span>
                </span>
                <p className={styles.answerText}>{faq.a}</p>
              </div>
            </details>
          </li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <Button href={gym.contactUrl ?? '#reserve'} variant="secondary">
          その他のご質問はこちら
        </Button>
      </div>
    </>
  );
}
