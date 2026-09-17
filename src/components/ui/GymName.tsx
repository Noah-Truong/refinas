import { Fragment } from 'react';

/**
 * カタカナ・漢字・ひらがな・英数字の文字種ごとのまとまり。
 * 「キックボクシング渋谷」は「キックボクシング」「渋谷」に分かれる。
 * 長音「ー」と「々」は前の文字と同じまとまりに含める。
 */
const SCRIPT_RUN = /[\p{sc=Katakana}ー]+|[\p{sc=Han}々]+|\p{sc=Hiragana}+|[A-Za-z0-9]+|[^\p{sc=Katakana}ー\p{sc=Han}々\p{sc=Hiragana}A-Za-z0-9]+/gu;

/**
 * 店舗名を描画する。改行できるのは空白の位置と、文字種が切り替わる位置
 * （「キックボクシング / 渋谷」）だけで、「渋 / 谷」のような語中の分断は起きない。
 *
 * 空白区切りの単位を丸ごと改行禁止にすると、H1サイズでは「キックボクシング渋谷」が
 * 320px幅に収まらず、画像枠の外に切れてしまうため、文字種の境界で折り返せるようにしている。
 */
export function GymName({ name }: { name: string }) {
  return (
    <>
      {name.split(' ').map((part, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          {(part.match(SCRIPT_RUN) ?? [part]).map((run, j) => (
            <Fragment key={j}>
              {j > 0 && <wbr />}
              <span className="nobr">{run}</span>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </>
  );
}
