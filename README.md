# Refinas 店舗ページ — デザイン確認用デモ

キックボクシングスタジオ **Refinas** の店舗ページ・リニューアルデモ。
参照サイト（LAVA `yoga-lava.com`）の **16ブロック構成・情報設計をそのまま踏襲**し、
デザイントークンのみ Refinas アイデンティティ（レッド `#D8222B`・ダーク・シャープ・ボールド）に差し替えたもの。

仕様書: `context/01-spec/build-spec.md`（§0 デモフェーズ）

## 起動

```bash
npm install
npm run dev        # http://localhost:3000
```

- `/` → `/gym` へリダイレクト（店舗一覧）
- `/gym` — 店舗一覧（ダミー3店舗）
- `/gym/shibuya` `/gym/refinas_ikebukuro` `/gym/yokohama` — 店舗詳細（単一テンプレート）

## 構成

```
src/
  app/gym/[slug]/page.tsx   単一店舗テンプレート（16ブロック組み立て・JSON-LD・generateMetadata）
  app/api/revalidate/       再生成の受け口（LINE の更新サービスから呼ばれる）
  app/api/preview/          プレビューの入口と解除（/api/preview/exit）
  components/gym/           §5の16セクション（SiteHeader〜SiteFooter）
  components/ui/            共通UI（Section/SectionTitle/Button/Slider/StrengthMeter…）
  data/demoGym.ts           ダミーデータ（Gym型・3店舗）
  data/getGym.ts            getGym(slug) / getAllGyms() — PAGE_API_BASE があればページ API、無ければダミーデータ
  lib/pageApi.ts            ページ API の設定・署名・プレビューの token の確かめ（サーバー専用）
  lib/trial.ts              体験レッスンの表示（「無料」と言ってよいか）
  types/gym.ts              Gym型（仕様書§4-1）
  styles/tokens.css         デザイントークン（§8）— コンポーネントは全てここを参照
scripts/mock-page-api.ts    ページ API の代わり（ローカル確認用）
public/dummy/               プレースホルダー画像（SVG・27点）
```

## LINE の更新サービス（ページ API）から読む

店舗ページの中身は、LINE の更新サービス（nortiq-line-post）のページ API から読める
（約束はサービス側の `docs/design-v1.2.md` 6章）。`PAGE_API_BASE` が無ければ、今までどおりダミーデータを出す。

| 環境変数 | 中身 |
| --- | --- |
| `PAGE_API_BASE` | ページ API の場所。最後は会社の slug（例 `https://post.nortiqlab.com/api/v1/orgs/refinas`）。キャッシュのタグにもこの slug を使う |
| `PAGE_API_KEY` | 読み取りの鍵（`Authorization: Bearer …` で送る）。`PAGE_API_BASE` があるのに無ければビルドを止める |
| `PAGE_REVALIDATE_SECRET` | 再生成の署名とプレビューの token の秘密（HMAC-SHA256）。無ければ `/api/revalidate` は 503、プレビューは使えない |
| `PAGE_MEDIA_HOSTS` | API の写真を置くホスト名（カンマ区切り）。`images.remotePatterns`（https）に入る |
| `SITE_URL` | サイトの URL（JSON-LD の絶対 URL）。無ければデモの仮の URL |
| `SITE_NOINDEX` | `1` なら全ページに `noindex, nofollow`（デモ・検証用のコピーを、本物のサイトと並んで検索に出さないため） |

鍵と秘密は Vercel の環境変数に置き、リポジトリには入れない（ローカルは `.env.local`。`.env*.local` は .gitignore 済み）。

- 読み方：`GET {PAGE_API_BASE}/stores`（一覧）と `GET {PAGE_API_BASE}/stores/{slug}`（店舗、無ければ 404）。
  Next のキャッシュに、店舗は `org:{org}` と `store:{slug}`、一覧は `org:{org}` と `list:{org}` のタグを付けて持つ。
  店舗の 404 以外の失敗はエラーにする（API が落ちているときはビルドが失敗し、空のページは出さない）。
  ビルドのたびに API を読み直す（前のビルドのキャッシュは使わない）。
- 版の印：API の `pageVersion` を `<meta name="page-version">` に出す（サービスが反映を確かめる）。
- ビルドの後に公開された店舗は、最初のアクセスで描画してキャッシュする（再デプロイは要らない。`dynamicParams = true`）。
- 部品に書き込んでいた値（プランの数・店舗数・体験の料金と時間・道順・お客様の声の注記）はデータから出す。
  中身の無いブロックは `<Section>` ごと出さない。

| 経路 | 中身 |
| --- | --- |
| `POST /api/revalidate` | 本文 `{"tags":["store:shibuya"],"ts":<秒>}`、ヘッダー `x-page-signature: sha256=<本文の HMAC の16進>`。署名・前後5分・タグの形を確かめて `revalidateTag`。`200 {"revalidated":[…]}`、署名や時刻が合わなければ 401、本文の形が違えば 400 |
| `GET /api/preview?token=…` | token（`base64url(JSON).base64url(HMAC)`、JSON は `{o,s,cr か v,exp}`）を確かめ、Draft Mode と cookie `page_preview`（10分）を付けて `/gym/{s}` へ。合わなければ 401 |
| `GET /api/preview/exit` | プレビューをやめて `/gym` へ |

### ローカルで API 経由のビルドを試す

```bash
PAGE_API_KEY=testkey npx tsx scripts/mock-page-api.ts      # http://127.0.0.1:4010（PORT で変更可）
# 別のターミナルで
PAGE_API_BASE=http://127.0.0.1:4010/api/v1/orgs/refinas PAGE_API_KEY=testkey PAGE_REVALIDATE_SECRET=testsecret npm run build
PAGE_API_BASE=http://127.0.0.1:4010/api/v1/orgs/refinas PAGE_API_KEY=testkey PAGE_REVALIDATE_SECRET=testsecret npm start
```

モックはダミーデータに `pageVersion: "s1.o1"` を付けて返す（鍵が違えば 401）。`?preview=` 付きの読み取りには
`pageVersion: "s2.o1"` とキャッチコピーの頭の【プレビュー】を付けて返す（`PAGE_REVALIDATE_SECRET` を渡すと token も確かめる）。

## デザインの要点

- コンテンツは **最大800pxの1カラム**、セクション背景は 白 / グレー / 赤ティント / ダーク の交互
- LAVA の「大きな丸み片コーナー」→ Refinas では **斜めコーナーカット**（clip-path）に置換
- 見出しは赤スラッシュマーカー＋斜体英字キッカー、強度メーターやチップは -18° スキュー
- フォント: Roboto + Noto Sans JP（next/font セルフホスト）
- CMS（WordPress/ACF）・予約連携・本番SEO・38店舗データ投入は本フェーズ対象外（仕様書§3・§4・§10）
