<template>
  <el-menu v-show="isShow" :class="mode" class="z-header" :mode="(mode as any)" default-active="1" :collapse="isCollapse">
    <template v-for="(item, index) in NavigationMenu">
      <el-sub-menu v-if="item.children && item.children.length" :index="`${index}`" :key="index"
        :disabled="item.disabled">
        <template #title>
          <el-icon>
            <img :src="'icon/header/' + item.icon" />
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item v-for="(child, childIndex) in item.children" :key="child.title" :index="`${index}-${childIndex}`">
          <img class="g-h-24 g-m-r-4" :src="'icon/header/' + child.icon" />
          <span>{{ child.title }}</span>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-else :index="`${index}`" :key="index + 1">
        <el-icon>
          <img :src="'icon/header/' + item.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash'
import { ref, computed } from 'vue'
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
