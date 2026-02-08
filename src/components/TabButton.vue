<script setup>
/**
 * TabButton
 * - タブバー用のボタンコンポーネント
 * - icon は「絵文字（string）」or「Vueコンポーネント（SVG等）」を想定
 */
const { label, subLabel, icon, active } = defineProps({
  label: { type: String, required: true },
  subLabel: { type: String, default: '' },
  icon: { type: [String, Object, Function], default: '' },
  active: { type: Boolean, default: false },
})

/**
 * 親にクリックを通知
 */
const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<template>
  <button
    class="tab"
    :class="{ active }"
    type="button"
    @click="handleClick"
  >
    <span v-if="icon" class="tab__icon" aria-hidden="true">
      <!-- icon: 絵文字（string） -->
      <template v-if="typeof icon === 'string'">{{ icon }}</template>

      <!-- icon: Vueコンポーネント（SVG等） -->
      <component v-else :is="icon" />
    </span>

    <span class="tab__text">
      <span class="tab__en">{{ label }}</span>
      <span v-if="subLabel" class="tab__jp">{{ subLabel }}</span>
    </span>
  </button>
</template>

<style scoped>
/* =========================================
   TabButton (TabButton.vue)
   - ガラス風ボタン（Glassmorphism）
   - PC / SP でサイズ感を安定させる
   ========================================= */

.tab {
  /* --- 触り心地/見た目の調整値（ここだけ見れば良い） --- */
  --glass-top: rgba(255, 255, 255, 0.34);
  --glass-bottom: rgba(255, 255, 255, 0.14);
  --glass-top-hover: rgba(255, 255, 255, 0.46);
  --glass-bottom-hover: rgba(255, 255, 255, 0.18);
  --glass-top-active: rgba(255, 255, 255, 0.58);
  --glass-bottom-active: rgba(255, 255, 255, 0.24);

  --glass-border: rgba(255, 255, 255, 0.28);
  --glass-border-active: rgba(255, 255, 255, 0.42);

  --blur: 22px;
  --sat: 185%;

  /* --- layout --- */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  /* 幅/高さは「だいたい固定」にして、見た目の揺れを減らす */
  inline-size: clamp(120px, 14vw, 160px);
  min-height: 72px;
  padding: 10px 22px;
  box-sizing: border-box;

  /* --- visuals --- */
  background: linear-gradient(to bottom, var(--glass-top), var(--glass-bottom));
  backdrop-filter: blur(var(--blur)) saturate(var(--sat));
  -webkit-backdrop-filter: blur(var(--blur)) saturate(var(--sat));

  border: 1px solid var(--glass-border);
  border-radius: 14px;

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    inset 0 -1px 0 rgba(255, 255, 255, 0.14);

  cursor: pointer;
  user-select: none;

  transition:
    background .25s ease,
    border-color .25s ease,
    box-shadow .25s ease,
    transform .15s ease;
}

/* hover：少し明るく */
.tab:hover {
  background: linear-gradient(to bottom, var(--glass-top-hover), var(--glass-bottom-hover));
}

/* active：輪郭と密度を上げる */
.tab.active {
  border-color: var(--glass-border-active);
  background: linear-gradient(to bottom, var(--glass-top-active), var(--glass-bottom-active));
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    inset 0 -1px 0 rgba(255, 255, 255, 0.18);
}

.tab:active {
  transform: scale(0.97);
}

/* キーボード操作向け（base.css の focus-visible があっても、コンポーネント側で補強） */
.tab:focus-visible {
  outline: 2px solid var(--color-accent, #00cec9);
  outline-offset: 3px;
}

/* --- icon --- */
.tab__icon {
  font-size: 18px;
  line-height: 1;
  display: grid;
  place-items: center;
  height: 20px; /* アイコン領域を固定して揺れを防ぐ */
}

/* SVG icon サイズの保険（emoji には影響しない） */
.tab__icon :is(svg) {
  width: 18px;
  height: 18px;
  opacity: 0.85;
}

/* --- text --- */
.tab__text {
  display: grid;
  gap: 2px;
  line-height: 1.1;
  text-align: center;

  /* 英1行 + 日1行を想定し、高さを固定してボタンが伸びないように */
  height: 28px;
  align-content: center;
}

.tab__en,
.tab__jp {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.tab__en {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.tab__jp {
  font-size: 12px;
  opacity: 0.75;
}

/* =========================
   SP（スマホ）：コンパクト化
   ========================= */
@media (max-width: 480px) {
  .tab {
    inline-size: clamp(82px, 26vw, 180px);
    min-height: 68px;
    padding: 9px 12px;

    --blur: 16px;
    --sat: 170%;
  }

  .tab__text {
    height: 26px;
  }

  .tab__jp {
    font-size: 10px;
  }
}

/* =========================
   Reduce motion
   ========================= */
@media (prefers-reduced-motion: reduce) {
  .tab {
    transition: none;
  }
}
</style>
