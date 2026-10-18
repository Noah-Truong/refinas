import Link from 'next/link';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './NearbyGyms.module.css';
import { GymName } from '@/components/ui/GymName';
import { JaWrap } from '@/components/ui/JaWrap';
import { trialCatchText } from '@/lib/trial';

/** The page renders this section only when the store lists nearby stores. */
export const hasNearby = (gym: Gym) => (gym.nearbyGyms?.length ?? 0) > 0;

/** Nearby stores list (LAVA block 8): border-divided full-width arrow-link rows. */
export function NearbyGyms({ gym }: { gym: Gym }) {
  if (!hasNearby(gym)) return null;
  const nearbyGyms = gym.nearbyGyms ?? [];
  const storeCount = gym.brand?.storeCount;
  return (
    <>
      <SectionTitle
        title={<><GymName name={gym.name} />の近くの店舗</>}
        lead={
          <>
            <em>フルアクセス</em>
            {`プランなら、${storeCount ? `全${storeCount}店舗` : '全店舗'}を相互にご利用いただけます。`}
          </>
        }
      />
      <ul className={styles.list}>
        {nearbyGyms.map((nearby) => (
          <li key={nearby.slug} className={styles.item}>
            <Link href={`/gym/${nearby.slug}`} className={styles.link}>
              <span className={styles.linkBody}>
                <span className={styles.name}><GymName name={nearby.name} /></span>
                {nearby.accessNote && (
                  <span className={styles.accessNote}><JaWrap>{nearby.accessNote}</JaWrap></span>
                )}
              </span>
              <span className={styles.chevron} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.moreWrapper}>
        <Button href="/gym" variant="secondary">
          他の店舗を探す
        </Button>
      </div>
      <div className={styles.ctaWrapper}>
        <Button href={gym.primaryCtaUrl} size="lg" catchText={trialCatchText(gym)}>
          {gym.primaryCtaLabel}
        </Button>
      </div>
    </>
  );
}
