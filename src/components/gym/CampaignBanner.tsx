import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './CampaignBanner.module.css';
import { GymName } from '@/components/ui/GymName';
import { JaWrap } from '@/components/ui/JaWrap';

/** EN sub-line of the banner — matches the site's Montserrat kicker labels. */
const BANNER_EN = 'REFINAS KICKBOXING GYM';

/**
 * The page renders this section only for a running campaign that has a title —
 * the banner is built from the title text, so without one it would be an empty box.
 */
export const hasCampaign = (gym: Gym) => gym.campaign?.active === true && Boolean(gym.campaign.title?.trim());

/** Campaign banner (LAVA block 4). Hidden entirely when no campaign is running. */
export function CampaignBanner({ gym }: { gym: Gym }) {
  const campaign = gym.campaign;
  if (!campaign || !hasCampaign(gym)) return null;
  const href = campaign.url ?? gym.primaryCtaUrl;
  // Client request #3: the banner is built from text instead of an image so it
  // stays legible on SP (the 1200x400 artwork shrank the EN line to 4.5px).
  const [headline, ...rest] = (campaign.title ?? '').split('｜');
  const subline = rest.join('｜');
  return (
    <>
      <SectionTitle title={<><GymName name={gym.name} />で開催中のキャンペーン</>} />
      <div className={styles.body} data-nq-fix="5">
        <a href={href} className={styles.bannerLink}>
          <span className={styles.banner}>
            <span className={styles.bannerHeadline}><JaWrap>{headline}</JaWrap></span>
            {subline && <span className={styles.bannerSubline}><JaWrap>{subline}</JaWrap></span>}
            <span className={styles.bannerEn}>{BANNER_EN}</span>
          </span>
        </a>
      </div>
    </>
  );
}
