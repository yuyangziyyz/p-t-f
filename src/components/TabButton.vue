<script setup>
const props = defineProps({
  label: { type: String, required: true },
  subLabel: { type: String, default: '' }, // 新增：日文
  icon: { type: [String, Object, Function], default: '' }, // emoji 或 SVG 组件
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="tab"
    :class="{ active: props.active }"
    type="button"
    @click="emit('click')"
  >
    <span v-if="props.icon" class="tab__icon" aria-hidden="true">
      <!-- icon 是字符串(emoji) -->
      <template v-if="typeof props.icon === 'string'">{{ props.icon }}</template>
      <!-- icon 是组件(SVG 等) -->
      <component v-else :is="props.icon" />
    </span>

    <span class="tab__text">
      <span class="tab__en">{{ props.label }}</span>
      <span v-if="props.subLabel" class="tab__jp">{{ props.subLabel }}</span>
    </span>
  </button>
</template>

<style scoped>
/* =========
   TabButton (TabButton.vue)
   ========= */
.tab{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  min-width: 120px;
  max-width: 160px;
  min-height: 72px;

  padding: 10px 32px;
  box-sizing: border-box;

  /* ✅ 更透明一点：把两段 alpha 都下调 */
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0.34),
    rgba(255,255,255,0.14)
  );

  /* ✅ blur 继续保持强，才像 iOS */
  backdrop-filter: blur(22px) saturate(185%);
  -webkit-backdrop-filter: blur(22px) saturate(185%);

  /* ✅ 边框更轻一点，不会显厚 */
  border: 1px solid rgba(255,255,255,0.28);
  border-radius: 14px;

  /* ✅ 阴影略收敛，透明后更干净 */
  box-shadow:
    0 8px 24px rgba(0,0,0,0.10),
    inset 0 1px 0 rgba(255,255,255,0.62),
    inset 0 -1px 0 rgba(255,255,255,0.14);

  cursor: pointer;

  transition:
    background .25s ease,
    border-color .25s ease,
    box-shadow .25s ease,
    transform .15s ease;
}

/* hover：更亮一点，但仍透明 */
.tab:hover{
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0.46),
    rgba(255,255,255,0.18)
  );
}

/* active：更“实体”，但仍是玻璃 */
.tab.active{
  border-color: rgba(255,255,255,0.42);
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0.58),
    rgba(255,255,255,0.24)
  );

  box-shadow:
    0 10px 28px rgba(0,0,0,0.14),
    inset 0 1px 0 rgba(255,255,255,0.72),
    inset 0 -1px 0 rgba(255,255,255,0.18);
}

.tab:active{
  transform: scale(0.97);
}

.tab__icon{
  font-size: 18px;
  line-height: 1;
  display: grid;
  place-items: center;

  /* ✅ icon 区固定一点空间，视觉更稳 */
  height: 20px;
}

/* SVG icon 兜底尺寸（emoji 不受影响） */
.tab__icon :is(svg){
  width: 18px;
  height: 18px;
  opacity: 0.85;
}

.tab__text{
  display: grid;
  gap: 2px;
  line-height: 1.1;
  text-align: center;

  /* ✅ 锁定文本区高度：英文1行 + 日文1行，不会把按钮撑高 */
  height: 28px;
  align-content: center;
}

.tab__en{
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.tab__jp{
  font-size: 11px;
  opacity: 0.75;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* 手机：按钮更紧凑 */
@media (max-width: 480px){
  .tab{
    min-width: 82px;
    max-width: 46vw;
    min-height: 68px;
    padding: 9px 12px;

    backdrop-filter: blur(16px) saturate(170%);
    -webkit-backdrop-filter: blur(16px) saturate(170%);
  }

  .tab__text{
    height: 26px;
  }

  .tab__jp{
    font-size: 10px;
  }
}



</style>
