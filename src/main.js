import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Particles from '@tsparticles/vue3'

createApp(App).mount('#app')
createApp(App).use(Particles).mount('#app')
