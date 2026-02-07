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
          <div class="right">
            <button class="copy" :disabled="locks.email" @click="copy('yuyangziyyz@gmail.com', 'email')">
              <img class="copy-icon" src="/img/Copy-24.png" alt="copy" />
            </button>
          </div>
        </div>

        <div class="card">
          <div class="left">
            <div class="label">TEL</div>
            <div class="value">+81 000 0000 0000</div>
          </div>
          <div class="right">
            <button class="copy" :disabled="locks.tel" @click="copy('+8613800000000', 'tel')">
              <img class="copy-icon" src="/img/Copy-24.png" alt="copy" />
            </button>
          </div>
        </div>

        <div class="card">
          <div class="left">
            <div class="label">WeChat</div>
            <div class="value">your_wechat_id</div>
          </div>
          <div class="right">
            <button class="copy" :disabled="locks.wechat" @click="copy('your_wechat_id', 'wechat')">
              <img class="copy-icon" src="/img/Copy-24.png" alt="copy" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const locks = reactive({
  email: false,
  tel: false,
  wechat: false,
})

const copy = async (text, key) => {
  if (locks[key]) return
  locks[key] = true

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

  setTimeout(() => {
    locks[key] = false
  }, 2000)
}
</script>

<style scoped>
.sec { min-height: 80vh; }
.contact {
  width: min(810px, 92vw);
  margin: 0 auto;
  padding: 64px 0;
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
.cards { display: grid; gap: 16px; }
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
.left { min-width: 0; }
.right {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.label {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #8a8a8a;
  margin-bottom: 6px;
}
.value {
  font-size: 18px;
  font-weight: 600;
  color: #1f1f1f;
  word-break: break-all;
}
.copy {
  border: 1px solid #dcdcdc;
  background: #f7f7f7;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  line-height: 0;
  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
}
.copy:hover { background: #efefef; }
.copy-icon {
  width: 18px;
  height: 18px;
  display: block;
}
.toast {
  font-size: 12px;
  color: #2d7a4b;
  background: #eaf6ef;
  border: 1px solid #cfe8da;
  padding: 4px 8px;
  border-radius: 999px;
}

.copy:active {
  transform: scale(0.94);
  background: #e9e9e9;
  border-color: #cfcfcf;
}
.copy:disabled {
  opacity: 0.5;
  cursor: pointer;
}
</style>
