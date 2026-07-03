import styles from './StrengthMeter.module.css';

/** Program intensity meter: 5 sharp parallelogram cells, red-filled to `value` (1–5). */
export function StrengthMeter({ value, label = 'プログラム強度' }: { value: number; label?: string }) {
  const clamped = Math.max(0, Math.min(5, value));
  return (
    <div className={styles.meter} role="img" aria-label={`${label} ${clamped} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={[styles.cell, i + 1 <= clamped ? styles.active : ''].filter(Boolean).join(' ')}
        />
      ))}
    </div>
  );
}
