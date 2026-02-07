<template>
  <!-- Fun セクション -->
  <section class="fun" aria-label="Fun section">
    <h2 class="fun__title">Fun</h2>

    <div class="fun__list">
      <article class="fun__card">
        <div class="fun__image-wrap">
          <img class="fun__image" src="/img/S__3391492.jpg" alt="Hiking and landscape photography" loading="lazy"
            decoding="async" />
        </div>
      </article>
      <article class="fun__card">
        <div class="fun__image-wrap">
          <img class="fun__image" src="/img/S__3391492.jpg" alt="Hiking and landscape photography" loading="lazy"
            decoding="async" />
        </div>
      </article>
    </div>
    <p class="fun__desc">
      休日は、山に出かけたり、自然の中で過ごすことが多いです。<br>
      登山やスキー、キャンプなど、季節に合わせて外で体を動かすのが好きです。<br>
      <br>
      自然の中にいると、考えすぎていたことが一度リセットされて、<br>
      景色を見ながら歩いたり、雪の上を滑ったりしているうちに、<br>
      気持ちが自然と前向きになります。<br>
      <br>
      特別なことをするというより、<br>
      外に出て、今の時間を楽しむことを大切にしています。<br>
      思い通りにいかないことがあっても、<br>
      自然の中で過ごすと、少し視点が変わる気がします。<br>
      <br>
      そうした時間があることで、<br>
      日常でも落ち着いて物事に向き合えたり、<br>
      新しいことにも前向きに取り組めていると感じています。

    </p>
  </section>
</template>

<script setup>
/**
 * FunSection
 * - セクション共通枠（.fun）を使用
 * - 中身は最小構成（カード1枚）
 * - 将来的に複数カード・一覧化しやすい構造
 */
</script>

<style scoped>
/* =========================================
   Fun section（共通セクション枠）
   ========================================= */
.fun {
  padding: 24px;
  border-radius: 20px;
}

/* セクションタイトル */
.fun__title {
  font-size: 28px;
  /* H2 = 28px（base と統一） */
  font-weight: 700;
  margin: 0 0 24px;
}

/* =========================================
   Fun list / card
   ========================================= */
.fun__list {
  display: flex;
  margin: 0 auto;
  gap: 20px;
}

.fun__card {
  display: grid;
  gap: 14px;
}

/* 画像 */
.fun__image-wrap {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 20px;
  overflow: hidden;
  background: #ececec;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fun__image {
  width: 90%;
  height: 90%;
  object-fit: cover;
  display: block;
  border-radius: 20px;

  transition: transform 200ms ease;
  will-change: transform;
}

.fun__image-wrap:hover .fun__image {
  transform: scale(1.03);
}

/* 説明文（UI本文 12px） */
.fun__desc {
  padding-top: 20px;
  font-size: 12px;
  line-height: 1.7;
  margin: 0;
  color: #2b2b2b;
}

/* =========================================
   Responsive
   ========================================= */
@media (max-width: 900px) {
  .fun__list {
    max-width: 100%;
  }
}
</style>
