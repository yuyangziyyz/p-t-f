<script setup>
import { ref, computed } from 'vue'

import HeroSection from './sections/HeroSection.vue'
import WorksSection from './sections/WorksSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import FunSection from './sections/FunSection.vue'
import ContactSection from './sections/ContactSection.vue'
import TabButton from '../components/TabButton.vue'

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
      <div v-if="ActiveComponent" class="panel">
        <component :is="ActiveComponent" />
      </div>
    </section>

    <!-- 按钮区 -->
    <nav class="tabbar" aria-label="Portfolio sections">
      <TabButton v-for="t in tabs" :key="t.key" :label="t.label" :icon="t.icon" :active="activeKey === t.key"
        @click="onClickTab(t.key)" />
    </nav>

  </div>
</template>

<!-- <style scoped>
.home {
  display: flex;
  flex-direction: column;
}

/* 动态区：高度完全由内部内容决定 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dynamic {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
}

/* 默认大图 */
.heroMedia {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  transition: all 240ms ease;
}

/* 点击后缩小 */
.heroMedia img{
  transition: transform .35s ease, opacity .35s ease;
  transform: scale(1);
  transform-origin: top;
}

.heroMedia.compact img{
  transform: scale(.35);
}

/* 内容面板：没有内容就不存在 */
.panel {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
}

/* 按钮区 */
.tabbar {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 16px;
}

.tabbar button {
  padding: 8px 14px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid #ccc;
  cursor: pointer;
}

.tabbar button.active {
  border-color: #000;
}
</style> -->

<style scoped>
/* =========
   Layout
   ========= */
.home {
  display: flex;
  flex-direction: column;
}

/* 动态区：高度由内部内容决定 */
.dynamic {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
}

/* =========
   Hero text
   ========= */
/* 你现在用的是 JS hooks（beforeEnter/enter/leave）控制 height/opacity，
   这里不需要再写 collapse-fade 的 CSS 规则，否则可能“打架”。
   只保留 hero-text 的基础样式即可。 */
.hero-text {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.hero-text h1 {
  font-size: 2.4rem;
  line-height: 1.2;
  font-weight: 700;
  margin: 0;
}

.hero-text p {
  margin: 10px 0 0;
  font-size: 1.05rem;
  opacity: 0.72;
}

/* =========
   Hero Media (image)
   ========= */
/* 重点：不要 transition: all（会引起布局属性也参与动画，容易卡）
   用 transform 做缩放，最顺，而且不需要固定高度。 */
.heroMedia {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.35s ease, opacity 0.35s ease;
  transform: scale(1);
  transform-origin: top center;
}

.heroMedia.compact {
  transform: scale(0.88); /* 建议 0.85~0.92 之间微调 */
  opacity: 0.98;
}

.heroMedia img {
  display: block;
  width: min(360px, 70vw); /* 不固定高度，但保持一个稳定的视觉宽度 */
  height: auto;
  border-radius: 18px;     /* 你想要玻璃/卡片感可以留圆角 */
  user-select: none;
  -webkit-user-drag: none;
  cursor: pointer;
}

/* =========
   Panel (ActiveComponent area)
   ========= */
.panel {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;

  /* 可选：让面板看起来更像卡片 */
  border-radius: 18px;
  /* 如果你不想要边框/背景可以删掉下面两行 */
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.7);
}

/* =========
   Tabbar
   ========= */
.tabbar {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  flex-wrap: wrap;
}

/* 你 TabButton 组件内部如果不是 button，这里可能不生效；
   如果 TabButton 根元素就是 button 就 OK。 */
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

/* =========
   (Optional) Reduce motion
   ========= */
@media (prefers-reduced-motion: reduce) {
  .heroMedia {
    transition: none;
  }
}
</style>

