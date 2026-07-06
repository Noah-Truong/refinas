import Image from 'next/image';
import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { ArrowLink } from '@/components/ui/ArrowLink';
import styles from './TrialFlow.module.css';

const STEPS = [
  {
    number: '01',
    image: '/flow/step-01.png',
    title: 'ご来店・受付',
    description: (
      <>
        ご予約のお時間にスタジオへお越しください。ウェア・タオルは無料レンタルをご用意しているので、
        <em>手ぶらでのご来店OK</em>です。
      </>
    ),
  },
  {
    number: '02',
    image: '/flow/step-02.png',
    title: '着替え・ウォームアップ',
    description: (
      <>
        更衣室でお着替えいただき、トレーナーと一緒にストレッチと軽いウォームアップからスタート。
        <em>運動が久しぶりの方もご安心ください</em>。
      </>
    ),
  },
  {
    number: '03',
    image: '/flow/step-03.png',
    title: '体験トレーニング',
    description: (
      <>
        シャドー、サンドバッグ、そしてトレーナーとの<em>ミット打ち</em>
        まで、キックボクシングの爽快感を体験。強度はお一人おひとりに合わせて調整します。
      </>
    ),
  },
  {
    number: '04',
    image: '/flow/step-04.png',
    title: 'アフターカウンセリング',
    description: (
      <>
        トレーニング後は、目標やライフスタイルに合わせて最適なプランをご提案。
        <em>無理な勧誘は一切ありません</em>ので、じっくりご検討ください。
      </>
    ),
  },
];

/** Trial flow: 4-step guide + trial CTA + phone/FAQ support block. */
export function TrialFlow({ gym }: { gym: Gym }) {
  const tel = gym.telCta ?? gym.tel;
  const hoursLine = gym.hours.map((h) => `${h.label} ${h.time}`).join(' / ');
  return (
    <>
      <SectionTitle
        id="flow"
        kicker="TRIAL FLOW"
        title={`${gym.name}の無料体験の流れ`}
        lead={
          <>
            体験は<em>手ぶらでOK</em>、所要時間は<em>約60分</em>
            。受付からカウンセリングまでの流れをご紹介します。
          </>
        }
      />
      <ol className={styles.steps}>
        {STEPS.map((step) => (
          <li key={step.number} className={styles.step}>
            <p className={styles.stepNumber}>
              <span className={styles.stepLabel}>STEP</span>
              {step.number}
            </p>
            <Image src={step.image} width={400} height={300} alt="" className={styles.stepImage} />
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepText}>{step.description}</p>
          </li>
        ))}
      </ol>
      <div className={styles.ctaWrapper}>
        <Button href={gym.primaryCtaUrl} size="lg" catchText="まずは気軽に無料体験から">
          {gym.primaryCtaLabel}
        </Button>
      </div>
      <div className={styles.support}>
        <div className={styles.supportCol}>
          <h3 className={styles.supportTitle}>体験予約専用ダイヤル</h3>
          <a href={`tel:${tel}`} className={styles.telLink}>
            {tel}
          </a>
          <p className={styles.supportNote}>受付時間：{hoursLine}</p>
        </div>
        <div className={styles.supportCol}>
          <h3 className={styles.supportTitle}>お問い合わせ</h3>
          <p className={styles.supportNote}>体験前のご不明点は、こちらもあわせてご覧ください。</p>
          <ArrowLink href="#faq">よくあるご質問</ArrowLink>
        </div>
      </div>
    </>
  );
}
