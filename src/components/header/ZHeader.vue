<template>
  <el-menu mode="horizontal"
           router
           class="z-header"
           :default-active="NavigationMenu[0].title">
    <el-menu-item v-for="menuItem in NavigationMenu"
                  :key='menuItem.title'
                  :index="menuItem.title">
    <el-tooltip effect="light" 
                placement="bottom" 
                :content="menuItem.title">
      <el-icon><span :[menuItem.icon]="''"></span></el-icon>
    </el-tooltip>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { NavigationMenu } from './header.config'
</script>

<style lang="scss" scoped>
.z-header {
  height: 60px;
  width: 100%;
}
</style>
