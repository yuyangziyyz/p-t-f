<template>
  <!-- Hero / About セクション -->
  <section class="hero" aria-label="About me">
    <h2 class="hero__title">About me</h2>

    <div class="hero__grid">
      <!-- 写真 -->
      <div class="hero__photo">
        <img src="/img/aboutme.jpg" alt="My photo" />
      </div>

      <!-- プロフィール -->
      <div class="hero__content">
        <h3 class="hero__name">
          <ruby>
            于 洋子<rt>ウ ヨウシ</rt>
          </ruby>
        </h3>

        <p class="hero__location">📍 Tokyo, Japan</p>

        <p class="hero__desc">
          はじめまして。Uyoko（于 洋子）と申します。<br />
          東京を拠点に、Web制作会社でフロントエンドエンジニアとして働いています。<br />
          フロントエンド開発を中心に、UI / UX を意識した画面設計や実装を担当しています。<br />
          デザインの意図を汲み取り、見た目だけでなく「使いやすさ」や「わかりやすさ」も大切にしながら形にしていくことを心がけています。<br /><br />

          日々の業務では、既存ページの改修や運用対応を通して、<br />
          小さな改善を積み重ねながら、安定して使い続けられる画面づくりに取り組んでいます。<br /><br />

          まだ学ぶことも多いと感じていますが、<br />
          制作や試行錯誤を通して理解を深めながら、より良いアウトプットを目指して取り組んでいきたいと考えています。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * HeroSection
 * - 写真＋プロフィールの紹介セクション
 * - PC は 2 カラム、SP は 1 カラム
 */
</script>

<style scoped>
/* =========================
   Hero
   ========================= */
.hero {
  padding: 24px;
  border-radius: 20px;
}

.hero__title {
  margin: 0 0 24px;
  font-size: 28px;
  font-weight: 700;
}

/* =========================
   Layout
   ========================= */
.hero__grid {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 28px;
  align-items: start;
}

/* Photo */
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

/* =========================
   Text
   ========================= */
.hero__content {
  font-size: 12px;
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
  margin: 0;
}

/* =========================
   Breakpoints
   ========================= */

/* Tablet */
@media (max-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }

  .hero__photo {
    max-width: 420px;
    margin: 0 auto;
  }
}

/* SP */
@media (max-width: 480px) {
  .hero {
    padding: 0 8px;
  }
}
</style>
