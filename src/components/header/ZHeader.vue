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
    <el-button class="_color-scheme g-margin-left-auto g-pointer" @click="useColorSchemeStore.changeColorScheme">
      <span icon-carbon:awake></span>
    </el-button>
  </el-menu>
</template>

<script lang="ts" setup>
import { NavigationMenu } from './header.config'

const useColorSchemeStore = app.store.get('UseColorSchemeStore')

</script>

<style lang="scss" scoped>
.z-header {
  background: var(--theme-background);
  border-bottom: none;
  ._color-scheme {
    align-self: center;
  }
}
</style>
