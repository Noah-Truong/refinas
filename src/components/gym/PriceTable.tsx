import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { ArrowLink } from '@/components/ui/ArrowLink';
import styles from './PriceTable.module.css';

/** フルアクセス系プランは全店舗、それ以外は登録1店舗のみ利用可能。 */
function studioScope(planName: string): string {
  return planName.includes('フルアクセス') ? '全店舗' : '1店舗';
}

/** Price comparison table (LAVA block 7): scrollable 4-col table + footnotes + option accordions. */
export function PriceTable({ gym }: { gym: Gym }) {
  const colClass = (isRecommended: boolean) =>
    isRecommended ? styles.recommendedCol : undefined;

  return (
    <>
      <SectionTitle
        title={`${gym.name}の料金プラン`}
        id="price"
        lead={
          <>
            目的に合わせて選べる3つのプラン。すべて<em>入会金無料キャンペーン</em>対象です。
          </>
        }
      />

      {/* 7a. comparison table (horizontally scrollable on SP) */}
      <div className={styles.scrollWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td className={styles.cornerCell} aria-hidden="true" />
              {gym.plans.map((plan) => (
                <th key={plan.planName} scope="col" className={colClass(plan.isRecommended)}>
                  <div className={styles.planHeader}>
                    {plan.isRecommended && (
                      <span className={styles.recommendBadge}>オススメ!</span>
                    )}
                    <h3 className={styles.planName}>{plan.planName}</h3>
                    {plan.target && <p className={styles.planTarget}>{plan.target}</p>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className={styles.rowLabel}>
                月会費
              </th>
              {gym.plans.map((plan) => {
                const female = plan.priceFemale ?? plan.price;
                const male = plan.priceMale ?? plan.price;
                return (
                  <td key={plan.planName} className={colClass(plan.isRecommended)}>
                    <div className={styles.priceCell}>
                      {female != null && (
                        <p className={styles.priceLine}>
                          <span className={styles.genderLabel}>女性</span>
                          <span className={styles.priceValue}>
                            ¥{female.toLocaleString()}
                          </span>
                        </p>
                      )}
                      {male != null && (
                        <p className={styles.priceLine}>
                          <span className={styles.genderLabel}>男性</span>
                          <span className={styles.priceValue}>¥{male.toLocaleString()}</span>
                        </p>
                      )}
                      <p className={styles.priceUnit}>{plan.unit}</p>
                      <Button
                        href={plan.ctaUrl ?? gym.primaryCtaUrl}
                        className={styles.tableCta}
                      >
                        体験予約へ
                      </Button>
                    </div>
                  </td>
                );
              })}
            </tr>
            <tr>
              <th scope="row" className={styles.rowLabel}>
                通えるスタジオ
              </th>
              {gym.plans.map((plan) => (
                <td key={plan.planName} className={colClass(plan.isRecommended)}>
                  <p className={styles.cellText}>{studioScope(plan.planName)}</p>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className={styles.rowLabel}>
                月間利用回数
              </th>
              {gym.plans.map((plan) => (
                <td key={plan.planName} className={colClass(plan.isRecommended)}>
                  <p className={styles.cellText}>{plan.sessions ?? '—'}</p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* 7a. footnotes */}
      <p className={styles.footnote}>
        ※ 表示価格はすべて税抜です。
        <br />
        ※ 月会費とは別に事務手数料を頂戴する場合がございます。
        <br />※ プラン内容・料金は店舗により変更となる場合がございます。
      </p>

      {/* 7c. options */}
      {gym.options && gym.options.length > 0 && (
        <div className={styles.optionsBlock}>
          <h3 className={styles.optionsTitle}>その他のオプション</h3>
          <ul className={styles.optionList}>
            {gym.options.map((option) => (
              <li key={option.name}>
                <details className={styles.option}>
                  <summary className={styles.optionSummary}>
                    <span className={styles.optionName}>{option.name}</span>
                    <span className={styles.optionPrice}>
                      +{option.price.toLocaleString()}円
                    </span>
                  </summary>
                  <div className={styles.optionBody}>
                    <p>{option.note ?? '詳しくはスタッフまでお気軽にお尋ねください。'}</p>
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
