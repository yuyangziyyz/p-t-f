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
</script>

<template>
  <div class="home">
    <!-- 动态显示区 -->
    <section class="dynamic">
      <!-- 默认图：始终存在，仅大小变化 -->
      <div class="heroMedia" :class="{ compact: ActiveComponent }">
        <img :src="heroImageUrl" alt="" />
      </div>

      <!-- 内容面板：有内容才渲染 -->
      <div v-if="ActiveComponent" class="panel">
        <component :is="ActiveComponent" />
      </div>
    </section>

    <!-- 按钮区 -->
    <nav class="tabbar" aria-label="Portfolio sections">
  <TabButton
    v-for="t in tabs"
    :key="t.key"
    :label="t.label"
    :icon="t.icon"
    :active="activeKey === t.key"
    @click="onClickTab(t.key)"
  />
</nav>

  </div>
</template>

<style scoped>
/* 不设高度、不设 min-height */

.home {
  display: flex;
  flex-direction: column;
}

/* 动态区：高度完全由内部内容决定 */
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
  max-width: 480px;
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
