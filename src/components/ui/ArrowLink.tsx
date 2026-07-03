import Link from 'next/link';
import styles from './ArrowLink.module.css';

/** Tertiary text link with a small red arrow (LAVA's border-arrow-link equivalent). */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={[styles.link, className].filter(Boolean).join(' ')}>
      {children}
      <span className={styles.arrow} aria-hidden="true" />
    </Link>
  );
}
