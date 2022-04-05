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
        <img :src="'icon/header/' + item.icon" alt='item.title' />
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
    icon: 'House.svg'
  },
  {
    title: '资源',
    icon: 'Folder.svg',
    children: [
      {
        title: '插件｜脚本',
        icon: 'CPU.svg'
      },
      {
        title: '素材',
        icon: 'Cherry.svg'
      },
      {
        title: '文档翻译',
        icon: 'DocumentCopy.svg'
      },
      {
        title: '我的源码',
        icon: 'Crop.svg'
      }
    ]
  },
  {
    title: '阶段总结',
    icon: 'Document.svg',
    children: [
      {
        title: '问题记录',
        icon: 'DocumentChecked.svg'
      },
      {
        title: '源码分析',
        icon: 'FullScreen.svg'
      }
    ]
  },
  {
    title: '留言',
    icon: 'ChatSquare.svg',
    children: [
      {
        title: '留言区',
        icon: ''
      }
    ]
  },
  {
    title: '发现另外的我',
    icon: 'Link.svg',
    showIcon: false,
    isRight: true
  }
]

const isCollapse = true
</script>

<style lang="scss" scoped>
</style>
