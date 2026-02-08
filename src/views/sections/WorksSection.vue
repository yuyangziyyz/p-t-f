<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

/**
 * WorksSection
 * - 横スクロール（scroll-snap）でカードを並べる
 * - PC/Tablet は矢印で「1ページ分（表示幅）」ずつ移動
 * - SP は指でドラッグ（ネイティブスクロール）
 * - カードクリックでフルスクリーンのPopupを表示
 *
 * Popup最適化ポイント：
 * - 参照UIっぽく「黒いBackdrop + 白いPanel + グレーのセクションカード」
 * - 右上クローズ（Sticky）
 * - フェード/スケールで表示アニメ
 * - フォーカスをCloseに移動 + ざっくりフォーカストラップ（Tab循環）
 */

const WORKS = [
  {
    id: 1,
    title: 'GCPホールディングス',
    subtitle: 'コーポレートサイト',
    summary: '要件定義 / UIデザイン / フロントエンド / WordPress実装',
    cover: '/img/gcp-bg.jpg',
    year: '2024',
    role: 'デザイナー / フロントエンド',
    description:
      'コーポレートサイトのデザイン・制作を担当。サイト設計からUIデザイン、イラスト制作、コーディングまで一貫して対応し、製品情報・実績・お知らせを管理画面から更新できるように実装しました。※クライアント要望によりPC版のみ対応。',
    highlights: [
      'サイト設計から実装まで一貫対応し、更新運用を想定した構成で制作',
      '製品登録・実績登録・お知らせなど、管理画面からの更新機能を実装',
      'クライアント要望に合わせ、PC版に最適化したレイアウトと表現を設計',
    ],
    tech: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Adobe XD', 'Photoshop', 'Illustrator'],
    links: [{ label: 'Website', href: 'https://www.gcp-hd.co.jp/' }],
    images: [{ alt: 'トップページ', src: '/img/works-gcp.png' }],
  },
  {
    id: 2,
    title: 'K-TEC Engineering',
    subtitle: 'コーポレートサイト',
    summary: 'UIデザイン / フロントエンド',
    cover: '/img/kt-pg.jpg',
    year: '2024',
    role: 'デザイナー / フロントエンド',
    description:
      '企業情報や事業内容を整理し、分かりやすい導線を意識したコーポレートサイトを制作しました。更新しやすさを考慮し、共通パーツ化やシンプルな構成を取り入れながら、UI設計とフロントエンド実装を行っています。',
    highlights: [
      '情報整理と導線設計を重視したサイト構成',
      '共通パーツ化により、更新作業の負担を軽減',
      '軽量で保守しやすいスタイル設計を意識した実装',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    links: [{ label: 'Website', href: 'https://k-tecengineering.co.jp/' }],
    images: [
      // { alt: 'トップページ', src: '/img/works/k-tec-1.jpg' },
      // { alt: '下層ページ', src: '/img/works/k-tec-2.jpg' },
    ],
  },
  {
    id: 3,
    title: 'IAA 大阪',
    subtitle: 'コーポレートサイト',
    summary: 'UIデザイン / フロントエンド',
    cover: '/img/iaa-pg.jpg',
    year: '2023',
    role: 'デザイナー / フロントエンド',
    description:
      '既存のコーポレートサイトをベースに、ブランドトーンに合わせたUI調整とテンプレート実装を担当しました。全体の印象を崩さず、視認性や使いやすさを意識しながらフロントエンドの改修を行っています。',
    highlights: [
      'ブランドトーンを意識した配色・タイポグラフィ調整',
      'テンプレート化によるページ表現の統一',
      '既存構造を活かしたUI微調整と実装対応',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    links: [{ label: 'Website', href: 'https://i-aa.co.jp/' }],
    images: [
      // { alt: 'トップページ', src: '/img/works/iaa-1.jpg' },
      // { alt: '下層ページ', src: '/img/works/iaa-2.jpg' },
    ],
  },
  {
    id: 4,
    title: '建材受発注システム',
    subtitle: 'システムUI / UX',
    summary: 'UIデザイン / 情報設計',
    cover: '/img/kt-bg.jpg',
    year: '2023',
    role: 'UIデザイナー',
    description:
      '建材の受発注業務を支援する業務システムにおいて、UIデザインと情報設計を担当しました。利用者の業務フローを整理し、画面遷移や入力項目を見直すことで、迷いにくく分かりやすい操作性を目指しています。',
    highlights: [
      '業務フローをベースにした画面構成と遷移設計',
      '入力項目や情報量を整理し、視認性を向上',
      '管理者・利用者それぞれの立場を考慮したUI設計',
    ],
    tech: ['Figma', 'Adobe XD'],
    links: [],
    images: [
      // { alt: '一覧画面', src: '/img/works/system-1.jpg' },
      // { alt: '詳細・入力画面', src: '/img/works/system-2.jpg' },
    ],
  },
  {
    id: 5,
    title: '中古車情報ポータル',
    subtitle: 'フロントエンド運用',
    summary: '実装 / 検証 / 運用対応',
    cover: '/img/go-bg.png',
    year: '2022–',
    role: 'フロントエンド',
    description:
      '大規模な中古車情報ポータルサイトにおいて、日々の更新作業や改修対応を継続して担当しました。既存構造を理解したうえで、正確さと再現性を重視しながら、UI調整やテンプレート改修を行っています。',
    highlights: [
      '差分を意識した実装と、安全なリリースフローでの対応',
      'UI・テンプレートの改修を通じた表示調整',
      '検証から反映までの精度を重視した運用対応',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Git'],
    links: [],
    images: [],
  },
  {
    id: 6,
    title: '化粧品メーカーECサイト',
    subtitle: 'Shopify',
    summary: 'UI改善 / 構造整理 / 表示速度対応',
    cover: '/img/ec-bg.png',
    year: '2024',
    role: 'フロントエンド',
    description:
      '化粧品メーカーの公式ECサイトにおいて、UI改善とサイト構造の整理を中心とした改修を担当しました。ページ構成や内部構造を見直しながら、表示速度や運用面にも配慮したフロントエンド対応を行っています。',
    highlights: [
      '商品ページ・一覧ページを中心としたUI改善',
      '構造整理による回遊しやすいページ構成の検討',
      '表示速度を意識したフロントエンド調整',
    ],
    tech: ['Shopify', 'HTML', 'CSS', 'JavaScript'],
    links: [],
    images: [
      // { alt: '商品一覧ページ', src: '/img/works/ec-1.jpg' },
      // { alt: '商品詳細ページ', src: '/img/works/ec-2.jpg' },
    ],
  },
  {
  id: 7,
  title: '天気確認システム',
  subtitle: 'Weather API',
  summary: 'API連携 / データ取得 / 表示ロジック',
  cover: '/img/wt-bg.jpg',
  year: '2025',
  role: 'フロントエンド',
  description:
    '外部の天気APIを利用し、地域ごとの天気情報を取得・表示するシンプルな天気確認システムを個人制作しました。APIから取得したデータを整形し、ユーザーが直感的に確認できるUIを意識して実装しています。',
  highlights: [
    '外部APIを利用した天気データの取得と表示処理',
    '取得データを分かりやすく整理する表示ロジックの設計',
    'シンプルで見やすいUIを意識した画面構成',
  ],
  tech: ['JavaScript', 'Weather API', 'HTML', 'CSS'],
  links: [{ label: 'Website', href: 'https://uyoko.com/weatherSearch/' }],
  images: [
    // { alt: '天気検索画面', src: '/img/works/weather-1.jpg' },
    // { alt: '天気結果表示', src: '/img/works/weather-2.jpg' },
  ],
},

]

const trackRef = ref(null)
const activeWork = ref(null)
const closeBtnRef = ref(null)

/**
 * 矢印：表示領域幅（= 1ページ）分スクロール
 */
function scrollByPage(direction) {
  const el = trackRef.value
  if (!el) return
  const amount = el.clientWidth
  el.scrollBy({ left: direction * amount, behavior: 'smooth' })
}

function lockScroll(locked) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  document.body.style.overflow = locked ? 'hidden' : ''
}

async function openWork(work) {
  activeWork.value = work
  lockScroll(true)
  await nextTick()
  closeBtnRef.value?.focus?.()
}

function closeWork() {
  activeWork.value = null
  lockScroll(false)
}

function onKeydown(e) {
  if (!activeWork.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    closeWork()
    return
  }

  if (e.key === 'Tab') {
    const root = document.querySelector('.worksModal__content')
    if (!root) return
    const focusables = root.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement

    if (e.shiftKey && active === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

watch(activeWork, (v) => {
  lockScroll(!!v)
})
</script>

<template>
  <section class="works" aria-label="Works section">
    <div class="works__head">
      <h2 class="works__title">Works</h2>

      <!-- PC/Tablet：左右ボタン（SPは非表示） -->
      <div class="works__nav" aria-label="carousel controls">
        <button class="works__arrow" type="button" @click="scrollByPage(-1)" aria-label="Previous">
          ‹
        </button>
        <button class="works__arrow" type="button" @click="scrollByPage(1)" aria-label="Next">
          ›
        </button>
      </div>
    </div>

    <!-- 横スクロール領域：SPは指でドラッグ、PCはボタンでも操作 -->
    <div class="works__track" ref="trackRef">
      <button v-for="w in WORKS" :key="w.id" type="button" class="workCard" @click="openWork(w)">
        <!-- 背景：各カードの images[0] を使用 -->
        <span class="workCard__bg" aria-hidden="true" :style="w.cover
          ? { backgroundImage: `url(${w.cover})` }
          : null" />


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
          <div class="worksModal__backdrop" @click="closeWork" aria-hidden="true"></div>

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

                <!-- 工夫した点・ポイント -->
                <section class="wmCard" v-if="activeWork.highlights?.length">
                  <h4 class="wmCard__title">ポイント</h4>
                  <ul class="wmList">
                    <li v-for="(h, idx) in activeWork.highlights" :key="idx">
                      {{ h }}
                    </li>
                  </ul>
                </section>

                <!-- 使用技術 -->
                <section class="wmCard" v-if="activeWork.tech?.length">
                  <h4 class="wmCard__title">使用技術</h4>
                  <div class="wmTags">
                    <span class="wmTag" v-for="t in activeWork.tech" :key="t">
                      {{ t }}
                    </span>
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
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </section>
</template>

<style scoped>
/* =========================================
   Works section（共通セクション枠）
   ========================================= */
.works {
  padding: 24px;
  border-radius: 20px;
}

/* Head */
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

/* =========================================
   Track（横スクロール + scroll-snap）
   ========================================= */
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

/* =========================================
   Card
   ========================================= */
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

/* 写真背景に合わせて：暗いグラデで文字を読みやすく */
.workCard::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,
      rgba(0, 0, 0, 0.12),
      rgba(0, 0, 0, 0.65));
  pointer-events: none;
}

.workCard::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  pointer-events: none;
}

/* ✅ 背景：各カードの画像を表示（aurora背景は廃止） */
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

/* 画像が無い場合のfallback */
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
    border-color: rgba(255, 255, 255, 0.20);
  }
}

/* =========================================
   Popup（最適化）
   ========================================= */
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
  border: 1px solid rgba(0, 0, 0, 0.10);
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
  border-color: rgba(0, 0, 0, 0.10);
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

/* =========================================
   Modal transition
   ========================================= */
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

.wm-enter-from .worksModal__content {
  transform: translateY(8px) scale(0.99);
  opacity: 0;
}

.wm-leave-to .worksModal__content {
  transform: translateY(8px) scale(0.99);
  opacity: 0;
}

/* =========================================
   Responsive（SPのみ）
   ========================================= */
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

@media (max-width: 480px) {
 .works{
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
