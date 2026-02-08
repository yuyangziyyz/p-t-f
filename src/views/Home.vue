<script setup>
import { ref, computed, nextTick ,onMounted, onBeforeUnmount, watch} from 'vue'

import HeroSection from './sections/HeroSection.vue'
import WorksSection from './sections/WorksSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import FunSection from './sections/FunSection.vue'
import ContactSection from './sections/ContactSection.vue'

import TabButton from '../components/TabButton.vue'
import FluidCursor from '../components/FluidCursor.vue'

/**
 * 現在アクティブなタブのキー
 * - null：Home（トップ）表示
 * - string：各セクション表示
 */
const activeKey = ref(null)

/**
 * セクション表示時のみ、スクロール位置を先頭へ戻すための参照
 */
const panelRef = ref(null)
const isPanelScrolling = ref(false)
let scrollTimer = null

function handlePanelScroll() {
  isPanelScrolling.value = true
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    isPanelScrolling.value = false
  }, 800)
}

function bindPanelScroll() {
  if (!panelRef.value) return
  panelRef.value.addEventListener('scroll', handlePanelScroll, { passive: true })
}

function unbindPanelScroll() {
  if (!panelRef.value) return
  panelRef.value.removeEventListener('scroll', handlePanelScroll)
}

// 关键：activeKey 变化时，panel 会 v-if 出现/消失
watch(
  () => activeKey.value,
  async (newVal, oldVal) => {
    // 切换时先清理旧监听（安全）
    unbindPanelScroll()

    // 只有进入某个 tab 时才有 panel
    if (newVal !== null) {
      await nextTick()
      bindPanelScroll()
    } else {
      // 回到 Home 时也清掉状态
      isPanelScrolling.value = false
      clearTimeout(scrollTimer)
    }
  }
)

onBeforeUnmount(() => {
  unbindPanelScroll()
  clearTimeout(scrollTimer)
})
/**
 * タブ一覧（表示に必要な情報のみ）
 * - key：内部識別子
 * - label/subLabel：ボタン表示
 * - icon：絵文字アイコン
 * - component：表示するVueコンポーネント
 */
const tabs = [
  { key: 'hero', label: 'Me', subLabel: '私について', icon: '👤', component: HeroSection },
  { key: 'works', label: 'Works', subLabel: '作成実績', icon: '🧩', component: WorksSection },
  { key: 'skills', label: 'Skills', subLabel: 'スキル', icon: '🛠️', component: SkillsSection },
  { key: 'fun', label: 'Fun', subLabel: '興味', icon: '✨', component: FunSection },
  { key: 'contact', label: 'Contact', subLabel: '連絡', icon: '✉️', component: ContactSection },
]

/**
 * 現在表示するコンポーネント
 * - activeKey に該当がない場合は null（=面板を出さない）
 */
const ActiveComponent = computed(() => {
  const t = tabs.find(tab => tab.key === activeKey.value)
  return t?.component ?? null
})

/**
 * タブ選択中かどうか（画像のコンパクト表示などに使用）
 */
const isCompact = computed(() => activeKey.value !== null)

/**
 * ヒーロー画像URL
 */
const heroImageUrl = new URL('../assets/images/hero.png', import.meta.url).href

/**
 * タブクリック時：
 * 1) activeKey を更新
 * 2) パネルが表示された後（nextTick）に、スクロール位置を先頭へ戻す
 */
function onClickTab(key) {
  activeKey.value = key
  nextTick(() => {
    panelRef.value?.scrollTo({ top: 0, behavior: 'auto' })
  })
}

/**
 * Home（トップ）へ戻す
 */
function resetTab() {
  activeKey.value = null
}

/* ===== アコーディオン的な開閉アニメーション（Heroテキスト用） =====
   - v-if の出入りで高さが変わるので、JSフックで height を制御する */
function beforeEnter(el) {
  el.style.height = '0'
  el.style.opacity = '0'
}

function enter(el) {
  el.style.transition = 'height .35s ease, opacity .35s ease'
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'
  el.addEventListener(
    'transitionend',
    () => {
      el.style.height = 'auto'
    },
    { once: true }
  )
}

function beforeLeave(el) {
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'
}

function leave(el) {
  // reflow：トランジションを確実に効かせる
  void el.offsetHeight
  el.style.transition = 'height .15s ease, opacity .15s ease'
  el.style.height = '0'
  el.style.opacity = '0'
}
</script>

<template>
  <div class="home">
    <!-- 背景（ポインターイベントを奪わない） -->
    <FluidCursor />
    <div class="bg-word" aria-hidden="true">CRAFT</div>

    <!-- メイン表示領域
         - Home表示（activeKey=null）のときは中央寄せ
         - セクション表示のときは上から積み、下側をパネルに割り当てる -->
    <section class="dynamic" :class="{ 'has-panel': !!ActiveComponent }">
      <div class="dyn-wrap">
        <transition
          name="collapse-fade"
          @before-enter="beforeEnter"
          @enter="enter"
          @before-leave="beforeLeave"
          @leave="leave"
        >
          <div v-if="activeKey === null" class="hero-text">
            <h1>Hey, I'm Uyoko 👋</h1>
            <p>フロントエンドエンジニア / UI・UXデザイン</p>
          </div>
        </transition>

        <!-- プロフィール画像（クリックでHomeへ戻る） -->
        <div class="heroMedia" :class="{ compact: isCompact }">
          <img :src="heroImageUrl" alt="Home" @click="resetTab" />
        </div>
      </div>

      <!-- セクション内容（選択時のみ描画） -->
      <div v-if="ActiveComponent" class="panelWrap">
        <div class="panel" :class="{ 'is-scrolling': isPanelScrolling }" ref="panelRef">
          <component :is="ActiveComponent" />
        </div>
      </div>
    </section>

    <!-- タブボタン -->
    <nav class="tabbar" aria-label="Portfolio sections">
      <TabButton
        v-for="t in tabs"
        :key="t.key"
        :label="t.label"
        :sub-label="t.subLabel"
        :icon="t.icon"
        :active="activeKey === t.key"
        @click="onClickTab(t.key)"
      />
    </nav>
  </div>
</template>

<style scoped>
/* =========================
   ページ全体（ページ自体はスクロールさせない）
   ========================= */
.home {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom));
  position: relative;
  z-index: 0;
}

/* =========================
   FluidCursor（最背面、操作を邪魔しない）
   ※ FluidCursor 内部の .fluid-layer を deep で上書き
   ========================= */
:deep(.fluid-layer) {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* 画面上のコンテンツは FluidCursor より前面に */
.dynamic,
.tabbar {
  position: relative;
  z-index: 2;
}

/* =========================
   メイン領域
   ========================= */
.dynamic {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
}

/* パネルがないとき：中央寄せ */
.dynamic:not(.has-panel) {
  justify-content: center;
  align-items: center;
}

/* パネルがあるとき：上から積む */
.dynamic.has-panel {
  justify-content: flex-start;
  align-items: stretch;
}

/* ヒーロー（テキスト＋画像）部分は高さを内容に任せる */
.dyn-wrap {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
}

/* =========================
   ヒーローテキスト
   ========================= */
.hero-text {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.hero-text h1 {
  margin: 0;
  font-size: 2.4rem;
  line-height: 1.2;
  font-weight: 700;
}

.hero-text p {
  margin: 10px 0 0;
  font-size: 1.05rem;
  opacity: 0.72;
}

/* =========================
   ヒーロー画像
   ========================= */
.heroMedia {
  max-width: 960px;
  margin: 0 auto;
  padding-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 320px;
}

.heroMedia img {
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
  display: block;
  cursor: pointer;
}

/* セクション表示中：画像の占有高さだけ小さくする（見た目を安定させる） */
.heroMedia.compact {
  max-height: 88px;
}

/* =========================
   セクションパネル
   - この部分だけスクロールさせる
   ========================= */
/* =========================
   セクションパネル（改）
   ========================= */
.panelWrap {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  display: flex;
  position: relative;

  /* dyn-wrap に少し潜り込ませる */
  margin-top: -14px;
  padding-top: 14px;
}

/* 上部フェード（dyn-wrap との自然な繋ぎ） */
.panelWrap::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 28px;
  z-index: 3;
  pointer-events: none;

  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.92),
    rgba(255, 255, 255, 0)
  );
}

/* スクロール本体 */
.panel {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;

  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  padding: 22px 16px 16px;
  box-sizing: border-box;

  border: none;
  border-radius: 0;
  background: transparent;

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

/* WebKit scrollbar（默认隐藏） */
.panel::-webkit-scrollbar {
  width: 10px;
}

.panel::-webkit-scrollbar-track {
  background: transparent;
}

.panel::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0);
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: content-box;
}

/* 滚动中显示 */
.panel.is-scrolling {
  scrollbar-color: rgba(0, 0, 0, 0.22) transparent;
}

.panel.is-scrolling::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.22);
}


/* =========================
   タブバー
   ========================= */
.tabbar {
  width: min(980px, 100%);
  margin: 0 auto;

  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  background: transparent;
  border: none;
  backdrop-filter: none;
  padding: 8px 12px 32px;
  box-sizing: border-box;
}

/* スマホ */
@media (max-width: 480px) {
  .tabbar {
    gap: 8px;
    padding: 8px 10px calc(10px + env(safe-area-inset-bottom));
  }
  .dynamic{
    padding: 0px;
  }
  .heroMedia.compact{
    max-height: 64px;
}
.panel{
  padding: 0;
}
}

/* タブレット以上：基本は1行で */
@media (min-width: 768px) {
  .tabbar {
    flex-wrap: nowrap;
  }
}

/* =========================
   背景ワード（装飾）
   ========================= */
.bg-word {
  position: fixed;
  left: 50%;
  bottom: -60px;
  transform: translateX(-50%);
  z-index: 1;
  pointer-events: none;

  font-size: clamp(96px, 22vw, 280px);
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  white-space: nowrap;

  background: linear-gradient(
    to bottom,
    rgba(120, 120, 120, 0.45),
    rgba(180, 180, 180, 0.18)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  opacity: 0.65;
}


@media (prefers-reduced-motion: reduce) {
  .heroMedia {
    transition: none;
  }
}
</style>
