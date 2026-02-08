<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const WORKS = [
  {
    id: 1,
    title: 'GCPホールディングス',
    subtitle: 'コーポレートサイト',
    summary: '要件定義 / サイト設計 / UIデザイン / フロントエンド実装 / WordPress構築',
    cover: '/img/works/gcp-bg.jpg',
    year: '2024',
    role: 'デザイナー / フロントエンドエンジニア',
    description:
      '太陽光発電を中心に、再生可能エネルギーおよびO&M事業を展開する企業のコーポレートサイト制作を担当しました。事業領域が多岐にわたるため、要件整理および情報設計から参画し、初見のユーザーにも事業全体が伝わる構成を設計。サイト設計、UIデザイン、イラスト制作、フロントエンド実装までを一貫して対応しました。WordPressをベースに、製品情報・実績・お知らせを管理画面から更新できる構成とし、クライアント自身で運用しやすいサイトを実現しています。※クライアント要望によりPC版のみ制作。',
    highlights: [
      '要件定義および情報整理から参画し、事業全体を俯瞰できるサイト構成を設計',
      'UIデザインとイラスト制作により、再生可能エネルギー事業の内容を視覚的に表現',
      '製品・実績・お知らせを管理画面から更新可能なWordPress構成を設計・実装',
      '運用フェーズを見据え、更新しやすさと拡張性を意識したフロントエンド設計',
      'PC閲覧環境に最適化したレイアウトと導線設計を実施',
    ],
    tech: [
      'WordPress',
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
      'Adobe XD',
      'Photoshop',
      'Illustrator',
    ],
    links: [{ label: 'Website', href: 'https://www.gcp-hd.co.jp/' }],
    images: [{ alt: 'トップページ', src: '/img/works/works-gcp.png' }],
  },
  {
    id: 2,
    title: 'K-TEC Engineering',
    subtitle: 'コーポレートサイト',
    summary: 'サイト設計 / UIデザイン / フロントエンド実装 / WordPress構築',
    cover: '/img/works/kt-pg.jpg',
    year: '2022',
    role: 'デザイナー / フロントエンドエンジニア',
    description:
      '鉛蓄電池の延命・再生および買取回収を行う企業のコーポレートサイトリニューアルを担当しました。既存サイトの情報整理とデザイン刷新を目的に、サイトデザインおよびUI設計、2D・3Dイラスト制作、フロントエンド実装を担当しました。WordPressを用いて実績情報を編集・公開できる機能やお問い合わせフォームを実装し、情報発信と運用性の向上を図っています。',
    highlights: [
      '既存サイトの情報を整理し、分かりやすさを重視したサイトデザインを設計',
      '2D・3Dイラストを用い、専門性の高い事業内容を視覚的に表現',
      '実績情報を管理画面から編集・公開できるWordPress機能を実装',
      'お問い合わせフォームの新規追加により、ユーザーとの接点を強化',
    ],
    tech: [
      'WordPress',
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
      'Adobe XD',
      'Photoshop',
      'Illustrator',
    ],
    links: [{ label: 'Website', href: 'https://k-tecengineering.co.jp/' }],
    images: [],
  },
  {
    id: 3,
    title: '一般社団法人IAA大阪',
    subtitle: '公式ウェブサイトリニューアル / サーバー移行',
    summary: '要件定義 / サイト設計 / UIデザイン / フロントエンド実装 / WordPress / サーバー移行',
    cover: '/img/works/iaa-bg.jpg',
    year: '2023',
    role: 'デザイナー / フロントエンドエンジニア',
    description:
      '一般社団法人IAA大阪の公式ウェブサイトリニューアルおよびサーバー移行作業を担当しました。既存サイトの構成やコンテンツを整理し、情報の分かりやすさと閲覧性の向上を目的にデザインを刷新。WordPressを用いてレスポンシブ対応を行い、スマートフォン・タブレット環境からも快適に閲覧できるサイトを構築しました。また、サーバー移行にあたってはWebサイトに加え、メールサーバーの移行作業も担当し、移行後の安定運用をサポートしました。',
    highlights: [
      '要件整理および既存コンテンツの精査を行い、情報構造から見直したサイトリニューアルを実施',
      'UIデザインの刷新とレスポンシブ対応により、ユーザーエクスペリエンスを向上',
      'WordPressを用いた更新・運用しやすいサイト構成を設計・実装',
      'サーバー移行作業を担当し、Webサイトおよびメールの継続利用を考慮した移行を実施',
      'アクセス解析（Google Analytics）を考慮し、運用後の改善を見据えた構成を設計',
    ],
    tech: [
      'WordPress',
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
      'Adobe XD',
      'Photoshop',
      'Illustrator',
      'Google Analytics',
    ],
    links: [{ label: 'Website', href: 'https://i-aa.co.jp/' }],
    images: [],
  },{
  id: 4,
  title: '建材受発注システム',
  subtitle: '業務システムUIデザイン',
  summary: 'UIデザイン / 画面設計 / 設計書作成 / テスト対応 / デザイン調整',
  cover: '/img/works/kt-bg.jpg',
  year: '—',
  role: 'UIデザイナー',
  description:
    '建材の予約・発注・受注・商談を行う業務システムにおいて、UIデザインを担当しました。本システムは管理者向け、加盟店向け、メーカー向けの3つのインターフェースで構成されており、それぞれ異なる業務フローと操作要件を持つ点が特徴です。クライアントおよびシステムエンジニアと連携しながら、各ユーザーの業務内容や利用シーンを踏まえたUI設計を行い、全体で約380画面に及ぶ画面デザインを担当しました。また、テスト工程にも関与し、設計意図と実装内容の差異確認やUI観点での不具合確認を行いました。',
  highlights: [
    '管理者・加盟店・メーカーの3者それぞれの業務フローを整理し、UI設計に反映',
    '概要設計書・詳細設計書を作成し、画面仕様や操作ルールを明文化',
    'エンジニアやクライアントと調整を行い、実装を見据えたUIデザインを設計',
    'テスト工程に参加し、UI仕様の差異確認や操作性・表示不具合の確認を実施',
    '約380画面に及ぶ大規模な業務システムのUIデザインを担当',
  ],
  tech: [
    'Adobe XD',
    'Photoshop',
    'Illustrator',
    'GitHub',
  ],
  links: [],
  images: [{alt: 'uiデザイン-01', src: '/img/works/kt-01.png' },{alt: 'uiデザイン-02', src: '/img/works/kt-02.png'},{alt: 'uiデザイン-03', src: '/img/works/kt-03.png' }],
},{
  id: 5,
  title: 'goonet',
  subtitle: '大規模ポータルサイト フロントエンド運用・保守',
  summary: 'フロントエンド実装 / 運用保守 / ABテスト / 進捗管理 / BSE対応',
  cover: '/img/works/go-bg.png',
  year: '2022—今まで',
  role: 'フロントエンドエンジニア',
  description:
    '国内最大級の中古車情報ポータルサイト「goonet」において、フロントエンドの運用・保守を担当しています。トップページおよび各種キャンペーンページを中心に、デザイナーから共有されるデザイン稿をもとにコーディングを実施。実装過程でデザインと実際の表示環境との間に差異が生じた場合は、デザイナーと連携して仕様調整を行い、品質を担保しています。完成後はテスト環境に反映し、動作確認・表示確認を行ったうえで、本番環境（AWS）への公開まで一貫して対応しています。AB Tastyを用いたABテストの実装・検証にも対応し、UI改善施策の運用を支援しています。また、案件内容に応じてBSEとしての役割も一部担い、中国・西安拠点のエンジニアへの作業割り振り、要件伝達、Git上での成果物レビューおよびテストを行い、最終的な公開まで対応しました。',
  highlights: [
    '国内最大級ポータルサイトにおけるフロントエンド運用・保守を継続的に担当',
    'トップページおよびキャンペーンページの実装・改修を安定運用',
    'AB Tastyを用いたABテストの実装・検証を行い、UI改善施策に対応',
    'デザイナーと連携し、デザインと実装差異の調整を通じて品質を担保',
    'AWS環境におけるテスト〜本番公開フローを理解した運用対応',
    'Backlogを用いた進捗管理および、BSEとして海外拠点（中国・西安）エンジニアとの連携',
    'Git上で提出された成果物のレビュー・テストを行い、最終公開まで対応',
  ],
  tech: [
    'HTML',
    'CSS',
    'JavaScript',
    'Vue',
    'AB Tasty',
    'AWS',
    'Figma',
    'Adobe XD',
    'Backlog',
    'Termius',
  ],
  links: [{ label: 'Website', href: 'https://www.goo-net.com/' }],
  images: [],
},
{
  id: 6,
  title: 'AXXZIA',
  subtitle: 'ECサイト SEO改善',
  summary: 'SEO改善 / UIデザイン / フロントエンド実装 / Shopify運用',
  cover: '/img/works/ec-bg.png',
  year: '2024–2025',
  role: 'エンジニア / デザイナー',
  description:
    '化粧品メーカー「AXXZIA」の公式ECサイトにおけるSEO改善プロジェクトに参画しました。検索エンジンからの流入強化を目的に、サイト構造の最適化、メタタグの見直し、内部リンク構成の整理、ページ表示速度の改善を実施。加えて、ユーザー行動を意識したUI改善や新規コンテンツの提案・制作にも対応し、検索エンジンでの可視性向上とユーザー体験の両立を図りました。Shopify（Liquid）環境にて、既存構造を考慮しながら改善施策を実装しています。',
  highlights: [
    'サイト構造の整理および内部リンク設計の見直しによるSEO基盤の改善',
    'メタタグ（title / description）の最適化を通じた検索結果での訴求力向上',
    'ページ表示速度改善を意識したフロントエンド調整を実施',
    'ユーザー導線を考慮したUI改善およびコンテンツ提案・制作',
    'Shopify（Liquid）環境におけるSEO施策の実装・調整',
    'Google Analytics、Search Console、Screaming Frogを用いた現状分析および改善検討',
  ],
  tech: [
    'Shopify（Liquid）',
    'HTML',
    'CSS',
    'JavaScript',
    'Google Analytics',
    'Google Search Console',
    'Screaming Frog',
    'Adobe XD',
    'Photoshop',
    'Illustrator',
  ],
  links: [{ label: 'Website', href: 'https://axxzia.jp/' }],
  images: [],
},
{
  id: 7,
  title: 'Weather Search',
  subtitle: '天気検索ミニアプリ（Vue 3）',
  summary: 'Vue 3 / 外部API連携 / 位置情報 / エラーハンドリング / UI設計',
  cover: 'img/works/wt-bg.jpg',
  year: '2025',
  role: 'フロントエンド',
  description:
    'OpenWeatherMap APIを利用し、都市名検索および位置情報から現在の天気を取得できるミニアプリを制作しました。初回アクセス時は位置情報で取得を試み、失敗時にはデフォルト都市へフォールバックすることで、常に結果が表示できるUXを意識しています。検索時のローディング・エラー表示、単位（℃/℉）切り替えに伴う再取得、直近リクエストの表示など、外部API連携に必要な状態管理と例外処理をVue 3（Composition API）で実装しました。',
  highlights: [
    'ジオコーディングAPIで都市名を正規化し、検索精度と表示名の分かりやすさを両立',
    '位置情報（Geolocation）取得に対応し、失敗時はデフォルト都市へフォールバック',
    'ローディング/エラー/結果表示の状態を整理し、ユーザーに迷わせないUIを設計',
    '単位切り替え（metric/imperial）に応じて同一地点の天気を再取得し、表示を即時反映',
    '天気アイコン・体感温度・湿度・風速・気圧などの情報をカードUIで整理して表示',
  ],
  tech: [
    'Vue 3 (Composition API)',
    'JavaScript',
    'HTML',
    'CSS',
    'OpenWeatherMap API',
    'Geolocation API',
  ],
  links: [{ label: 'Website', href: 'https://uyoko.com/weatherSearch/' }],
  images: [],
}
]

const trackRef = ref(null)
const activeWork = ref(null)
const closeBtnRef = ref(null)

/**
 * 横スクロール（表示幅=1ページ）分移動
 * - PC/Tablet の矢印ボタン用
 */
function scrollByPage(direction) {
  const el = trackRef.value
  if (!el) return
  el.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' })
}

/** モーダル表示中は背景スクロールを禁止 */
function lockScroll(locked) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  document.body.style.overflow = locked ? 'hidden' : ''
}

async function openWork(work) {
  activeWork.value = work
  await nextTick()
  closeBtnRef.value?.focus?.()
}

function closeWork() {
  activeWork.value = null
}

/**
 * キーボード操作
 * - Escape：閉じる
 * - Tab：簡易フォーカストラップ
 */
function onKeydown(e) {
  if (!activeWork.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    closeWork()
    return
  }

  if (e.key !== 'Tab') return

  const root = document.querySelector('.worksModal__content')
  if (!root) return

  const focusables = root.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  )
  if (!focusables.length) return

  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const current = document.activeElement

  if (e.shiftKey && current === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && current === last) {
    e.preventDefault()
    first.focus()
  }
}

/**
 * activeWork の状態に合わせて
 * - スクロールロック
 * - keydown の bind/unbind
 */
watch(activeWork, async (v) => {
  const opened = !!v
  lockScroll(opened)

  if (opened) {
    window.addEventListener('keydown', onKeydown)
    await nextTick()
    closeBtnRef.value?.focus?.()
  } else {
    window.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  lockScroll(false)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <section class="works" aria-label="Works section">
    <div class="works__head">
      <h2 class="works__title">Works</h2>

      <!-- PC/Tablet：左右ボタン（SPは非表示） -->
      <div class="works__nav" aria-label="carousel controls">
        <button class="works__arrow" type="button" @click="scrollByPage(-1)" aria-label="Previous">‹</button>
        <button class="works__arrow" type="button" @click="scrollByPage(1)" aria-label="Next">›</button>
      </div>
    </div>

    <!-- 横スクロール領域：SPは指でドラッグ、PCはボタンでも操作 -->
    <div class="works__track" ref="trackRef">
      <button v-for="w in WORKS" :key="w.id" type="button" class="workCard" @click="openWork(w)">
        <!-- 背景（cover を使用） -->
        <span class="workCard__bg" aria-hidden="true"
          :style="w.cover ? { backgroundImage: `url(${w.cover})` } : null" />

        <span class="workCard__text">
          <span class="workCard__title">{{ w.title }}</span>
          <span class="workCard__sub">{{ w.subtitle }}</span>
          <span class="workCard__summary">{{ w.summary }}</span>
        </span>
      </button>
    </div>

    <!-- フルスクリーン Popup -->
    <teleport to="body">
      <transition name="wm">
        <div v-if="activeWork" class="worksModal" role="dialog" aria-modal="true"
          :aria-labelledby="'work-title-' + activeWork.id" :aria-describedby="'work-desc-' + activeWork.id">
          <div class="worksModal__backdrop" @click="closeWork" aria-hidden="true" />

          <!-- panel はクリックで閉じない -->
          <div class="worksModal__panel" @click.stop>
            <div class="worksModal__content">
              <!-- header（sticky） -->
              <div class="worksModal__header">
                <div class="worksModal__meta">
                  <p class="worksModal__kicker">{{ activeWork.subtitle }}</p>
                  <h3 class="worksModal__title" :id="'work-title-' + activeWork.id">
                    {{ activeWork.title }}
                  </h3>
                </div>

                <button ref="closeBtnRef" class="worksModal__close" type="button" @click="closeWork" aria-label="Close">
                  ✕
                </button>
              </div>

              <!-- body -->
              <div class="worksModal__body">
                <!-- 概要 -->
                <section class="wmCard" :id="'work-desc-' + activeWork.id">
                  <div class="wmCard__row">
                    <div class="wmPill" v-if="activeWork.year">
                      <span class="wmPill__label">制作年</span>
                      <span class="wmPill__value">{{ activeWork.year }}</span>
                    </div>
                    <div class="wmPill" v-if="activeWork.role">
                      <span class="wmPill__label">担当</span>
                      <span class="wmPill__value">{{ activeWork.role }}</span>
                    </div>
                    <div class="wmPill" v-if="activeWork.summary">
                      <span class="wmPill__label">対応範囲</span>
                      <span class="wmPill__value">{{ activeWork.summary }}</span>
                    </div>
                  </div>

                  <p class="wmText" v-if="activeWork.description">
                    {{ activeWork.description }}
                  </p>
                </section>

                <!-- ポイント -->
                <section class="wmCard" v-if="activeWork.highlights?.length">
                  <h4 class="wmCard__title">ポイント</h4>
                  <ul class="wmList">
                    <li v-for="(h, idx) in activeWork.highlights" :key="idx">{{ h }}</li>
                  </ul>
                </section>

                <!-- 使用技術 -->
                <section class="wmCard" v-if="activeWork.tech?.length">
                  <h4 class="wmCard__title">使用技術</h4>
                  <div class="wmTags">
                    <span class="wmTag" v-for="t in activeWork.tech" :key="t">{{ t }}</span>
                  </div>
                </section>

                <!-- 関連リンク -->
                <section class="wmCard" v-if="activeWork.links?.length">
                  <h4 class="wmCard__title">関連リンク</h4>
                  <div class="wmLinks">
                    <a v-for="(l, idx) in activeWork.links" :key="idx" class="wmLink" :href="l.href" target="_blank"
                      rel="noopener noreferrer">
                      <span class="wmLink__label">{{ l.label }}</span>
                      <span class="wmLink__chev">›</span>
                    </a>
                  </div>
                </section>

                <!-- 画面イメージ -->
                <section class="wmCard" v-if="activeWork.images?.length">
                  <div class="wmGrid">
                    <div class="wmShot" v-for="(img, idx) in activeWork.images" :key="idx">
                      <img class="wmShot__img" :src="img.src" :alt="img.alt || ''" loading="lazy" />
                    </div>
                  </div>
                </section>
              </div>
              <!-- /body -->
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </section>
</template>

<style scoped>
/* =========================
   Works
   ========================= */
.works {
  padding: 24px;
  border-radius: 20px;
}

.works__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.works__title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

/* Arrow buttons（SPでは非表示） */
.works__nav {
  display: inline-flex;
  gap: 10px;
}

.works__arrow {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #f5f5f7;
  color: #1d1d1f;
  cursor: pointer;
  line-height: 1;
  font-size: 18px;
  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
}

.works__arrow:hover {
  background: #ededf0;
  border-color: rgba(0, 0, 0, 0.12);
}

.works__arrow:active {
  transform: scale(0.96);
}

/* =========================
   Track（横スクロール + scroll-snap）
   ========================= */
.works__track {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2px 2px 6px;

  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: thin;
}

.works__track::-webkit-scrollbar {
  height: 10px;
}

.works__track::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.14);
  border-radius: 999px;
  border: 3px solid transparent;
  background-clip: content-box;
}

/* =========================
   Card
   ========================= */
.workCard {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: 18px;

  border: 0;
  padding: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;

  flex: 0 0 calc((100% - 28px) / 3);
  min-width: 240px;
  height: 360px;

  scroll-snap-align: start;
  transition: transform 140ms ease;
}

.workCard:active {
  transform: scale(0.99);
}

.workCard::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.65));
  pointer-events: none;
}

.workCard::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  pointer-events: none;
}

/* 背景（cover） */
.workCard__bg {
  position: absolute;
  inset: 0;
  z-index: -1;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  transform: scale(1.02);
  filter: saturate(1.05) contrast(1.02);
}

/* 画像が無い場合の fallback */
.workCard__bg:not([style]) {
  background: linear-gradient(180deg, #050507, #0b0c10);
}

.workCard__text {
  position: absolute;
  inset: 0;
  padding: 16px;

  display: grid;
  align-content: end;
  gap: 6px;

  color: rgba(255, 255, 255, 0.92);
}

.workCard__title {
  font-size: 14px;
  font-weight: 800;
  line-height: 1.25;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.workCard__sub {
  font-size: 12px;
  opacity: 0.85;
  line-height: 1.35;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.workCard__summary {
  font-size: 12px;
  opacity: 0.75;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (hover: hover) and (pointer: fine) {
  .workCard:hover {
    transform: translateY(-2px);
  }

  .workCard:hover::after {
    border-color: rgba(255, 255, 255, 0.2);
  }
}

/* =========================
   Modal
   ========================= */
.worksModal {
  position: fixed;
  inset: 0;
  z-index: 9999;
}

.worksModal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.worksModal__panel {
  position: relative;
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 18px;
  box-sizing: border-box;
}

.worksModal__content {
  width: min(980px, 100%);
  max-height: min(90vh, 860px);
  overflow: auto;

  background: #ffffff;
  color: #1d1d1f;
  border-radius: 24px;

  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.42);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.worksModal__header {
  position: sticky;
  top: 0;
  z-index: 2;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  padding: 24px 24px 20px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.worksModal__kicker {
  margin: 0 0 6px;
  font-size: 12px;
  color: #6e6e73;
  letter-spacing: 0.04em;
}

.worksModal__title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.25;
}

.worksModal__close {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #f5f5f7;

  cursor: pointer;
  color: #1d1d1f;
  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
  flex: 0 0 auto;
}

.worksModal__close:hover {
  background: #ededf0;
  border-color: rgba(0, 0, 0, 0.14);
}

.worksModal__close:active {
  transform: scale(0.96);
}

.worksModal__body {
  padding: 16px 24px 24px;
  display: grid;
  gap: 12px;
}

/* Cards */
.wmCard {
  background: #f5f5f7;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 18px;
  padding: 16px;
}

.wmCard__title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #6e6e73;
  text-transform: uppercase;
}

.wmCard__row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.wmPill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.wmPill__label {
  font-size: 11px;
  color: #6e6e73;
  letter-spacing: 0.06em;
}

.wmPill__value {
  font-size: 12px;
  font-weight: 700;
  color: #1d1d1f;
}

.wmText {
  margin: 0;
  font-size: 13px;
  line-height: 1.85;
  color: #1d1d1f;
}

.wmList {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: #1d1d1f;
  font-size: 13px;
  line-height: 1.7;
}

.wmTags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.wmTag {
  font-size: 12px;
  font-weight: 700;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: #1d1d1f;
}

.wmLinks {
  display: grid;
  gap: 10px;
}

.wmLink {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.06);

  color: #1d1d1f;
  text-decoration: none;
  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
}

.wmLink:hover {
  background: rgba(255, 255, 255, 0.92);
  border-color: rgba(0, 0, 0, 0.1);
}

.wmLink:active {
  transform: scale(0.99);
}

.wmLink__label {
  font-size: 13px;
  font-weight: 700;
}

.wmLink__chev {
  font-size: 18px;
  color: #6e6e73;
}

.wmGrid {
  display: grid;
  gap: 12px;
}

.wmShot {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: #fff;
}

.wmShot__img {
  width: 100%;
  height: auto;
  display: block;
}

/* =========================
   Modal transition
   ========================= */
.wm-enter-active,
.wm-leave-active {
  transition: opacity 180ms ease;
}

.wm-enter-from,
.wm-leave-to {
  opacity: 0;
}

.wm-enter-active .worksModal__content,
.wm-leave-active .worksModal__content {
  transition: transform 180ms ease, opacity 180ms ease;
}

.wm-enter-from .worksModal__content,
.wm-leave-to .worksModal__content {
  transform: translateY(8px) scale(0.99);
  opacity: 0;
}

/* =========================
   Breakpoints
   ========================= */

/* Small（スマホ寄り） */
@media (max-width: 600px) {
  .workCard {
    flex: 0 0 78%;
    min-width: 240px;
    height: 320px;
  }

  .works__nav {
    display: none;
  }

  .worksModal__panel {
    padding: 12px;
  }

  .worksModal__content {
    max-height: 92vh;
    border-radius: 20px;
  }

  .wmGrid {
    grid-template-columns: 1fr;
  }
}

/* SP */
@media (max-width: 480px) {
  .works {
    padding: 0 8px;
  }
}

/* 動きが苦手な方向け */
@media (prefers-reduced-motion: reduce) {

  .workCard,
  .works__arrow,
  .worksModal__close,
  .wmLink {
    transition: none;
  }
}
</style>
