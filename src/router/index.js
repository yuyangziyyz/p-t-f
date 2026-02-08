import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import WeatherSearch from '../views/WeatherSearch.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/weatherSearch',
    name: 'weather-search',
    component: WeatherSearch,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
