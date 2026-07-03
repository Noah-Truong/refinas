import type { Gym, Image } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { PhotoSlider } from './PhotoSlider';
import styles from './AccessNap.module.css';

/** Access / NAP section (LAVA block 5): labeled rows (underlined h3 + content) + map + photo slider. */
export function AccessNap({ gym, photos }: { gym: Gym; photos: Image[] }) {
  const nearest = gym.access[0];
  return (
    <>
      <SectionTitle title={`${gym.name}のアクセス情報`} id="access" />
      <div className={styles.rows}>
        {/* 1. 住所 */}
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>住所</h3>
          <p className={styles.text}>
            〒{gym.postalCode}
            <br />
            {gym.address}
          </p>
        </div>

        {/* 2. アクセス */}
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>アクセス</h3>
          <ul className={styles.routeList}>
            {gym.access.map((route, i) => (
              <li key={i} className={styles.routeItem}>
                {route.line}「{route.station}」{route.exit ? `${route.exit} ` : ''}徒歩
                {route.walkMin}分
              </li>
            ))}
          </ul>
          {gym.parking && <p className={styles.parking}>■駐車場・駐輪場：{gym.parking}</p>}
          <iframe
            src={`https://maps.google.com/maps?q=${gym.geo.lat},${gym.geo.lng}&z=16&output=embed`}
            title="地図"
            loading="lazy"
            className={styles.map}
          />
          <details className={styles.directions}>
            <summary className={styles.directionsSummary}>{gym.name}への詳しい経路</summary>
            <div className={styles.directionsBody}>
              <p className={styles.text}>
                {nearest
                  ? `${nearest.station}${nearest.exit ? `の${nearest.exit}` : 'の改札'}を出て、大通り沿いにまっすぐお進みください。最初の交差点を渡ってすぐのビルにスタジオがございます。入口の「Refinas」の赤いサインが目印です。`
                  : 'お近くの駅からのご来店方法は、お気軽にお電話にてお問い合わせください。'}
                {gym.accessNote ? ` ${gym.accessNote}` : ''}
              </p>
            </div>
          </details>
        </div>

        {/* 3. 営業時間 */}
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>営業時間</h3>
          <ul className={styles.hoursList}>
            {gym.hours.map((h) => (
              <li key={h.label} className={styles.hoursItem}>
                <span className={styles.hoursLabel}>{h.label}</span>
                <span className={styles.hoursTime}>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. 定休日 */}
        {gym.holiday && (
          <div className={styles.row}>
            <h3 className={styles.rowTitle}>定休日</h3>
            <p className={styles.text}>{gym.holiday}</p>
          </div>
        )}

        {/* 5. 設備・サービス */}
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>設備・サービス</h3>
          <ul className={styles.facilityList}>
            {gym.facilities.map((facility) => (
              <li key={facility} className={styles.facilityChip}>
                <span className={styles.facilityBullet} aria-hidden="true" />
                {facility}
              </li>
            ))}
          </ul>
        </div>

        {/* 6. スタジオ種別 */}
        {gym.studioType && (
          <div className={styles.row}>
            <h3 className={styles.rowTitle}>スタジオ種別</h3>
            <p className={styles.text}>{gym.studioType}</p>
          </div>
        )}

        {/* 7. 店舗の雰囲気 */}
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>店舗の雰囲気</h3>
          <PhotoSlider photos={photos} />
        </div>

        {/* 8. 支払方法 */}
        {gym.paymentMethods && gym.paymentMethods.length > 0 && (
          <div className={styles.row}>
            <h3 className={styles.rowTitle}>支払方法</h3>
            <p className={styles.text}>{gym.paymentMethods.join(' / ')}</p>
          </div>
        )}
      </div>

      <div className={styles.ctaWrapper}>
        <Button href={gym.primaryCtaUrl} size="lg" catchText="まずは気軽に無料体験から">
          {gym.primaryCtaLabel}
        </Button>
      </div>
    </>
  );
}
