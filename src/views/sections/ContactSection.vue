<template>
  <!-- Contact セクション -->
  <section class="contact" aria-label="Contact section">
    <h2 class="contact__title">Contact</h2>
    <p class="contact__sub">Please contact me</p>

    <div class="contact__cards">
      <article v-for="item in CONTACTS" :key="item.id" class="contact__card">
        <div class="contact__left">
          <div class="contact__label">{{ item.label }}</div>
          <div class="contact__value">{{ item.display }}</div>
        </div>

        <div class="contact__right">
          <button
            class="contact__copy"
            type="button"
            :disabled="locks[item.id]"
            :aria-label="`Copy ${item.label}`"
            @click="copy(item.copyText, item.id)"
          >
            <img class="contact__copy-icon" src="/img/Copy-24.png" alt="" aria-hidden="true" />
          </button>

          <!-- コピー結果（簡易トースト） -->
          <span
            v-if="locks[item.id]"
            class="contact__toast"
            aria-live="polite"
          >
            Copied
          </span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

/**
 * ContactSection
 * - セクション共通枠（.contact）を使用
 * - 表示は配列データから生成（重複を減らす）
 * - クリックでクリップボードにコピー
 */
const CONTACTS = [
  {
    id: 'email',
    label: 'Email',
    display: 'yuyangziyyz@gmail.com',
    copyText: 'yuyangziyyz@gmail.com',
  }
]

/**
 * コピー連打防止（Copied 表示にも使う）
 */
const locks = reactive({
  email: false,
  tel: false,
  wechat: false,
})

async function copy(text, id) {
  if (locks[id]) return
  locks[id] = true

  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Clipboard API が使えない場合のフォールバック
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }

  window.setTimeout(() => {
    locks[id] = false
  }, 1600)
}
</script>

<style scoped>
/* =========================================
   Contact section（共通セクション枠）
   ========================================= */
.contact {
  padding: 24px;
  border-radius: 20px;
}

/* タイトル */
.contact__title {
  font-size: 28px; /* H2 = 28px（base と統一） */
  font-weight: 700;
  margin: 0 0 8px;
}

/* サブテキスト（本文扱い：12px） */
.contact__sub {
  margin: 0 0 18px;
  font-size: 12px;
  line-height: 1.7;
  opacity: 0.8;
}

/* =========================================
   Cards
   ========================================= */
.contact__cards {
  display: grid;
  gap: 14px;
  max-width: 820px;
  margin: 0 auto;
}

/* Contact card（Apple 风格：グレー背景 + 黒系テキスト） */
.contact__card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: #f5f5f7;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow:0 1px 2px rgba(0, 0, 0, 0.04);
}

.contact__left {
  min-width: 0;
}

.contact__right {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

/* ラベル（小さく） */
.contact__label {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: black;
  margin-bottom: 6px;
}

/* 値（目立たせる） */
.contact__value {
  font-size: 16px;
  font-weight: 700;
  color: black;
  word-break: break-word;
}

/* Copy button */
.contact__copy {
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.10);
  border-radius: 10px;
  padding: 8px;

  cursor: pointer;
  line-height: 0;
  user-select: none;

  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
}

.contact__copy:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.32);
}

.contact__copy:active {
  transform: scale(0.94);
}

.contact__copy:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.contact__copy-icon {
  width: 18px;
  height: 18px;
  display: block;
  opacity: 0.9;
}

/* Toast */
.contact__toast {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.92);
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 4px 8px;
  border-radius: 999px;
}

/* =========================================
   Responsive
   ========================================= */
@media (max-width: 600px) {
  .contact__card {
    padding: 14px 14px;
  }

  .contact__value {
    font-size: 14px;
  }
}
</style>
