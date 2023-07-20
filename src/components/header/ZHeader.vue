<template>
  <el-menu mode="horizontal"
           class="z-header g-height-60px g-width-100%"
           :default-active="(route.name as any)">
    <el-menu-item v-for="menuItem in NavigationMenu"
                  :key='menuItem.title'
                  :index="menuItem.title"
                  @click="handleClick(menuItem.title)">
      <el-icon><span :[menuItem.icon]="''"></span></el-icon>
    </el-menu-item>
    <div @click="handleLogin">github登录</div>
    <div class="_color-scheme g-margin-left-auto g-pointer g-padding-right-5vw"
                icon-carbon:awake
                @mousedown="handleMousedown"
                @mouseleave="handleMouseleave"
                @mouseup="handleMouseup">
  </div>
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

function handleLogin () {
  app.user.loginByGithub()
}
</script>

<style lang="scss" scoped>

.z-header {
  background: v-bind(nextColorScheme);
  border-bottom: none;
  transition: background 1s ease;
  ._color-scheme {
    align-self: center;
    color: var(--theme-background-sun);
  }
}
</style>
