import styles from './SectionTitle.module.css';

type SectionTitleProps = {
  /** Optional small English kicker (Montserrat caps, red) — e.g. "TRIAL LESSON" */
  kicker?: string;
  /** Main Japanese title (H2), e.g. 「渋谷店の料金プラン」 */
  title: string;
  /** Optional one-line lead below the title */
  lead?: React.ReactNode;
  id?: string;
  align?: 'left' | 'center';
};

export function SectionTitle({ kicker, title, lead, id, align = 'left' }: SectionTitleProps) {
  return (
    <div className={[styles.wrapper, align === 'center' ? styles.center : ''].filter(Boolean).join(' ')}>
      {kicker && <span className={styles.kicker}>{kicker}</span>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
