<template>
  <el-menu mode="horizontal"
           class="z-header g-height-60px g-width-100%"
           :ellipsis="false"
           :default-active="(route.name as any)">
    <el-menu-item v-for="menuItem in NavigationMenu"
                  :key='menuItem.title'
                  :index="menuItem.title"
                  @click="handleClick(menuItem.title)">
      <el-icon><span :[menuItem.icon]="''"></span></el-icon>
    </el-menu-item>
    <div class="flex-grow-1"></div>
    <el-menu-item index="github" @click="handleGitHub">
      <el-icon>
        <span class="_color-scheme" icon-carbon:logo-github></span>
      </el-icon>
    </el-menu-item>
    <el-menu-item index="color-scheme"
                  @mousedown="handleMousedown"
                  @mouseleave="handleMouseleave"
                  @mouseup="handleMouseup">
      <el-icon>
        <span class="_color-scheme" icon-carbon:awake></span>
      </el-icon>
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

function handleClick (name: typeof NavigationMenu[0]['title']) {
  app.router?.push({ name })
}

function handleGitHub () {
  window.open('https://github.com/TheOneZhen')
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
