<script setup>
import { ref, computed } from 'vue'

import HeroSection from './sections/HeroSection.vue'
import WorksSection from './sections/WorksSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import FunSection from './sections/FunSection.vue'
import ContactSection from './sections/ContactSection.vue'
import TabButton from '../components/TabButton.vue'

const activeKey = ref(null)

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
  el.style.transition = 'height .25s ease, opacity .25s ease'
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
      <div class="heroMedia" :class="{ compact: ActiveComponent }">
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

<style scoped>
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
.heroMedia.compact {
  max-width: 120x;
}

.heroMedia img {
  width: 100%;
  display: block;
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
</style>
