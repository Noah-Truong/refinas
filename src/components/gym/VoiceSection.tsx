import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './VoiceSection.module.css';
import { JaWrap } from '@/components/ui/JaWrap';
import { trialCatchText } from '@/lib/trial';

/** Checklist ⑪: publish consent is required — unconsented voices never render */
const consentedVoices = (gym: Gym) => gym.voices?.filter((voice) => voice.consentConfirmed) ?? [];

/** The page renders this section only when at least one voice has publish consent. */
export const hasVoices = (gym: Gym) => consentedVoices(gym).length > 0;

/** Member voices: 2-col testimonial cards + disclaimers + trial CTA. */
export function VoiceSection({ gym }: { gym: Gym }) {
  const voices = consentedVoices(gym);
  if (!voices.length) return null;
  return (
    <>
      <SectionTitle kicker="VOICE" title="Refinas会員様の声" />
      <ul className={styles.list}>
        {voices.map((voice, i) => (
          <li key={voice.label + i} className={styles.card}>
            <div className={styles.cardHeader}>
              <Image
                src={`/dummy/voice-0${(i % 2) + 1}.svg`}
                width={200}
                height={200}
                alt=""
                className={styles.avatar}
              />
              <span className={styles.labelChip}>
                <span><JaWrap>{voice.label}</JaWrap></span>
              </span>
            </div>
            <p className={styles.comment}>
              <JaWrap>{voice.comment}</JaWrap>
            </p>
            {voice.tags && voice.tags.length > 0 && (
              <ul className={styles.tags}>
                {voice.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    <span><JaWrap>＃{tag}</JaWrap></span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <ul className={styles.notes}>
        <li className={styles.note}><JaWrap>会員様個人の感想であり、効果・効能を保証するものではありません。</JaWrap></li>
        {/* 出典の注記はデータから（調査名・年を部品に書き込まない） */}
        {gym.voicesNote && <li className={styles.note}><JaWrap>{gym.voicesNote}</JaWrap></li>}
      </ul>
      <div className={styles.ctaWrapper}>
        <Button href={gym.primaryCtaUrl} size="lg" catchText={trialCatchText(gym)}>
          {gym.primaryCtaLabel}
        </Button>
      </div>
    </>
  );
}
