import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/font/iconfont.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { useThemeStore } from '@/stores/theme'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 在挂载前初始化主题 store，确保 html class 在首次渲染前就位
useThemeStore()

app.mount('#app')
