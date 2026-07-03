import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { Container } from '@/components/ui/Section';
import styles from './GymHero.module.css';

/** Hero: background image + overlaid store name (H1) + catch copy / station / target notes below. */
export function GymHero({ gym }: { gym: Gym }) {
  const nearest = gym.access[0];
  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.imageWrapper}>
          <Image
            src={gym.heroImage.url}
            width={gym.heroImage.width}
            height={gym.heroImage.height}
            alt={gym.heroImage.alt}
            priority
            className={styles.image}
          />
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
