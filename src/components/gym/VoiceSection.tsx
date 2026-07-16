import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './VoiceSection.module.css';

/** Member voices: 2-col testimonial cards + disclaimers + trial CTA. */
export function VoiceSection({ gym }: { gym: Gym }) {
  // Checklist ⑪: publish consent is required — unconsented voices never render
  const voices = gym.voices?.filter((voice) => voice.consentConfirmed) ?? [];
  if (!voices.length) return null;
  return (
    <>
      <SectionTitle kicker="VOICE" title="Refinas会員様の声" />
      <div className={styles.awardWrapper}>
        <Image
          src="/photos/award-2025.png"
          width={900}
          height={892}
          alt="フィットネスクラブ部門3冠受賞：お客様満足度・口コミ人気・トレーナーの親切丁寧度 No.1（JMR調べ）"
          sizes="(max-width: 640px) 80vw, 420px"
          className={styles.award}
        />
      </div>
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
                <span>{voice.label}</span>
              </span>
            </div>
            <p className={styles.comment}>{voice.comment}</p>
            {voice.tags && voice.tags.length > 0 && (
              <ul className={styles.tags}>
                {voice.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    <span>＃{tag}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <ul className={styles.notes}>
        <li className={styles.note}>会員様個人の感想であり、効果・効能を保証するものではありません。</li>
        <li className={styles.note}>Refinas会員様アンケート（2026年実施）より抜粋しています。</li>
      </ul>
      <div className={styles.ctaWrapper}>
        <Button href={gym.primaryCtaUrl} size="lg" catchText="まずは気軽に無料体験から">
          {gym.primaryCtaLabel}
        </Button>
      </div>
    </>
  );
}
