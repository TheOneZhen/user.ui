<template>
  <el-menu mode="horizontal"
           class="z-header g-height-60px g-width-100%"
           :ellipsis="false"
           :default-active="(route.name as any)">
    <el-menu-item v-for="menuItem in NavigationMenu"
                  :key='menuItem.title'
                  :index="menuItem.title"
                  @click="() => app.router?.push({ name: menuItem.title })">
      <el-icon :[menuItem.icon]="''" />
    </el-menu-item>
    <div class="flex-grow-1"></div>
    <el-menu-item index="github">
      <el-link href="https://github.com/TheOneZhen" target="_blank" :underline="false">
        <el-icon icon-carbon:logo-github />
      </el-link>
    </el-menu-item>
    <el-menu-item index="color-scheme"
                  @mousedown="handleMousedown"
                  @mouseleave="handleMouseleave"
                  @mouseup="handleMouseup">
      <el-icon class="_color-scheme" icon-carbon:awake />
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { NavigationMenu } from './header.config'
import { useRoute } from 'vue-router'

const route = useRoute()

const nextColorScheme = ref('transparent')

const useColorSchemeStore = app.store.get('UseColorSchemeStore')

function handleMousedown () {
  nextColorScheme.value = app.theme.getNextColorSchemeBackground(useColorSchemeStore.colorScheme + 1)
}

function handleMouseleave () {
  nextColorScheme.value = 'transparent'
}

function handleMouseup () {
  useColorSchemeStore.changeColorScheme()
  handleMouseleave()
}

</script>

<style lang="scss" scoped>

.z-header {
  background: v-bind(nextColorScheme);
  border-bottom: none;
  transition: background 1s ease;
  ._color-scheme {
    color: var(--theme-background-sun);
  }
}
</style>
