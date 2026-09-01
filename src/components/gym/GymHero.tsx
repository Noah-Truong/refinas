import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { Container } from '@/components/ui/Section';
import styles from './GymHero.module.css';

/** Seconds each slide stays fully visible — keep in sync with the keyframe windows in GymHero.module.css. */
const SLIDE_SECONDS = 5;

/** Hero: crossfading photo slideshow + overlaid store name (H1) + catch copy / station / target notes below. */
export function GymHero({ gym }: { gym: Gym }) {
  const nearest = gym.access[0];
  const slides = gym.heroPhotos?.length ? gym.heroPhotos : [gym.heroImage];
  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.imageWrapper}>
          {/* static base layer = lead photo, so the photo band is never empty mid-crossfade */}
          <Image
            src={slides[0].url}
            width={slides[0].width}
            height={slides[0].height}
            alt={slides[0].alt}
            priority
            sizes="(max-width: 840px) 100vw, 800px"
            className={styles.slideBase}
          />
          {/* The crossfade layers are above the fold, so lazy-loading would not defer
              them. None is visible for at least SLIDE_SECONDS, so they load at low
              priority and let the LCP base layer win the connection — on mobile data
              that is one hero image blocking paint instead of six. */}
          {slides.length > 1 &&
            slides.map((photo, i) => (
              <Image
                key={photo.url}
                src={photo.url}
                width={photo.width}
                height={photo.height}
                alt=""
                aria-hidden="true"
                sizes="(max-width: 840px) 100vw, 800px"
                fetchPriority="low"
                className={styles.slide}
                style={{
                  animationDelay: `${i * SLIDE_SECONDS}s`,
                  animationDuration: `${slides.length * SLIDE_SECONDS}s`,
                }}
              />
            ))}
          <div className={styles.overlay} aria-hidden="true" />
          {/* 3-crown award badge, moved up from VOICE (client requests #1 / #8) */}
          <Image
            src="/photos/award-2025.png"
            width={1500}
            height={1487}
            alt="フィットネスクラブ部門3冠受賞：お客様満足度・口コミ人気・トレーナーの親切丁寧度 No.1（JMR調べ）"
            sizes="(max-width: 640px) 120px, 180px"
            loading="eager"
            className={styles.award}
            data-nq-fix="1 8"
          />
          <div className={styles.titleWrapper}>
            <p className={styles.brandLabel}>{gym.brandLabel}</p>
            <h1 className={styles.title}>
              {gym.name}
              <span className={styles.subtitle}>{gym.area}</span>
            </h1>
          </div>
        </div>
        <div className={styles.description}>
          <h2 className={styles.catchCopy}>{gym.catchCopy}</h2>
          <ul className={styles.badges}>
            {nearest && (
              <li className={styles.badge}>
                {nearest.station}
                {nearest.exit ? ` ${nearest.exit}` : ''} 徒歩{nearest.walkMin}分
              </li>
            )}
            {gym.targetNote && <li className={styles.badge}>{gym.targetNote}</li>}
            {gym.studioType && !gym.targetNote?.includes(gym.studioType) && (
              <li className={styles.badge}>{gym.studioType}</li>
            )}
          </ul>
        </div>
      </Container>
    </div>
  );
}
