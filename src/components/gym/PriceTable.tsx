import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { ArrowLink } from '@/components/ui/ArrowLink';
import styles from './PriceTable.module.css';
import { GymName } from '@/components/ui/GymName';
import { JaWrap } from '@/components/ui/JaWrap';

/** フルアクセス系プランは全店舗、それ以外は登録1店舗のみ利用可能。 */
function studioScope(planName: string): string {
  return planName.includes('フルアクセス') ? '全店舗' : '1店舗';
}

/** Stored plan prices are 税抜 — display is 税込 (Fix Point 7/22 Task 5). */
const taxIncluded = (price: number) => Math.round(price * 1.1);

/** Pricing (LAVA block 7), Fix Point 7/22 Task 5: per-plan cards — left column
    is the "who it's for" label, right column is plan name + tax-included fee. */
export function PriceTable({ gym }: { gym: Gym }) {
  return (
    <>
      <SectionTitle
        title={<><GymName name={gym.name} />の料金プラン</>}
        id="price"
        lead={
          <>
            目的に合わせて選べる3つのプラン。まずは<em>無料体験レッスン</em>からお試しいただけます。
          </>
        }
      />

      {/* 7a. plan cards: who-it's-for (left) / plan name + 税込 fee (right) */}
      <ul className={styles.planList} data-nq-fix="4">
        {gym.plans.map((plan) => {
          const female = plan.priceFemale ?? plan.price;
          const male = plan.priceMale ?? plan.price;
          const scope = studioScope(plan.planName);
          // 「全店舗通い放題・全店舗」の重複を避ける
          const meta = plan.sessions?.includes(scope)
            ? plan.sessions
            : `${plan.sessions ?? '—'}・${scope}`;
          return (
            <li
              key={plan.planName}
              className={[styles.planCard, plan.isRecommended ? styles.recommended : '']
                .filter(Boolean)
                .join(' ')}
            >
              {plan.isRecommended && (
                <span className={styles.recommendBadge}>オススメ!</span>
              )}
              <div className={styles.planTarget}>
                <p className={styles.targetText}>
                  <JaWrap>{plan.target}</JaWrap>
                </p>
              </div>
              <div className={styles.planMain}>
                <h3 className={styles.planName}><JaWrap>{plan.planName}</JaWrap></h3>
                <p className={styles.planMeta}><JaWrap>月会費（{meta}）</JaWrap></p>
                <div className={styles.priceLines}>
                  {female != null && (
                    <p className={styles.priceLine}>
                      <span className={styles.genderLabel}>女性</span>
                      <span className={styles.priceValue}>
                        {taxIncluded(female).toLocaleString()}
                      </span>
                      <span className={styles.priceYen}>円</span>
                    </p>
                  )}
                  {male != null && (
                    <p className={styles.priceLine}>
                      <span className={styles.genderLabel}>男性</span>
                      <span className={styles.priceValue}>
                        {taxIncluded(male).toLocaleString()}
                      </span>
                      <span className={styles.priceYen}>円</span>
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* 7a. footnotes */}
      <p className={styles.footnote}><JaWrap>
        ※ 表示価格はすべて税込です。
        <br />
        ※ 月会費とは別に事務手数料を頂戴する場合がございます。
        <br />※ プラン内容・料金は店舗により変更となる場合がございます。</JaWrap>
      </p>

      {/* 7c. options */}
      {gym.options && gym.options.length > 0 && (
        <div className={styles.optionsBlock}>
          <h3 className={styles.optionsTitle}><JaWrap>その他のオプション</JaWrap></h3>
          <ul className={styles.optionList}>
            {gym.options.map((option) => (
              <li key={option.name}>
                <details className={styles.option}>
                  <summary className={styles.optionSummary}>
                    <span className={styles.optionName}>
                      <JaWrap>{option.name}</JaWrap>
                    </span>
                    <span className={styles.optionPrice}>
                      <span className="nobr">+{option.price.toLocaleString()}円</span>
                    </span>
                  </summary>
                  <div className={styles.optionBody}>
                    <p><JaWrap>{option.note ?? '詳しくはスタッフまでお気軽にお尋ねください。'}</JaWrap></p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 7d. section-end CTA */}
      <div className={styles.ctaWrapper}>
        <Button href={gym.primaryCtaUrl} size="lg" catchText="まずは気軽に無料体験から">
          {gym.primaryCtaLabel}
        </Button>
        <ArrowLink href="#faq">よくあるご質問を見る</ArrowLink>
      </div>
    </>
  );
}
