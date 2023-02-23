<template>
  <el-menu
    v-show="isShow"
    router
    :class="mode"
    class="z-header"
    :mode="(mode as any)"
    :default-active="NavigationMenu[0].title"
    :collapse="isCollapse"
  >
    <el-menu-item
      v-for="menuItem in NavigationMenu"
      :key='menuItem.title'
      :index="menuItem.title"
    >
      <el-icon>
        <component :is="menuItem.icon"></component>
      </el-icon>
      <template #title>
        <div v-html="menuItem.icon"></div>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash'
import { NavigationMenu } from './config'
import { UseLayoutStore } from '@/store/UseLayoutStore'

const store = UseLayoutStore()
const mode = computed(() => store.isHorizontal ? 'horizontal' : 'vertical')
const isCollapse = true
const isShow = ref(true)
window.addEventListener('scroll', (event) => {
  isShow.value = true
  if (window.scrollY !== 0) setNavDisplay(false)
  else setNavDisplay(true)
})

const setNavDisplay = debounce((val: typeof isShow.value) => {
  isShow.value = val
}, 5000)
</script>

<style lang="scss" scoped>
.z-header {
  &:not(.el-menu--collapse) {
    width: 200px;
  }

  img {
    height: 24px;
  }
}
.vertical {
  position: fixed;
  top: 30%;
}

.horizontal {
  position: sticky;
  height: 50px;
  width: 100%;
  top: 0;
}
</style>
