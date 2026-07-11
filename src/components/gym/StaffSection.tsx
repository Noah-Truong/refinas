import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './StaffSection.module.css';

/** Staff: trainer card grid + Instagram promo + trial CTA. */
export function StaffSection({ gym }: { gym: Gym }) {
  const instagram = gym.sns?.instagram;
  return (
    <>
      <SectionTitle
        id="staff"
        kicker="TRAINER"
        title={`${gym.name}のトレーナー`}
        lead="初心者の方にも一からていねいに。経験豊富なトレーナーが、あなたの理想づくりをサポートします。"
      />
      <ul className={styles.list}>
        {gym.trainers.map((trainer) => (
          <li key={trainer.name} className={styles.card}>
            <div className={styles.cardHeader}>
              {trainer.photo && (
                <Image
                  src={trainer.photo.url}
                  width={trainer.photo.width}
                  height={trainer.photo.height}
                  alt={trainer.photo.alt}
                  sizes="88px"
                  className={styles.photo}
                />
              )}
              <div className={styles.nameBlock}>
                <span className={styles.name}>{trainer.name}</span>
                {trainer.nameKana && <span className={styles.nameKana}>{trainer.nameKana}</span>}
                {trainer.role && (
                  <span className={styles.roleChip}>
                    <span>{trainer.role}</span>
                  </span>
                )}
              </div>
            </div>
            <p className={styles.profile}>{trainer.profile}</p>
          </li>
        ))}
      </ul>
      {instagram && (
        <div className={styles.instagramRow}>
          <p className={styles.instagramLabel}>{gym.name}の最新情報をチェック！</p>
          <Button href={instagram} variant="secondary">
            Instagram
          </Button>
        </div>
      )}
      <div className={styles.ctaWrapper}>
        <Button href={gym.primaryCtaUrl} size="lg" catchText="まずは気軽に無料体験から">
          {gym.primaryCtaLabel}
        </Button>
      </div>
    </>
  );
}
