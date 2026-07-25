import Link from 'next/link';
import styles from './ArrowLink.module.css';

/**
 * Tertiary text link with a small arrow (LAVA's border-arrow-link equivalent).
 * `tone="inherit"` makes the arrow follow the link's own color, for use on
 * colored grounds where the default brand red would disappear.
 */
export function ArrowLink({
  href,
  children,
  className,
  tone = 'brand',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: 'brand' | 'inherit';
}) {
  return (
    <Link
      href={href}
      className={[styles.link, tone === 'inherit' ? styles.toneInherit : '', className].filter(Boolean).join(' ')}
    >
      {children}
      <span className={styles.arrow} aria-hidden="true" />
    </Link>
  );
}
