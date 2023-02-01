<template>
  <el-menu class="g-header" default-active="1" :collapse="isCollapse">
    <template v-for="(item, index) in NavigationMenu">
      <el-sub-menu
        v-if="item.children && item.children.length"
        :index="`${index}`"
        :key="index"
        :disabled="item.disabled"
      >
        <template #title>
          <el-icon>
            <img :src="'icon/header/' + item.icon" />
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="(child, childIndex) in item.children"
          :key="child.title"
          :index="`${index}-${childIndex}`"
        >
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
import { NavigationMenu } from './config'

const isCollapse = true
</script>

<style lang="scss" scoped>
.g-header {
  position: fixed;
  top: 30%;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
  img {
    height: 24px;
  }
}
</style>
