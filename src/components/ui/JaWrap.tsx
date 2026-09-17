import { Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { loadDefaultJapaneseParser } from 'budoux';

/** モジュールスコープで1度だけ生成する（リクエストごとの再生成を避ける） */
const parser = loadDefaultJapaneseParser();

/**
 * 文字列は文節境界に <wbr> を挟み、要素はそのまま保って中身だけを再帰的に処理する。
 * これにより <em> などの装飾を含むリード文にもそのまま適用できる。
 */
function wrapNode(node: ReactNode, key: string): ReactNode {
  if (typeof node === 'string') {
    return parser.parse(node).map((phrase, i) => (
      <Fragment key={`${key}-${i}`}>
        {i > 0 && <wbr />}
        {phrase}
      </Fragment>
    ));
  }
  if (Array.isArray(node)) {
    // 強調（<em> など）の直前でも改行できるようにする。
    // これがないと「…のみ<em>要予約</em>です。」全体が1つの塊になり、行末の「。」だけが次の行に送られる。
    return node.map((child, i) => (
      <Fragment key={`${key}-${i}`}>
        {i > 0 && isValidElement(child) && <wbr />}
        {wrapNode(child, `${key}-${i}`)}
      </Fragment>
    ));
  }
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.props.children == null) return node;
    return cloneElement(el, undefined, wrapNode(el.props.children, key));
  }
  return node;
}

/**
 * 日本語テキストを文節の切れ目でのみ折り返す。
 * `.ja-wrap`（globals.css）と併用し、語中での分断（「無料体 / 験レッスン」など）を防ぐ。
 *
 * CSS の `word-break: auto-phrase` は Chromium 限定のため、iOS Safari でも
 * 同じ品質を出すために必要。Server Component として動くのでクライアント JS は
 * 増えず、レイアウトシフトも起きない。
 */
export function JaWrap({ children }: { children: ReactNode }) {
  return <span className="ja-wrap">{wrapNode(children, 'ja')}</span>;
}
