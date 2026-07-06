import type { ReactNode } from 'react';
import type { Gym, Image } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { PhotoSlider } from './PhotoSlider';
import styles from './AccessNap.module.css';

/** 設備・サービス名 → ラインアイコン（24x24 stroke SVG。未定義の設備はチェックマーク） */
const FACILITY_ICON: Record<string, ReactNode> = {
  シャワー: (
    // シャワーヘッドと水滴
    <>
      <path d="M12 3v3M8 6h8l1 4H7l1-4z" />
      <path d="M8 14v1M12 14v2M16 14v1M9.5 18v1M14.5 18v1M12 20v1" />
    </>
  ),
  男女別更衣室: (
    // ハンガー
    <>
      <path d="M12 6a2 2 0 1 1 2-2" />
      <path d="M12 6l-8.5 6.5a1.5 1.5 0 0 0 .9 2.7h15.2a1.5 1.5 0 0 0 .9-2.7L12 6z" />
    </>
  ),
  レンタルグローブ: (
    // ボクシンググローブ
    <>
      <path d="M7 10V7a5 5 0 0 1 10 0v5a5 5 0 0 1-5 5h-1" />
      <path d="M7 10a2.5 2.5 0 0 0 0 5h4" />
      <path d="M11 17v4h4v-3" />
    </>
  ),
  レンタルタオル: (
    // 畳んだタオル
    <>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M4 10h16M4 14h16" />
    </>
  ),
  レンタルウェア: (
    // Tシャツ
    <>
      <path d="M9 4l3 1 3-1 5 3-2 4-2-1v10H7V10l-2 1-2-4 5-3z" />
    </>
  ),
  パワーラック: (
    // バーベル
    <>
      <path d="M2 12h3M19 12h3M8 12h8" />
      <rect x="5" y="7" width="3" height="10" rx="1" />
      <rect x="16" y="7" width="3" height="10" rx="1" />
    </>
  ),
  リング: (
    // リング（コーナーポストとロープ）
    <>
      <path d="M4 5v14M20 5v14" />
      <path d="M4 9h16M4 13h16M4 17h16" />
      <circle cx="4" cy="5" r="1.5" />
      <circle cx="20" cy="5" r="1.5" />
    </>
  ),
  駐車場: (
    // P マーク
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" />
    </>
  ),
  ロッカー: (
    // ロッカーと鍵
    <>
      <rect x="6" y="3" width="10" height="18" rx="2" />
      <path d="M9 7h4M9 10h4" />
      <circle cx="17.5" cy="15.5" r="2.5" />
      <path d="M17.5 18v3" />
    </>
  ),
  パウダールーム: (
    // 鏡
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M12 14v7M8 21h8" />
    </>
  ),
  'Wi-Fi': (
    <>
      <path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" />
      <circle cx="12" cy="19" r="1" />
    </>
  ),
};

// 未定義の設備用フォールバック（チェックマーク）
const DEFAULT_ICON = (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.5 2.5L16 9.5" />
  </>
);

function FacilityIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {FACILITY_ICON[name] ?? DEFAULT_ICON}
    </svg>
  );
}

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
                <span className={styles.facilityIcon} aria-hidden="true">
                  <FacilityIcon name={facility} />
                </span>
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
