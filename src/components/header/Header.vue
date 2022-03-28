<template>
  <el-menu default-active="1" menu-trigger="click" :collapse="isCollapse">
    <el-sub-menu
      v-for="(item, index) in navigationMenu"
      :key="index"
      index="index"
      :disabled="false"
    >
      <template #title>
        <span>{{ item.title }}</span>
        <img :src="item.icon" alt='item.title' />
      </template>
      <el-menu-item-group v-for="child in item.children" :key="child.title">
        <template #title></template>
        <el-menu-item></el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { Header } from '../../DS/menu'

const navigationMenu: Header.SubMenu[] = [
  {
    title: '首页',
    icon: 'House'
  },
  {
    title: '好东西',
    icon: '',
    children: [
      {
        title: '实用插件｜脚本',
        icon: ''
      },
      {
        title: '素材｜资源',
        icon: ''
      },
      {
        title: '振的藏宝阁',
        icon: ''
      }
    ]
  },
  {
    title: '不知不觉编程',
    icon: '',
    children: [
      {
        title: '问题记录',
        icon: ''
      },
      {
        title: '源码分析',
        icon: ''
      },
      {
        title: '阶段阅读',
        icon: ''
      }
    ]
  },
  {
    title: '留言',
    icon: '',
    children: [
      {
        title: 'call 我',
        icon: ''
      },
      {
        title: '留言区',
        icon: ''
      }
    ]
  },
  {
    title: '其他平台',
    icon: '',
    isRight: true
  }
]

const isCollapse = true
</script>

<style lang="scss" scoped>
</style>
