import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { StrengthMeter } from '@/components/ui/StrengthMeter';
import { Slider } from '@/components/ui/Slider';
import styles from './ProgramSlider.module.css';

/** Programs: card carousel (name / trial tag / duration / intensity / image / description) + trial CTA. */
export function ProgramSlider({ gym }: { gym: Gym }) {
  return (
    <>
      <SectionTitle id="program" kicker="PROGRAM" title={`${gym.name}のプログラム`} />
      <Slider label={`${gym.name}のプログラム一覧`} slideWidth="min(260px, 80vw)">
        {gym.programs.map((program) => (
          <article key={program.name} className={styles.card}>
            <h3 className={styles.name}>{program.name}</h3>
            {program.trialOk && (
              <p className={styles.trialTag}>
                <span>体験OK</span>
              </p>
            )}
            {program.durationMin != null && (
              <div className={styles.row}>
                <h4 className={styles.rowLabel}>レッスン時間</h4>
                <p className={styles.rowValue}>{program.durationMin}分</p>
              </div>
            )}
            <div className={styles.row}>
              <h4 className={styles.rowLabel}>プログラム強度</h4>
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
            <p className={styles.description}>{program.description}</p>
          </article>
        ))}
      </Slider>
      <div className={styles.ctaWrapper}>
        <Button href={gym.primaryCtaUrl} size="lg" catchText="まずは気軽に無料体験から">
          {gym.primaryCtaLabel}
        </Button>
      </div>
    </>
  );
}
