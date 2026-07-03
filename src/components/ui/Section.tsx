import styles from './Section.module.css';

type SectionProps = {
  /** Surface per LAVA's alternation: white / panel(gray) / tint(gradient) / dark */
  bg?: 'white' | 'panel' | 'tint' | 'dark';
  /** Sharp corner cut on one top corner — alternates per section (LAVA's rounded-corner rhythm, Refinas-sharp) */
  cut?: 'left' | 'right' | 'none';
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ bg = 'white', cut = 'none', id, className, children }: SectionProps) {
  const classes = [styles.section, styles[bg], cut !== 'none' ? styles[`cut${cut === 'left' ? 'Left' : 'Right'}`] : '', className]
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
