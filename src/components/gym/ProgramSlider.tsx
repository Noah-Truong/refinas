import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { StrengthMeter } from '@/components/ui/StrengthMeter';
import { Slider } from '@/components/ui/Slider';
import styles from './ProgramSlider.module.css';
import { GymName } from '@/components/ui/GymName';
import { JaWrap } from '@/components/ui/JaWrap';
import { trialCatchText } from '@/lib/trial';

/** The page renders this section only when there is at least one program. */
export const hasPrograms = (gym: Gym) => (gym.programs?.length ?? 0) > 0;

/** Programs: card carousel (name / trial tag / duration / intensity / image / description) + trial CTA. */
export function ProgramSlider({ gym }: { gym: Gym }) {
  if (!hasPrograms(gym)) return null;
  return (
    <>
      <SectionTitle id="program" kicker="PROGRAM" title={<><GymName name={gym.name} />のプログラム</>} />
      <Slider label={`${gym.name}のプログラム一覧`} slideWidth="min(260px, 80vw)">
        {gym.programs.map((program) => (
          <article key={program.name} className={styles.card}>
            <h3 className={styles.name}>
              <span className="nobr">{program.name}</span>
            </h3>
            {program.trialOk && (
              <p className={styles.trialTag}>
                <span>体験OK</span>
              </p>
            )}
            {program.durationMin != null && (
              <div className={styles.row}>
                <h4 className={styles.rowLabel}><JaWrap>レッスン時間</JaWrap></h4>
                <p className={styles.rowValue}>{program.durationMin}分</p>
              </div>
            )}
            <div className={styles.row}>
              <h4 className={styles.rowLabel}><JaWrap>プログラム強度</JaWrap></h4>
              <StrengthMeter value={program.intensity} />
            </div>
            {program.image && (
              <Image
                src={program.image.url}
                width={program.image.width}
                height={program.image.height}
                alt={program.image.alt}
                sizes="(max-width: 640px) 80vw, 260px"
                className={styles.image}
              />
            )}
            <p className={styles.description}>
              <JaWrap>{program.description}</JaWrap>
            </p>
          </article>
        ))}
      </Slider>
      <div className={styles.ctaWrapper}>
        <Button href={gym.primaryCtaUrl} size="lg" catchText={trialCatchText(gym)}>
          {gym.primaryCtaLabel}
        </Button>
      </div>
    </>
  );
}
