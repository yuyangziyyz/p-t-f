<script setup>
import { computed, onMounted, ref } from 'vue'
import FluidCursor from '../components/FluidCursor.vue'
import { API_KEY, DEFAULT_CITY } from './weather/constants'

// 検索入力
const query = ref('')
// 単位 (metric=℃/m/s, imperial=℉/mph)
const unit = ref('metric')
// 通信中フラグ
const loading = ref(false)
// エラーメッセージ
const error = ref('')
// 取得した天気データ
const weather = ref(null)
// 直近のリクエスト表示用
const lastRequest = ref('')

// 表示用の単位ラベル
const unitLabel = computed(() => (unit.value === 'metric' ? '℃' : '℉'))
const speedLabel = computed(() => (unit.value === 'metric' ? 'm/s' : 'mph'))

// API のリクエスト URL を組み立て
const buildUrl = (params) => {
  const base = 'https://api.openweathermap.org/data/2.5/weather'
  const search = new URLSearchParams({
    appid: API_KEY,
    units: unit.value,
    lang: 'ja',
    ...params,
  })
  return `${base}?${search.toString()}`
}

// 都市名をジオコーディングして緯度経度を取得
const geocodeCity = async (name) => {
  const base = 'https://api.openweathermap.org/geo/1.0/direct'
  const search = new URLSearchParams({
    q: name,
    limit: '1',
    appid: API_KEY,
  })
  const response = await fetch(`${base}?${search.toString()}`)
  if (!response.ok) {
    throw new Error(`ジオコードに失敗しました (${response.status})`)
  }
  const data = await response.json()
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('都市が見つかりませんでした')
  }
  const [first] = data
  return {
    queryName: first.local_names?.en || first.name || name,
    displayName: first.local_names?.ja || first.name || name,
  }
}

// 天気 API を呼び出して state を更新
const fetchWeather = async (params, label, options = {}) => {
  const { showHint = true } = options
  loading.value = showHint
  error.value = ''
  lastRequest.value = label
  try {
    const response = await fetch(buildUrl(params))
    if (!response.ok) {
      throw new Error(`天気の取得に失敗しました (${response.status})`)
    }
    const data = await response.json()
    weather.value = data
  } catch (err) {
    error.value = err.message || '天気の取得に失敗しました'
  } finally {
    loading.value = false
  }
}

// 都市名で検索
const fetchByCity = async (city) => {
  const trimmed = city.trim()
  if (!trimmed) {
    error.value = '都市名を入力してください'
    return
  }
  try {
    const { queryName, displayName } = await geocodeCity(trimmed)
    await fetchWeather({ q: queryName }, displayName)
  } catch (err) {
    error.value = err.message || '都市の検索に失敗しました'
  }
}

// 位置情報で検索 (失敗時はデフォルト都市)
const fetchByLocation = async () => {
  if (!navigator.geolocation) {
    await fetchWeather({ q: DEFAULT_CITY }, DEFAULT_CITY)
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords
      await fetchWeather(
        { lat: latitude, lon: longitude },
        `位置情報 (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`
      )
    },
    async () => {
      await fetchWeather({ q: DEFAULT_CITY }, DEFAULT_CITY)
    },
    { enableHighAccuracy: true, timeout: 8000 }
  )
}

// 検索フォーム送信
const onSubmit = async () => {
  await fetchByCity(query.value)
}

// 単位の切り替え (再取得)
const toggleUnit = async () => {
  unit.value = unit.value === 'metric' ? 'imperial' : 'metric'
  if (weather.value?.coord) {
    await fetchWeather(
      { lat: weather.value.coord.lat, lon: weather.value.coord.lon },
      lastRequest.value || 'unit-switch'
    )
  }
}

// 初回ロードで位置情報検索
onMounted(async () => {
  await fetchByLocation()
})
</script>

<template>
  <div class="weather-search page">
    <FluidCursor />
    <div class="bg-word" aria-hidden="true">CRAFT</div>
    <div class="weather-content">
    <!-- ヘッダー -->
    <header class="hero">
      <div>
        <p class="eyebrow">Weather Search</p>
        <h1>即天気チェック</h1>
        <p class="subhead">都市名から、最新の天気情報を確認できます。</p>
      </div>
      <div class="unit-toggle">
        <span>単位切り替え</span>
        <button type="button" class="chip" @click="toggleUnit">{{ unitLabel }}</button>
      </div>
    </header>

    <!-- 検索パネル -->
    <section class="panel">
      <form class="search" @submit.prevent="onSubmit">
        <input v-model="query" type="text" placeholder="都市名を入力 (例: 東京)" />
        <button type="submit">検索</button>
      </form>

      <div class="status">
        <span v-if="loading">取得中...</span>
        <span v-else-if="error" class="error">{{ error }}</span>
      </div>
    </section>

    <!-- 結果表示 -->
    <section class="result" v-if="weather">
      <div class="card main">
        <div>
          <div class="weather-text">
            <p class="label">{{ weather.sys?.country }} / {{ weather.name }}</p>
            <h2>{{ Math.round(weather.main?.temp) }}{{ unitLabel }}</h2>
            <p class="desc">{{ weather.weather?.[0]?.description }}</p>
          </div>
        </div>
        <div class="icon-wrap">
          <img
            v-if="weather.weather?.[0]?.icon"
            :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
            :alt="weather.weather?.[0]?.description || 'weather'"
          />
        </div>
      </div>

      <div class="grid">
        <div class="card">
          <p class="label">体感温度</p>
          <p class="value">{{ Math.round(weather.main?.feels_like) }}{{ unitLabel }}</p>
        </div>
        <div class="card">
          <p class="label">湿度</p>
          <p class="value">{{ weather.main?.humidity }}%</p>
        </div>
        <div class="card">
          <p class="label">風速</p>
          <p class="value">{{ weather.wind?.speed }} {{ speedLabel }}</p>
        </div>
        <div class="card">
          <p class="label">気圧</p>
          <p class="value">{{ weather.main?.pressure }} hPa</p>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

.weather-search {
  --bg-start: #fff2e6;
  --bg-mid: #ffe7d6;
  --bg-end: #f6f0ff;
  --ink: #2a1912;
  --ink-soft: #6b4b3b;
  --accent: #ff7a45;
  --accent-dark: #e35a1c;
  --accent-glow: rgba(255, 122, 69, 0.28);
  --panel: rgba(255, 255, 255, 0.68);
  --stroke: rgba(86, 44, 20, 0.14);
  --shadow: 0 14px 30px rgba(80, 40, 20, 0.12);
  font-family: 'IBM Plex Sans', 'Space Grotesk', system-ui, sans-serif;
  color: var(--ink);
  background: transparent;
  min-height: 100dvh;
  padding: 48px 24px 80px;
  position: relative;
}

/* Home 縺ｮ繝舌ャ繧ｯ繧ｰ繝ｩ繧ｦ繝ｳ繝峨・騾∽ｿ｡ */
:deep(.fluid-layer) {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.page {
  display: flex;
  flex-direction: column;
  gap: 28px;
  animation: pageFade 0.6s ease both;
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
}

.weather-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.bg-word {
  position: fixed;
  left: 50%;
  bottom: -60px;
  transform: translateX(-50%);
  z-index: 1;
  pointer-events: none;
  font-size: clamp(96px, 22vw, 280px);
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  white-space: nowrap;
  background: linear-gradient(
    to bottom,
    rgba(120, 120, 120, 0.45),
    rgba(180, 180, 180, 0.18)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0.65;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 14px;
  margin-bottom: 12px;
  color: rgba(107, 75, 59, 0.85);
  font-weight: 600;
}

h1 {
  font-size: clamp(32px, 4vw, 56px);
  line-height: 1.05;
  margin: 0 0 12px;
  font-family: 'Space Grotesk', 'IBM Plex Sans', system-ui, sans-serif;
  letter-spacing: -0.02em;
}

.subhead {
  color: var(--ink-soft);
  max-width: 520px;
}

.unit-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  color: var(--ink-soft);
}

.chip {
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: linear-gradient(140deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.55));
  color: var(--ink);
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(120, 60, 24, 0.12);
  transition: transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease;
}

.chip:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 122, 69, 0.7);
  box-shadow: 0 16px 32px var(--accent-glow);
}

.panel {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.5));
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 22px;
  padding: 22px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(14px);
}

.search {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.search input {
  flex: 1 1 240px;
  border: 1px solid rgba(255, 122, 69, 0.22);
  border-radius: 14px;
  padding: 14px 18px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.78);
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.search input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.search button {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 14px 22px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 14px 26px var(--accent-glow);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.search button:hover {
  background: var(--accent-dark);
  transform: translateY(-1px);
  box-shadow: 0 18px 32px var(--accent-glow);
}

.status {
  margin-top: 12px;
  font-size: 14px;
  color: var(--ink-soft);
}

.status .error {
  color: #b00020;
  font-weight: 600;
}

.result {
  display: grid;
  grid-template-columns: minmax(260px, 1.1fr) minmax(260px, 1fr);
  gap: 18px;
}

.card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.5));
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 20px;
  padding: 20px;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 44px rgba(120, 60, 24, 0.16);
}

.card.main {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;
  min-height: 220px;
}

.card.main h2 {
  font-size: clamp(28px, 3vw, 40px);
}

.card.main .desc {
  font-size: 17px;
}

.label {
  color: var(--ink-soft);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.desc {
  font-size: 16px;
  margin-top: 6px;
}

.value {
  font-size: 20px;
  font-weight: 600;
  margin-top: 6px;
}

.weather-text {
  margin-left: 10px;
}

.icon-wrap img {
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 12px 18px rgba(120, 60, 24, 0.18));
  margin-right: 10px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(160px, 1fr));
  gap: 14px;
  align-content: start;
}

.panel,
.card,
.hero {
  animation: liftIn 0.6s ease both;
}

.panel {
  animation-delay: 0.05s;
}

.result {
  animation: liftIn 0.6s ease both;
  animation-delay: 0.1s;
}

@keyframes pageFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes liftIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .result {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .card.main {
    grid-template-columns: 1fr auto;
    min-height: 0;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .icon-wrap img {
    width: 72px;
    height: 72px;
  }
}
</style>
