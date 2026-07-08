import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark',
  )
  const weakMode = ref<boolean>(localStorage.getItem('weakMode') === 'true')

  function applyTheme(t: 'dark' | 'light') {
    if (t === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }

  function applyWeakMode(on: boolean) {
    if (on) {
      document.documentElement.classList.add('weak-mode')
    } else {
      document.documentElement.classList.remove('weak-mode')
    }
  }

  // 确保首次渲染前 class 就位
  applyTheme(theme.value)
  applyWeakMode(weakMode.value)

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  function toggleWeakMode() {
    weakMode.value = !weakMode.value
  }

  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  })

  watch(weakMode, (on) => {
    localStorage.setItem('weakMode', String(on))
    applyWeakMode(on)
  })

  return { theme, weakMode, toggleTheme, toggleWeakMode }
})
