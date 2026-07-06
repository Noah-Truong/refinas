import type { Gym, Image } from '@/types/gym';

// ---------------------------------------------------------------------------
// Refinas demo data (dummy). Content mirrors the real refinas.jp brand:
// real plan names/prices (税抜), campaign wording, CTA wording, tone.
// ---------------------------------------------------------------------------

/** 6 studio photos shared by all demo stores (used by PhotoSlider). */
export const studioPhotos: Image[] = [
  { url: '/studio/studio-01.png', width: 2816, height: 1536, alt: 'トレーニングフロア全景' },
  { url: '/studio/studio-02.png', width: 2816, height: 1536, alt: 'サンドバッグエリア' },
  { url: '/studio/studio-03.png', width: 2816, height: 1536, alt: 'ミット打ちスペース' },
  { url: '/studio/studio-04.png', width: 2816, height: 1536, alt: '筋力トレーニングマシン' },
  { url: '/studio/studio-05.png', width: 2816, height: 1536, alt: '鍵付きロッカールーム' },
  { url: '/studio/studio-06.png', width: 2816, height: 1536, alt: 'パウダールーム・シャワー' },
];

const hours: Gym['hours'] = [
  { label: '平日', time: '11:00〜22:00' },
  { label: '土曜', time: '10:00〜20:00' },
  { label: '日祝', time: '10:00〜18:00' },
];

// プラン名・条件・おすすめ指定はチェックリスト⑦の記入値。金額は未記入のためダミーのまま。
const plans: Gym['plans'] = [
  {
    planName: 'シルバー',
    priceFemale: 9800,
    priceMale: 11800,
    unit: '円/月（税抜）',
    target: 'まずは週1ペースで通いたい方に',
    sessions: '月4回',
    isRecommended: false,
    ctaUrl: '#reserve',
  },
  {
    planName: 'プラチナ',
    priceFemale: 14800,
    priceMale: 16800,
    unit: '円/月（税抜）',
    target: 'しっかり結果を出したい方に一番人気',
    sessions: '通い放題',
    isRecommended: true,
    ctaUrl: '#reserve',
  },
  {
    planName: 'フルアクセス',
    priceFemale: 16800,
    priceMale: 18800,
    unit: '円/月（税抜）',
    target: '職場や外出先でも通いたい方に',
    sessions: '全店舗通い放題',
    isRecommended: false,
    ctaUrl: '#reserve',
  },
];

const options: Gym['options'] = [
  { name: 'パーソナルトレーニング', price: 5000, note: '+5,000円/回（約50分・要予約）' },
  { name: '水素水飲み放題', price: 1000, note: '+1,000円/月' },
  { name: 'フルレンタル', price: 3000, note: '+3,000円/月（パンツ・シャツ・タオル）' },
];

// チェックリスト④：実施中／タイトル「無料体験実施中」／専用キャンペーンページなし（予約導線へ）
// 体験価格はチェックリスト③：通常5,000円→キャンペーン0円
const campaign: Gym['campaign'] = {
  active: true,
  title: '無料体験実施中｜体験レッスン通常5,000円→0円',
  banner: {
    url: '/dummy/campaign-banner.svg',
    width: 1200,
    height: 400,
    alt: '無料体験実施中｜体験レッスン通常5,000円→0円',
  },
  url: '#reserve',
};

const programs: Gym['programs'] = [
  {
    name: '体験キックボクシング',
    description:
      'はじめての方向けの無料体験プログラム。グローブの付け方から基本のパンチ・キックまで、トレーナーがマンツーマンに近い距離で丁寧にレクチャーします。運動経験ゼロでも45分で「打てる楽しさ」を実感できます。',
    intensity: 2,
    durationMin: 45,
    image: { url: '/dummy/program-01.svg', width: 800, height: 600, alt: '体験キックボクシング' },
    trialOk: true,
  },
  {
    name: 'シャドー＆フォーム基礎',
    description:
      '鏡の前でフォームを固める基礎プログラム。構え・ステップ・パンチの軌道をひとつずつ確認しながら、きれいなフォームを身につけます。ケガをしにくい体の使い方が学べるので、入会後最初の1ヶ月に特におすすめです。',
    intensity: 2,
    durationMin: 45,
    image: { url: '/dummy/program-02.svg', width: 800, height: 600, alt: 'シャドー＆フォーム基礎' },
    trialOk: true,
  },
  {
    name: 'サンドバッグ・バーンアウト',
    description:
      'サンドバッグを打ち込み続ける高強度プログラム。1ラウンド3分のインターバル形式で、全身を使って一気にカロリーを燃焼します。終わったあとの爽快感とストレス発散効果は当スタジオ随一です。',
    intensity: 4,
    durationMin: 45,
    image: { url: '/dummy/program-03.svg', width: 800, height: 600, alt: 'サンドバッグ・バーンアウト' },
    trialOk: true,
  },
  {
    name: 'ミット打ちセッション',
    description:
      'トレーナーが構えるミットに向かってコンビネーションを打ち込むセッション。動くターゲットを追うことで、実戦さながらの反応速度と体幹が鍛えられます。パンチが「決まる」音がクセになると好評です。',
    intensity: 4,
    durationMin: 50,
    image: { url: '/dummy/program-04.svg', width: 800, height: 600, alt: 'ミット打ちセッション' },
    trialOk: true,
  },
  {
    name: '筋力トレーニングサーキット',
    description:
      '自重とダンベルを組み合わせたサーキット形式の筋力トレーニング。キックボクシングに必要な下半身・体幹・肩まわりを重点的に強化します。ボディメイク目的の方はキック系プログラムとの組み合わせが効果的です。',
    intensity: 3,
    durationMin: 45,
    image: { url: '/dummy/program-05.svg', width: 800, height: 600, alt: '筋力トレーニングサーキット' },
    trialOk: true,
  },
  {
    name: '女性向けボディメイクキック',
    description:
      'くびれ・ヒップアップにフォーカスした女性向けプログラム。キックの動作を中心に、ウエストまわりと下半身を効率よく引き締めます。強度は調整できるので、体力に自信がない方も安心してご参加いただけます。',
    intensity: 3,
    durationMin: 45,
    image: { url: '/dummy/program-06.svg', width: 800, height: 600, alt: '女性向けボディメイクキック' },
    trialOk: true,
  },
  {
    name: 'ストレッチ＆クールダウン',
    description:
      'トレーニング後の疲労回復と柔軟性向上のためのプログラム。呼吸に合わせて全身をゆっくり伸ばし、翌日に疲れを残しません。デスクワークで固まった肩・股関節のケアとしてこのプログラムだけ受ける方もいます。',
    intensity: 1,
    durationMin: 45,
    image: { url: '/dummy/program-07.svg', width: 800, height: 600, alt: 'ストレッチ＆クールダウン' },
    trialOk: true,
  },
  {
    name: 'パーソナルトレーニング',
    description:
      '完全マンツーマンの約50分プログラム（要予約・+5,000円/回）。目標や体力レベルに合わせてトレーナーが専用メニューを組み立てます。最短で結果を出したい方、大会や撮影など期日が決まっている方に最適です。',
    intensity: 5,
    durationMin: 50,
    image: { url: '/dummy/program-08.svg', width: 800, height: 600, alt: 'パーソナルトレーニング' },
    trialOk: false,
  },
];

const faqs: Gym['faqs'] = [
  {
    q: '体験レッスンの持ち物は何が必要ですか？',
    a: '動きやすい服装・室内用シューズ・タオル・お飲み物をご持参ください。グローブは無料でお貸ししますので手ぶらに近い状態でOKです。ウェア一式のレンタル（有料）もご用意しています。',
  },
  {
    q: '運動経験がまったくなくても大丈夫ですか？',
    a: 'はい、会員様の約7割は格闘技未経験からのスタートです。トレーナーが構え方から丁寧にお教えしますので、ご自身のペースで無理なく始められます。',
  },
  {
    q: '女性ひとりでも通いやすいですか？',
    a: 'もちろんです。女性会員様の割合が高く、パウダールームや男女別シャワーなど女性が通いやすい設備を整えています。スタッフが常にフロアにいるので、わからないことはいつでもご相談いただけます。',
  },
  {
    q: '体験当日はどんな流れですか？',
    a: 'ご来店→カウンセリング（約10分）→ウォームアップ→シャドー・サンドバッグ・ミット打ちの体験（約45分）→シャワー・お着替え→料金プランのご案内、という流れです。全体で約90分を見ていただければ大丈夫です。',
  },
  {
    q: '予約の変更やキャンセルはできますか？',
    a: '体験レッスン・パーソナルトレーニングのご予約は、前日までウェブまたはお電話で無料で変更・キャンセルいただけます。通常のトレーニングは予約不要で、営業時間内のお好きな時間にお越しいただけます。',
  },
  {
    q: '支払い方法は何が使えますか？',
    a: '月会費は口座振替でのお支払いとなります。入会金などの初期費用は現金またはクレジットカードがご利用いただけます。',
  },
  {
    q: '更衣室やシャワーはありますか？',
    a: 'はい、男女別の更衣室・シャワールームを完備しています。鍵付きロッカーとパウダールームもございますので、お仕事帰りやお出かけ前でも安心してご利用いただけます。',
  },
];

// チェックリスト⑯の記入値
const facilities: string[] = [
  'シャワー',
  '男女別更衣室',
  'レンタルグローブ',
  'レンタルタオル',
  'レンタルウェア',
  'パワーラック',
  'リング',
];

const paymentMethods: string[] = [
  '月会費：口座振替',
  '初期費用：現金・クレジットカード',
];

const sns = { instagram: 'https://www.instagram.com/refinas_kickboxing_studio' };

const trainerPhotos: Image[] = [
  { url: '/trainer/trainer-01.png', width: 343, height: 382, alt: 'トレーナー写真' },
  { url: '/trainer/trainer-02.png', width: 347, height: 383, alt: 'トレーナー写真' },
  { url: '/trainer/trainer-03.png', width: 267, height: 385, alt: 'トレーナー写真' },
];

const shared = {
  brandLabel: 'キックボクシングジム',
  status: 'published' as const,
  hours,
  holiday: '毎週月曜',
  plans,
  options,
  campaign,
  programs,
  scheduleType: 'external' as const,
  reserveUrl: '#reserve',
  faqs,
  facilities,
  studioType: '男女可',
  paymentMethods,
  primaryCtaLabel: '無料体験を予約する',
  primaryCtaUrl: '#reserve',
  contactUrl: '#reserve',
  sns,
};

export const demoGyms: Gym[] = [
  // -------------------------------------------------------------------------
  // 渋谷（primary demo store）
  // -------------------------------------------------------------------------
  {
    ...shared,
    slug: 'shibuya',
    name: 'キックボクシング渋谷 Refinas',
    nameKana: 'キックボクシングシブヤ リフィナス',
    area: '東京',
    catchCopy: '渋谷駅徒歩5分。初心者からはじめる、洗練されたキックボクシングジム。',
    heroImage: { url: '/hero-kickboxing.png', width: 2816, height: 1536, alt: 'キックボクシング渋谷 Refinas スタジオ内観' },
    targetNote: '初心者歓迎・男女可',
    // NAP はチェックリスト⑤の記入値（最寄②③・駐車駐輪は未記入）
    postalCode: '150-0002',
    address: '東京都渋谷区渋谷3丁目1-8 オーベル渋谷 1階',
    tel: '0120-181-199',
    access: [{ line: 'JR山手線', station: '渋谷駅', walkMin: 5 }],
    accessNote: '渋谷駅東口方面、明治通りから1本入った「オーベル渋谷」の1階です。',
    parking: '専用駐車場なし（近隣にコインパーキングあり）',
    geo: { lat: 35.656, lng: 139.7045 },
    trainers: [
      {
        name: '佐藤 拓海',
        nameKana: 'さとう たくみ',
        role: '店長',
        profile:
          'キックボクシング歴12年、プロリング経験を経てトレーナーに転身。指導歴8年で担当した会員様は延べ2,000名以上。「怖くない格闘技」をモットーに、初心者の最初の一歩に寄り添う指導が持ち味です。',
        photo: trainerPhotos[0],
      },
      {
        name: '中村 亮介',
        nameKana: 'なかむら りょうすけ',
        role: 'エリアマネージャー',
        profile:
          'キックボクシング歴10年、都内3店舗を統括するエリアマネージャー。フィットネス業界でのトレーナー経験は通算9年になります。ボディメイクと減量指導を得意とし、数字で結果を出すプログラム設計に定評があります。',
        photo: trainerPhotos[1],
      },
      {
        name: '高橋 美咲',
        nameKana: 'たかはし みさき',
        role: 'トレーナー',
        profile:
          '元ダンスインストラクターからキックボクシングの世界へ。トレーナー歴4年、女性目線のボディメイク指導が人気です。「音楽に乗るように打つ」楽しいセッションで、運動が苦手な方にも支持されています。',
        photo: trainerPhotos[2],
      },
    ],
    voices: [
      {
        label: '20代 女性',
        comment:
          '仕事帰りに週2回通って3ヶ月でウエスト−6cm！ ミット打ちが楽しすぎて、気づいたらストレスも一緒に消えています。',
        tags: ['ダイエット', 'ストレス発散', '初心者'],
      },
      {
        label: '30代 男性',
        comment:
          '運動不足解消のつもりが今では完全に趣味になりました。予約なしで好きな時間に行けるので、忙しくても続けられています。',
        tags: ['運動不足解消', '通い放題', '仕事帰り'],
      },
    ],
    news: [
      { date: '2026/06/25', title: '7月の営業時間・休館日のお知らせ', url: '#', important: true },
      { date: '2026/06/15', title: '無料体験キャンペーン（体験レッスン0円）延長のお知らせ', url: '#', important: true },
      { date: '2026/06/01', title: '新プログラム「女性向けボディメイクキック」スタート', url: '#' },
      { date: '2026/05/20', title: 'トレーナー高橋のパーソナル枠を増枠しました', url: '#' },
      { date: '2026/05/02', title: 'ゴールデンウィーク期間の営業について', url: '#' },
    ],
    nearbyGyms: [
      { slug: 'refinas_ikebukuro', name: 'キックボクシング池袋 Refinas', accessNote: '渋谷駅から電車で16分' },
      { slug: 'yokohama', name: 'キックボクシング横浜 Refinas', accessNote: '渋谷駅から電車で25分' },
    ],
    telCta: '0120-181-199',
    seo: {
      title: 'キックボクシング渋谷 Refinas｜渋谷駅徒歩5分・初心者歓迎のキックボクシングジム',
      description:
        '渋谷駅徒歩5分のキックボクシングジムRefinas（リフィナス）。初心者・女性歓迎、月4回9,800円〜。今なら体験レッスン通常5,000円→0円。',
      ogImage: { url: '/dummy/hero-shibuya.svg', width: 1600, height: 640, alt: 'キックボクシング渋谷 Refinas' },
    },
  },

  // -------------------------------------------------------------------------
  // 池袋（real address/hours from refinas.jp）
  // -------------------------------------------------------------------------
  {
    ...shared,
    slug: 'refinas_ikebukuro',
    name: 'キックボクシング池袋 Refinas',
    nameKana: 'キックボクシングイケブクロ リフィナス',
    area: '東京',
    catchCopy: '池袋駅徒歩1分。仕事帰りにそのまま通える、初心者歓迎のキックボクシングジム。',
    heroImage: { url: '/hero-kickboxing.png', width: 2816, height: 1536, alt: 'キックボクシング池袋 Refinas スタジオ内観' },
    targetNote: '初心者歓迎・男女可',
    postalCode: '171-0021',
    address: '東京都豊島区西池袋3丁目29-14 一平ビル3階',
    tel: '03-5985-4620',
    access: [
      { line: 'JR山手線', station: '池袋駅', exit: '西口', walkMin: 1 },
      { line: '東京メトロ丸ノ内線', station: '池袋駅', exit: 'C6出口', walkMin: 2 },
      { line: '東武東上線', station: '池袋駅', exit: '南口', walkMin: 3 },
    ],
    accessNote: '池袋駅西口を出てすぐ、1階が飲食店のビル3階です。',
    parking: '専用駐車場なし（近隣にコインパーキングあり）',
    geo: { lat: 35.729503, lng: 139.708112 },
    trainers: [
      {
        name: '山本 健吾',
        nameKana: 'やまもと けんご',
        role: '店長',
        profile:
          'キックボクシング歴7年。アマチュア大会での優勝経験を持ち、指導歴は5年になります。基礎フォームの丁寧な指導に定評があり、「最初の3ヶ月で見違える」と会員様から評判です。',
        photo: trainerPhotos[0],
      },
      {
        name: '小林 芽衣',
        nameKana: 'こばやし めい',
        role: 'トレーナー',
        profile:
          'トレーナー歴4年。自身もダイエット目的でキックボクシングを始めた経験があり、初心者のつまずきポイントを熟知しています。女性会員様のボディメイク相談を数多く担当しています。',
        photo: trainerPhotos[1],
      },
      {
        name: '石井 大輝',
        nameKana: 'いしい だいき',
        role: 'トレーナー',
        profile:
          '総合格闘技出身、競技歴9年・指導歴3年のパワー系トレーナー。ミット打ちの受けの上手さは池袋店No.1。しっかり追い込みたい方、体力に自信がついてきた方に人気です。',
        photo: trainerPhotos[2],
      },
    ],
    voices: [
      {
        label: '40代 女性',
        comment:
          '運動は学生時代以来でしたが、トレーナーさんが根気強く教えてくれるので安心でした。半年で体が軽くなり、健康診断の数値も改善しました。',
        tags: ['健康維持', '初心者', '40代からの運動'],
      },
      {
        label: '20代 男性',
        comment:
          '駅徒歩1分なので雨の日でもサボる言い訳ができません（笑）。サンドバッグを打ち込んだあとの爽快感で、残業のストレスもリセットできます。',
        tags: ['ストレス発散', '駅チカ', '仕事帰り'],
      },
    ],
    news: [
      { date: '2026/06/28', title: '7月の営業時間・休館日のお知らせ', url: '#', important: true },
      { date: '2026/06/10', title: '無料体験キャンペーン（体験レッスン0円）実施中', url: '#', important: true },
      { date: '2026/06/03', title: 'ロッカールームの改装が完了しました', url: '#' },
      { date: '2026/05/18', title: 'トレーナー石井が入社しました', url: '#' },
      { date: '2026/05/01', title: '水素水サーバーを新型に入れ替えました', url: '#' },
    ],
    nearbyGyms: [
      { slug: 'shibuya', name: 'キックボクシング渋谷 Refinas', accessNote: '池袋駅から電車で16分' },
      { slug: 'yokohama', name: 'キックボクシング横浜 Refinas', accessNote: '池袋駅から電車で40分' },
    ],
    telCta: '03-5985-4620',
  },

  // -------------------------------------------------------------------------
  // 横浜
  // -------------------------------------------------------------------------
  {
    ...shared,
    slug: 'yokohama',
    name: 'キックボクシング横浜 Refinas',
    nameKana: 'キックボクシングヨコハマ リフィナス',
    area: '神奈川',
    catchCopy: '横浜駅西口徒歩5分。はじめてでも、女性ひとりでも通いやすいキックボクシングジム。',
    heroImage: { url: '/hero-kickboxing.png', width: 2816, height: 1536, alt: 'キックボクシング横浜 Refinas スタジオ内観' },
    targetNote: '初心者歓迎・男女可',
    postalCode: '220-0004',
    address: '神奈川県横浜市西区北幸2-8-19 横浜西口Kビル5階',
    tel: '045-577-3908',
    access: [
      { line: 'JR各線', station: '横浜駅', exit: '西口', walkMin: 5 },
      { line: '相鉄本線', station: '横浜駅', exit: '相鉄口', walkMin: 4 },
      { line: '横浜市営地下鉄ブルーライン', station: '横浜駅', exit: '9番出口', walkMin: 6 },
    ],
    accessNote: '北幸の大通りから1本入った、落ち着いた立地です。',
    parking: '専用駐車場なし（近隣にコインパーキングあり）',
    geo: { lat: 35.464651, lng: 139.617419 },
    trainers: [
      {
        name: '藤田 剛',
        nameKana: 'ふじた つよし',
        role: '店長',
        profile:
          'キックボクシング歴15年、元プロ選手。引退後は指導一筋で、トレーナー歴は10年を数えます。厳しそうな見た目に反して指導は誰よりも丁寧、と会員様からいじられるのが日課です。',
        photo: trainerPhotos[0],
      },
      {
        name: '渡辺 早紀',
        nameKana: 'わたなべ さき',
        role: 'トレーナー',
        profile:
          'フィットネスインストラクター歴6年、キックボクシング指導歴3年。ストレッチとコンディショニングの知識が豊富で、体が硬い方・久しぶりに運動する方のケアを得意としています。',
        photo: trainerPhotos[1],
      },
      {
        name: '森本 蓮',
        nameKana: 'もりもと れん',
        role: 'トレーナー',
        profile:
          '大学時代にキックボクシングを始めて競技歴6年、指導歴2年の若手トレーナー。同世代の会員様と一緒に汗を流すスタイルで、はじめての方の緊張をほぐすムードメーカーです。',
        photo: trainerPhotos[2],
      },
    ],
    voices: [
      {
        label: '30代 女性',
        comment:
          '産後のボディメイク目的で入会しました。キックのレッスンでウエストまわりが引き締まり、何より自分の時間ができたことが嬉しいです。',
        tags: ['ボディメイク', '産後ダイエット', '初心者'],
      },
      {
        label: '50代 男性',
        comment:
          '健康のために始めて1年、体重は8kg落ちました。若い頃の部活のような一体感があって、通うのが毎週の楽しみになっています。',
        tags: ['ダイエット', '健康維持', '通い放題'],
      },
    ],
    news: [
      { date: '2026/06/27', title: '7月の営業時間・休館日のお知らせ', url: '#', important: true },
      { date: '2026/06/12', title: '無料体験キャンペーン（体験レッスン0円）実施中', url: '#', important: true },
      { date: '2026/06/05', title: 'サンドバッグを2台増設しました', url: '#' },
      { date: '2026/05/22', title: '「ストレッチ＆クールダウン」の開催枠を拡大', url: '#' },
      { date: '2026/05/06', title: 'ゴールデンウィーク中のご利用ありがとうございました', url: '#' },
    ],
    nearbyGyms: [
      { slug: 'shibuya', name: 'キックボクシング渋谷 Refinas', accessNote: '横浜駅から電車で25分' },
      { slug: 'refinas_ikebukuro', name: 'キックボクシング池袋 Refinas', accessNote: '横浜駅から電車で40分' },
    ],
    telCta: '045-577-3908',
  },
];
