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
  '../assets/images/hero.jpg',
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
  /* 整体留边距 */
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom));
}

/* =========
   Dynamic area takes remaining height
   ========= */
.dynamic {
  flex: 1;
  min-height: 0;
  /* 关键：让内部可滚动元素的高度能正确计算 */
  display: flex;
  flex-direction: column;
  padding: 16px 0;
}

/* hero text（由你的 transition hooks 控制 height/opacity） */
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
  opacity: .72;
}

/* hero image */
.heroMedia {
  max-width: 960px;
  margin: 0 auto;
  padding-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 关键：给容器一个可控占位 */
  aspect-ratio: 16 / 9;
  /* 你按图片比例改：1/1、4/3、3/4 都行 */
  max-height: 320px;
  /* 上限，避免太高（不是固定高度） */
}

.heroMedia img {
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
}

/* compact 时让“占位”也变小（不会留空隙） */
.heroMedia.compact {
  max-height: 120px;
  /* 这是上限，不是死固定 */
}


.heroMedia.compact {
  transform: scale(.75);
  opacity: .98;
}

/* =========
   Scroll ONLY inside panel
   ========= */
.panelWrap {
  flex: 1;
  /* 吃掉 dynamic 中剩余高度 */
  min-height: 0;
  /* 关键：让 .panel 的 overflow-y 生效 */
  display: flex;
}

.panel {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;

  /* 只让这里滚动 */
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  padding: 16px;
  box-sizing: border-box;

  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, .08);
  background: rgba(255, 255, 255, .7);
}

/* 可选：滚动条 */
.panel::-webkit-scrollbar {
  width: 10px;
}

.panel::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, .18);
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: content-box;
}

/* =========
   Tabbar fixed height & fixed position
   ========= */
.tabbar {
  height: 64px;
  /* 固定高度 */
  flex: 0 0 64px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;

  padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
  box-sizing: border-box;

  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, .08);
  background: rgba(255, 255, 255, .78);
  backdrop-filter: blur(10px);
}

/* tabbar 内按钮（如果 TabButton 根不是 button，这里可能无效） */
.tabbar button {
  padding: 8px 14px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, .18);
  cursor: pointer;
}

.tabbar button.active {
  border-color: rgba(0, 0, 0, .85);
}

@media (prefers-reduced-motion: reduce) {
  .heroMedia {
    transition: none;
  }
}

:deep(.fluid-layer) {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* 内容层放在背景上面 */
.home {
  position: relative;
  /* 让内部 z-index 有参照 */
  z-index: 0;
}

.home> :not(.dream-bg):not(.fluid-layer) {
  position: relative;
  z-index: 2;
}

.fluid-layer {
  pointer-events: none;
}

/* 动画：慢慢漂移 */
@keyframes dreamShift {
  0% {
    background-position: 0% 20%;
  }

  50% {
    background-position: 70% 30%;
  }

  100% {
    background-position: 20% 80%;
  }
}

.dream-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.10), transparent 40%),
    radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.08), transparent 45%),
    radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.06), transparent 50%);
  mix-blend-mode: overlay;
  opacity: 0.35;
  filter: blur(2px);
}
</style>
