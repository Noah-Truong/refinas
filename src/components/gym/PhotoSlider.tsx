import NextImage from 'next/image';
import type { Image } from '@/types/gym';
import { Slider } from '@/components/ui/Slider';
import styles from './PhotoSlider.module.css';

/** Studio atmosphere photo carousel (LAVA block 6) — one photo visible at a time. */
export function PhotoSlider({ photos }: { photos: Image[] }) {
  return (
    <Slider label="店舗の雰囲気" slideWidth="100%">
      {photos.map((photo) => (
        <figure key={photo.url} className={styles.figure}>
          <NextImage
            src={photo.url}
            width={1200}
            height={800}
            alt={photo.alt}
            sizes="(max-width: 840px) 100vw, 760px"
            className={styles.image}
          />
          <figcaption className={styles.caption}>{photo.alt}</figcaption>
        </figure>
      ))}
    </Slider>
  );
}
