import styles from './Section.module.css';

type SectionProps = {
  /** Surface per LAVA's alternation: white / panel(gray) / tint(peach) / blue(brand, fix1 replaces dark) */
  bg?: 'white' | 'panel' | 'tint' | 'blue';
  /** Large rounded top corner — alternates per section, overlapping the previous band (LAVA's rhythm) */
  cut?: 'left' | 'right' | 'none';
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ bg = 'white', cut = 'none', id, className, children }: SectionProps) {
  const classes = [styles.section, styles[bg], cut !== 'none' ? styles[`round${cut === 'left' ? 'Left' : 'Right'}`] : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <section id={id} className={classes}>
      <div className={styles.container}>{children}</div>
    </section>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={[styles.container, className].filter(Boolean).join(' ')}>{children}</div>;
}
