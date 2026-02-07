<script setup>
import { ref, computed } from 'vue'

import HeroSection from './sections/HeroSection.vue'
import WorksSection from './sections/WorksSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import FunSection from './sections/FunSection.vue'
import ContactSection from './sections/ContactSection.vue'
import TabButton from '../components/TabButton.vue'
import FluidCursor from '../components/FluidCursor.vue'


const activeKey = ref(null)
const isHome = computed(() => activeKey.value === null)
const isCompact = computed(() => activeKey.value !== null)

const tabs = [
  { key: 'hero', label: 'Home', icon: '🏠', component: HeroSection },
  { key: 'works', label: 'Works', icon: '🧩', component: WorksSection },
  { key: 'skills', label: 'Skills', icon: '🛠️', component: SkillsSection },
  { key: 'fun', label: 'Fun', icon: '✨', component: FunSection },
  { key: 'contact', label: 'Contact', icon: '✉️', component: ContactSection },
]


const activeTab = computed(() =>
  tabs.find(t => t.key === activeKey.value)
)

const ActiveComponent = computed(() =>
  activeTab.value?.component ?? null
)

const heroImageUrl = new URL(
  '../assets/images/hero.png',
  import.meta.url
).href

function onClickTab(key) {
  activeKey.value = key
}

function resetTab() {
  activeKey.value = null
}

function beforeEnter(el) {
  el.style.height = '0'
  el.style.opacity = '0'
}

function enter(el) {
  el.style.transition = 'height .35s ease, opacity .35s ease'
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'
  el.addEventListener('transitionend', () => {
    el.style.height = 'auto'
  }, { once: true })
}

function beforeLeave(el) {
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'
}

function leave(el) {
  // force reflow
  void el.offsetHeight
  el.style.transition = 'height .15s ease, opacity .15s ease'
  el.style.height = '0'
  el.style.opacity = '0'
}

</script>

<template>

  <div class="home">
    <FluidCursor />
    <div class="bg-word" aria-hidden="true">CRAFT</div>

    <!-- 动态显示区 -->
    <!-- タイトル -->
    <section class="dynamic">
      
      <transition name="collapse-fade" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave"
        @leave="leave">
        <div v-if="activeKey === null" class="hero-text">
          <h1>Hey, I'm Uyoko 👋</h1>
          <p>Frontend Engineer / UI / UX</p>
        </div>
      </transition>
      <!-- プロフィール写真 -->
      <div class="heroMedia" :class="{ compact: isCompact }">
        <img :src="heroImageUrl" alt="Home" @click="resetTab" />
      </div>
      <!-- 内容面板：有内容才渲染 -->
      <div v-if="ActiveComponent" class="panelWrap">
        <div class="panel">
          <component :is="ActiveComponent" />
        </div>
      </div>

    </section>

    <!-- 按钮区 -->
    <nav class="tabbar" aria-label="Portfolio sections">
      <TabButton v-for="t in tabs" :key="t.key" :label="t.label" :icon="t.icon" :active="activeKey === t.key"
        @click="onClickTab(t.key)" />
    </nav>

  </div>
</template>

<style scoped>
/* =========
   Page shell (no page scroll)
   ========= */
.home {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom));

  /* 层级参照 */
  position: relative;
  z-index: 0;
}

/* =========
   FluidCursor（固定底层，不挡交互）
   ========= */
:deep(.fluid-layer) {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* =========
   页面内容层（在 FluidCursor 上面）
   ========= */
.dynamic,
.tabbar {
  position: relative;
  z-index: 2;
}

/* =========
   Dynamic area
   ========= */
.dynamic {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
}

/* hero text */
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

/* =========
   Hero image
   ========= */
.heroMedia {
  max-width: 960px;
  margin: 0 auto;
  padding-top: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 16 / 9;
  max-height: 320px;
}

.heroMedia img {
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
}

/* compact：只控制占位，不做 transform */
.heroMedia.compact {
  max-height: 120px;
}

/* =========
   Scroll ONLY inside panel
   ========= */
.panelWrap {
  flex: 1;
  min-height: 0;
  display: flex;
}

.panel {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;

  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  padding: 16px;
  box-sizing: border-box;

  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.7);
}

/* scrollbar (optional) */
.panel::-webkit-scrollbar {
  width: 10px;
}

.panel::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.18);
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: content-box;
}

/* =========
   Tabbar
   ========= */
.tabbar {
  height: 64px;
  flex: 0 0 64px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;

  padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
  box-sizing: border-box;

  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(10px);
}

.tabbar button {
  padding: 8px 14px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.18);
  cursor: pointer;
}

.tabbar button.active {
  border-color: rgba(0, 0, 0, 0.85);
}

.bg-word{
  position: fixed;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  z-index: 1;          /* 和 fluid 同层或略上都行 */
  pointer-events: none;

  font-size: clamp(96px, 22vw, 280px);
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  white-space: nowrap;

  background: linear-gradient(to bottom,
    rgba(120,120,120,0.55),
    rgba(180,180,180,0.18)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  opacity: 0.65;
}

/* =========
   Motion safety
   ========= */
@media (prefers-reduced-motion: reduce) {
  .heroMedia {
    transition: none;
  }
}

</style>

