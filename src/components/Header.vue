<template>
  <el-menu
    default-active="1"
    menu-trigger="click"
    :collapse="isCollapse"
  >
    <el-sub-menu 
      v-for="(item, index) in navigationMenu"
      :key="index"
      index="index"
      :disabled="false"
    >
      <template #title>
        <span></span>
        <el-icon v-html="item.icon"></el-icon>
      </template>
      <el-menu-item-group
        v-for=""
      >
        <template #title></template>
        <el-menu-item 
          index=""
        ></el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
const navigationMenu = [
  {
    title: "首页",
    icon: "",
    disabled: false,
    children: []
  },
  {
    title: "资源共享",
    icon: "",
    disabled: false,
    children: []
  },
  {
    title: "问题记录",
    icon: "",
    disabled: false,
    children: []
  },
  {
    title: "留言",
    icon: "",
    disabled: false,
    children: []
  }
];

const isCollapse = true;
</script>

<style lang="scss" scoped>
</style>
