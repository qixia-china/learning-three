<template>
  <div class="title-box">
    <div class="icon-title">
      <svg class="icon svg-icon" aria-hidden="true">
        <use xlink:href="#icon-kedaya"></use>
      </svg>
    </div>
    <div class="title" v-if="!isCollapse">百科全书鸭</div>
  </div>
  <el-menu
    default-active="1-0"
    popper-class="popperClass"
    :collapse-transition="false"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="value in list" :key="value.number">
      <el-sub-menu :index="value.number" v-if="value.children.length > 0">
        <template #title>
          <el-icon>
            <component :is="value.icon" />
          </el-icon>

          <span>{{ value.title }}</span>
        </template>

        <el-menu-item-group v-for="item in value.children" :key="item.number">
          <el-menu-item :index="item.number" @click="handleClick(item.path)">{{
            item.title
          }}</el-menu-item>
        </el-menu-item-group>

        <!-- <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group> -->
      </el-sub-menu>

      <el-menu-item :index="value.number" v-else @click="handleClick(value.path)">
        <el-icon>
          <component :is="value.icon" />
        </el-icon>
        <span>{{ value.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed, shallowRef, type Component } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
import { Document, HomeFilled, InfoFilled } from '@element-plus/icons-vue'
import { getLocalStorage } from '@/utils/storage'
// const isCollapse = ref(counter.isCollapse)
const isCollapse = computed(() => {
  return counter.isCollapse
})

const iconsList = {
  Document,
  HomeFilled,
  InfoFilled,
}
// 提供一个获取图标组件的方法，并做容错处理
const getIconComponent = (iconName: string) => {
  // 如果后端传的名字在 Element Plus 图标库中存在，就返回；否则返回一个默认图标
  return iconsList[iconName as keyof typeof iconsList] || Document
}
interface MenuItem {
  icon?: string | Component
  path: string
  title: string
  number: string
  children: MenuItem[]
}

const list = shallowRef<MenuItem[]>([])
const storedMenu = getLocalStorage<MenuItem[]>('menuList')
if (storedMenu) {
  list.value = storedMenu.map((item) => {
    const iconName = typeof item.icon === 'string' ? item.icon : ''
    item.icon = getIconComponent(iconName)
    return item
  })
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClick = function (path: string) {
  router.push(path)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  background-color: var(--menu-bg-color);
  border: none;
}
.el-sub-menu__title {
  /* color: var(--title-text-color) !important; */
}
.el-menu-item {
  /* color: var(--title-text-color) !important; */
}
</style>

<style scoped lang="scss">
.title-box {
  display: flex;
  align-items: center;
  padding: 12px 0;
  width: 100%;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 12px;

  .icon-title {
    width: 30px;
    height: 30px;
    display: flex;
  }

  .title {
    margin-left: 10px;
  }
}
</style>
