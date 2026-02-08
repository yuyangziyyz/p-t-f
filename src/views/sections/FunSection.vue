<template>
  <section class="fun" aria-label="Fun section">
    <h2 class="fun__title">Fun</h2>

    <div class="fun__grid">
      <article v-for="(card, cIdx) in cards" :key="card.id" class="fun__card">
        <!-- Carousel -->
        <div class="fun__media">
          <!-- PC only -->
          <button
           v-if="card.images.length > 1"
            class="fun__nav fun__nav--prev"
            type="button"
            aria-label="Previous image"
            @click="prev(cIdx)"
          >
            ‹
          </button>

          <div
  class="fun__carousel"
  :ref="(el) => setCarouselRef(el, cIdx)"
  @scroll.passive="card.images.length > 1 ? onScroll(cIdx) : null"
>
  <div v-for="(src, iIdx) in card.images" :key="src + iIdx" class="fun__slide">
    <img
      class="fun__image"
      :src="src"
      :alt="card.alt?.[iIdx] || card.title"
      loading="lazy"
      decoding="async"
      @error="onImgError(src)"
    />
  </div>
</div>

          <button
  v-if="card.images.length > 1"
  class="fun__nav fun__nav--next"
  type="button"
  aria-label="Next image"
  @click="next(cIdx)"
>
            ›
          </button>

          <!-- Dots -->
          <div v-if="card.images.length > 1" class="fun__dots" aria-label="Image pagination">
  <button
    v-for="(_, i) in card.images"
    :key="i"
    class="fun__dot"
    type="button"
    :aria-label="`Go to image ${i + 1}`"
    :aria-current="activeIndex[cIdx] === i ? 'true' : 'false'"
    :data-active="activeIndex[cIdx] === i"
    @click="goTo(cIdx, i)"
  />
</div>
        </div>

        <!-- Text -->
        <div class="fun__body">
          <h3 class="fun__cardTitle">{{ card.title }}</h3>
          <p class="fun__cardText">{{ card.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * assets 配下の画像を「実際に参照できる URL」に変換
 * - FunSection.vue の場所に合わせて相対パスを指定する
 */
const assetUrl = (relativePathFromThisFile) => new URL(relativePathFromThisFile, import.meta.url).href

const cards = [
  {
    id: '01',
    title: '冬が最高',
    text: '雪の上を滑っている時間が好きです。寒いけど、気持ちはすごくスッキリします。',
    images: [
      assetUrl('/img/fun/fun-snow-01.JPG'),
      assetUrl('/img/fun/fun-snow-02.jpg'),
      assetUrl('/img/fun/fun-snow-03.JPG'),
      assetUrl('/img/fun/fun-snow-04.JPG'),
      assetUrl('/img/fun/fun-snow-05.JPG'),
    ],
    alt: ['Snow photo 1', 'Snow photo 2', 'Snow photo 3', 'Snow photo 4', 'Snow photo 5'],
  },
  {
    id: '02',
    title: '登りきったあとの景色',
    text: '雄山は正直きつかったです。でも、最後に見た景色は今でもよく覚えています。',
    images: [
      assetUrl('/img/fun/fun-hk02-01.jpg'),
      assetUrl('/img/fun/fun-hk02-02.jpg'),
      assetUrl('/img/fun/fun-hk02-03.jpg'),
      assetUrl('/img/fun/fun-hk02-04.jpg'),
      assetUrl('/img/fun/fun-hk02-05.jpg'),
      assetUrl('/img/fun/fun-hk02-06.jpg'),
    ],
    alt: ['Hike photo 1', 'Hike photo 2', 'Hike photo 3', 'Hike photo 4', 'Hike photo 5'],
  },
  {
    id: '03',
    title: '家に帰ると癒される',
    text: '猫は2匹います。植物と一緒に、毎日の小さな癒しになっています。',
    images: [
      assetUrl('/img/fun/fun-cat-01.JPG'),
      assetUrl('/img/fun/fun-cat-02.JPG'),
      assetUrl('/img/fun/fun-cat-03.JPG'),
      assetUrl('/img/fun/fun-cat-04.JPG'),
    ],
    alt: ['Cat photo 1', 'Cat photo 2', 'Cat photo 3', 'Cat photo 4'],
  },
  {
    id: '04',
    title: '何もしない贅沢',
    text: 'キャンプでは、特に予定を立てません。外でのんびり過ごす時間が好きです。',
    images: [
      assetUrl('/img/fun/fun-cp-01.JPG'),
      assetUrl('/img/fun/fun-cp-02.JPG'),
      assetUrl('/img/fun/fun-cp-03.JPG'),
    ],
    alt: ['Camp photo 1', 'Camp photo 2', 'Camp photo 3'],
  },
  {
    id: '05',
    title: '想像以上の迫力',
    text: '実物の兵馬俑を見て、思わず立ち止まりました。写真とは全然違いました。',
    images: [
      assetUrl('/img/fun/fun-xa-01.JPG'),
      assetUrl('/img/fun/fun-xa-02.JPG'),
      assetUrl('/img/fun/fun-xa-03.JPG'),
      assetUrl('/img/fun/fun-xa-04.JPG'),
      assetUrl('/img/fun/fun-xa-05.JPG'),
    ],
    alt: ['Xi’an photo 1', 'Xi’an photo 2', 'Xi’an photo 3', 'Xi’an photo 4', 'Xi’an photo 5'],
  },
  {
    id: '06',
    title: 'ドーナツは別腹',
    text: '甘いものが好きです。特にドーナツには弱いです。',
    images: [assetUrl('/img/fun/fun-sweet.JPG')],
    alt: ['Sweet photo'],
  },
  {
    id: '07',
    title: '2人でクリアする楽しさ',
    text: '協力しないと進めないゲーム。意外と盛り上がりました。',
    images: [assetUrl('/img/fun/fun-game.JPG')],
    alt: ['Game photo'],
  },
  {
    id: '08',
    title: '大阪・関西万博',
    text: '会場を見て回りながら、規模の大きさと作り込みに驚きました。いろいろ考えられているんだな、という印象です。',
    images: [assetUrl('/img/fun/fun-os-01.JPG'), assetUrl('/img/fun/fun-os-02.JPG')],
    alt: ['Expo photo 1', 'Expo photo 2'],
  },
  {
    id: '09',
    title: 'スケールに圧倒される',
    text: '自然も建造物も、とにかく大きい。写真より、現地が一番です。',
    images: [
      assetUrl('/img/fun/fun-hk01-01.JPG'),
      assetUrl('/img/fun/fun-hk01-02.JPG'),
      assetUrl('/img/fun/fun-hk01-03.jpg'),
      assetUrl('/img/fun/fun-hk01-04.jpg'),
    ],
    alt: ['Travel photo 1', 'Travel photo 2', 'Travel photo 3', 'Travel photo 4'],
  },
  {
    id: '10',
    title: 'また行きたくなる',
    text: '登っている最中は大変。でも、時間がたつとまた行きたくなります。',
    images: [
      assetUrl('/img/fun/fun-hk03-01.JPG'),
      assetUrl('/img/fun/fun-hk03-02.JPG'),
      assetUrl('/img/fun/fun-hk03-03.JPG'),
    ],
    alt: ['Hike photo 1', 'Hike photo 2', 'Hike photo 3'],
  },
]

const activeIndex = ref(cards.map(() => 0))
const carouselRefs = ref([])

function setCarouselRef(el, idx) {
  if (!el) return
  carouselRefs.value[idx] = el
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
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

function handleResize() {
  // サイズ変更時に index がズレないよう再計算
  cards.forEach((_, idx) => onScroll(idx))
}

function onImgError(src) {
  // console で 404 を追えるように表示
  console.warn('[FunSection] image load failed:', src)
}

onMounted(() => {
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* =========================
   Fun
   ========================= */
.fun {
  padding: 24px;
  border-radius: 20px;
}

.fun__title {
  margin: 0 0 24px;
  font-size: 28px;
  font-weight: 700;
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

/* =========================
   Carousel（Instagram-like）
   - 固定表示領域（aspect-ratio）
   - 画像は cover でトリミング
   - dots + PC のみ矢印
   ========================= */
.fun__media {
  position: relative;
  background: #ececec;
  border-radius: 20px;
  overflow: hidden;
}

.fun__carousel {
  width: 100%;
  display: flex;
  overflow-x: auto;

  aspect-ratio: 4 / 5;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
}

.fun__carousel::-webkit-scrollbar {
  display: none;
}

.fun__slide {
  flex: 0 0 100%;
  height: 100%;
  scroll-snap-align: start;
}

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

.fun__dot[data-active='true'] {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25) inset;
}

/* PC nav buttons（mobile は非表示） */
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

/* =========================
   Text
   ========================= */
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

/* =========================
   Breakpoints
   ========================= */

/* Tablet 以下：1カラム */
@media (max-width: 900px) {
  .fun__grid {
    grid-template-columns: 1fr;
  }
}

/* PC：矢印表示 */
@media (min-width: 900px) {
  .fun__nav {
    display: flex;
  }
}

/* SP */
@media (max-width: 480px) {
  .fun {
    padding: 0 8px;
  }
}
</style>
