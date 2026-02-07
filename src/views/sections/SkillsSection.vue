<template>
  <section class="skills">
    <!-- Left -->
    <div class="left">
      <h2 class="title">Skills</h2>
      <p class="desc">
        フロントエンド開発を中心に、Webサイトの実装や改修を担当してきました。デザインの意図を汲み取りながら、ユーザーにとって分かりやすく、保守しやすい実装を意識しています。CMSを用いたサイト運用や、ECサイトの軽微な改修にも対応しており、現在は対応範囲を広げるため、バックエンド領域についても学習を進めています。
      </p>

      <div class="btns">
        <button
          v-for="s in skills"
          :key="s.key"
          class="skill-btn"
          :class="{ active: s.key === selected.key }"
          type="button"
          @click="selectSkill(s)"
        >
          <span class="label">{{ s.label }}</span>
        </button>
      </div>
    </div>

    <!-- Right -->
    <div class="right">
      <div class="panel">
        <!-- 关键：外层 class 由 percentClass 控制：red/orange/green -->
        <div class="bubbleWrap" :class="percentClass">
          <div class="progress">
            <div class="inner">
              <div class="percent"><span>{{ displayValue }}%</span></div>
              <!-- water 的 top 用 style 绑定：top = 100 - value (%) -->
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

<script setup>
import { computed, ref } from "vue";

const skills = ref([
  { key: "html", label: "HTML", value: 90 },
  { key: "css", label: "CSS / SCSS", value: 88 },
  { key: "js", label: "JavaScript", value: 85 },
  { key: "vue", label: "Vue", value: 80 },
  { key: "php", label: "PHP", value: 60 },
  { key: "react", label: "React", value: 55 },
  { key: "git", label: "Git", value: 75 },
  { key: "a11y", label: "Accessibility", value: 70 },
  { key: "ps", label: "Photoshop", value: 82 },
  { key: "ai", label: "Illustrator", value: 80 },
  { key: "xd", label: "Adobe XD", value: 80 },
  { key: "figma", label: "Figma", value: 65 },
  { key: "pr", label: "Premiere Pro", value: 60 },
  { key: "ae", label: "After Effects", value: 60 },
  { key: "wordpress", label: "WordPress", value: 85 },
  { key: "eccube", label: "EC-CUBE", value: 55 },
  { key: "shopify", label: "Shopify", value: 60 },
]);

const selected = ref(skills.value[0]);

function selectSkill(s) {
  selected.value = s;
}

const displayValue = computed(() => {
  const v = Number(selected.value?.value ?? 0);
  return Math.max(0, Math.min(100, Math.round(v)));
});

// water 的 top：原 pen 是 val = 100 - percent
const waterTop = computed(() => `${100 - displayValue.value}%`);

// 颜色段：原 pen 逻辑：100/3 分三段
const percentClass = computed(() => {
  const v = displayValue.value;
  const colorInc = 100 / 3;
  if (v < colorInc * 1) return "red";
  if (v < colorInc * 2) return "orange";
  return "green";
});
</script>

<style scoped>
/* ====== Layout ====== */
.skills {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  align-items: start;
  padding: 24px;
  border-radius: 20px;
}

.title {
  font-size: 28px;
  margin: 0 0 8px;
}

.desc {
  margin: 0 0 18px;
  opacity: 0.85;
  line-height: 1.6;
  font-size: 12px;
}

.btns {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
}

.skill-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgb(125, 121, 121,0.1);
  background: rgb(110, 109, 109);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
  color: rgba(255, 255, 255);
  font-size: 12px;
}
.skill-btn:hover {
  transform: translateY(-1px);
  border: 1px solid rgb(125, 121, 121,0.1);
  background: rgba(167, 167, 167,0.6);
}
.skill-btn.active {
  border-color: rgba(167, 167, 167);
  background: rgba(255, 255, 255, 0.14);
  color: rgba(0, 0, 0);
}
.label {
  font-weight: 600;
}
.value {
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
}

.panel {
  border-radius: 20px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
}

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
}

/* ====== Bubble (CodePen-like DOM structure) ====== */
.bubbleWrap {
  display: grid;
  place-items: center;
  margin-top: 6px;
}

/* 可自定义：球的尺寸 */
.progress {
  --size: 250px;
  --border: 5px;
  --inner-border: 5px;
  --inner-size: calc(var(--size) - (var(--border) + var(--inner-border)) * 2);

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

/* 百分比文字 */
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

/* 水：原 pen 的关键（200% 旋转，形成流体感） */
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

/* 玻璃反光 */
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

/* 旋转动画 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ====== Color states (red/orange/green like the pen) ====== */
.green { --primary: rgb(18, 174, 21); }
.orange { --primary: rgb(196, 212, 48); }
.red { --primary: rgb(224, 100, 100); }

/* Responsive */
@media (max-width: 860px) {
  .skills {
    grid-template-columns: 1fr;
  }
  .btns {
    grid-template-columns: 1fr;
  }
}
</style>
