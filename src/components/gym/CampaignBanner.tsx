import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './CampaignBanner.module.css';

/** Campaign banner (LAVA block 4). Hidden entirely when no campaign is running. */
export function CampaignBanner({ gym }: { gym: Gym }) {
  const campaign = gym.campaign;
  if (!campaign?.active) return null;
  const href = campaign.url ?? gym.primaryCtaUrl;
  return (
    <>
      <SectionTitle title={`${gym.name}で開催中のキャンペーン`} />
      <div className={styles.body}>
        <a href={href} className={styles.bannerLink}>
          {campaign.banner ? (
            <Image
              src={campaign.banner.url}
              width={campaign.banner.width}
              height={campaign.banner.height}
              alt={campaign.banner.alt}
              className={styles.bannerImage}
            />
          ) : (
            <span className={styles.bannerFallback}>
              <span className={styles.bannerKicker}>CAMPAIGN</span>
              <span className={styles.bannerTitle}>{campaign.title}</span>
            </span>
          )}
        </a>
        <div className={styles.buttonWrapper}>
          <Button href={href} variant="secondary">
            キャンペーン内容を見る
          </Button>
        </div>
      </div>
    </>
  );
}
