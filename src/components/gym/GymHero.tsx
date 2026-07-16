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
                className={styles.slide}
                style={{
                  animationDelay: `${i * SLIDE_SECONDS}s`,
                  animationDuration: `${slides.length * SLIDE_SECONDS}s`,
                }}
              />
            ))}
          <div className={styles.overlay} aria-hidden="true" />
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
