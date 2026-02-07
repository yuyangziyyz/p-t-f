<template>
  <section class="hero">
    <div class="wrap">
      <h2 class="title">About me</h2>
      <div class="grid">
        <div class="photo">
          <img src="/img/S__3391492.jpg" alt="My photo" />
        </div>
        <div class="content">
          <h2 class="name">
            <ruby>
              于 洋子<rt>ウ ヨウシ</rt>
            </ruby>
          </h2>
          <p class="location">Tokyo, Japan</p>
          <p class="desc">
            こんにちは！
          </p>
          <p class="desc">
             ウェブデザインとフロントエンドエンジニアをしていて、主にユーザーインターフェイスのデザインやフロントエンド開発を担当しています。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sec { min-height: 80vh; }
.wrap {
  width: min(810px, 92vw);
  margin: 0 auto;
  padding: 64px 0;
}
.title {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  margin: 0 0 28px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 28px;
  align-items: start;
}
.location {
  color: #8a8a8a;
  margin-top: 0;
}
.photo {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  overflow: hidden;
  background: #efefef;
}
.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.content {
  font-size: 16px;
  line-height: 1.7;
  color: #2b2b2b;
}
.content p { margin: 0 0 12px; }
@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
  .photo { max-width: 420px; margin: 0 auto; }
}
</style>
