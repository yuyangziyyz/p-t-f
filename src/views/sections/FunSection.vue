<template>
  <section class="sec">
    <div class="fun">
      <h2 class="title">趣味</h2>
      <div class="card">
        <div class="img-wrap">
          <img
            class="img"
            src="/img/S__3391492.jpg"
            alt="hiking"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p class="desc">登山、徒步与风景摄影。</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sec { min-height: 80vh; }
.fun {
  width: min(810px, 92vw);
  margin: 0 auto;
  padding: 64px 0;
}
.title {
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 700;
  margin: 0 0 24px;
}
.card {
  display: grid;
  gap: 16px;
}
.img-wrap {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 20px;
  overflow: hidden;
  background: #ececec;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img {
  width: 90%;
  height: 90%;
  object-fit: cover;
  display: block;
  transition: transform 200ms ease;
  will-change: transform;
  border-radius: 20px;
}
.img-wrap:hover .img {
  transform: scale(1.03);
}
.desc {
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  color: #2b2b2b;
}
</style>
