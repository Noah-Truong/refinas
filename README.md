# Refinas 店舗ページ — デザイン確認用デモ

キックボクシングスタジオ **Refinas** の店舗ページ・リニューアルデモ。
参照サイト（LAVA `yoga-lava.com`）の **16ブロック構成・情報設計をそのまま踏襲**し、
デザイントークンのみ Refinas アイデンティティ（レッド `#D8222B`・ダーク・シャープ・ボールド）に差し替えたもの。

仕様書: `context/RE9710~1.MD`（§0 デモフェーズ）

## 起動

```bash
npm install
npm run dev        # http://localhost:3000
```

- `/` → `/gym/shibuya` へリダイレクト（デモのメイン店舗）
- `/gym` — 店舗一覧（ダミー3店舗）
- `/gym/shibuya` `/gym/refinas_ikebukuro` `/gym/yokohama` — 店舗詳細（単一テンプレート）

## 構成

```
src/
  app/gym/[slug]/page.tsx   単一店舗テンプレート（16ブロック組み立て・JSON-LD・generateMetadata）
  components/gym/           §5の16セクション（SiteHeader〜SiteFooter）
  components/ui/            共通UI（Section/SectionTitle/Button/Slider/StrengthMeter…）
  data/demoGym.ts           ダミーデータ（Gym型・3店舗）
  data/getGym.ts            getGym(slug) — 将来CMSフェッチに同シグネチャで差し替え
  types/gym.ts              Gym型（仕様書§4-1）
  styles/tokens.css         デザイントークン（§8）— コンポーネントは全てここを参照
public/dummy/               プレースホルダー画像（SVG・27点）
```

## デザインの要点

- コンテンツは **最大800pxの1カラム**、セクション背景は 白 / グレー / 赤ティント / ダーク の交互
- LAVA の「大きな丸み片コーナー」→ Refinas では **斜めコーナーカット**（clip-path）に置換
- 見出しは赤スラッシュマーカー＋斜体英字キッカー、強度メーターやチップは -18° スキュー
- フォント: Roboto + Noto Sans JP（next/font セルフホスト）
- CMS（WordPress/ACF）・予約連携・本番SEO・38店舗データ投入は本フェーズ対象外（仕様書§3・§4・§10）
