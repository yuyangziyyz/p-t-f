<template>
  <section class="fun" aria-label="Fun section">
    <h2 class="fun__title">Fun</h2>

    <div class="fun__grid">
      <article v-for="(card, cIdx) in cards" :key="card.id" class="fun__card">
        <div class="fun__media" :style="carouselH[cIdx] ? { '--carousel-h': carouselH[cIdx] + 'px' } : {}">
          <!-- PC buttons only -->
          <button class="fun__nav fun__nav--prev" type="button" aria-label="Previous image" @click="prev(cIdx)">
            ‹
          </button>

          <div class="fun__carousel" :ref="(el) => setCarouselRef(el, cIdx)" @scroll.passive="onScroll(cIdx)">
            <div v-for="(src, iIdx) in card.images" :key="src + iIdx" class="fun__slide"
              :data-first="iIdx === 0 ? 'true' : 'false'">
              <img class="fun__image" :data-first="iIdx === 0 ? 'true' : 'false'" :src="src"
                :alt="card.alt?.[iIdx] || card.title" loading="lazy" decoding="async"
                @load="iIdx === 0 ? onFirstImgLoad(cIdx) : null" @error="onImgError(src)" />
            </div>
          </div>

          <button class="fun__nav fun__nav--next" type="button" aria-label="Next image" @click="next(cIdx)">
            ›
          </button>

          <!-- Dots -->
          <div class="fun__dots" aria-label="Image pagination">
            <button v-for="(_, i) in card.images" :key="i" class="fun__dot" type="button"
              :aria-label="`Go to image ${i + 1}`" :aria-current="activeIndex[cIdx] === i ? 'true' : 'false'"
              :data-active="activeIndex[cIdx] === i" @click="goTo(cIdx, i)" />
          </div>
        </div>

        <div class="fun__body">
          <h3 class="fun__cardTitle">{{ card.title }}</h3>
          <p class="fun__cardText">{{ card.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

/**
 * ✅ 把 src/assets 下的图片转换成“真实可访问 URL”
 * 注意：这里的相对路径必须从当前 FunSection.vue 所在目录出发
 * 如果你的 FunSection.vue 在 src/views/sections/ 下，通常就是 ../../assets/...
 */
const assetUrl = (relativePathFromThisFile) =>
  new URL(relativePathFromThisFile, import.meta.url).href

const cards = reactive([
  {
    id: '01',
    title: '冬最高',
    text: '雪の上を滑っている時間が好きです。寒いけど、気持ちはすごくスッキリします。',
    images: [
      assetUrl('../../assets/images/fun/fun-snow-01.JPG'),
      assetUrl('../../assets/images/fun/fun-snow-02.jpg'),
      assetUrl('../../assets/images/fun/fun-snow-03.JPG'),
      assetUrl('../../assets/images/fun/fun-snow-04.JPG'),
      assetUrl('../../assets/images/fun/fun-snow-05.JPG')
    ].slice(0, 6),
    alt: ['Hiking photo 1', 'Hiking photo 2', 'Hiking photo 3']
  },
  {
    id: '02',
    title: '登りきったあとの景色',
    text: '雄山は正直きつかったです。でも、最後に見た景色は今でもよく覚えています。',
    images: [
      assetUrl('../../assets/images/fun/fun-hk02-01.jpg'),
      assetUrl('../../assets/images/fun/fun-hk02-02.jpg'),
      assetUrl('../../assets/images/fun/fun-hk02-03.jpg'),
      assetUrl('../../assets/images/fun/fun-hk02-04.jpg'),
      assetUrl('../../assets/images/fun/fun-hk02-05.jpg')
    ].slice(0, 6),
    alt: ['Ski photo 1', 'Ski photo 2']
  },
  {
    id: '03',
    title: '家に帰ると癒される',
    text: '猫は2匹います。植物と一緒に、毎日の小さな癒しになっています。',
    images: [
      assetUrl('../../assets/images/fun/fun-cat-01.JPG'),
      assetUrl('../../assets/images/fun/fun-cat-02.JPG'),
      assetUrl('../../assets/images/fun/fun-cat-03.JPG'),
      assetUrl('../../assets/images/fun/fun-cat-04.JPG')
    ].slice(0, 6),
    alt: ['Ski photo 1', 'Ski photo 2']
  },
    {
    id: '04',
    title: '何もしない贅沢',
    text: 'キャンプでは、特に予定を立てません。外でのんびり過ごす時間が好きです。',
    images: [
      assetUrl('../../assets/images/fun/fun-cp-01.JPG'),
      assetUrl('../../assets/images/fun/fun-cp-02.JPG'),
      assetUrl('../../assets/images/fun/fun-cp-03.JPG')
    ].slice(0, 6),
    alt: ['Ski photo 1', 'Ski photo 2']
  },

    {
    id: '05',
    title: '想像以上の迫力',
    text: '実物の兵馬俑を見て、思わず立ち止まりました。写真とは全然違いました。',
    images: [
      assetUrl('../../assets/images/fun/fun-xa-01.JPG'),
      assetUrl('../../assets/images/fun/fun-xa-02.JPG'),
      assetUrl('../../assets/images/fun/fun-xa-03.JPG'),
      assetUrl('../../assets/images/fun/fun-xa-04.JPG'),
      assetUrl('../../assets/images/fun/fun-xa-05.JPG')
    ].slice(0, 6),
    alt: ['Ski photo 1', 'Ski photo 2']
  },
  {
    id: '06',
    title: 'ドーナツは別腹',
    text: '甘いものが好きです。特にドーナツには弱いです。',
    images: [
      assetUrl('../../assets/images/fun/fun-sweet.JPG')
    ].slice(0, 6),
    alt: ['Ski photo 1', 'Ski photo 2']
  },
  {
    id: '07',
    title: '2人でクリアする楽しさ',
    text: '協力しないと進めないゲーム。意外と盛り上がりました。',
    images: [
      assetUrl('../../assets/images/fun/fun-game.JPG')
    ].slice(0, 6),
    alt: ['Ski photo 1', 'Ski photo 2']
  },
    {
    id: '08',
    title: '大阪・関西万博',
    text: '会場を見て回りながら、規模の大きさと作り込みに驚きました。いろいろ考えられているんだな、という印象です。',
    images: [
      assetUrl('../../assets/images/fun/fun-os-01.JPG'),
      assetUrl('../../assets/images/fun/fun-os-02.JPG')
    ].slice(0, 6),
    alt: ['Ski photo 1', 'Ski photo 2']
  },
  {
    id: '09',
    title: 'スケールに圧倒される',
    text: '自然も建造物も、とにかく大きい。写真より、現地が一番です。',
    images: [
      assetUrl('../../assets/images/fun/fun-hk01-01.JPG'),
      assetUrl('../../assets/images/fun/fun-hk01-02.JPG'),
      assetUrl('../../assets/images/fun/fun-hk01-03.jpg'),
      assetUrl('../../assets/images/fun/fun-hk01-04.jpg'),
    ].slice(0, 6),
    alt: ['Ski photo 1', 'Ski photo 2']
  },
  {
    id: '10',
    title: 'また行きたくなる',
    text: '登っている最中は大変。でも、時間がたつとまた行きたくなります。',
    images: [
      assetUrl('../../assets/images/fun/fun-hk03-01.JPG'),
      assetUrl('../../assets/images/fun/fun-hk03-02.JPG'),
      assetUrl('../../assets/images/fun/fun-hk03-03.JPG')
    ].slice(0, 6),
    alt: ['Ski photo 1', 'Ski photo 2']
  }
])

const activeIndex = ref(cards.map(() => 0))
const carouselH = ref(cards.map(() => 0))
const carouselRefs = ref([])

function setCarouselRef(el, idx) {
  if (!el) return
  carouselRefs.value[idx] = el
}

async function onFirstImgLoad(cardIdx) {
  await nextTick()
  const el = carouselRefs.value[cardIdx]
  if (!el) return
  const firstSlide = el.querySelector('.fun__slide[data-first="true"]')
  if (!firstSlide) return
  const h = Math.round(firstSlide.getBoundingClientRect().height)
  if (h > 0) carouselH.value[cardIdx] = h
}

function onScroll(cardIdx) {
  const el = carouselRefs.value[cardIdx]
  if (!el) return
  const w = el.clientWidth || 1
  const i = Math.round(el.scrollLeft / w)
  activeIndex.value[cardIdx] = clamp(i, 0, cards[cardIdx].images.length - 1)
}

function goTo(cardIdx, imgIdx) {
  const el = carouselRefs.value[cardIdx]
  if (!el) return
  const w = el.clientWidth || 1
  el.scrollTo({ left: w * imgIdx, behavior: 'smooth' })
}

function next(cardIdx) {
  const i = activeIndex.value[cardIdx]
  goTo(cardIdx, Math.min(i + 1, cards[cardIdx].images.length - 1))
}

function prev(cardIdx) {
  const i = activeIndex.value[cardIdx]
  goTo(cardIdx, Math.max(i - 1, 0))
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function handleResize() {
  cards.forEach((_, idx) => onFirstImgLoad(idx))
}

function onImgError(src) {
  // 方便你在 console 里直接看到哪张图 404
  console.warn('[FunSection] image load failed:', src)
}

onMounted(() => {
  cards.forEach((_, idx) => onScroll(idx))
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.fun {
  padding: 24px;
  border-radius: 20px;
}

.fun__title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 24px;
}

.fun__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.fun__card {
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  display: grid;
}

/* Media container */
/* =========================================
   Carousel area (Instagram-like)
   - Fixed viewport height
   - Crop overflow (cover)
   - Dots + desktop arrows
   ========================================= */

/* Media container */
.fun__media {
  position: relative;
  background: #ececec;
  border-radius: 20px;
  overflow: hidden;
}

/* Carousel track (fixed viewport) */
.fun__carousel {
  aspect-ratio: 4 / 5;
  width: 100%;
  height: auto;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.fun__carousel::-webkit-scrollbar {
  display: none;
}

/* Each slide occupies full width + full height */
.fun__slide {
  flex: 0 0 100%;
  height: 100%;
  scroll-snap-align: start;
}

/* Image fills viewport, crop overflow */
.fun__image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}

/* Dots */
.fun__dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  display: flex;
  justify-content: center;
  gap: 8px;
  pointer-events: auto;
  z-index: 2;
}

.fun__dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: 0;
  padding: 0;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15) inset;
}

.fun__dot[data-active="true"] {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25) inset;
}

/* Desktop nav buttons: hidden by default (mobile) */
.fun__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 0;
  padding: 0;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  color: rgb(46, 46, 46);
  cursor: pointer;
  z-index: 3;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1;
}

.fun__nav--prev {
  left: 10px;
}

.fun__nav--next {
  right: 10px;
}


@media (min-width: 900px) {
  .fun__nav {
    display: flex;
  }
}

/* Text */
.fun__body {
  padding: 14px 16px 16px;
  display: grid;
  gap: 8px;
}

.fun__cardTitle {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  color: #111;
}

.fun__cardText {
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
  color: #2b2b2b;
}

@media (max-width: 900px) {
  .fun__grid {
    grid-template-columns: 1fr;
  }
}
</style>
