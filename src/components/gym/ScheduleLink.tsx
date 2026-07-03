import type { Gym } from '@/types/gym';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './ScheduleLink.module.css';

/** Schedule: opening-hours panel + PDF / external reservation link. */
export function ScheduleLink({ gym }: { gym: Gym }) {
  return (
    <>
      <SectionTitle
        id="schedule"
        kicker="SCHEDULE"
        title={`${gym.name}の営業スケジュール`}
        lead={
          <>
            Refinasはセミパーソナル式。<em>ご予約不要</em>
            で、営業時間内ならいつでもお好きなタイミングでトレーニングできます。パーソナルトレーニングのみ
            <em>要予約</em>です。
          </>
        }
      />
      <div className={styles.hoursPanel}>
        <table className={styles.hoursTable}>
          <tbody>
            {gym.hours.map((row) => (
              <tr key={row.label}>
                <th scope="row" className={styles.hoursLabel}>
                  {row.label}
                </th>
                <td className={styles.hoursTime}>{row.time}</td>
              </tr>
            ))}
            {gym.holiday && (
              <tr>
                <th scope="row" className={styles.hoursLabel}>
                  定休日
                </th>
                <td className={styles.hoursTime}>{gym.holiday}</td>
              </tr>
            )}
          </tbody>
        </table>
        <p className={styles.snsNote}>
          混雑状況は店舗のSNSで随時発信しています。ご来店前のチェックがおすすめです。
        </p>
      </div>
      {gym.scheduleType === 'pdf' && gym.schedulePdf && (
        <div className={styles.buttonWrapper}>
          <Button href={gym.schedulePdf.url} variant="secondary">
            {gym.schedulePdf.label ?? 'スケジュール（PDF）を見る'}
          </Button>
        </div>
      )}
      {gym.scheduleType === 'external' && (
        <div className={styles.buttonWrapper}>
          <Button href={gym.reserveUrl ?? gym.primaryCtaUrl} size="lg">
            スケジュールを確認・予約する
          </Button>
        </div>
      )}
    </>
  );
}
