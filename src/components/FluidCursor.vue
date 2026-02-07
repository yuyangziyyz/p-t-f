<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import useFluidCursor from '../hooks/useFluidCursor'

// 这个库本身通常不提供 destroy，下面先按“初始化一次”的方式用。
// 如果你后面需要在路由切换时销毁，我也可以教你怎么加 stop/destroy。
onMounted(() => {
  useFluidCursor()
})
</script>

<template>
  <!-- 放在内容下面：不要挡住点击 -->
  <div class="fluid-layer" aria-hidden="true">
    <canvas id="fluid" class="fluid-canvas"></canvas>
  </div>
</template>

<style scoped>
.fluid-layer{
  position: fixed;
  inset: 0;
  z-index: 0;          /* 背景层 */
  pointer-events: none;/* 不挡内容交互 */
}
.fluid-canvas{
  width: 100%;
  height: 100%;
  display: block;
}
</style>
