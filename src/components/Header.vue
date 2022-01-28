<template>
  <el-menu
    default-active="1"
    menu-trigger="click"
    :collapse="menuCollapse"
  >
    <el-sub-menu 
      v-for="(item, index) in navigationMenu"
      :key="index"
      index="index"
      :disabled="false"
    >
      <template #title>
        <el-icon v-html="'<' + item.icon + '/>'"></el-icon>
        <span>{{ item.title }}</span>
      </template>

      <el-menu-item-graoup
        v-for="(child, index2) in item.children"
        :key="index2"
      >
        <template #title>
          <el-icon v-html="'<' + item.icon + '/>'"></el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item :index="index + '-' + index2"></el-menu-item>
      </el-menu-item-graoup>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { Header } from '@/DS/menu';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'header',
  components: {},
  props: {

  },
  data () {
    return {
      navigationMenu: [
        {
          title: "首页",
          icon: "house",
          disabled: false
        },
        {
          title: "资源共享",
          icon: "food",
          disabled: false,
          children: [
            {
              title: "开发工具",
              icon: "",
              disabled: false
            },
            {
              title: "源码",
              icon: "",
              disabled: false
            }
          ]
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
      ] as Header.Menu

    }
  },
  beforeMount () {

  },
  mounted () {

  },
  computed: {
      menuMode (): String {
        return "horizontal";
      },
      menuCollapse () {
        return false;
      }
  }
})
</script>

<style lang="scss" scoped>
</style>
