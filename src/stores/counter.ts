import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  // 菜单栏折叠和展开
  const isCollapse = ref(false)
  function toggleCollapse() {
    isCollapse.value = !isCollapse.value
  }



  return { count, doubleCount, increment, isCollapse, toggleCollapse }
})
