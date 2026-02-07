<template>
  <section class="sec">
    <div class="contact">
      <h2 class="title">Contact</h2>
      <p class="sub">please contact me</p>

      <div class="cards">
        <div class="card">
          <div class="left">
            <div class="label">Email</div>
            <div class="value">yourname@example.com</div>
          </div>
          <button class="copy" @click="copy('yourname@example.com')">copy</button>
        </div>

        <div class="card">
          <div class="left">
            <div class="label">TEL</div>
            <div class="value">+81 000 0000 0000</div>
          </div>
          <button class="copy" @click="copy('+8613800000000')">copy</button>
        </div>

        <div class="card">
          <div class="left">
            <div class="label">WeChat</div>
            <div class="value">your_wechat_id</div>
          </div>
          <button class="copy" @click="copy('your_wechat_id')">copy</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
}
</script>

<style scoped>
.sec { min-height: 80vh; }
.contact {
  width: min(900px, 92vw);
  margin: 0 auto;
  padding: 72px 0;
}
.title {
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 700;
  margin: 0 0 10px;
}
.sub {
  margin: 0 0 28px;
  color: #4b4b4b;
  font-size: 16px;
}
.cards {
  display: grid;
  gap: 16px;
}
.card {
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  padding: 18px 20px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.left {
  min-width: 0;
}
.label {
  font-size: 12px;
  letter-spacing: 0.08em;
  /* text-transform: uppercase; */
  color: #8a8a8a;
  margin-bottom: 6px;
}
.value {
  font-size: 18px;
  font-weight: 600;
  color: #1f1f1f;
  word-break: break-all;
}
.link {
  text-decoration: none;
  color: inherit;
}
.link:hover {
  text-decoration: underline;
}
.copy {
  border: 1px solid #dcdcdc;
  background: #f7f7f7;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
}
.copy:hover {
  background: #efefef;
}
</style>
