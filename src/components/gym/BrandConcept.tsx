import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { studioPhotos } from '@/data/demoGym';
import styles from './BrandConcept.module.css';

/** Brand concept: split photo + centered brand statement (LAVA's closing brand block). */
export function BrandConcept({ gym }: { gym: Gym }) {
  const photo = studioPhotos[0];
  return (
    <div className={styles.split}>
      <div className={styles.photoWrapper}>
        <Image
          src={photo.url}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          className={styles.photo}
        />
      </div>
      <div className={styles.statement}>
        <p className={styles.brandMark}>REFINAS</p>
        <p className={styles.brandSub}>KICKBOXING STUDIO</p>
        <h2 className={styles.heading}>
          {gym.brandLabel}Refinas
          <br />
          それは、自分を磨く1時間。
        </h2>
        <div className={styles.copy}>
          <p>Refinasがお届けする1時間のレッスンは、</p>
          <p>一人ひとりのお客様にとって、</p>
          <p>かけがえのない特別なひと時。</p>
          <p>心身の疲れをリセットする人、</p>
          <p>汗とともにストレスを打ち払う人もいれば、</p>
          <p>理想の自分へと踏み出す人も。</p>
          <p>その1時間は、人がひとつ強くなるための1時間。</p>
          <p>その積み重ねで、毎日はどこまでも輝いていく。</p>
          <p>だからこそ、Refinasは</p>
          <p>「キックボクシングを通してひとりでも多くの人を輝かせたい」</p>
          <p>という想いをこめて、</p>
          <p>質の高いレッスン・心を込めたサービスを提供します。</p>
        </div>
      </div>
    </div>
  );
}
