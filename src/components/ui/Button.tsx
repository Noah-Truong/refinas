import Link from 'next/link';
import styles from './Button.module.css';

type ButtonProps = {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'whiteOutline';
  size?: 'md' | 'lg';
  /** Small catch-text line rendered above the button (LAVA's trial-button pattern) */
  catchText?: string;
  className?: string;
  children: React.ReactNode;
};

/** CTA button. Pill-shaped (LAVA pattern): solid red primary, blue secondary, outline ghost. */
export function Button({ href, variant = 'primary', size = 'md', catchText, className, children }: ButtonProps) {
  const anchor = (
    <Link
      href={href}
      className={[styles.button, styles[variant], size === 'lg' ? styles.lg : '', className].filter(Boolean).join(' ')}
    >
      <span className={styles.label}>{children}</span>
      <span className={styles.arrow} aria-hidden="true" />
    </Link>
  );
  if (!catchText) return anchor;
  return (
    <div className={styles.withCatch}>
      <p className={styles.catch}>{catchText}</p>
      {anchor}
    </div>
  );
}
