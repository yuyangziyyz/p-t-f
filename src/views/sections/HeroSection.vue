<template>
  <!-- Hero / About セクション -->
  <section class="hero" aria-label="About me">
    <h2 class="hero__title">About me</h2>

    <div class="hero__grid">
      <!-- 写真 -->
      <div class="hero__photo">
        <img src="/img/S__3391492.jpg" alt="My photo" />
      </div>

      <!-- プロフィール内容 -->
      <div class="hero__content">
        <h3 class="hero__name">
          <ruby>
            于 洋子<rt>ウ ヨウシ</rt>
          </ruby>
        </h3>

        <p class="hero__location">Tokyo, Japan</p>

        <p class="hero__desc">こんにちは！</p>
        <p class="hero__desc">
          ウェブデザインとフロントエンドエンジニアをしていて、
          主にユーザーインターフェイスのデザインや
          フロントエンド開発を担当しています。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * HeroSection
 * - セクション共通枠（.hero）を使用
 * - レイアウトや内容は Hero 固有
 */
</script>

<style scoped>
/* =========================================
   Hero section（共通セクション枠）
   ========================================= */
.hero {
  padding: 24px;
  border-radius: 20px;
}

/* タイトル */
.hero__title {
  font-size: 28px; /* H2 = 28px（base と統一） */
  font-weight: 700;
  margin: 0 0 24px;
}

/* =========================================
   レイアウト
   ========================================= */
.hero__grid {
  max-width: 820px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 28px;
  align-items: start;
}

/* 写真 */
.hero__photo {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  overflow: hidden;
  background: #efefef;
}

.hero__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* =========================================
   テキスト
   ========================================= */
.hero__content {
  font-size: 12px;      /* UI/本文は 12px */
  line-height: 1.7;
  color: #2b2b2b;
}

.hero__name {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
}

.hero__location {
  margin: 0 0 12px;
  font-size: 12px;
  color: #8a8a8a;
}

.hero__desc {
  margin: 0 0 12px;
}

/* =========================================
   Responsive
   ========================================= */
@media (max-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }

  .hero__photo {
    max-width: 420px;
    margin: 0 auto;
  }
}
</style>
