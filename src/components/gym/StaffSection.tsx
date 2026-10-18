import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './StaffSection.module.css';
import { GymName } from '@/components/ui/GymName';
import { JaWrap } from '@/components/ui/JaWrap';
import { trialCatchText } from '@/lib/trial';

/** The page renders this section only when the store lists trainers. */
export const hasTrainers = (gym: Gym) => (gym.trainers?.length ?? 0) > 0;

/** Staff: trainer card grid + Instagram promo + trial CTA. */
export function StaffSection({ gym }: { gym: Gym }) {
  if (!hasTrainers(gym)) return null;
  const instagram = gym.sns?.instagram;
  return (
    <>
      <SectionTitle
        id="staff"
        kicker="TRAINER"
        title={<><GymName name={gym.name} />のトレーナー</>}
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
                <span className={styles.name}><JaWrap>{trainer.name}</JaWrap></span>
                {trainer.nameKana && <span className={styles.nameKana}><JaWrap>{trainer.nameKana}</JaWrap></span>}
                {trainer.role && (
                  <span className={styles.roleChip}>
                    <span className="nobr">{trainer.role}</span>
                  </span>
                )}
              </div>
            </div>
            <p className={styles.profile}>
              <JaWrap>{trainer.profile}</JaWrap>
            </p>
          </li>
        ))}
      </ul>
      {instagram && (
        <div className={styles.instagramRow}>
          <p className={styles.instagramLabel}><JaWrap><GymName name={gym.name} />の最新情報をチェック！</JaWrap></p>
          <Button href={instagram} variant="secondary">
            Instagram
          </Button>
        </div>
      )}
      <div className={styles.ctaWrapper}>
        <Button href={gym.primaryCtaUrl} size="lg" catchText={trialCatchText(gym)}>
          {gym.primaryCtaLabel}
        </Button>
      </div>
    </>
  );
}
