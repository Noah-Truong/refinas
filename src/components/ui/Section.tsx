import styles from './Section.module.css';

type SectionProps = {
  /** Surface per LAVA's alternation: white / panel(gray) / tint(peach) / blue(brand, fix1 replaces dark) */
  bg?: 'white' | 'panel' | 'tint' | 'blue';
  /** Large rounded top corner — alternates per section, overlapping the previous band (LAVA's rhythm) */
  cut?: 'left' | 'right' | 'none';
  id?: string;
  className?: string;
  /** Vertical rhythm: 'intro' tightens both paddings, 'outro' shortens the bottom */
  pad?: 'intro' | 'outro';
  /** client fix marker, set per call site (see CLAUDE.md / fix requests) */
  'data-nq-fix'?: string;
  children: React.ReactNode;
};

export function Section({ bg = 'white', cut = 'none', pad, id, className, children, ...rest }: SectionProps) {
  const classes = [
    styles.section,
    styles[bg],
    cut !== 'none' ? styles[`round${cut === 'left' ? 'Left' : 'Right'}`] : '',
    pad === 'intro' ? styles.padIntro : pad === 'outro' ? styles.padOutro : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <section id={id} className={classes} data-nq-fix={rest['data-nq-fix']}>
      <div className={styles.container}>{children}</div>
    </section>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={[styles.container, className].filter(Boolean).join(' ')}>{children}</div>;
}
