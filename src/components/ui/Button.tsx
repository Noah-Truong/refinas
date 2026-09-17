import Link from 'next/link';
import { JaWrap } from '@/components/ui/JaWrap';
import styles from './Button.module.css';

type ButtonProps = {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'white' | 'whiteOutline';
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
      {/* ボタン文言も意味のまとまりで折り返す（「予約す / る」のような1文字だけの行を防ぐ） */}
      <span className={styles.label}>
        <JaWrap>{children}</JaWrap>
      </span>
      <span className={styles.arrow} aria-hidden="true" />
    </Link>
  );
  if (!catchText) return anchor;
  return (
    <div className={styles.withCatch}>
      <p className={styles.catch}><JaWrap>{catchText}</JaWrap></p>
      {anchor}
    </div>
  );
}
