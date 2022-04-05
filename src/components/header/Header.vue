<template>
  <el-menu default-active="1" :collapse="isCollapse">
    <div v-for="(item, index) in NavigationMenu" :key="index">
      <el-sub-menu
        v-if="item.children && item.children.length"
        :index="`${index}`"
        :disabled="item.disabled"
      >
        <template #title>
          <el-icon>
            <img class="g-fixtive" :src="'icon/header/' + item.icon" :alt="item.title" />
          </el-icon>
          <span>{{ item.title }}</span>
        </template>

        <el-menu-item-group v-for="child in item.children" :key="child.title">
          <img class="g-fixtive" :src="'icon/header/' + child.icon" :alt="child.title" />
          <template #title>
            <span>{{ child.title }}</span>
          </template>
          <el-menu-item></el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item v-else :index="`${index}`">
        <img class="g-fixtive" :src="'icon/header/' + item.icon" :alt="item.title" />
        <template #title>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script lang="ts" setup>
import { NavigationMenu } from './config'

const isCollapse = true
</script>

<style lang="scss" scoped>
</style>
