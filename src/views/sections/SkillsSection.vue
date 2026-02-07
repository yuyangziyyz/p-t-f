<script setup>
import { computed, ref } from 'vue'

/**
 * スキル一覧（固定データ）
 * - value は 0〜100 を想定（表示側で clamp する）
 */
const SKILLS = [
  { key: 'html', label: 'HTML', value: 90 },
  { key: 'css', label: 'CSS / SCSS', value: 88 },
  { key: 'js', label: 'JavaScript', value: 85 },
  { key: 'vue', label: 'Vue', value: 80 },
  { key: 'php', label: 'PHP', value: 60 },
  { key: 'react', label: 'React', value: 55 },
  { key: 'git', label: 'Git', value: 75 },
  { key: 'a11y', label: 'Accessibility', value: 70 },
  { key: 'ps', label: 'Photoshop', value: 82 },
  { key: 'ai', label: 'Illustrator', value: 80 },
  { key: 'xd', label: 'Adobe XD', value: 80 },
  { key: 'figma', label: 'Figma', value: 65 },
  { key: 'pr', label: 'Premiere Pro', value: 60 },
  { key: 'ae', label: 'After Effects', value: 60 },
  { key: 'wordpress', label: 'WordPress', value: 85 },
  { key: 'eccube', label: 'EC-CUBE', value: 55 },
  { key: 'shopify', label: 'Shopify', value: 60 },
]

/**
 * 選択中のスキル（key だけ持つと状態管理が安定する）
 */
const selectedKey = ref(SKILLS[0].key)

function select(key) {
  selectedKey.value = key
}

/**
 * 選択中のスキル情報
 */
const selected = computed(() => {
  return SKILLS.find(s => s.key === selectedKey.value) ?? SKILLS[0]
})

/**
 * 表示用パーセンテージ（0〜100 に丸める）
 */
const displayValue = computed(() => {
  const v = Number(selected.value?.value ?? 0)
  return Math.max(0, Math.min(100, Math.round(v)))
})

/**
 * 水面位置：top = 100 - value（%）
 */
const waterTop = computed(() => `${100 - displayValue.value}%`)

/**
 * 色状態：0〜33 = red / 34〜66 = orange / 67〜100 = green
 */
const percentClass = computed(() => {
  const v = displayValue.value
  if (v < 34) return 'red'
  if (v < 67) return 'orange'
  return 'green'
})
</script>

<template>
  <section class="skills" aria-label="Skills section">
    <!-- Left: テキスト + スキル選択 -->
    <div class="skills__left">
      <h2 class="skills__title">Skills</h2>

      <p class="skills__desc">
        フロントエンド開発を中心に、Webサイトの実装や改修を担当してきました。デザインの意図を汲み取りながら、ユーザーにとって分かりやすく、保守しやすい実装を意識しています。CMSを用いたサイト運用や、ECサイトの軽微な改修にも対応しており、現在は対応範囲を広げるため、バックエンド領域についても学習を進めています。
      </p>

      <div class="skills__btns" role="list">
        <button
          v-for="s in SKILLS"
          :key="s.key"
          class="skill-btn"
          :class="{ active: s.key === selectedKey }"
          type="button"
          @click="select(s.key)"
        >
          <span class="label">{{ s.label }}</span>
        </button>
      </div>
    </div>

    <!-- Right: メーター表示 -->
    <div class="skills__right">
      <div class="panel">
        <!-- 外側クラスで色（--primary）を切り替える -->
        <div class="bubbleWrap" :class="percentClass">
          <div class="progress" aria-hidden="true">
            <div class="inner">
              <div class="percent"><span>{{ displayValue }}%</span></div>
              <div class="water" :style="{ top: waterTop }"></div>
              <div class="glare"></div>
            </div>
          </div>
        </div>

        <div class="meta">
          <div class="meta-title">{{ selected.label }}</div>
          <div class="meta-sub">{{ displayValue }}%</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* =========================================
   Skills section
   ========================================= */

.skills {
  --card-radius: 20px;
  --gap: 28px;

  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: var(--gap);
  align-items: start;

  padding: 24px;
  border-radius: var(--card-radius);
}

/* Left */
.skills__title {
  font-size: 28px; /* 依頼：H2 28px */
  margin: 0 0 8px;
}

.skills__desc {
  margin: 0 0 18px;
  opacity: 0.85;
  line-height: 1.7;
  font-size: 12px; /* 依頼：本文 12px */
}

/* ボタン一覧 */
.skills__btns {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
}

/* ボタン（ガラス寄り + 可読性） */
.skill-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(125, 121, 121, 0.18);

  background: rgba(110, 109, 109, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  cursor: pointer;
  user-select: none;

  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;

  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease, color 120ms ease;
}

.skill-btn:hover {
  transform: translateY(-1px);
  border-color: rgba(167, 167, 167, 0.45);
  background: rgba(167, 167, 167, 0.35);
}

.skill-btn.active {
  border-color: rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.62);
  color: rgba(0, 0, 0, 0.86);
}

.label {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Right panel */
.panel {
  border-radius: var(--card-radius);
  padding: 18px;

  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* メタ */
.meta {
  margin-top: 14px;
  text-align: center;
}

.meta-title {
  font-weight: 700;
  font-size: 18px;
}

.meta-sub {
  margin-top: 4px;
  opacity: 0.9;
  font-variant-numeric: tabular-nums;
}

/* =========================================
   Bubble meter
   ========================================= */

.bubbleWrap {
  display: grid;
  place-items: center;
  margin-top: 6px;
}

/* 球サイズ（ここだけ触れば調整できる） */
.progress {
  --size: 250px;
  --border: 5px;
  --inner-border: 5px;

  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: var(--border) solid var(--primary);

  transition: all 0.8s ease;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
}

.inner {
  position: absolute;
  inset: calc(var(--border) + var(--inner-border));
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.8s ease;
  z-index: 2;
}

/* % 表示 */
.percent {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 32px;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
  z-index: 6;
  user-select: none;
}

/* 水面（回転で流体っぽくする） */
.water {
  position: absolute;
  z-index: 1;
  width: 200%;
  height: 200%;
  left: -50%;
  border-radius: 40%;

  background: color-mix(in srgb, var(--primary) 50%, transparent);
  box-shadow: 0 0 20px color-mix(in srgb, var(--primary) 70%, black);

  animation: spin 10s linear infinite;
  transition: top 1s ease;
}

/* 反射 */
.glare {
  position: absolute;
  top: -120%;
  left: -120%;
  width: 200%;
  height: 200%;
  transform: rotate(45deg);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  z-index: 5;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 色状態 */
.green { --primary: rgb(18, 174, 21); }
.orange { --primary: rgb(196, 212, 48); }
.red { --primary: rgb(224, 100, 100); }

/* =========================================
   Responsive
   ========================================= */
@media (max-width: 860px) {
  .skills {
    grid-template-columns: 1fr;
  }

  .skills__btns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .progress {
    --size: 220px;
  }
}
</style>
