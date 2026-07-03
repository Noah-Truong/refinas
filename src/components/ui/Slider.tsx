'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';

type SliderProps = {
  /** Accessible name for the carousel region */
  label: string;
  /** Slide width CSS value on desktop, e.g. '100%' (one-up) or '260px' (cards) */
  slideWidth?: string;
  children: React.ReactNode[];
};

/**
 * Scroll-snap carousel with prev/next arrows + bullet pagination.
 * Used by PhotoSlider / ProgramSlider / CampaignBanner (LAVA uses Swiper; the
 * demo keeps it dependency-free).
 *
 * Pagination counts reachable scroll positions, not slides: with N slides and
 * V fully visible, only N-V+1 positions exist. Bullets/arrows reflect that
 * (recomputed on resize), so the controls never suggest content beyond the end.
 */
export function Slider({ label, slideWidth = '100%', children }: SliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [positions, setPositions] = useState(children.length);
  const count = children.length;

  /** Distance between slide starts (slide width + column gap). */
  const getStep = (track: HTMLUListElement) => {
    const first = track.children[0] as HTMLElement | undefined;
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || '0');
    return first.offsetWidth + gap;
  };

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep(track);
    if (step <= 0) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || '0');
    const fullyVisible = Math.max(1, Math.floor((track.clientWidth + gap) / step));
    const reachable = Math.max(1, count - fullyVisible + 1);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = maxScroll <= 1 || track.scrollLeft >= maxScroll - 1;
    setPositions(reachable);
    setIndex(atEnd ? reachable - 1 : Math.min(reachable - 1, Math.round(track.scrollLeft / step)));
  }, [count]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener('scroll', update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(track);
    return () => {
      track.removeEventListener('scroll', update);
      resizeObserver.disconnect();
    };
  }, [update]);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep(track);
    if (step <= 0) return;
    const target = Math.max(0, Math.min(positions - 1, i));
    const maxScroll = track.scrollWidth - track.clientWidth;
    // the last position is "scrolled to the end", which may be less than target*step
    track.scrollTo({ left: Math.min(target * step, maxScroll), behavior: 'smooth' });
  };

  return (
    <div className={styles.slider} role="region" aria-label={label}>
      <ul ref={trackRef} className={styles.track} style={{ ['--slide-w' as string]: slideWidth }}>
        {children.map((child, i) => (
          <li key={i} className={styles.slide}>
            {child}
          </li>
        ))}
      </ul>
      {positions > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={() => scrollTo(index - 1)}
            disabled={index === 0}
            aria-label="前へ"
          >
            <span className={`${styles.chevron} ${styles.chevronLeft}`} aria-hidden="true" />
          </button>
          <div className={styles.bullets}>
            {Array.from({ length: positions }, (_, i) => (
              <button
                key={i}
                type="button"
                className={[styles.bullet, i === index ? styles.bulletActive : ''].filter(Boolean).join(' ')}
                onClick={() => scrollTo(i)}
                aria-label={`${i + 1} / ${positions}へ移動`}
                aria-current={i === index}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={() => scrollTo(index + 1)}
            disabled={index === positions - 1}
            aria-label="次へ"
          >
            <span className={styles.chevron} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
