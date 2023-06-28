<template>
  <el-menu mode="horizontal"
            class="z-header g-height-60px g-width-100%"
            :default-active="NavigationMenu[0].title">
    <el-menu-item v-for="menuItem in NavigationMenu"
                  :key='menuItem.title'
                  :index="menuItem.title">
    <el-tooltip effect="light"
                placement="bottom"
                :content="menuItem.title">
      <router-link :to="'/' + menuItem.title">
        <el-icon><span :[menuItem.icon]="''"></span></el-icon>
      </router-link>
    </el-tooltip>
    </el-menu-item>
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
    align-self: center;
    color: var(--theme-background-sun);
  }
}
</style>
