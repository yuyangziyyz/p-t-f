<template>
  <!-- Works セクション -->
  <section class="works" aria-label="Works section">
    <h2 class="works__title">Works</h2>

    <!-- 作品列表（现在是占位结构，之后可替换为卡片/链接等） -->
    <div class="works__list">
      <article
        v-for="work in works"
        :key="work.id"
        class="works__item"
      >
        <h3 class="works__item-title">{{ work.title }}</h3>
        <p class="works__item-desc">{{ work.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
/**
 * WorksSection
 * - セクション共通枠（.works）のみを前提に構成
 * - 中身は後から自由に拡張できるよう、最低限の構造に留める
 */

/* 仮データ（あとで API / JSON / props に置き換え可） */
const works = [
  {
    id: 1,
    title: 'Webサイト改修・運用',
    desc: '官公庁向け大規模サイトのHTML / CSS / JavaScript対応',
  },
  {
    id: 2,
    title: 'UI / テンプレート制作',
    desc: '再利用性を意識したコンポーネント設計と実装',
  },
  {
    id: 3,
    title: 'ECサイト軽微改修',
    desc: 'WordPress / EC-CUBE / Shopify のカスタマイズ対応',
  },
]
</script>

<style scoped>
/* =========================================
   Works section（共通セクション枠）
   ========================================= */
.works {
  padding: 24px;
  border-radius: 20px;
}

/* セクションタイトル */
.works__title {
  font-size: 28px; /* H2 = 28px（base と統一） */
  font-weight: 700;
  margin: 0 0 24px;
}

/* =========================================
   Works list
   ========================================= */
.works__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

/* 各作品（今はシンプルなカード） */
.works__item {
  padding: 16px;
  border-radius: 16px;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* 作品タイトル */
.works__item-title {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 700;
}

/* 説明文（UI用 12px） */
.works__item-desc {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  opacity: 0.85;
}

/* =========================================
   Responsive
   ========================================= */
@media (max-width: 900px) {
  .works__list {
    grid-template-columns: 1fr;
  }
}
</style>
