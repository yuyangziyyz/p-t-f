<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import WebglFluid from 'webgl-fluid'

const canvasRef = ref(null)
let cleanup = null

onMounted(() => {
  const canvas = canvasRef.value

  // 初始化流体
  WebglFluid(canvas, {
    TRIGGER: 'hover',          // 鼠标悬停/移动就触发（拖动时更明显）:contentReference[oaicite:5]{index=5}
    IMMEDIATE: true,           // 进来先随机 splat 一下（不想要可关）:contentReference[oaicite:6]{index=6}

    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    PRESSURE_ITERATIONS: 20,
    CURL: 30,

    // “泼墨感”的关键参数
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 6000,         // 拖动搅动强度 :contentReference[oaicite:7]{index=7}
    VELOCITY_DISSIPATION: 0.25,
    DENSITY_DISSIPATION: 1.0,

    // 颜色：想要偏墨水就把 COLORFUL 关掉
    COLORFUL: false,           // 关闭彩色，偏“墨” :contentReference[oaicite:8]{index=8}
    SHADING: true,
    BLOOM: false,
    SUNRAYS: false,

    // 背景：跟你页面一样白底更像“墨水”
    BACK_COLOR: { r: 255, g: 255, b: 255 },  // 注意这里用 0-255 更直觉（不行再改 0-1）
    TRANSPARENT: true,
  })

  // 可选：如果你希望降低占用，可以在 unmount 时清理一些监听
  cleanup = () => {}
})

onBeforeUnmount(() => {
  cleanup?.()
})
</script>

<template>
  <canvas ref="canvasRef" class="fluid-bg" aria-hidden="true"></canvas>
</template>

<style scoped>
.fluid-bg{
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;

  /* 关键：不挡住你的 UI 点击 */
  pointer-events: none;
}
</style>
