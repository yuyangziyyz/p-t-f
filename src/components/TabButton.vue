<script setup>
const props = defineProps({
  label: { type: String, required: true },
  icon: { type: [String, Object, Function], default: '' }, // 先支持 emoji 或将来 SVG 组件
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="tab"
    :class="{ active }"
    type="button"
    @click="emit('click')"
  >
    <span v-if="icon" class="tabIcon" aria-hidden="true">
      <!-- icon 是字符串(emoji) -->
      <template v-if="typeof icon === 'string'">{{ icon }}</template>
      <!-- icon 是组件(SVG 等) -->
      <component v-else :is="icon" />
    </span>
    <span class="tabLabel">{{ label }}</span>
  </button>
</template>

<style scoped>
.tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid #ccc;
  cursor: pointer;
  user-select: none;
}

.tab.active {
  border-color: #000;
}

.tabIcon {
  font-size: 16px;
  line-height: 1;
}

.tabLabel {
  font-size: 14px;
}
</style>
