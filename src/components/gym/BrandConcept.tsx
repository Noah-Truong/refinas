import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { studioPhotos } from '@/data/demoGym';
import styles from './BrandConcept.module.css';
import { JaWrap } from '@/components/ui/JaWrap';

/** Brand concept: split photo + centered brand statement (LAVA's closing brand block). */
export function BrandConcept({ gym }: { gym: Gym }) {
  const photo = studioPhotos[6];
  return (
    <div className={styles.split}>
      <div className={styles.photoWrapper}>
        <Image
          src={photo.url}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          sizes="(max-width: 640px) 100vw, 400px"
          className={styles.photo}
        />
      </div>
      <div className={styles.statement}>
        <p className={styles.brandMark}>REFINAS</p>
        <p className={styles.brandSub}>KICKBOXING STUDIO</p>
        <h2 className={styles.heading}>
          <JaWrap>{gym.brandLabel}</JaWrap><wbr />Refinas
          <br />
          <JaWrap>それは、自分を磨く1時間。</JaWrap>
        </h2>
        <div className={styles.copy}>
          <p>
            <JaWrap>
              Refinasがお届けする1時間のレッスンは、一人ひとりのお客様にとって、かけがえのない特別なひと時。
            </JaWrap>
          </p>
          <p>
            <JaWrap>
              心身の疲れをリセットする人、汗とともにストレスを打ち払う人もいれば、理想の自分へと踏み出す人も。その1時間は、人がひとつ強くなるための時間。その積み重ねで、毎日はどこまでも輝いていく。
            </JaWrap>
          </p>
          <p>
            <JaWrap>
              だからこそ、Refinasは「キックボクシングを通してひとりでも多くの人を輝かせたい」という想いのもと、質の高いレッスン・心を込めたサービスを提供します。
            </JaWrap>
          </p>
        </div>
      </div>
    </div>
  );
}
